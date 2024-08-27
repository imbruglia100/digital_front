from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import Store
from app.models import db

store_routes = Blueprint('stores', __name__)

# Get all stores
@store_routes.route('')
def all_stores():
    # stores = Store.query.filter_by(id=1).options(joinedload(Store.owner)).all()
    stores = Store.query.options(joinedload(Store.owner)).all()
    return jsonify({'stores': [store.to_dict() for store in stores]}), 200

# create a store
@store_routes.route('/', methods=["POST"])
def create_store():
    data = request.get_json()
    errors = {}

    if not data["name"]:
        errors["name"] = 'Name is required'
    if not data["type"]:
        errors["type"] = 'Type is required'

    if errors:
        return jsonify(errors), 404
    new_store = Store(
        owner_id=data.get('owner_id'),
        name=data["name"],
        type= data["type"],
        store_img_url= data['store_img_url'],
        store_banner_url= data['store_banner_url'],
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
@login_required
def get_specific_store(storeId):
    store = Store.query.filter_by(id=storeId).first()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404

    return jsonify(store.to_dict()), 200

# update a store
@store_routes.route('/<int:storeId>', methods=['PUT'])
@login_required
def update_a_store(storeId):
    store = Store.query.get(storeId)
    data = request.get_json()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404

    if not store["owner_id"] == current_user.id:
        return jsonify({"errors": {
            "Store": "You dont own this store"
        }}), 304

    store.name = data.get('name', store.name)
    store.type = data.get('type', store.type)
    store.description = data.get('description', store.description)
    store.store_img_url= data.get('store_img_url', store.store_img_url)
    store.store_banner_url= data.get('store_banner_url', store.store_banner_url)

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

    db.session.delete(store)
    db.session.commit()
    return jsonify({"message": "Successfully deleted."}), 200
