from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False,)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False,)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='product_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id' : self.user_id,
            'title': self.title,
            'description': self.description,
            'rating': self.rating,
            'User' : self.user.to_dict() if self.user else {}
        }
