import './FilterSearchBar.css'

const FilterSearchBar = ({setFilter, setSearch, search, filter}) => {

    return (
        <div id="filter-search-bar">
            <button className="filter-btn navlink">Filter</button>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search..." />
        </div>
    )
}

export default FilterSearchBar
