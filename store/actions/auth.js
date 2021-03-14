import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expirationDate) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationDate));
        dispatch({
            type: AUTHENTICATE,
            payload: {
                token,
                userId
            }});
    };
};

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

        if (!response.ok) {
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

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000).toISOString();

        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
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

        if (!response.ok) {
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

        dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000).toISOString();

        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationDate => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout);
        }, expirationDate);
    }
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expirationDate: expirationDate
    }));
};