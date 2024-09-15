from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import Store, Product
from app.models import db
from ..aws import upload_file_to_s3, remove_file_from_s3, get_unique_filename, ALLOWED_EXTENSIONS

store_routes = Blueprint('stores', __name__)

# Get all stores
@store_routes.route('')
def all_stores():
    # stores = Store.query.filter_by(id=1).options(joinedload(Store.owner)).all()
    stores = Store.query.options(joinedload(Store.owner)).all()
    return jsonify({'stores': [store.to_dict() for store in stores]}), 200

# create a store
@store_routes.route('', methods=["POST"])
def create_store():
    data = request.form
    errors = {}

    if not data.get("name"):
        errors["name"] = 'Name is required'
    if not data.get("type"):
        errors["type"] = 'Type is required'

    if errors:
        print(errors)
        return jsonify(errors), 404


    if 'store_img_url' in request.files:
        store_img_url = request.files['store_img_url']


        if store_img_url.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return jsonify({"errors": "File type not allowed"}), 400

        store_img_url.filename = get_unique_filename(store_img_url.filename)


        store_img_url_upload = upload_file_to_s3(store_img_url, acl="public-read")
        print(store_img_url_upload['url'], '================================')

    if 'store_banner_url' in request.files:
        store_banner_url = request.files['store_banner_url']


        if store_banner_url.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return jsonify({"errors": "File type not allowed"}), 400

        store_banner_url.filename = get_unique_filename(store_banner_url.filename)


        store_banner_url_upload = upload_file_to_s3(store_banner_url, acl="public-read")
        print(store_banner_url_upload['url'], '================================')

    new_store = Store(
        owner_id=data.get('owner_id'),
        name=data.get("name"),
        type= data.get("type"),
        description=data.get("description"),
        store_img_url=store_img_url_upload['url'],
        store_banner_url=store_banner_url_upload['url']
    )

    db.session.add(new_store)
    db.session.commit()

    return jsonify(new_store.to_dict()), 200

# get all stores from current user
@store_routes.route('/current')
@login_required
def get_all_current_stores():

    if not current_user:
        return jsonify({"errors": {
            "User": "Login is Required"
        }}), 404

    stores = Store.query.filter_by(owner_id=current_user.id).all()
    return jsonify({'stores': [store.to_dict() for store in stores]}), 200

# get a specific store by storeId
@store_routes.route('/<int:storeId>')
def get_specific_store(storeId):
    store = Store.query.filter_by(id=storeId).first()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404

    return jsonify(store.to_dict()), 200

#get all products by store id
@store_routes.route('/<int:storeId>/products')
def get_products_by_store_id(storeId):
    store = Store.query.filter_by(id=storeId).first()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404

    products = Product.query.filter_by(store_id=storeId).all()

    return jsonify({'products': [product.to_dict() for product in products]}), 200

# update a store
@store_routes.route('/<int:storeId>', methods=['PUT'])
def update_a_store(storeId):
    store = Store.query.get(storeId)
    data = request.form

    if not store:
        return jsonify({"errors": {
            "store": "Store does not exist"
        }}), 404

    if not store.to_dict()["owner_id"] == current_user.id:
        return jsonify({"errors": {
            "store": "You dont own this store"
        }}), 304

    if data.get('store_img_url').filename != store.store_img_url:
        remove_file_from_s3(store.store_img_url)
        store.store_img_url = get_unique_filename(data.get('store_img_url').filename)
        upload_file_to_s3(store.store_img_url)

    if data.get('store_banner_url').filename != store.store_banner_url:
        remove_file_from_s3(store.store_banner_url)
        store.store_banner_url = get_unique_filename(data.get('store_banner_url').filename)
        upload_file_to_s3(store.store_banner_url)

    store.name = data.get('name', store.name)
    store.type = data.get('type', store.type)
    store.description = data.get('description', store.description)
    store.store_img_url = data.get('store_img_url', store.store_img_url)
    store.store_banner_url = data.get('store_banner_url', store.store_banner_url)

    db.session.commit()

    return jsonify(store.to_dict()), 201

# delete a store
@store_routes.route('/<int:storeId>', methods=['DELETE'])
def delete_store(storeId):
    store = Store.query.filter_by(id=storeId, owner_id=current_user.id).first()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404

    remove_file_from_s3(store.store_img_url)
    remove_file_from_s3(store.store_banner_url)

    db.session.delete(store)
    db.session.commit()
    return jsonify({"message": "Successfully deleted."}), 200
