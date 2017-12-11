import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
    
} from './types'
import { Location } from 'expo'
import axios from 'axios'
import qs from 'qs'

const JOB_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
// const JOB_QUERY_PARAMS = `publisher=4201738803816157&format=json&l=${l}&v=2&co=ID`
const JOB_QUERY_PARAMS = {
    key: 'AIzaSyC3A2qW3Hfqj4HF-V0rEmfY3eIvkBw09MI',
    
    radius: 500
}

const buildJobsUrl = (location, keyword) => {
    const params = qs.stringify({ 
        ...JOB_QUERY_PARAMS, 
        location: `${location.latitude},${location.longitude}`,
        keyword: keyword
    })
    console.log(JOB_ROOT_URL + params);
    return JOB_ROOT_URL + params;
}
//fetch indeed API
export const fetchJobs = (region, keyword, callback) => {
    
    return async (dispatch) => {
        try {
        const location = region;
        const url = buildJobsUrl(location, keyword)
        console.log(location, keyword)

        const { data } = await axios.get(url);
        console.log(data)
        dispatch({
            type: FETCH_JOBS,
            payload: data
        })
        callback()
        
        console.log(data)
        } catch (error) {
            console.log(error)
        }
            
        
    }
}

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    }
}