import React from "react";

const FAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
        <div className="faq-question">
            <h3>{faq.question}</h3>
            <h5>{faq.work}   |  Experience : {faq.exp}</h5>
        </div>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  );
};

export default FAQ;