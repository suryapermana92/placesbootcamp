import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo'
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, LOG_OUT } from './types'


export const facebookLogin = () => {
    console.log('facebook Login')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('fb_token')
            if(token) {
                console.log('ada token')
                // go to mainscreen
                dispatch({
                    type: FB_LOGIN_SUCCESS,
                    payload: token
                })
            } else {
                console.log('do facebook Login')
                // do fb login
                doFacebookLogin(dispatch);
         }
    }
}

const doFacebookLogin = async (dispatch) => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('135080223863063', {
        permissions: ['public_profile']
    })

    if (type === 'cancel') {
        return dispatch ({
            type: FB_LOGIN_FAIL
        })
    }
    alert('Login Success')
    console.log(token)

    await AsyncStorage.setItem('fb_token', token)

    dispatch({
        type: FB_LOGIN_SUCCESS,
        payload: token
    })
}

export const logOut = (callback) => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('fb_token')
        dispatch({
            type: LOG_OUT
        })

        callback()
    }
}