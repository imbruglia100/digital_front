/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterSearchBar from "../FilterSearchBar";
import StoreCard from "../StoreCard/StoreCard";
import "./StoresList.css";
import { NavLink } from "react-router-dom";

const StoresList = ({ userStore }) => {
  const stores = useSelector((state) => state.stores.allStores);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [filteredStores, setFilteredStores] = useState(
    stores ? Object.values(stores) : []
  );

  useEffect(() => {
    if (!stores.isLoading) {
      setFilteredStores(
        Object.values(stores).filter((val) => {
          if (search) {
            return val.name.toLowerCase().startsWith(search.toLowerCase());
          } else {
            return Object.values(stores);
          }
        })
      );
    }
  }, [stores, search]);

  useEffect(() => {
    if (filter) {
      //filter with the selected filter options
    }
  }, [filter]);

  const CreateAStore = () => {
    return (
      <NavLink
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
        className='store-card-container'
        to={"/stores/create"}
      >
        <h1 style={{ color: "#385dff" }}>Create a Store</h1>
      </NavLink>
    );
  };

  return (
    <div id='stores-list-cont'>
      <FilterSearchBar
        setSearch={setSearch}
        setFilter={setFilter}
        search={search}
        filter={filter}
      />
      <div className='list-cards'>
        {!stores.isLoading ? (
          filteredStores.length > 0 ? (
            <>
              {filteredStores.map((store, key) =>
                store !== "isLoading" ? (
                  <StoreCard key={key} userStore store={store} />
                ) : (
                  ""
                )
              )}
              {userStore && <CreateAStore />}
            </>
          ) : (
            <>{userStore ? <CreateAStore /> : <p>No Stores found</p>}</>
          )
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default StoresList;
