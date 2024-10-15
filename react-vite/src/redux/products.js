/** @format */

const SET_PRODUCTS = "products/setProducts";
const SELECT_PRODUCT = "products/setSelectedProduct";
const ADD_PRODUCT = "products/addProduct";
const ADD_REVIEW = "products/addReview";
const REMOVE_REVIEW = "products/removeReview";
const CLEAR_SELECTED = "products/clearSelected";
const REMOVE_PRODUCT = "products/removeProduct";

const setProducts = (payload) => ({
  type: SET_PRODUCTS,
  payload, //product
});

const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload, //new product
});

const addProductReview = (payload) => ({
  type: ADD_REVIEW,
  payload, //new review
});

const removeProductReview = (payload) => ({
  type: ADD_PRODUCT,
  payload, //review id
});

const selectProduct = (payload) => ({
  type: SELECT_PRODUCT,
  payload, //product
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

const removeProduct = (payload) => ({
  type: REMOVE_PRODUCT,
  payload, //product id
});

export const getProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setProducts({ ...data.products }));
  }
};

export const getUserProducts = () => async (dispatch) => {
  const res = await fetch("/api/products/current");

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setProducts({ ...data.products }));
  }
};

export const getProductsByStoreId = (storeId) => async (dispatch) => {
  const res = await fetch(`/api/stores/${storeId}/products`);

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setProducts({ ...data.products }));
  }
};

export const getSelectedProduct = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`);

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(selectProduct({ ...data }));
  }
};

export const addNewProductReview = (review) => async (dispatch) => {
  const res = await fetch("/api/products/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addProductReview(data));
    return data;
  }
};

export const updateProductReview = (review) => async (dispatch) => {
  const res = await fetch(`/api/products/reviews/${+review.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addProductReview(data));
    return data;
  }
};

export const deleteProductReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/products/reviews/${+reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeProductReview(+reviewId));
  }
};

export const addNewProduct = (newProduct) => async (dispatch) => {
  const res = await fetch("/api/products", {
    method: "POST",
    body: newProduct,
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addProduct(data));
    return data;
  }
};

export const editAProduct = (productData) => async (dispatch) => {
  const productId = productData.get('id');

  const res = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    body: productData,
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(addProduct(data));
    return data;
  } else {
    console.error('Error response:', data);
    return { errors: data.errors || { _error: 'Failed to update product' } };
  }
};

export const deleteAProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${+productId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeProduct(+productId));
  }
};

const initialState = {
  allProducts: { isLoading: true },
  selectedProduct: { isLoading: true },
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, allProducts: { ...action.payload } };
    case ADD_PRODUCT:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.payload.id]: action.payload,
          isLoading: false,
        },
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: { ...action.payload, isLoading: false },
      };
    case CLEAR_SELECTED:
      return { ...state, selectedProduct: {} };
    case ADD_REVIEW:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          Reviews: {
            ...state.selectedProduct.Reviews,
            [action.payload.id]: action.payload,
          },
        },
      };
    case REMOVE_REVIEW:
      delete state.selectedProduct.Reviews[action.payload];
      return state;
    case REMOVE_PRODUCT:
      const newProducts = { ...state.allProducts };
      delete newProducts[action.payload];
      return { ...state, allProducts: newProducts };
    default:
      return state;
  }
}

export default productsReducer;
