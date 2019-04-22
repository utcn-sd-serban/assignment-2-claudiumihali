import React from "react";

const QuestionOperations = ( {onAskQuestion, titleFilter, tagFilter, onChangeTitleFilter, onChangeTagFilter} ) => (
    <section className="container" style={{padding: '10px 0px 10px 0px'}}>
        <nav className="level">
            <div className="level-left">
                <div class="level-item">
                    <p class="subtitle is-5">
                        Question filtering:
                    </p>
                </div>
                <div className="level-item">
                    <div className="field has-addons">
                        <p className="control">
                            <input className="input" type="text" placeholder="Filter by title" value={titleFilter}
                                onChange={e => onChangeTitleFilter(e.target.value)} />
                        </p>
                        <p className="control">
                            <button className="button">
                                Search
                            </button>
                        </p>
                    </div>
                </div>
                <div className="level-item">
                    <div className="field has-addons">
                        <p className="control">
                            <input className="input" type="text" placeholder="Filter by tag" value={tagFilter}
                                onChange={e => onChangeTagFilter(e.target.value)} />
                        </p>
                        <p className="control">
                            <button className="button">
                                Search
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className="level-right">
                <button className="button is-info" onClick={() => onAskQuestion()}>Ask a question</button>
            </div>
        </nav>
    </section>
);

export default QuestionOperations;