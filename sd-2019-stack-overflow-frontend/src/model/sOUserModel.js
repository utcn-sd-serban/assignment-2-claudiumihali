import { EventEmitter } from "events";

const createSOUser = (id, username, password) => (
    {id, username, password}
)

class SOUserModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            sOUsers: [
                createSOUser(1, "u1", "u1"),
                createSOUser(2, "u2", "u2")
            ],
            newSOUser: createSOUser(3, "", ""),
            logInSOUser: createSOUser(-1, "", ""),
            loggedInUsername: null,
            signUpModalActive: false,
            logInModalActive: false
        };
    }

    activateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: true
        };
        this.emit("SOUserModelChange", this.state);
    }

    deactivateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
    }

    changeNewSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            newSOUser: {
                ...this.state.newSOUser,
                [property]: value
            }
        };
        this.emit("SOUserModelChange", this.state);
    }

    addSOUser(id, username, password) {
        this.state = {
            ...this.state,
            sOUsers: this.state.sOUsers.concat([createSOUser(id, username, password)]),
            newSOUser: createSOUser(id + 1, "", ""),
            signUpModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
    }

    activateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: true
        };
        this.emit("SOUserModelChange", this.state);
    }

    deactivateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
    }

    changeLogInSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            logInSOUser: {
                ...this.state.logInSOUser,
                [property]: value
            }
        };
        this.emit("SOUserModelChange", this.state);
    }

    logIn(username, password) {
        var sOUser = this.state.sOUsers.find(sou => sou.username === username && sou.password === password);
        if (!sOUser)
            return false;
        this.state = {
            ...this.state,
            newSOUser: createSOUser(this.state.sOUsers.length + 1, "", ""),
            logInSOUser: createSOUser(-1, "", ""),
            loggedInUsername: sOUser.username,
            logInModalActive: false
        };
        this.emit("SOUserModelChange", this.state);
        return true;
    }

    logOut() {
        this.state = {
            ...this.state,
            loggedInUsername: null
        }
        this.emit("SOUserModelChange", this.state);
    }
}

const sOUserModel = new SOUserModel();

export default sOUserModel;