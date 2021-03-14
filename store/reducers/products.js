import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.payload.products,
                userProducts: action.payload.userProducts
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.payload),
                availableProducts: state.availableProducts.filter(product => product.id !== action.payload)
            };

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.payload.id,
                action.payload.ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                action.payload.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };

        case UPDATE_PRODUCT:
            //index in userProducts and availableProducts are different. 
            //finding indexes and replacing data with new/updated product
            const productIndex = state.userProducts.findIndex(
                product => product.id === action.payload.id
            );
            const updatedProduct = new Product(
                action.payload.id,
                state.userProducts[productIndex].ownerId,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductsIndex = state.availableProducts.findIndex(
                product => product.id === action.payload.id
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };

    };
    return state;
};