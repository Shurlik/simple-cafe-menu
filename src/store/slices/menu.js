import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    category: 1,
    isModalOpen: false,
    isModalMenuOpen: false,
    categoryList: [],
    announcement: "",
    loading: true,
    showMenu: true,
    isOrdering: true,
    locale: "ua", // ua / en
    favorites: [],
    cart: [],
  },
  // here we add reducers or our state
  reducers: {
    // functions here is like an actions for our redux
    setMenuItems(state, action) {
      state.menuItems = action.payload;
    },
    selectCategory(state, action) {
      state.category = action.payload;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleMenuModal(state) {
      state.isModalMenuOpen = !state.isModalMenuOpen;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAnnouncement(state, action) {
      state.announcement = action.payload;
    },
    setCategories(state, action) {
      state.categoryList = action.payload;
    },
    setLocale(state, action) {
      state.locale = action.payload;
    },
    setShowMenu(state, action) {
      state.showMenu = action.payload;
    },
    setIsOrdering(state, action) {
      state.isOrdering = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
      localStorage.setItem("favs", JSON.stringify(action.payload));
    },
    setCart(state, action) {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
  },
});

export default menuSlice.reducer;
// we exported actions from Reducers path
export const {
  setMenuItems,
  selectCategory,
  toggleModal,
  toggleMenuModal,
  setLoading,
  setAnnouncement,
  setCategories,
  setLocale,
  setShowMenu,
  setFavorites,
  setCart,
  setIsOrdering,
} = menuSlice.actions;
