import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTOLOGIN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DID_TRY_AUTOLOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            }
        case AUTHENTICATE:
            return {
                token: action.payload.token,
                userId: action.payload.userId,
                didTryAutoLogin: true
            };
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        default: return state;
    }
};