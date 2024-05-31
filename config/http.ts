import axios from "axios"
import { toast } from "react-toastify";

const http = {
    get: async (uri='', config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getAuthorizarion();
        console.log(authorization)
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.get(uri, config);
                return res.data;
            } catch (e) {
                if (e.response.status == 401) {
                    await refreshAuthorization();
                    return http.get(uri, config, instancia + 1);
                } else {
                    toast.error(JSON.parse(e.request.response));
                    return JSON.parse(e.request.response);
                }
            }
        }
    },

    post: async (uri='', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = await getAuthorizarion();

        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.post(uri, data, config);
                return res.data;
            } catch (e) {
                if (e.response.status == 401) {
                    await refreshAuthorization();
                    return http.post(uri, data, config, instancia + 1);
                } else {
                    toast.error(JSON.parse(e.request.response));
                    return JSON.parse(e.request.response);
                }
            }
        }
    },

    put: async (uri='', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.put(uri, data, config);
                return res.data;
            } catch (e) {
                if (e.response.status == 401) {
                    await refreshAuthorization();
                    return http.put(uri, data, config, instancia + 1);
                } else {
                    toast.error(JSON.parse(e.request.response));
                    return JSON.parse(e.request.response);
                }
            }
        }
    },

    delete: async (uri='', config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.delete(uri, config);
                return res.data;
            } catch (e) {
                if (e.response.status == 401) {
                    await refreshAuthorization();
                    return http.delete(uri, config, instancia + 1);
                } else {
                    toast.error(JSON.parse(e.request.response));
                    return JSON.parse(e.request.response);
                }
            }
        }
    },
}

export default http;

async function refreshAuthorization() {
    const authorization = getAuthorizarion();
    if (authorization) {
        const res = await axios.get('/api/refreshToken',
            {
                headers: {
                    authorization
                }
            }
        );
        localStorage.setItem('authorization', JSON.stringify(res.data.jwtToken));
    }
}

function getAuthorizarion(){
    let authorizationLocalStorage = localStorage.getItem('authorization');
    if(authorizationLocalStorage){
        authorizationLocalStorage = JSON.parse(authorizationLocalStorage)
        if(authorizationLocalStorage){
            return JSON.parse(localStorage.getItem('authorization'));
        }
    }   
    return process.env.API_KEY;
}
