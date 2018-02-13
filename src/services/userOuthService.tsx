import axios from 'axios';
import APPCONFIG from '../config/app.config';

class UserOuthService {
    private reatAPI = 'http://localhost:3000';
    private cUser = {};

    userLogin(username: string, password: string) {
        return axios
            .post(`${this.reatAPI}/users/login`, {username, password})
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch((e: ErrorEvent) => {
                throw new Error('user loain filed : ' + e.message);
            });
    }

    getUserData(userId: string) {
        return axios
            .get(`${this.reatAPI}/users/${userId}`)
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => {
                throw new Error('get User error ' + e);
            });
    }

    // todo : check if user can accsess this ...
    getAllUsers() {
        return axios
            .get(`${this.reatAPI}/users/`)
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => {
                throw new Error(e);
            });
    }

    addUser(username: string, password: string, type: string) {
        return axios
            .post(`${this.reatAPI}/users/singup`, {username, password, type})
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => {
                throw new Error('get User error ' + e);
            });
    }

    editUser(id: string, username: string, password: string, type: string) {
        return axios
            .put(`${this.reatAPI}/users/${id}`, {username, password, type})
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => {
                throw new Error('edit User error ' + e);
            });
    }

    deleteUser(userId: string) {
        return axios
            .delete(`${this.reatAPI}/users/${userId}`)
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => {
                throw new Error('get User error ' + e);
            });
    }


    private parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}

export default new UserOuthService();
