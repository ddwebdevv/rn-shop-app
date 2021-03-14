export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDv5zKf75iD17LFgz51akwiGGgQVscZjuw',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok) {
            const errorRes = await response.json();
            const errorId = errorRes.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email already registered';
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch({
            type: SIGNUP,
            payload: {
                token: responseData.idToken,
                userId: responseData.localId
            }
        });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDv5zKf75iD17LFgz51akwiGGgQVscZjuw',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok) {
            const errorRes = await response.json();
            const errorId = errorRes.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Email and password do not match';
            }
            throw new Error(message);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch({
            type: LOGIN,
            payload: {
                token: responseData.idToken,
                userId: responseData.localId
            }
        });
    };
};