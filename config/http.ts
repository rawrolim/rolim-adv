import axios from "axios"

const http = {
    get: async (uri='', config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getauthorization();
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
                    return e.response;
                }
            }
        }
    },

    post: async (uri='', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = await getauthorization();

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
                    return e.response;
                }
            }
        }
    },

    put: async (uri='', data, config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getauthorization();
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
                    return e.response;
                }
            }
        }
    },

    delete: async (uri='', config = { headers: { authorization: '' } }, instancia = 0) => {
        const authorization = getauthorization();
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
                    return e.response;
                }
            }
        }
    },

}

export default http;

async function refreshAuthorization() {
    const authorization = getauthorization();
    const empresa = JSON.parse(localStorage.getItem('empresa'));
    if (empresa) {
        const email = empresa.email;
        if (authorization) {
            const res = await axios.post('/refresh_authorization',
                {
                    email
                },
                {
                    headers: {
                        authorization
                    }
                }
            );
            localStorage.setItem('authorization', JSON.stringify(res.data));
        }
    } else {
        console.error('A empresa está indefinida.')
    }
}

function getauthorization(){
    let authorizationLocalStorage = localStorage.getItem('authorization');
    if(authorizationLocalStorage){
        return JSON.parse(localStorage.getItem('authorization'));
    }else{
        return process.env.API_KEY;
    }
}
