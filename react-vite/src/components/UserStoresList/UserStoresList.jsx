import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import './UserStoresList.css'
import { getUserStores } from "../../redux/stores"
import StoresList from "../StoresList/StoresList"
import { Navigate } from "react-router-dom"


const UserStoresList = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)

    useEffect(() => {
        dispatch(getUserStores())
    }, [dispatch])

    return (
        user ?
        <div id="users-stores-container">
            <h1>My Stores</h1>
            <StoresList userStore={true} />

        </div>
        :
        <Navigate to={'/login'}/>
    )
}

export default UserStoresList
