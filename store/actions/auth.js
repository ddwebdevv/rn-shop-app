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
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch({
            type: SIGNUP
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
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch({
            type: LOGIN
        });
    };
};