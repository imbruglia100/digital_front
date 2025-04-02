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
        product_img='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61',
        markdown='## Handcrafted Ceramic Vase\nThis unique vase is a work of art, hand-thrown and glazed in earthy tones, making it a perfect addition to any home decor. Ideal for displaying fresh or dried flowers.\n\n**Price**: $89.99'
    )

    woven_blanket = Product(
        store_id=1,
        title='Artisanal Wool Throw Blanket',
        description='Hand-woven wool blanket featuring traditional patterns in natural dyes.',
        price=129.99,
        stock_amount=20,
        product_img='https://images.unsplash.com/photo-1612375689547-b5c6169949c3',
        markdown='## Artisanal Wool Throw Blanket\nThis hand-woven blanket is crafted with care using traditional patterns and natural dyes. It is perfect for adding warmth and texture to any living space.\n\n**Price**: $129.99'
    )

    vintage_camera = Product(
        store_id=2,
        title='1960s Polaroid Camera',
        description='Fully restored vintage Polaroid camera. Perfect working condition with original leather case.',
        price=175.00,
        stock_amount=5,
        product_img='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
        markdown='## 1960s Polaroid Camera\nStep back in time with this fully restored vintage Polaroid camera. In perfect working condition, it comes with the original leather case and is perfect for capturing memories.\n\n**Price**: $175.00'
    )

    retro_radio = Product(
        store_id=2,
        title='Mid-Century Radio',
        description='Restored 1950s tabletop radio. Beautiful wood finish with modern bluetooth capability added.',
        price=225.00,
        stock_amount=3,
        product_img='https://images.unsplash.com/photo-1601067475897-bdf75f3fa8f6',
        markdown='## Mid-Century Radio\nThis restored 1950s tabletop radio combines vintage aesthetics with modern technology. Featuring a beautiful wood finish and bluetooth capability for streaming your favorite music.\n\n**Price**: $225.00'
    )

    # Tech Haven (store_id=3) products
    gaming_keyboard = Product(
        store_id=3,
        title='RGB Mechanical Keyboard',
        description='Professional gaming keyboard with custom switches and programmable RGB lighting.',
        price=159.99,
        stock_amount=30,
        product_img='https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
        markdown='## RGB Mechanical Keyboard\nEnhance your gaming experience with this RGB mechanical keyboard. Featuring custom switches and programmable RGB lighting, it offers both performance and style.\n\n**Price**: $159.99'
    )

    wireless_earbuds = Product(
        store_id=3,
        title='Pro Wireless Earbuds',
        description='High-fidelity wireless earbuds with active noise cancellation and 24-hour battery life.',
        price=199.99,
        stock_amount=45,
        product_img='https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
        markdown='## Pro Wireless Earbuds\nImmerse yourself in high-fidelity sound with these wireless earbuds, featuring active noise cancellation and up to 24 hours of battery life.\n\n**Price**: $199.99'
    )

    # Green Thumb Gardens (store_id=4) products
    succulent_set = Product(
        store_id=4,
        title='Rare Succulent Collection',
        description='Set of 5 rare succulents in handcrafted ceramic pots. Perfect for any window sill.',
        price=49.99,
        stock_amount=25,
        product_img='https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
        markdown='## Rare Succulent Collection\nBring some greenery into your home with this collection of 5 rare succulents, each one planted in a beautifully handcrafted ceramic pot. A perfect addition to any windowsill.\n\n**Price**: $49.99'
    )

    garden_tools = Product(
        store_id=4,
        title='Premium Garden Tool Set',
        description='Professional-grade garden tools including pruners, trowel, and cultivator.',
        price=79.99,
        stock_amount=20,
        product_img='https://images.unsplash.com/photo-1617576683096-00fc8eecb3af',
        markdown='## Premium Garden Tool Set\nThis professional-grade garden tool set includes pruners, a trowel, and a cultivator, perfect for tending to your garden with precision.\n\n**Price**: $79.99'
    )

    # The Pantry (store_id=5) products
    olive_oil = Product(
        store_id=5,
        title='Artisanal Olive Oil Set',
        description='Collection of three premium extra virgin olive oils from small Italian producers.',
        price=65.00,
        stock_amount=30,
        product_img='https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
        markdown='## Artisanal Olive Oil Set\nExperience the taste of Italy with this collection of three premium extra virgin olive oils, sourced from small family producers. Perfect for cooking or finishing dishes.\n\n**Price**: $65.00'
    )

    cheese_board = Product(
        store_id=5,
        title='Curated Cheese Board',
        description='Selection of four artisanal cheeses with paired preserves and crackers.',
        price=89.99,
        stock_amount=15,
        product_img='https://images.unsplash.com/photo-1631379645473-5d2451c321c5',
        markdown='## Curated Cheese Board\nEnjoy a selection of four artisanal cheeses paired with preserves and crackers. A perfect gift for any foodie or for your next gathering.\n\n**Price**: $89.99'
    )

    # Pawsome Pets (store_id=6) products
    cat_tree = Product(
        store_id=6,
        title='Modern Cat Tower',
        description='Sleek, modern cat tower with scratching posts and cozy hideaways.',
        price=149.99,
        stock_amount=10,
        product_img='https://images.unsplash.com/photo-1545249390-6bdfa286032f',
        markdown='## Modern Cat Tower\nGive your feline friend a stylish place to play and relax with this modern cat tower, featuring scratching posts and cozy hideaways.\n\n**Price**: $149.99'
    )

    dog_bed = Product(
        store_id=6,
        title='Orthopedic Pet Bed',
        description='Memory foam dog bed with washable cover, perfect for pets of all sizes.',
        price=89.99,
        stock_amount=25,
        product_img='https://images.unsplash.com/photo-1581888227599-779811939961',
        markdown='## Orthopedic Pet Bed\nGive your pet the comfort they deserve with this orthopedic dog bed, made with memory foam and a washable cover. Perfect for dogs of all sizes.\n\n**Price**: $89.99'
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
