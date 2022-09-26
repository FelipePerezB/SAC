import React, { useContext, useState } from "react";
import styles from "@styles/multipleChoice.module.css";
import AppContext from "context/appContext";
const MultipleChoice = ({ settings, levelSettings }) => {
  const [options, setOptions] = useState(settings);
  const { addError, addCorrect } = useContext(AppContext);

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
        addCorrect(levelSettings.id);
      }, 500);
    } else {
      changeState(op.text, "incorrect");
      setTimeout(() => {
        changeState(op.text, "unselect");
      }, 1000);
      addError(levelSettings.id);
    }
  };

  return (
    <>
      <div className={styles["options"]}>
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
