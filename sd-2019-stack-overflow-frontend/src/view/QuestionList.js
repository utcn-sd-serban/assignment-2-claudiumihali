import React from "react";
import QuestionDetails from "./QuestionDetails";

const QuestionList = ( {questions, onUpvoteQuestion, onDownvoteQuestion, onExpandQuestion} ) => (
    <section className="container">
        <div className="box content">
            {
                questions.map((question) => (
                    <QuestionDetails
                        question={question}
                        onUpvoteQuestion={onUpvoteQuestion}
                        onDownvoteQuestion={onDownvoteQuestion}
                        onExpandQuestion={onExpandQuestion}
                    />
                ))
            }
        </div>
    </section>
);

export default QuestionList;