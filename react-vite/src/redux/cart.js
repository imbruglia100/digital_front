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

    dispatch(setCart({ ...data.cart_items }));
  }
};

export const addToCart =
  (productId, quantity = 1) =>
  async (dispatch) => {
    try {
      const res = await fetch(`/api/carts/add/${+productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.errors) {
          return { ...data.errors };
        }
        await dispatch(addItem(data));
        return data;
      } else {
        const errorData = await res.json();
        return errorData;
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      return { errors: ["An error occurred while adding to cart"] };
    }
  };

export const deleteAnItem = (cartItemId) => async (dispatch) => {
  const res = await fetch(`/api/carts/remove/${+cartItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeItem(+cartItemId));
    await dispatch(getUserCart());
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
  isLoading: true,
};

function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload, isLoading: false };
    case ADD_ITEM:
      return {
        ...state,
        [action.payload.id]: action.payload,
        isLoading: false,
      };
    case CLEAR_CART:
      return { ...state, isLoading: false };
    case REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

export default cartsReducer;
