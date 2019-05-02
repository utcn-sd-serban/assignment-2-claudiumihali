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
            appliedTagFilters: [],
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

    clearTitleFilter() {
        this.state = {
            ...this.state,
            titleFilter: ""
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

    filterByTag() {
        this.state = {
            ...this.state,
            appliedTagFilters: this.state.appliedTagFilters.concat([this.state.tagFilter]),
            tagFilter: ""
        };
        this.emit("QuestionModelChange", this.state);
    }

    clearFilterByTag(index) {
        this.state = {
            ...this.state,
            appliedTagFilters: this.state.appliedTagFilters.filter(t => t !== this.state.appliedTagFilters[index])
        };
        this.emit("QuestionModelChange", this.state);
    }

    upvoteQuestion(questionId) {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === questionId ? {...q, voteScore: q.voteScore + 1} : q)
        };
        this.emit("QuestionModelChange", this.state);
    }

    downvoteQuestion(questionId) {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === questionId ? {...q, voteScore: q.voteScore - 1} : q)
        };
        this.emit("QuestionModelChange", this.state);
    }

    activateEditQuestionModal(question) {
        this.state = {
            ...this.state,
            newQuestion: {...question},
            askQuestionModalActive: true
        }
        this.emit("QuestionModelChange", this.state);
    }

    editQuestion() {
        this.state = {
            ...this.state,
            questions: this.state.questions.map(q => q.id === this.state.newQuestion.id ? {...this.state.newQuestion} : q),
            newQuestion: createQuestion(this.state.questions[this.state.questions.length - 1].id + 1, "", "", "", "", [], 0),
            askQuestionModalActive: false
        }
        this.emit("QuestionModelChange", this.state);
    }
}

const questionModel = new QuestionModel();

export default questionModel;