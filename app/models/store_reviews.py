from .db import db, environment, SCHEMA, add_prefix_for_prod

class StoreReview(db.Model):
    __tablename__ = 'store_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False,)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False,)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='store_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'store_id': self.store_id,
            'user_id' : self.user_id,
            'title': self.title,
            'description': self.description,
            'rating': self.rating,
            'Store' : self.store.to_dict() if self.store else {},
            'User' : self.user.to_dict() if self.user else {}
        }
