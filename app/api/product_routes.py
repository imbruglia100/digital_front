from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import db, Product, Store, ProductReview
from ..aws import upload_file_to_s3, remove_file_from_s3, get_unique_filename, ALLOWED_EXTENSIONS

product_routes = Blueprint('products', __name__)

# Get all products
@product_routes.route('')
def all_stores():
    products = Product.query.options(joinedload(Product.store)).all()
    return jsonify({'products': [product.to_dict() for product in products]}), 200

# create a product
@product_routes.route('', methods=["POST"])
def create_prodcut():
    data = request.form
    errors = {}
    upload = ''


    if not data.get("title"):
        errors["title"] = 'Title is required'
    if not data.get("price"):
        errors["price"] = 'Price is required'
    if not data.get("store_id"):
        errors["store_id"] = 'Must select a store'

    if errors:
        return jsonify(errors), 404

    if 'image' in request.files:
        file = request.files['image']


        if file.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return jsonify({"errors": "File type not allowed"}), 400

        file.filename = get_unique_filename(file.filename)


        upload = upload_file_to_s3(file, acl="public-read")["url"]


    new_product = Product(
        store_id=data.get('store_id'),
        title=data.get("title"),
        description= data.get("description"),
        price=data.get("price"),
        stock_amount= data.get('stock_amount'),
        product_img= upload,
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 200

# get all products from current user
@product_routes.route('/current')
@login_required
def get_all_current_products():

    if not current_user:
        return jsonify({"errors": {
            "User": "Login is Required"
        }}), 404

    store_ids = [store.id for store in Store.query.filter_by(owner_id=current_user.id).all()]

    products = Product.query.filter(Product.store_id.in_(store_ids)).all()
    return jsonify({'products': [product.to_dict() for product in products]}), 200

#creates a review for the store
@product_routes.route('/reviews', methods=["POST"])
def create_review():
    data = request.get_json()
    errors = {}

    if not data.get("title"):
        errors["title"] = 'Title is required'
    if not data.get("description"):
        errors["description"] = 'Description is required'

    if errors:

        return jsonify(errors), 404

    new_review = ProductReview(
        product_id=data.get('product_id'),
        user_id=current_user.id,
        title=data.get('title'),
        description=data.get('description'),
        rating=data.get('rating')
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201

#edit a review
@product_routes.route('/reviews/<int:review_id>', methods=["PUT"])
def edit_review(review_id):
    review = ProductReview.query.filter_by(id=review_id).first()
    data = request.get_json()

    if not review:
        return jsonify({"error":{
            "review": "Review does not exist"
        }}),404

    review.title = data.get('title', review.title)
    review.description = data.get('description', review.description)
    review.rating = data.get('rating', review.rating)

    db.session.commit()

    return jsonify(review.to_dict()), 201

#delete a review
@product_routes.route('/reviews/<int:review_id>', methods=["DELETE"])
def delete_review(review_id):
    review = ProductReview.query.filter_by(id=review_id).first()

    if not review:
        return jsonify({"error":{
            "review": "Review does not exist"
        }}),404

    if review.user_id != current_user.id:
        return jsonify({"error":{
            "review": "You do not own this review"
        }}),404

    db.session.delete(review)
    db.session.commit()

    return jsonify({"message": "Successfully deleted."}), 200

# get a specific product by productId
@product_routes.route('/<int:productId>')
def get_specific_product(productId):
    product = Product.query.filter_by(id=productId).first()

    if not product:
        return jsonify({"errors": {
            "product": "Product does not exist"
        }}), 404

    return jsonify(product.to_dict()), 200

# update a product
@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_a_product(productId):
    product = Product.query.get(productId)

    if not product:
        return jsonify({"errors": {"product": "Product does not exist"}}), 404

    if product.store.owner_id != current_user.id:
        return jsonify({"errors": {"product": "You don't own this product's store"}}), 403

    data = request.form
    files = request.files

    if 'title' in data:
        product.title = data['title']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = float(data['price'])
    if 'stock_amount' in data:
        product.stock_amount = int(data['stock_amount'])

    # Handle product_img
    if 'product_img' in files:
        image = files["product_img"]
        if image.filename != '':
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            product.product_img = upload["url"]
    elif 'product_img' in data:
        product.product_img = data['product_img']

    db.session.commit()
    return jsonify(product.to_dict()), 200

# delete a product
@product_routes.route('/<int:productId>', methods=['DELETE'])
def delete_product(productId):
    product = Product.query.filter_by(id=productId).first()
    store = Store.query.filter_by(owner_id=current_user.id, id=product.store_id).first()
    if not product:
        return jsonify({"errors": {
            "product": "Product does not exist"
        }}), 404

    if not store.owner_id == current_user.id:
        return jsonify({"errors": {
            "product": "You don't own the product"
        }}), 404

    if product.product_img:
        remove_file_from_s3(product.product_img)

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Successfully deleted."}), 200
