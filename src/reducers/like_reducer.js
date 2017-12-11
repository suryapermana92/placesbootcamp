import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';


const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedJobs || INITIAL_STATE;
        case LIKE_JOB:
        console.log('job liked');
        const newState = _.uniqBy(
            [...state, action.payload], 'id'
        )
            const message = newState.length === state.length
                            ? 'Place Already Saved Before'
                            : 'Place Like Success';
                            // return [ ...state, action.payload ];
            alert(message);
            return newState;
        case CLEAR_LIKED_JOBS:
            return INITIAL_STATE;
        default:
            return state;
    }
}