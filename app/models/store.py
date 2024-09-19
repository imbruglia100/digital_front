from .db import db, environment, SCHEMA, add_prefix_for_prod

class Store(db.Model):
    __tablename__ = 'stores'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False,)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255))
    type = db.Column(db.String(40), nullable=False)
    store_img_url = db.Column(db.String(255))
    store_banner_url = db.Column(db.String(255))

    owner = db.relationship('User', back_populates='stores')
    reviews = db.relationship('StoreReview', cascade="all, delete-orphan")
    products = db.relationship('Product', back_populates='store', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'store_img_url': self.store_img_url,
            'store_banner_url': self.store_banner_url,
            'Owner': self.owner.to_dict()
        }
