import { NavLink } from 'react-router-dom'
import './StoreCard.css'
const StoreCard = ({store, userStore}) => {

    return (
        <NavLink to={userStore ? `/stores/${store.id}` : `${store.id}`} className="store-card-container">
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
        </NavLink>
    )
}

export default StoreCard
