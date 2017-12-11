import { combineReducers } from 'redux'
import auth from './authReducer'
import jobs from './job_reducer'
import likedJobs from './like_reducer'

export default combineReducers ({
    auth,
    jobs,
    likedJobs

})