import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Interceptor";

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "Products/fetchAllProducts",
  async () => {
    try {
      const response = await api.get(`/product/fetch-product`);
      console.log("Api response of fetchAllProducts=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in fetchAllProducts", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);
export const fetchSingleProoduct = createAsyncThunk(
  "Products/fetchSingleProoduct",
  async (id) => {
    try {
      const response = await api.get(`/product/fetch-single-product/${id}`);
      console.log("Api response of fetchAllProducts=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in fetchAllProducts", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);
export const updateProduct = createAsyncThunk(
  "Products/updateProduct",
  async (id,requestBody) => {
    try {
      console.log("request body updateProduct=>",id, requestBody);
      const response = await api.put(`/product/update-product/${id}`, requestBody);
      console.log("Api response of updateProduct=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in updateProduct", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);
export const addProducts = createAsyncThunk(
  "Products/addProducts",
  async (formData) => {
    try {
      console.log("request body addProducts=>", formData);
      const response = await api.post(`/product/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Api response of addProducts=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in addProducts", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "Products/fetchAllCategories",
  async () => {
    try {
      const response = await api.get(`/category/fetch-category`);
      console.log("Api response of fetchAllCategories=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in fetchAllCategories", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);

export const addCategory = createAsyncThunk(
  "Products/addCategory",
  async (requestBody) => {
    try {
      console.log("request body addCategory=>", requestBody);
      const response = await api.post(`/category/create-category`, requestBody);
      console.log("Api response of addCategory=>", response.data);
      return response.data; // Ensure you return the fetched data
    } catch (error) {
      console.log("Error in addCategory", error);
      throw error; // It's good practice to rethrow the error to handle it in the reducer
    }
  }
);
const productsSlice = createSlice({
  name: "Products",
  initialState: {
    Products: [],
    product:{},
    categories: [],
    cartProducts: [],
    cartModal: false,
  },
  reducers: {
    setCartModal: (state) => {
      state.cartModal = !state.cartModal;
    },
    setCartProducts: (state, action) => {
      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product._id === action.payload._id
      );
      if (existingProductIndex >= 0) {
        state.cartProducts[existingProductIndex].quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCartProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.cartProducts.find((p) => p._id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.Products = action.payload.products;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload.findCategory;
    });
    builder.addCase(fetchSingleProoduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
    });
  },
});

export const { setCartModal, setCartProducts, updateCartProductQuantity, removeCartProduct } = productsSlice.actions;

export default productsSlice.reducer;
