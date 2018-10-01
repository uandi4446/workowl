import axios from 'axios';

const parseJSON = (response) => {
    return response.json();
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }

    const error = new Error(response.statusText);
    throw error;
}

export default async (url, options) => {
    console.log(localStorage.getItem('access-token'));
    if (localStorage.getItem('access-token')) {
        console.log("access-token");
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
    }

    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
    try {
        let response = await axios(url, options);
        return checkStatus(response);
    } catch (error) {
        let err = error.response.data.message;
        throw { 
            status: err.status,
            code: err.code || '',
            message: err.message
         };
    }
}