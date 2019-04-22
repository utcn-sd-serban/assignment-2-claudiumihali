import model from "../model/model";

class QuestionListPresenter {
    onSignUpNavbar() {
        model.activateSignUpModal();
    }

    onCloseSignUpModal() {
        model.deactivateSignUpModal();
    }

    onChangeNewSOUserProperty(property, value) {
        model.changeNewSOUserProperty(property, value);
    }

    onCreateAccount() {
        model.addSOUser(model.state.newSOUser.id, model.state.newSOUser.username, model.state.newSOUser.password);
    }

    onLogInNavbar() {
        model.activateLogInModal();
    }

    onCloseLogInModal() {
        model.deactivateLogInModal();
    }

    onChangeLogInSOUserProperty(property, value) {
        model.changeLogInSOUserProperty(property, value);
    }

    onLogIn() {
        if (!model.logIn(model.state.logInSOUser.username, model.state.logInSOUser.password)) {
            window.alert("Invalid credentials!");
        }
    }

    onLogOut() {
        model.logOut();
    }

    onAskQuestion() {
        if (model.state.loggedInUsername === null) {
            window.alert("You must be logged in to ask questions!");
            return;
        }
        model.activateAskQuestionModal();
    }

    onCloseAskQuestionModal() {
        model.deactivateAskQuestionModal();
    }

    onChangeNewQuestionProperty(property, value) {
        model.changeNewQuestionProperty(property, value);
    }

    onChangeNewTag(newValue) {
        model.changeNewTag(newValue);
    }

    onCreateNewTag(newTag) {
        model.addNewTag(newTag);
    }

    onDeleteNewTag(index) {
        model.deleteNewTag(index);
    }

    onCreateQuestion() {
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        model.addQuestion(model.state.newQuestion.id, model.state.loggedInUsername, model.state.newQuestion.title,
            model.state.newQuestion.text, dateTime, model.state.newQuestion.tags, model.state.newQuestion.voteScore);
    }

    onChangeTitleFilter(newValue) {
        model.changeTitleFilter(newValue);
    }

    onChangeTagFilter(newValue) {
        model.changeTagFilter(newValue);
    }
}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;