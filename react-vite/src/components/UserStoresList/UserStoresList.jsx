import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import './UserStoresList.css'
import { getUserStores } from "../../redux/stores"
import StoresList from "../StoresList/StoresList"


const UserStoresList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserStores())
    }, [dispatch])

    return (
        <div id="users-stores-container">
            <h1>My Stores</h1>
            <StoresList userStore={true} />

        </div>
    )
}

export default UserStoresList
