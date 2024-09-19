from app.models import db, Store, StoreReview, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stores():

    demos_store = Store(
        owner_id=1,
        name='Demo Store',
        description='If your looking for a store to test out, this is just the place!',
        type = 'Demo Category',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    bills_store = Store(
        owner_id=2,
        name='Bills Store',
        description='I am Bill and this is my store! I sell lots of goods',
        type = 'Demo Category',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    johns_store = Store(
        owner_id=3,
        name='Johns Store',
        description='If your looking for a store to test out, this is just the place!',
        type = 'Demo Category',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    demos_store2 = Store(
        owner_id=1,
        name='Longs Jewlers',
        description='We have all the jewlery.',
        type = 'Jewlery',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    bills_store2 = Store(
        owner_id=2,
        name='Home Depot',
        description='We have all the tools you need to finish that project.',
        type = 'Home and Garden',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    johns_store2 = Store(
        owner_id=3,
        name='Best Buy',
        description='We have all your tech needs',
        type = 'Technology',
        store_img_url='https://mydigitalwirral.co.uk/wp-content/uploads/2020/02/bigstock-Empty-Store-Front-With-Window-324188686.jpg',
        store_banner_url='https://www.pngmart.com/files/13/Vector-Pattern-PNG-Image-Background.png'
    )

    demo_review_1 = StoreReview(
    store_id=1,
    user_id=3,
    title="Great Place to Explore!",
    description="I love coming to Demo Store. It's a fantastic place to see a variety of items and test them out. The staff is super friendly and helpful!",
    rating=4
    )

    demo_review_2 = StoreReview(
        store_id=1,
        user_id=2,
        title="Excellent Experience",
        description="I had a wonderful time shopping at Demo Store. The products are unique and well-presented. Will definitely return!",
        rating=5
    )

    bills_review_1 = StoreReview(
    store_id=2,
    user_id=1,
    title="Bill's Got It All!",
    description="I can always find what I need at Bill's Store. From groceries to household items, they have a great selection!",
    rating=5
    )

    bills_review_2 = StoreReview(
        store_id=2,
        user_id=3,
        title="Friendly Service",
        description="Every time I visit, the staff is so welcoming and eager to help. Bill's Store feels like home!",
        rating=4
    )

    johns_review_1 = StoreReview(
    store_id=3,
    user_id=1,
    title="Love This Store!",
    description="John's Store is my go-to for everything. The selection is fantastic, and I always leave satisfied!",
    rating=5
    )

    johns_review_2 = StoreReview(
        store_id=3,
        user_id=2,
        title="Well Organized",
        description="This store is very well organized. I can easily find what I'm looking for, and the staff is always on hand to assist.",
        rating=5
    )

    db.session.add_all([
        demos_store,
        bills_store,
        johns_store,
        demos_store2,
        bills_store2,
        johns_store2,
        demo_review_1,
        demo_review_2,
        bills_review_1,
        bills_review_2,
        johns_review_1,
        johns_review_2
        ])


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stores"))

    db.session.commit()
