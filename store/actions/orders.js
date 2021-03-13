import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-617d7-default-rtdb.firebaseio.com/orders/u1.json');
    
            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const responseData = await response.json();
            const loadedOrders = [];
    
            for (const key in responseData) {
                loadedProducts.push(new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ));
            }
    
            dispatch({
                type: SET_ORDERS,
                payload: loadedOrders
            });
        } catch (err) {
            //also can send to some analytics server
            throw err;
        }
        
    };
};

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch('https://rn-shop-app-617d7-default-rtdb.firebaseio.com/orders/u1.json',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        const responseData = response.json();
        
        dispatch({
        type: ADD_ORDER,
        payload: {
            id: responseData.name,
            items: cartItems,
            amount: totalAmount,
            date: date
        }
        });
    };
};