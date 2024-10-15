from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False,)
    title = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255))
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock_amount = db.Column(db.String(255))
    product_img = db.Column(db.String(255))


    reviews = db.relationship('ProductReview', cascade="all, delete-orphan")
    store = db.relationship('Store', back_populates='products')
    cart_items = db.relationship('CartItem', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'store_id': self.store_id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'stock_amount': self.stock_amount,
            'product_img': self.product_img,
            'Store' : self.store.to_dict() if self.store else {},
            "Reviews": {review.id: review.to_dict() for review in self.reviews}
        }
