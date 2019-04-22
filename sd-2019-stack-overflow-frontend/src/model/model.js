import { EventEmitter } from "events";

const createQuestion = (id, author, title, text, creationDateTime, tags, voteScore) => (
    {id, author, title, text, creationDateTime, tags, voteScore}
)

const createSOUser = (id, username, password) => (
    {id, username, password}
)

class Model extends EventEmitter {
    constructor() {
        super();
        this.state = {
            questions: [
                createQuestion(1, "u1", "Question 1", "Question 1", "11/11/11 11:11:11", ["tag1", "tag2"], 1),
                createQuestion(2, "u2", "Question 2", "Question 2", "11/11/11 11:11:11", ["tag1"], -3),
                createQuestion(3, "u1", "Question 3", "Question 3", "11/11/11 11:11:11", ["tag3"], 7)
            ],
            newQuestion: createQuestion(4, "", "", "", "", [], 0),
            newTag: "",
            titleFilter: "",
            tagFilter: "",
            sOUsers: [
                createSOUser(1, "u1", "u1"),
                createSOUser(2, "u2", "u2")
            ],
            newSOUser: createSOUser(3, "", ""),
            logInSOUser: createSOUser(-1, "", ""),
            loggedInUsername: null,
            signUpModalActive: false,
            logInModalActive: false,
            askQuestionModalActive: false
        };
    }

    activateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: true
        };
        this.emit("change", this.state);
    }

    deactivateSignUpModal() {
        this.state = {
            ...this.state,
            signUpModalActive: false
        };
        this.emit("change", this.state);
    }

    changeNewSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            newSOUser: {
                ...this.state.newSOUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    addSOUser(id, username, password) {
        this.state = {
            ...this.state,
            sOUsers: this.state.sOUsers.concat([createSOUser(id, username, password)]),
            newSOUser: createSOUser(id + 1, "", ""),
            signUpModalActive: false
        };
        this.emit("change", this.state);
    }

    activateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: true
        };
        this.emit("change", this.state);
    }

    deactivateLogInModal() {
        this.state = {
            ...this.state,
            logInModalActive: false
        };
        this.emit("change", this.state);
    }

    changeLogInSOUserProperty(property, value) {
        this.state = {
            ...this.state,
            logInSOUser: {
                ...this.state.logInSOUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
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
        this.emit("change", this.state);
        return true;
    }

    logOut() {
        this.state = {
            ...this.state,
            loggedInUsername: null
        }
        this.emit("change", this.state);
    }

    activateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: true
        };
        this.emit("change", this.state);
    }

    deactivateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: false
        };
        this.emit("change", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeNewTag(newValue) {
        this.state = {
            ...this.state,
            newTag: newValue
        };
        this.emit("change", this.state);
    }

    addNewTag(newTag) {
        if (newTag === "") {
            return;
        }
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                tags: this.state.newQuestion.tags.concat([newTag])
            },
            newTag: ""
        };
        this.emit("change", this.state);
    }

    deleteNewTag(index) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                tags: this.state.newQuestion.tags.filter(t => t !== this.state.newQuestion.tags[index])
            }
        };
        this.emit("change", this.state);
    }

    addQuestion(id, author, title, text, creationDateTime, tags, voteScore) {
        this.state = {
            ...this.state,
            questions: [createQuestion(id, author, title, text, creationDateTime, tags, voteScore)].concat(this.state.questions),
            newQuestion: createQuestion(id + 1, "", "", "", "", [], 0),
            askQuestionModalActive: false
        };
        this.emit("change", this.state);
    }

    changeTitleFilter(newValue) {
        this.state = {
            ...this.state,
            titleFilter: newValue
        };
        this.emit("change", this.state);
    }

    changeTagFilter(newValue) {
        this.state = {
            ...this.state,
            tagFilter: newValue
        };
        this.emit("change", this.state);
    }
}

const model = new Model();

export default model;