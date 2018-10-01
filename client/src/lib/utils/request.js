import axios from 'axios';

const parseJSON = (response) => {
    return response.json();
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    throw error;
}

export default async (url, options) => {
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