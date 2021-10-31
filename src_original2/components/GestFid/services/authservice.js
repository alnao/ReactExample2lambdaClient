import axios from 'axios';
import { JWT_AUTH_SERVER } from '../DataConstants.js';

class AuthenticationService {

    state = {
        Server: JWT_AUTH_SERVER
    }

    authUser = (username,password) => {
        return axios.get(`${this.state.Server}${this.state.BaseUrl}/auth`,
        {
            headers: {authorization: this.createBasicAuthHeader(username,password)}
        });
    }

    jwtAuthUser = (username,password) => {
        return axios.post(`${this.state.Server}/auth`,
        {
            username,
            password
        });
    }

    createBasicAuthHeader = (username,password) => 'Basic ' + window.btoa(username + ":" + password);

    createJwtAuthToken = (token) => 'Bearer ' + token;

    saveUserInfo = (username, token) => {
        sessionStorage.setItem("user",username);
        sessionStorage.setItem("token",token);

        //this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    clearUserInfo = () => {
        sessionStorage.removeItem("user");
    }

    getUserInfo = () => sessionStorage.getItem("user");

    isLogged = () => {

        let user = this.getUserInfo();

        if (user === null)
            return false;
        else
            return true;
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isLogged()) {
                    config.headers.authorization = token
                } 

                return config;
            }
        )
    }  

    
}

export default new AuthenticationService()