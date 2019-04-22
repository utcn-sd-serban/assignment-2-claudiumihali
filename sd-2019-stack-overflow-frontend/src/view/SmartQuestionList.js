import React, {Component} from "react";
import model from "../model/model";
import QuestionList from "./QuestionList";
import NavbarNotLoggedIn from "./NavbarNotLoggedIn";
import NavbarLoggedIn from "./NavbarLoggedIn";
import SignUpModal from "./SignUpModal";
import questionListPresenter from "../presenter/QuestionListPresenter";
import LogInModal from "./LogInModal";
import QuestionOperations from "./QuestionOperations";
import AskQuestionModal from "./AskQuestionModal";

const mapModelStateToComponentState = modelState => (
    {
        questions: modelState.questions,
        loggedInUsername: modelState.loggedInUsername,
        signUpModalActive: modelState.signUpModalActive,
        newSOUserUsername: modelState.newSOUser.username,
        newSOUserPassword: modelState.newSOUser.password,
        logInModalActive: modelState.logInModalActive,
        logInSOUserUsername: modelState.logInSOUser.username,
        logInSOUserPassword: modelState.logInSOUser.password,
        askQuestionModalActive: modelState.askQuestionModalActive,
        newQuestion: modelState.newQuestion,
        newTag: modelState.newTag,
        titleFilter: modelState.titleFilter,
        tagFilter: modelState.tagFilter
    }
);

export default class SmartQuestionList extends Component {
    constructor() {
        super();
        this.state = mapModelStateToComponentState(model.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        model.addListener("change", this.listener);
    }

    componentWillUnmount() {
        model.removeListener("change", this.listener);
    }

    render() {
        return (
            <div>
                {
                    this.state.loggedInUsername === null
                        ?
                        <NavbarNotLoggedIn
                            onSignUpNavbar={questionListPresenter.onSignUpNavbar}
                            onLogInNavbar={questionListPresenter.onLogInNavbar}
                        />
                        :
                        <NavbarLoggedIn
                            loggedInUsername={this.state.loggedInUsername}
                            onLogOut={questionListPresenter.onLogOut}
                        />
                }
                {
                    this.state.signUpModalActive === true
                        ?
                        <SignUpModal
                            signUpModalClass="modal is-active"
                            onCloseSignUpModal={questionListPresenter.onCloseSignUpModal}
                            username={this.state.newSOUserUsername}
                            password={this.state.newSOUserPassword}
                            onChangeNewSOUserProperty={questionListPresenter.onChangeNewSOUserProperty}
                            onCreateAccount={questionListPresenter.onCreateAccount}
                        />
                        :
                        <SignUpModal signUpModalClass="modal" />
                }
                {
                    this.state.logInModalActive === true
                        ?
                        <LogInModal
                            logInModalClass="modal is-active"
                            onCloseLogInModal={questionListPresenter.onCloseLogInModal}
                            username={this.state.logInSOUserUsername}
                            password={this.state.logInSOUserPassword}
                            onChangeLogInSOUserProperty={questionListPresenter.onChangeLogInSOUserProperty}
                            onLogIn={questionListPresenter.onLogIn}
                        />
                        :
                        <LogInModal logInModalClass="modal" />
                }
                {
                    this.state.askQuestionModalActive === true
                        ?
                        <AskQuestionModal
                            askQuestionModalClass="modal is-active"
                            onCloseAskQuestionModal={questionListPresenter.onCloseAskQuestionModal}
                            newQuestion={this.state.newQuestion}
                            newTag={this.state.newTag}
                            onChangeNewQuestionProperty={questionListPresenter.onChangeNewQuestionProperty}
                            onChangeNewTag={questionListPresenter.onChangeNewTag}
                            onCreateNewTag={questionListPresenter.onCreateNewTag}
                            onDeleteNewTag={questionListPresenter.onDeleteNewTag}
                            onCreateQuestion={questionListPresenter.onCreateQuestion}
                        />
                        :
                        <AskQuestionModal askQuestionModalClass="modal" newQuestion={this.state.newQuestion} />
                }
                <QuestionOperations
                    onAskQuestion={questionListPresenter.onAskQuestion}
                    titleFilter={this.state.titleFilter}
                    tagFilter={this.state.tagFilter}
                    onChangeTitleFilter={questionListPresenter.onChangeTitleFilter}
                    onChangeTagFilter={questionListPresenter.onChangeTagFilter}
                />
                <QuestionList questions={this.state.questions} />
            </div>
        );
    }
}