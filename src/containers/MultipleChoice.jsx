import React, { useContext, useState } from "react";
import styles from "@styles/multipleChoice.module.css";
import AppContext from "context/appContext";
const MultipleChoice = ({ settings, levelSettings, type }) => {
  const [options, setOptions] = useState(settings);
  const { addError, addCorrect, addTime } = useContext(AppContext);
  const TIME_TO_ADD = 5;
  const TIME_TO_REMOVE = TIME_TO_ADD * -1;

  const changeState = (text, newState) => {
    setOptions(
      options.map((op) => {
        if (op.text === text) {
          return {
            ...op,
            state: newState,
          };
        } else {
          return {
            ...op,
          };
        }
      })
    );
  };

  const check = (op) => {
    if (op.isCorrect) {
      changeState(op.text, "correct");
      setTimeout(() => {
        if (type === "normal" || type === "tutorial") {
          addCorrect(levelSettings.id);
        } else if (type === "practice") {
          addTime(TIME_TO_ADD);
        }
      }, 500);
    } else {
      changeState(op.text, "incorrect");
      setTimeout(() => {
        changeState(op.text, "unselect");
      }, 300);
      if (type === "normal") {
        addError(levelSettings.id);
      } else if (type === "practice") {
        addTime(TIME_TO_REMOVE);
      }
    }
  };

  return (
    <>
      <div className={styles[type]}>
        {options?.map((op) => {
          return (
            <span
              key={op.text}
              onClick={() => check(op)}
              className={styles[op.state]}
            >
              <span>{op.text}</span>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default MultipleChoice;
