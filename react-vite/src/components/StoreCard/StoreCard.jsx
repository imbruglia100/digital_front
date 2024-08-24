import './StoreCard.css'
const StoreCard = ({store}) => {

    return (
        <div className="store-card-container">
            <div className="store-img-container">
                <div className='banner-container'>
                    <img className="banner" src={store.store_banner_url} />
                </div>
                <div className='store-picture-container'>
                    <img className="store-picture" src={store.store_img_url} />
                </div>
            </div>

            <div className='store-info'>
                {store.name}
                {store.type}
            </div>
        </div>
    )
}

export default StoreCard
