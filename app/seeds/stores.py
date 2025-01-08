from app.models import db, Store, StoreReview, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stores():
    artisan_crafts = Store(
        owner_id=1,
        name='Artisan Corner',
        description='Handcrafted pottery, textiles, and unique artisanal pieces from local creators.',
        type='Arts & Crafts',
        store_img_url='https://images.unsplash.com/photo-1493106641515-6b5631de4bb9',
        store_banner_url='https://images.unsplash.com/photo-1461887046916-c7426e65460d'
    )

    vintage_finds = Store(
        owner_id=2,
        name='Vintage Vault',
        description='Curated collection of vintage clothing, accessories, and rare collectibles from the 50s to 90s.',
        type='Vintage & Antiques',
        store_img_url='https://images.unsplash.com/photo-1445966275305-9806327ea2b5',
        store_banner_url='https://images.unsplash.com/photo-1459908676235-d5f02a50184b'
    )

    tech_hub = Store(
        owner_id=3,
        name='Tech Haven',
        description='Latest gadgets, custom PC builds, and expert tech repair services all under one roof.',
        type='Electronics',
        store_img_url='https://images.unsplash.com/photo-1591405351990-4726e331f141',
        store_banner_url='https://images.unsplash.com/photo-1518770660439-4636190af475'
    )

    garden_center = Store(
        owner_id=1,
        name='Green Thumb Gardens',
        description='Everything for your garden - from rare plants to premium tools and expert advice.',
        type='Home & Garden',
        store_img_url='https://images.unsplash.com/photo-1463936575829-25148e1db1b8',
        store_banner_url='https://images.unsplash.com/photo-1585320806297-9794b3e4eeae'
    )

    gourmet_market = Store(
        owner_id=2,
        name='The Pantry',
        description='Specialty foods, local delicacies, and imported gourmet ingredients for food enthusiasts.',
        type='Food & Beverage',
        store_img_url='https://images.unsplash.com/photo-1509440159596-0249088772ff',
        store_banner_url='https://images.unsplash.com/photo-1482275548304-a58859dc31b7'
    )

    pet_boutique = Store(
        owner_id=3,
        name='Pawsome Pets',
        description='Premium pet supplies, organic treats, and stylish accessories for your furry friends.',
        type='Pets',
        store_img_url='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        store_banner_url='https://images.unsplash.com/photo-1450778869180-41d0601e046e'
    )

    # Reviews for Artisan Corner (store_id=1)
    review1 = StoreReview(
        store_id=1,
        user_id=2,
        title="Exceptional Handcrafted Items",
        description="Every piece in this store tells a story. The pottery collection is outstanding, and the artisans clearly take pride in their work.",
        rating=5
    )

    review2 = StoreReview(
        store_id=1,
        user_id=4,
        title="Beautiful Local Crafts",
        description="Love supporting local artists through this store. The quality is exceptional, though prices are a bit high.",
        rating=4
    )

    review3 = StoreReview(
        store_id=1,
        user_id=7,
        title="Hidden Gem for Gifts",
        description="Perfect place to find unique gifts. The staff is knowledgeable about each artist's work.",
        rating=5
    )

    # Reviews for Vintage Vault (store_id=2)
    review4 = StoreReview(
        store_id=2,
        user_id=1,
        title="Time Machine Experience",
        description="Walking in here is like stepping back in time. Amazing collection of authentic vintage pieces!",
        rating=5
    )

    review5 = StoreReview(
        store_id=2,
        user_id=3,
        title="Vintage Fashion Paradise",
        description="Incredible selection of vintage clothing. Everything is in great condition and reasonably priced.",
        rating=4
    )

    review6 = StoreReview(
        store_id=2,
        user_id=8,
        title="Nostalgic Treasures",
        description="Found some amazing pieces from the 60s. The owner really knows their vintage items.",
        rating=5
    )

    # Reviews for Tech Haven (store_id=3)
    review7 = StoreReview(
        store_id=3,
        user_id=2,
        title="Tech Expert's Paradise",
        description="Best tech repair service in town. Staff really knows their stuff and prices are fair.",
        rating=5
    )

    review8 = StoreReview(
        store_id=3,
        user_id=5,
        title="Great Custom Builds",
        description="Had my gaming PC built here. Excellent service and competitive prices on components.",
        rating=5
    )

    review9 = StoreReview(
        store_id=3,
        user_id=6,
        title="Reliable Tech Support",
        description="Always my go-to for tech issues. They're honest about repairs and don't oversell.",
        rating=4
    )

    # Reviews for Green Thumb Gardens (store_id=4)
    review10 = StoreReview(
        store_id=4,
        user_id=4,
        title="Plant Lover's Dream",
        description="Amazing selection of rare plants and the staff really knows their plant care!",
        rating=5
    )

    review11 = StoreReview(
        store_id=4,
        user_id=7,
        title="Expert Garden Advice",
        description="The team here helped me completely transform my garden. Great selection of tools and plants.",
        rating=5
    )

    review12 = StoreReview(
        store_id=4,
        user_id=1,
        title="Quality Garden Supplies",
        description="High-quality tools and plants. Staff is always willing to share gardening tips.",
        rating=4
    )

    # Reviews for The Pantry (store_id=5)
    review13 = StoreReview(
        store_id=5,
        user_id=5,
        title="Foodie Heaven",
        description="The selection of imported cheeses and specialty ingredients is outstanding!",
        rating=5
    )

    review14 = StoreReview(
        store_id=5,
        user_id=8,
        title="Gourmet Paradise",
        description="Love their curated selection of local and imported goods. Great for gift baskets!",
        rating=5
    )

    review15 = StoreReview(
        store_id=5,
        user_id=3,
        title="Amazing Selection",
        description="Best place for hard-to-find ingredients. The olive oil tasting station is fantastic!",
        rating=4
    )

    # Reviews for Pawsome Pets (store_id=6)
    review16 = StoreReview(
        store_id=6,
        user_id=6,
        title="Best Pet Store Ever",
        description="High-quality products and the staff clearly loves animals. Great advice on pet care!",
        rating=5
    )

    review17 = StoreReview(
        store_id=6,
        user_id=2,
        title="Quality Pet Supplies",
        description="Love their selection of natural pet foods and eco-friendly toys.",
        rating=4
    )

    review18 = StoreReview(
        store_id=6,
        user_id=8,
        title="Pet Paradise",
        description="My dogs love their treats from here! Staff is super knowledgeable about pet nutrition.",
        rating=5
    )

    db.session.add_all([
        artisan_crafts, vintage_finds, tech_hub, garden_center, gourmet_market, pet_boutique,
        review1, review2, review3, review4, review5, review6,
        review7, review8, review9, review10, review11, review12,
        review13, review14, review15, review16, review17, review18
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
