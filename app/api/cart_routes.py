from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Cart, CartItem
from app.models import db


cart_routes = Blueprint('cart_routes', __name__)

#returns cart for user
@cart_routes.route('/current')
def get_cart():
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        new_cart = Cart(
            user_id = current_user.id,
        )
        db.session.add(new_cart)
        db.session.commit()
        return jsonify(new_cart.to_dict(), 201)

    return jsonify(cart.to_dict()), 200

#creates a new cart
@cart_routes.route('/create', methods=["POST"])
def create_cart():
    cart = Cart(
        user_id = current_user.id
    )

    db.session.add(cart)
    db.session.commit()

    return jsonify(cart.to_dict()), 201
#add to cart
@cart_routes.route('/add/<int:product_id>', methods=["POST"])
def add_to_cart(product_id):
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    data = request.json
    quantity = data.get("quantity", 1)

    existing_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product_id).first()

    if existing_item:
        existing_item.quantity += quantity
    else:
        item_to_add = CartItem(
            cart_id=cart.id,
            product_id=product_id,
            quantity=quantity
        )
        db.session.add(item_to_add)

    db.session.commit()

    return jsonify(item_to_add.to_dict() if not existing_item else existing_item.to_dict()), 201

#remove from cart
@cart_routes.route('/remove/<int:cart_item_id>', methods=["DELETE"])
def remove_from_cart(cart_item_id):
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    cart_item = CartItem.query.filter_by(cart_id=cart.id, id=cart_item_id).first()

    if not cart_item:
        return jsonify({"error": "Item not found in cart"}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": "Item removed successfully"}), 200

#delete cart
@cart_routes.route('/delete', methods=["DELETE"])
def delete_cart():
    # Get the current user's cart
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        return jsonify({"error": "Cart not found"}), 404

    # Delete all associated cart items first
    CartItem.query.filter_by(cart_id=cart.id).delete()

    # Delete the cart itself
    db.session.delete(cart)
    db.session.commit()

    return jsonify({"message": "Cart deleted successfully"}), 200
