import React, {Component} from "react";
import sOUserModel from "../model/sOUserModel";
import questionModel from "../model/questionModel";
import questionListPresenter from "../presenter/questionListPresenter";
import navbarPresenter from "../presenter/navbarPresenter";
import QuestionList from "./QuestionList";
import NavbarNotLoggedIn from "./NavbarNotLoggedIn";
import NavbarLoggedIn from "./NavbarLoggedIn";
import SignUpModal from "./SignUpModal";
import LogInModal from "./LogInModal";
import QuestionOperations from "./QuestionOperations";
import AskQuestionModal from "./AskQuestionModal";
import Footer from "./Footer";

const mapModelStateToComponentState = (questionModelState, sOUserModelState) => (
    {
        questions: questionModelState.questions,
        askQuestionModalActive: questionModelState.askQuestionModalActive,
        newQuestion: questionModelState.newQuestion,
        newTag: questionModelState.newTag,
        titleFilter: questionModelState.titleFilter,
        tagFilter: questionModelState.tagFilter,
        loggedInUsername: sOUserModelState.loggedInUsername,
        signUpModalActive: sOUserModelState.signUpModalActive,
        newSOUserUsername: sOUserModelState.newSOUser.username,
        newSOUserPassword: sOUserModelState.newSOUser.password,
        logInModalActive: sOUserModelState.logInModalActive,
        logInSOUserUsername: sOUserModelState.logInSOUser.username,
        logInSOUserPassword: sOUserModelState.logInSOUser.password
    }
);

export default class SmartQuestionList extends Component {
    constructor() {
        super();
        this.state = mapModelStateToComponentState(questionModel.state, sOUserModel.state);
        this.listener = () => this.setState(mapModelStateToComponentState(questionModel.state, sOUserModel.state));
        questionModel.addListener("QuestionModelChange", this.listener);
        sOUserModel.addListener("SOUserModelChange", this.listener);
    }

    componentWillUnmount() {
        questionModel.removeListener("QuestionModelChange", this.listener);
        sOUserModel.removeListener("SOUserModelChange", this.listener);
    }

    render() {
        return (
            <div>
                {
                    this.state.loggedInUsername === null
                        ?
                        <NavbarNotLoggedIn
                            onSignUpNavbar={navbarPresenter.onSignUpNavbar}
                            onLogInNavbar={navbarPresenter.onLogInNavbar}
                        />
                        :
                        <NavbarLoggedIn
                            loggedInUsername={this.state.loggedInUsername}
                            onLogOut={navbarPresenter.onLogOut}
                        />
                }
                {
                    this.state.signUpModalActive === true
                        ?
                        <SignUpModal
                            signUpModalClass="modal is-active"
                            onCloseSignUpModal={navbarPresenter.onCloseSignUpModal}
                            username={this.state.newSOUserUsername}
                            password={this.state.newSOUserPassword}
                            onChangeNewSOUserProperty={navbarPresenter.onChangeNewSOUserProperty}
                            onCreateAccount={navbarPresenter.onCreateAccount}
                        />
                        :
                        <SignUpModal signUpModalClass="modal" />
                }
                {
                    this.state.logInModalActive === true
                        ?
                        <LogInModal
                            logInModalClass="modal is-active"
                            onCloseLogInModal={navbarPresenter.onCloseLogInModal}
                            username={this.state.logInSOUserUsername}
                            password={this.state.logInSOUserPassword}
                            onChangeLogInSOUserProperty={navbarPresenter.onChangeLogInSOUserProperty}
                            onLogIn={navbarPresenter.onLogIn}
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
                <QuestionList
                    questions={this.state.questions}
                    onUpvoteQuestion={questionListPresenter.onUpvoteQuestion}
                    onDownvoteQuestion={questionListPresenter.onDownvoteQuestion}
                />
                <Footer />
            </div>
        );
    }
}