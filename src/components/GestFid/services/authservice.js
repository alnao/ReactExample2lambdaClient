import axios from 'axios';
import { JWT_AUTH_SERVER } from '../DataConstants.js';
import UserPool from '../Login/UserPool';

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
this.setupAxiosInterceptors(token);
        //this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    clearUserInfo = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");

        if (UserPool.getCurrentUser() != null)
            UserPool.getCurrentUser().signOut();

    }

    getUserInfo = () => sessionStorage.getItem("user");

    isLogged = () => {

        let user = null;

        if (UserPool.getCurrentUser() != null)
            user = UserPool.getCurrentUser().getUsername();

        if (user === null)
            return false;
        else
            return true;
    }

    setupAxiosInterceptors(token) {
console.log("setupAxiosInterceptors ENTRATO");
        axios.interceptors.request.use(
            (config) => {
                if (this.isLogged()) {
console.log("setupAxiosInterceptors SI" + token);
                    config.headers.Authorization = token
                } 

                return config;
            }
        )
    }  

    
}

export default new AuthenticationService()
