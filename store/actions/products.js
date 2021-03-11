import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products.json');
    
            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const responseData = response.json();
            const loadedProducts = [];
    
            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price
                ));
            }
    
            dispatch({
                type: SET_PRODUCTS,
                payload: loadedProducts
            });
        } catch (err) {
            //also can send to some analytics server
            throw err;
        }
    };
}

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch('https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const responseData = response.json();

        dispatch({
            type: CREATE_PRODUCT,
            payload: {
                id: responseData.name,
                title,
                description,
                imageUrl,
                price
            }
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        payload: {
            id,
            title,
            description,
            imageUrl
        }
    }
};