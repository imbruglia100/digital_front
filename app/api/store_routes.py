from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import Store, Product, StoreReview
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
    store_img_url_upload=''
    store_banner_url_upload=''
    errors = {}

    if not data.get("name"):
        errors["name"] = 'Name is required'
    if not data.get("type"):
        errors["type"] = 'Type is required'

    if errors:

        return jsonify(errors), 404


    if 'store_img_url' in request.files:
        store_img_url = request.files['store_img_url']


        if store_img_url.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return jsonify({"errors": "File type not allowed"}), 400

        store_img_url.filename = get_unique_filename(store_img_url.filename)


        store_img_url_upload = upload_file_to_s3(store_img_url, acl="public-read")['url']

    if 'store_banner_url' in request.files:
        store_banner_url = request.files['store_banner_url']


        if store_banner_url.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
            return jsonify({"errors": "File type not allowed"}), 400

        store_banner_url.filename = get_unique_filename(store_banner_url.filename)


        store_banner_url_upload = upload_file_to_s3(store_banner_url, acl="public-read")['url']

    new_store = Store(
        owner_id=data.get('owner_id'),
        name=data.get("name"),
        type= data.get("type"),
        description=data.get("description"),
        store_img_url=store_img_url_upload,
        store_banner_url=store_banner_url_upload
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

#creates a review for the store
@store_routes.route('/reviews', methods=["POST"])
def create_review():
    data = request.get_json()
    errors = {}

    if not data.get("title"):
        errors["title"] = 'Title is required'
    if not data.get("description"):
        errors["description"] = 'Description is required'

    if errors:

        return jsonify(errors), 404

    new_review = StoreReview(
        store_id=data.get('store_id'),
        user_id=current_user.id,
        title=data.get('title'),
        description=data.get('description'),
        rating=data.get('rating')
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201

#edit a review
@store_routes.route('/reviews/<int:review_id>', methods=["PUT"])
def edit_review(review_id):
    review = StoreReview.query.filter_by(id=review_id).first()
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
@store_routes.route('/reviews/<int:review_id>', methods=["DELETE"])
def delete_review(review_id):
    review = StoreReview.query.filter_by(id=review_id).first()

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
@login_required
def update_a_store(storeId):
    store = Store.query.get(storeId)

    if not store:
        return jsonify({"errors": {"store": "Store does not exist"}}), 404

    if store.owner_id != current_user.id:
        return jsonify({"errors": {"store": "You don't own this store"}}), 403

    data = request.form

    try:
        store.name = data.get('name', store.name)
        store.type = data.get('type', store.type)
        store.description = data.get('description', store.description)

        # Handle store_img_url
        if 'store_img_url' in request.files:
            image = request.files["store_img_url"]
            if image.filename != '':
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if "url" not in upload:
                    return upload, 400

                store.store_img_url = upload["url"]
        elif 'store_img_url' in data:
            store.store_img_url = data['store_img_url']

        # Handle store_banner_url
        if 'store_banner_url' in request.files:
            banner = request.files["store_banner_url"]
            if banner.filename != '':
                banner.filename = get_unique_filename(banner.filename)
                upload = upload_file_to_s3(banner)

                if "url" not in upload:
                    return upload, 400

                store.store_banner_url = upload["url"]
        elif 'store_banner_url' in data:
            store.store_banner_url = data['store_banner_url']

        db.session.commit()
        return jsonify(store.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": {"server": str(e)}}), 500

# delete a store
@store_routes.route('/<int:storeId>', methods=['DELETE'])
def delete_store(storeId):
    store = Store.query.filter_by(id=storeId, owner_id=current_user.id).first()

    if not store:
        return jsonify({"errors": {
            "Store": "Store does not exist"
        }}), 404
    if store.store_img_url:
        remove_file_from_s3(store.store_img_url)
    if store.store_banner_url:
        remove_file_from_s3(store.store_banner_url)

    db.session.delete(store)
    db.session.commit()
    return jsonify({"message": "Successfully deleted."}), 200
