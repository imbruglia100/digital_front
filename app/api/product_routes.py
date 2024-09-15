from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import db, Product, Store
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
def update_a_product(productId):
    product = Product.query.get(productId)
    store = Store.query.get(product.store_id)
    data = request.form

    if not product:
        return jsonify({"errors": {
            "product": "Product does not exist"
        }}), 404

    if not store.owner_id == current_user.id:
        return jsonify({"errors": {
            "product": "You don't own this product"
        }}), 304

    if data.get('product_img').filename != product.product_img:
        remove_file_from_s3(product.product_img)
        product.product_img = get_unique_filename(data.get('product_img').filename)
        upload_file_to_s3(product.product_img)

    product.title = data.get('title', product.title)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock_amount = data.get('stock_amount', product.stock_amount)

    db.session.commit()

    return jsonify(product.to_dict()), 201

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
