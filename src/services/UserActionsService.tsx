import axios from 'axios';
import APPCONFIG from '../config/app.config';
import { getCurrentUser } from '../utils/OuthRapper';
import { UserActions } from '../utils/enums/userEnum';

interface userAction {
    action: UserActions;
}

class UserActionsService {
    private reatAPI = 'http://localhost:3000';
    private lastCurrentUser: string = 'Anonymous';

    getUsersActions() {
        return axios
            .get(`${this.reatAPI}/actionLog`)
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => this.handelError(e));
    }

    getUserAction(id: string) {
        return axios.get(`${this.reatAPI}/actionLog/${id}`)
            .then(response => {
                const data = response.data;
                return data;
            })
            .catch(e => this.handelError(e));
    }

    addUserAction({action}: userAction) {
        const currentUser = getCurrentUser();
        let name = (currentUser && currentUser.userData) ? currentUser.userData.username : this.lastCurrentUser;
        if (name) {
            this.lastCurrentUser = name;
            axios.post(`${this.reatAPI}/actionLog/`, {name: name, action})
                .then(response => {
                    const data = response.data;
                    console.log(`%c[Action-log UserActionService] user ${name} -> ${action}`, 'color:#92cacd');
                    return data;
                })
                .catch(e => this.handelError(e));
        }

    }

    deleteUserActions(actionId?: string) {
        const singleAction = actionId ? `${actionId}` : '';
        return axios.delete(`${this.reatAPI}/actionLog/${singleAction}`)
            .then(
    (data: any) => {
                return data;
            },
    (error: any) =>  {
                return error;
            });
    }

    handelError(e: any) {
        const errorCode = e.response.status;
        const errorMsg = e.response.message;
        switch (errorCode) {
            case 401:
                throw new Error('authorization failed ...');
            default:
                throw new Error(errorMsg);
        }

    }
}

export default new UserActionsService();