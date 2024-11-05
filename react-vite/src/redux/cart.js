/** @format */

const SET_CART = "cart/setCarts";
const ADD_ITEM = "cart/addItem";
const REMOVE_ITEM = "cart/removeCart";
const CLEAR_CART = "cart/clearCart";

const setCart = (payload) => ({
  type: SET_CART,
  payload, //user cart
});

const addItem = (payload) => ({
  type: ADD_ITEM,
  payload, //product
});

const clearCart = () => ({
  type: CLEAR_CART,
});

const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload, //product id
});

export const getUserCart = () => async (dispatch) => {
  const res = await fetch("/api/carts/current");

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setCart({ ...data.cart }));
  }
};

export const addNewStore = (product) => async (dispatch) => {
  const res = await fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addItem(data));
    return data;
  }
};

export const deleteAnItem = (productId) => async (dispatch) => {
  const res = await fetch(`/api/carts/${+storeId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeItem(+productId));
  }
};

export const removeAllItemsFromCart = () => async (dispatch) => {
  const res = await fetch(`/api/carts/clear`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(clearCart());
  }
};

const initialState = {
  cart: {
    isLoading: true,
  },
};

function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: { ...action.payload, isLoading: false } };
    case ADD_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.id]: action.payload,
          isLoading: false,
        },
      };
    case CLEAR_CART:
      return { ...state, cart: { isLoading: false } };
    case REMOVE_ITEM:
      delete state.cart[action.payload];
      return state;
    default:
      return state;
  }
}

export default cartsReducer;
