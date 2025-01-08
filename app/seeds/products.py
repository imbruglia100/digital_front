from app.models import db, Product, ProductReview ,environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    # Artisan Corner (store_id=1) products
    pottery_vase = Product(
        store_id=1,
        title='Handcrafted Ceramic Vase',
        description='Unique stoneware vase, hand-thrown and glazed in earthy tones. Perfect for fresh or dried flower arrangements.',
        price=89.99,
        stock_amount=15,
        product_img='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61'
    )

    woven_blanket = Product(
        store_id=1,
        title='Artisanal Wool Throw Blanket',
        description='Hand-woven wool blanket featuring traditional patterns in natural dyes.',
        price=129.99,
        stock_amount=20,
        product_img='https://images.unsplash.com/photo-1612375689547-b5c6169949c3'
    )

    # Vintage Vault (store_id=2) products
    vintage_camera = Product(
        store_id=2,
        title='1960s Polaroid Camera',
        description='Fully restored vintage Polaroid camera. Perfect working condition with original leather case.',
        price=175.00,
        stock_amount=5,
        product_img='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'
    )

    retro_radio = Product(
        store_id=2,
        title='Mid-Century Radio',
        description='Restored 1950s tabletop radio. Beautiful wood finish with modern bluetooth capability added.',
        price=225.00,
        stock_amount=3,
        product_img='https://images.unsplash.com/photo-1601067475897-bdf75f3fa8f6'
    )

    # Tech Haven (store_id=3) products
    gaming_keyboard = Product(
        store_id=3,
        title='RGB Mechanical Keyboard',
        description='Professional gaming keyboard with custom switches and programmable RGB lighting.',
        price=159.99,
        stock_amount=30,
        product_img='https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
    )

    wireless_earbuds = Product(
        store_id=3,
        title='Pro Wireless Earbuds',
        description='High-fidelity wireless earbuds with active noise cancellation and 24-hour battery life.',
        price=199.99,
        stock_amount=45,
        product_img='https://images.unsplash.com/photo-1590658268037-6bf12165a8df'
    )

    # Green Thumb Gardens (store_id=4) products
    succulent_set = Product(
        store_id=4,
        title='Rare Succulent Collection',
        description='Set of 5 rare succulents in handcrafted ceramic pots. Perfect for any window sill.',
        price=49.99,
        stock_amount=25,
        product_img='https://images.unsplash.com/photo-1459411552884-841db9b3cc2a'
    )

    garden_tools = Product(
        store_id=4,
        title='Premium Garden Tool Set',
        description='Professional-grade garden tools including pruners, trowel, and cultivator.',
        price=79.99,
        stock_amount=20,
        product_img='https://images.unsplash.com/photo-1617576683096-00fc8eecb3af'
    )

    # The Pantry (store_id=5) products
    olive_oil = Product(
        store_id=5,
        title='Artisanal Olive Oil Set',
        description='Collection of three premium extra virgin olive oils from small Italian producers.',
        price=65.00,
        stock_amount=30,
        product_img='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5'
    )

    cheese_board = Product(
        store_id=5,
        title='Curated Cheese Board',
        description='Selection of four artisanal cheeses with paired preserves and crackers.',
        price=89.99,
        stock_amount=15,
        product_img='https://images.unsplash.com/photo-1631379645473-5d2451c321c5'
    )

    # Pawsome Pets (store_id=6) products
    cat_tree = Product(
        store_id=6,
        title='Modern Cat Tower',
        description='Sleek, modern cat tower with scratching posts and cozy hideaways.',
        price=149.99,
        stock_amount=10,
        product_img='https://images.unsplash.com/photo-1545249390-6bdfa286032f'
    )

    dog_bed = Product(
        store_id=6,
        title='Orthopedic Pet Bed',
        description='Memory foam dog bed with washable cover, perfect for pets of all sizes.',
        price=89.99,
        stock_amount=25,
        product_img='https://images.unsplash.com/photo-1581888227599-779811939961'
    )

    db.session.add_all([
        pottery_vase, woven_blanket,
        vintage_camera, retro_radio,
        gaming_keyboard, wireless_earbuds,
        succulent_set, garden_tools,
        olive_oil, cheese_board,
        cat_tree, dog_bed
    ])

    # ... add reviews here ...
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
