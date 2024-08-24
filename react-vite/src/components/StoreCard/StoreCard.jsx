
const StoreCard = ({store}) => {

    return (
        <div className="store-card-container">
            {store.name}
            <img src={store.store_img_url} />
            {store.type}
        </div>
    )
}

export default StoreCard
