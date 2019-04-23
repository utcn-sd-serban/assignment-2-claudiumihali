import sOUserModel from "../model/sOUserModel";
import questionModel from "../model/questionModel";

class QuestionListPresenter {
    onAskQuestion() {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to ask questions!");
            return;
        }
        questionModel.activateAskQuestionModal();
    }

    onCloseAskQuestionModal() {
        questionModel.deactivateAskQuestionModal();
    }

    onChangeNewQuestionProperty(property, value) {
        questionModel.changeNewQuestionProperty(property, value);
    }

    onChangeNewTag(newValue) {
        questionModel.changeNewTag(newValue);
    }

    onCreateNewTag(newTag) {
        questionModel.addNewTag(newTag);
    }

    onDeleteNewTag(index) {
        questionModel.deleteNewTag(index);
    }

    onCreateQuestion() {
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        questionModel.addQuestion(questionModel.state.newQuestion.id, sOUserModel.state.loggedInUsername,
            questionModel.state.newQuestion.title, questionModel.state.newQuestion.text, dateTime,
            questionModel.state.newQuestion.tags, questionModel.state.newQuestion.voteScore);
    }

    onChangeTitleFilter(newValue) {
        questionModel.changeTitleFilter(newValue);
    }

    onChangeTagFilter(newValue) {
        questionModel.changeTagFilter(newValue);
    }

    onUpvoteQuestion(questionId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote questions!");
            return;
        }
        questionModel.upvoteQuestion(questionId);
    }

    onDownvoteQuestion(questionId) {
        if (sOUserModel.state.loggedInUsername === null) {
            window.alert("You must be logged in to vote questions!");
            return;
        }
        questionModel.downvoteQuestion(questionId);
    }
}

const questionListPresenter = new QuestionListPresenter();

export default questionListPresenter;