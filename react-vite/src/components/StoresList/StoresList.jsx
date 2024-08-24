import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from "../../redux/stores"
import FilterSearchBar from "../FilterSearchBar"
import StoreCard from "../StoreCard/StoreCard"

const StoresList = () => {
    const dispatch = useDispatch()
    const stores = useSelector(state=>state.stores.allStores)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({})
    const [filteredStores, setFilteredStores] = useState(stores ? Object.values(stores) : [])

    useEffect(() => {
        dispatch(getStores(), "DISPATCH ++++++++++++")
        setFilteredStores(Object.values(stores))
    }, [dispatch])

    useEffect(() => {
        setFilteredStores(Object.values(stores))
    }, [stores])

    useEffect(() => {
        if (!stores.isLoading){
            console.log(search, filteredStores)
            setFilteredStores(
                Object.values(stores).filter(val => val.name.toLowerCase().startsWith(search.toLowerCase()))
            )
        }
    }, [search])

    useEffect(() => {
        if(search){

        }
    }, [filter])



    return (
        <div id="stores-list-cont">
            <FilterSearchBar setSearch={setSearch} setFilter={setFilter} search={search} filter={filter}/>
            {
                !stores.isLoading  ?
                    filteredStores.length > 0 ?
                        filteredStores.map(store=> (

                        store !== 'isLoading' ? <StoreCard store={store} /> : ''
                        ))
                    :
                    <p>No stores found</p>
                :
                <p>loading</p>
            }
        </div>
    )
}

export default StoresList
