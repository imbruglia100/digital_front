from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import db, Product, Store

product_routes = Blueprint('products', __name__)

# Get all products
@product_routes.route('')
def all_stores():
    products = Product.query.options(joinedload(Product.store)).all()
    return jsonify({'products': [product.to_dict() for product in products]}), 200

# create a product
@product_routes.route('/', methods=["POST"])
def create_prodcut():
    data = request.get_json()
    errors = {}

    if not data["title"]:
        errors["title"] = 'Title is required'
    if not data["price"]:
        errors["price"] = 'Price is required'

    if errors:
        return jsonify(errors), 404
    new_product = Product(
        store_id=data.get('store_id'),
        title=data["title"],
        description= data["description"],
        price=data["price"],
        stock_amount= data['stock_amount'],
        product_img= data['product_img'],
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
    data = request.get_json()

    if not product:
        return jsonify({"errors": {
            "product": "Product does not exist"
        }}), 404

    if not store.owner_id == current_user.id:
        return jsonify({"errors": {
            "product": "You don't own this product"
        }}), 304
    
    product.title = data.get('title', product.title)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock_amount = data.get('stock_amount', product.stock_amount)
    product.product_img = data.get('product_img', product.product_img)

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

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Successfully deleted."}), 200
