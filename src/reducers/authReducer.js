import { 
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAIL,
    LOG_OUT
} from '../actions/types'

const INITIAL_STATE = {
    token: ''
}
export default auth = (state = INITIAL_STATE, action) => {
    console.log(action.type)
    switch (action.type) {
        case FB_LOGIN_SUCCESS:
            return { ...state, token: action.payload }
        case FB_LOGIN_FAIL:
            return { ...state, token: null }
        case LOG_OUT:
            return { ...state, token: null}
        default:
            return state
    }
}