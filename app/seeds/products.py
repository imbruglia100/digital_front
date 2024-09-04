from app.models import db, Product, environment, SCHEMA
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

    db.session.add_all([demo_product_1, demo_product_2, demo_product_3, bills_product_1, bills_product_2, bills_product_3])

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
