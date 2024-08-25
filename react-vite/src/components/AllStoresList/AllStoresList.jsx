import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import './AllStoresList.css'
import { getStores } from "../../redux/stores"
import StoresList from "../StoresList/StoresList"


const AllStoresList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStores())
    }, [dispatch])

    return (
        <>
            <StoresList />
        </>
    )
}

export default AllStoresList
