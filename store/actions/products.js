import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch('https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products.json');
    
            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const responseData = await response.json();
            const loadedProducts = [];
    
            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    responseData[key].ownerId,
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price
                ));
            }
            const userProducts = loadedProducts.filter(product => product.ownerId === userId);
    
            dispatch({
                type: SET_PRODUCTS,
                payload: {
                    products: loadedProducts,
                    userProducts: userProducts
                }
            });
        } catch (err) {
            //also can send to some analytics server
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_PRODUCT,
            payload: productId
        });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
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
                price,
                ownerId: userId
            }
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    //thunk with second argument gives us access to redux state
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        //for auth we need to add ?auth=[token]
        await fetch(`https://rn-shop-app-617d7-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH', //patch will update it where it needed
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });
        dispatch({
            type: UPDATE_PRODUCT,
            payload: {
                id,
                title,
                description,
                imageUrl
            }
        });
    };
};