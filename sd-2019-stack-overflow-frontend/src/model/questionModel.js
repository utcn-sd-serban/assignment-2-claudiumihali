import { EventEmitter } from "events";

const createQuestion = (id, author, title, text, creationDateTime, tags, voteScore) => (
    {id, author, title, text, creationDateTime, tags, voteScore}
)

class QuestionModel extends EventEmitter {
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
            askQuestionModalActive: false
        };
    }

    activateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: true
        };
        this.emit("QuestionModelChange", this.state);
    }

    deactivateAskQuestionModal() {
        this.state = {
            ...this.state,
            askQuestionModalActive: false
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeNewTag(newValue) {
        this.state = {
            ...this.state,
            newTag: newValue
        };
        this.emit("QuestionModelChange", this.state);
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
        this.emit("QuestionModelChange", this.state);
    }

    deleteNewTag(index) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                tags: this.state.newQuestion.tags.filter(t => t !== this.state.newQuestion.tags[index])
            }
        };
        this.emit("QuestionModelChange", this.state);
    }

    addQuestion(id, author, title, text, creationDateTime, tags, voteScore) {
        this.state = {
            ...this.state,
            questions: [createQuestion(id, author, title, text, creationDateTime, tags, voteScore)].concat(this.state.questions),
            newQuestion: createQuestion(id + 1, "", "", "", "", [], 0),
            askQuestionModalActive: false
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeTitleFilter(newValue) {
        this.state = {
            ...this.state,
            titleFilter: newValue
        };
        this.emit("QuestionModelChange", this.state);
    }

    changeTagFilter(newValue) {
        this.state = {
            ...this.state,
            tagFilter: newValue
        };
        this.emit("QuestionModelChange", this.state);
    }

    upvoteQuestion(questionId) {
        var questions = [...this.state.questions];
        var question = questions.find(q => q.id === questionId);
        question.voteScore++;
        this.state = {
            ...this.state,
            questions: questions
        }
        this.emit("QuestionModelChange", this.state);
    }

    downvoteQuestion(questionId) {
        var questions = [...this.state.questions];
        var question = questions.find(q => q.id === questionId);
        question.voteScore--;
        this.state = {
            ...this.state,
            questions: questions
        }
        this.emit("QuestionModelChange", this.state);
    }
}

const questionModel = new QuestionModel();

export default questionModel;