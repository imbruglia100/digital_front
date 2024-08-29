import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import './AllProductsList.css'
import { getProducts } from "../../redux/products"
import ProductList from "../ProductList"


const AllProductsList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <ProductList />
        </>
    )
}

export default AllProductsList
