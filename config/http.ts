import axios from "axios"
import { toast } from "react-toastify";

const http = {
    get: async (uri = '', config = { headers: { authorization: '' } }, instancia = 0) => {
        const loading = toast.loading("Carregando...");
        const authorization = getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.get(uri, config);
                toast.dismiss({ 'containerId': loading });
                return res.data;
            } catch (e) {
                if (e.response) {
                    if (e.response.status == 401) {
                        await refreshAuthorization();
                        return http.get(uri, config, instancia + 1);
                    } else {
                        toast.dismiss({ 'containerId': loading });
                        toast.error(JSON.parse(e.request.response));
                    }
                } else {
                    toast.dismiss({ 'containerId': loading });
                    toast.error(e.toString());
                }
            }
        }
    },

    post: async (uri = '', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const loading = toast.loading("Carregando...");
        const authorization = await getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.post(uri, data, config);
                toast.dismiss({ 'containerId': loading });
                return res.data;
            } catch (e) {
                if (e.response) {
                    if (e.response.status == 401) {
                        await refreshAuthorization();
                        return http.post(uri, data, config, instancia + 1);
                    } else {
                        toast.dismiss({ 'containerId': loading });
                        toast.error(JSON.parse(e.request.response));
                    }
                } else {
                    toast.dismiss({ 'containerId': loading });
                    toast.error(e.toString());
                }
            }
        }
    },

    put: async (uri = '', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const loading = toast.loading("Carregando...");
        const authorization = getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.put(uri, data, config);
                toast.dismiss({ 'containerId': loading });
                return res.data;
            } catch (e) {
                if (e.response) {
                    if (e.response.status == 401) {
                        await refreshAuthorization();
                        return http.put(uri, data, config, instancia + 1);
                    } else {
                        toast.dismiss({ 'containerId': loading });
                        toast.error(JSON.parse(e.request.response));
                    }
                } else {
                    toast.dismiss({ 'containerId': loading });
                    toast.error(e.toString());
                }
            }
        }
    },

    delete: async (uri = '', config = { headers: { authorization: '' } }, instancia = 0) => {
        const loading = toast.loading("Carregando...");
        const authorization = getAuthorizarion();
        if (authorization && instancia < 2) {
            config.headers.authorization = authorization;
            try {
                const res = await axios.delete(uri, config);
                toast.dismiss({ 'containerId': loading });
                return res.data;
            } catch (e) {
                if (e.response) {
                    if (e.response.status == 401) {
                        await refreshAuthorization();
                        return http.delete(uri, config, instancia + 1);
                    } else {
                        toast.dismiss({ 'containerId': loading });
                        toast.error(JSON.parse(e.request.response));
                    }
                } else {
                    toast.dismiss({ 'containerId': loading });
                    toast.error(e.toString());
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

function getAuthorizarion() {
    let authorizationLocalStorage = localStorage.getItem('authorization');
    if (authorizationLocalStorage) {
        authorizationLocalStorage = JSON.parse(authorizationLocalStorage)
        if (authorizationLocalStorage) {
            return JSON.parse(localStorage.getItem('authorization'));
        }
    }
    return process.env.API_KEY;
}
