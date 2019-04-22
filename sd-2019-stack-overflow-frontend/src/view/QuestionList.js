import React from "react";
import QuestionDetails from "./QuestionDetails";

const QuestionList = ( {questions} ) => (
    <section className="container">
        <div className="box content">
            {
                questions.map((question) => (
                    <QuestionDetails question={question}/>
                ))
            }
        </div>
    </section>
);

export default QuestionList;