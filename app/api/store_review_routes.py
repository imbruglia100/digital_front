from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import StoreReview
from app.models import db


store_review_routes = Blueprint('store_reviews', __name__)

#creates a review for the store
@store_review_routes.route('', methods=["POST"])
def create_review():
    data = request.form
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
@store_review_routes.route('/<int:review_id>', methods=["PUT"])
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
@store_review_routes.route('/<int:review_id>', methods=["DELETE"])
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
