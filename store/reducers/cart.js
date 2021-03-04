import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.payload;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedNewCartItem;
console.log(state.totalAmount, productPrice)
            //items key - id
            if (state.items[addedProduct.id]) {
                updatedNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantaty + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedNewCartItem = new CartItem(
                    1,
                    productPrice,
                    productTitle,
                    productPrice
                );
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedNewCartItem },
                totalAmount: state.totalAmount + productPrice
            };

    }
    return state;
};