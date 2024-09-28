from app.models import db, Product, ProductReview ,environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():

    demo_product_1 = Product(
        store_id=1,
        title='Cool Product',
        description='This is a cool product',
        price = 12.40,
        stock_amount=50,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    demo_product_2 = Product(
        store_id=1,
        title='Great Product',
        description='This is a Great product',
        price = 12.40,
        stock_amount=25,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    demo_product_3 = Product(
       store_id=1,
        title='Awesome Product',
        description='This is a Awesome product',
        price = 12.40,
        stock_amount=10,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    bills_product_1 = Product(
        store_id=2,
        title='Unique Product',
        description='This is a cool product',
        price = 12.40,
        stock_amount=50,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    bills_product_2 = Product(
        store_id=2,
        title='Flying Product',
        description='This is a cool product',
        price = 12.40,
        stock_amount=50,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    bills_product_3 = Product(
        store_id=2,
        title='Omnificent Product',
        description='This is a cool product',
        price = 12.40,
        stock_amount=50,
        product_img='https://www.makodesign.com/wp-content/uploads/2019/05/cooler2.jpg'
    )

    demo_reviews = [
        ProductReview(
            product_id=1,
            user_id=2,
            title='Great Product!!',
            description='I got this product for my nephew and he loves it! It is very high quality',
            rating=5
        ),
        ProductReview(
            product_id=1,
            user_id=3,
            title='Not Bad',
            description='It works well, but I expected more features.',
            rating=4
        ),
        ProductReview(
            product_id=2,
            user_id=1,
            title='Loved it!',
            description='This product exceeded my expectations.',
            rating=5
        ),
        ProductReview(
            product_id=2,
            user_id=3,
            title='Okay Product',
            description='It’s decent, but not what I was hoping for.',
            rating=3
        ),
        ProductReview(
            product_id=3,
            user_id=1,
            title='Awesome!',
            description='Absolutely loved it! Highly recommend.',
            rating=5
        ),
        ProductReview(
            product_id=3,
            user_id=2,
            title='Good Value',
            description='Very good quality for the price.',
            rating=4
        ),
        ProductReview(
            product_id=4,
            user_id=1,
            title='Unique!',
            description='A unique product that stands out!',
            rating=5
        ),
        ProductReview(
            product_id=4,
            user_id=3,
            title='Interesting',
            description='I found it interesting but not practical.',
            rating=3
        ),
        ProductReview(
            product_id=5,
            user_id=2,
            title='Flying High',
            description='It flies just as described, very fun!',
            rating=5
        ),
        ProductReview(
            product_id=5,
            user_id=1,
            title='Meh',
            description='It was okay, nothing special.',
            rating=2
        ),
        ProductReview(
            product_id=6,
            user_id=2,
            title='Omnificent indeed',
            description='This product does everything it promises.',
            rating=5
        ),
        ProductReview(
            product_id=6,
            user_id=3,
            title='Not for me',
            description='Didn’t really meet my needs.',
            rating=2
        ),
    ]

    db.session.add_all([demo_product_1, demo_product_2, demo_product_3, bills_product_1, bills_product_2, bills_product_3])
    db.session.add_all(demo_reviews)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
