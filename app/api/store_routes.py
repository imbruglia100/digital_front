from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Store

store_routes = Blueprint('stores', __name__)


@store_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    stores = Store.query.all()
    return {'store': [store.to_dict() for store in stores]}


@store_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    store = Store.query.get(id)
    return store.to_dict()
