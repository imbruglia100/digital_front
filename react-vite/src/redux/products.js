const SET_PRODUCTS = 'products/setProducts'
const SELECT_PRODUCT = 'products/setSelectedProduct'
const ADD_PRODUCT = 'products/addProduct'
const CLEAR_SELECTED = 'products/clearSelected'
const REMOVE_PRODUCT = 'products/removeProduct'

const setProducts = (payload) => ({
    type: SET_PRODUCTS,
    payload //product
})

const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload //new product
})

const selectProduct = (payload) => ({
    type: SELECT_PRODUCT,
    payload //product
})

export const clearSelected = () => ({
    type: CLEAR_SELECTED
})

const removeProduct = (payload) => ({
    type: REMOVE_PRODUCT,
    payload //product id
})

export const getProducts = () => async (dispatch) => {
    const res = await fetch('/api/products')

    if(res.ok){
        const data = await res.json()

        if (data.errors) {
            console.log("errors")
            return {...data.errors};
        }

        dispatch(setProducts({...data.products}));
    }
}

export const getUserProducts = () => async (dispatch) => {
    const res = await fetch("/api/products/current");

    if (res.ok) {
        const data = await res.json();

        if (data.errors) {
            console.log("errors")
            return {...data.errors};
        }

        dispatch(setProducts({...data.products}));
    }
};

export const getSelectedProduct = (id) => async (dispatch) => {
    const res = await fetch(`/api/products/${id}`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return {...data.errors};
        }

        dispatch(selectProduct({...data}));
    }
};

export const addNewProduct = (newProduct) => async (dispatch) =>{
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return {...data.errors};
        }

        dispatch(addProduct(data))
        return data
    }
}

export const editAProduct = (product) => async (dispatch) =>{
    const res = await fetch(`/api/stores/${+product?.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...product})
    })

    if(res.ok){
        const data = await res.json()

        if(data.errors){
            return {...data.errors};
        }

        dispatch(addProduct(data))
        return data
    }
}

export const deleteAProduct = (productId) => async (dispatch) =>{
    const res = await fetch(`/api/products/${+productId}`, {
        method: "DELETE"
    })

    if(res.ok){
        dispatch(removeProduct(+productId))
    }
}

const initialState = {allProducts: {isLoading: true}, selectedProduct: {isLoading: true}}

function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_PRODUCTS:
        return { ...state, allProducts: {...action.payload} };
      case ADD_PRODUCT:
        return { ...state, allProducts: {...state.allProducts, [action.payload.id]: action.payload, isLoading: false} };
      case SELECT_PRODUCT:
            return { ...state, selectedProduct: {...action.payload, isLoading: false} };
      case CLEAR_SELECTED:
            return {...state, selectedProduct: {} }
      case REMOVE_PRODUCT:
        delete state.allProducts[action.payload]
        return state;
      default:
        return state;
    }
  }

  export default productsReducer;
