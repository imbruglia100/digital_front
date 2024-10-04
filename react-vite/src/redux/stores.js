/** @format */

const SET_STORES = "stores/setStores";
const SELECT_STORE = "stores/setSelectedStore";
const ADD_STORE = "stores/addStore";
const ADD_REVIEW = "stores/addReview";
const CLEAR_SELECTED = "stores/clearSelected";
const REMOVE_STORE = "stores/removeStore";

const setStores = (payload) => ({
  type: SET_STORES,
  payload, //stores
});

const addStore = (payload) => ({
  type: ADD_STORE,
  payload, //store
});

const addStoreReview = (payload) => ({
  type: ADD_REVIEW,
  payload, //review
});

const selectStore = (payload) => ({
  type: SELECT_STORE,
  payload, //store
});

export const clearSelected = () => ({
  type: CLEAR_SELECTED,
});

const removeStore = (payload) => ({
  type: REMOVE_STORE,
  payload, //store id
});

export const getStores = () => async (dispatch) => {
  const res = await fetch("/api/stores");

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setStores({ ...data.stores }));
  }
};

export const getUserStores = () => async (dispatch) => {
  const res = await fetch("/api/stores/current");

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(setStores({ ...data.stores }));
  }
};

export const getSelectedStore = (id) => async (dispatch) => {
  const res = await fetch(`/api/stores/${id}`);

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(selectStore({ ...data }));
  }
};

export const addNewStore = (newStore) => async (dispatch) => {
  const res = await fetch("/api/stores", {
    method: "POST",
    body: newStore,
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addStore(data));
    return data;
  }
};

export const addNewStoreReview = (review) => async (dispatch) => {
  const res = await fetch("/api/stores/reviews", {
    method: "POST",
    body: review,
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addStoreReview(data));
    return data;
  }
};

export const editAStore = (store) => async (dispatch) => {
  const res = await fetch(`/api/stores/${+store?.id}`, {
    method: "PUT",
    body: store,
  });

  if (res.ok) {
    const data = await res.json();

    if (data.errors) {
      return { ...data.errors };
    }

    dispatch(addStore(data));
    return data;
  }
};

export const deleteAStore = (storeId) => async (dispatch) => {
  const res = await fetch(`/api/stores/${+storeId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeStore(+storeId));
  }
};

const initialState = {
  allStores: { isLoading: true },
  selectedStore: { isLoading: true },
};

function storesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STORES:
      return { ...state, allStores: { ...action.payload } };
    case ADD_STORE:
      return {
        ...state,
        allStores: {
          ...state.allStores,
          [action.payload.id]: action.payload,
          isLoading: false,
        },
      };
    case SELECT_STORE:
      return {
        ...state,
        selectedStore: { ...action.payload, isLoading: false },
      };
    case ADD_REVIEW:
      return {
        ...state,
        selectedStore: {
          ...state.selectedStore,
          Reviews: {
            ...state.selectedStore.Reviews,
            [action.payload.id]: action.payload,
          },
        },
      };
    case CLEAR_SELECTED:
      return { ...state, selectedStore: {} };
    case REMOVE_STORE:
      delete state.allStores[action.payload];
      return state;
    default:
      return state;
  }
}

export default storesReducer;
