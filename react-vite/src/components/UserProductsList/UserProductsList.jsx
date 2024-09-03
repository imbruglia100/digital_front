import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import './UserProductsList.css'
import { Navigate } from "react-router-dom"
import { getUserProducts } from "../../redux/products"
import ProductList from "../ProductList"


const UserProductsList = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)

    useEffect(() => {
        dispatch(getUserProducts())
    }, [dispatch])

    return (
        user ?
        <div id="users-stores-container">
            <h1>My Products</h1>
            <ProductList userProduct={true} />

        </div>
        :
        <Navigate to={'/login'}/>
    )
}

export default UserProductsList
