const SET_STORES = "stores/setStores"
const SELECT_STORE = "stores/setSelectedStore"
const ADD_STORE = "stores/addStore"
const REMOVE_STORE = "stores/removeStore"

const setStores = (payload) => ({
    type: SET_STORES,
    payload //stores
})

const addStore = (payload) => ({
    type: ADD_STORE,
    payload //store
})

const removeStore = (payload) => ({
    type: REMOVE_STORE,
    payload //store id
})

export const getStores = () => async (dispatch) => {
    const res = await fetch("/api/stores");

    if (res.ok) {
        const data = await res.json();
        console.log('Stores:', data);
        if (data.errors) {
            return {...data.errors};
        }

        dispatch(setStores({...data.stores}));
    }
};

export const getSelectedStore = (id) => async (dispatch) => {
    const res = await fetch(`/api/stores/${id}`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return {...data.errors};
        }

        dispatch(setStores({...data}));
    }
};

export const addNewStore = (newStore) => async (dispatch) =>{
    const res = await fetch("/api/stores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStore)
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return {...data.errors};
        }

        dispatch(addStore(data))
    }
}

export const editAStore = (store) => async (dispatch) =>{
    const res = await fetch(`/api/stores/${+store.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...store})
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return {...data.errors};
        }

        dispatch(addStore(data))
    }
}

export const deleteAStore = (storeId) => async (dispatch) =>{
    const res = await fetch(`/api/notebooks/${+storeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: +storeId})
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return;
        }

        dispatch(removeNotebook(data))
    }
}

const initialState = { allStores: { isLoading: true }, selectedStore: { isLoading: true }};

function storesReducer(state = initialState, action) {
    switch (action.type) {
      case SET_STORES:
        return { ...state, allStores: {...action.payload} };
      case ADD_STORE:
        return { ...state, allStores: {...state.allStores, [action.payload.id]: action.payload, isLoading: false} };
      case SELECT_STORE:
            return { ...state, selectedStore: {...action.payload, isLoading: false} };
      case REMOVE_STORE:
        delete state.allStores[action.payload]
        return state;
      default:
        return state;
    }
  }

  export default storesReducer;
