import React, { useContext, useEffect, useState } from "react";
import styles from "@styles/pairedTerms.module.css";
import AppContext from "context/appContext";
const PairedTerms = ({ settings, levelSettings }) => {
  const { changeLevel, addError, addCorrect } = useContext(AppContext);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState(settings);
  const [pair, setPair] = useState({
    answer: null,
    option: null,
  });

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const check = (setData, array, array_key, pair_key, newState) => {
    setTimeout(() => {
      setData(
        array.map((e) => {
          if (e[array_key] === pair[pair_key] && e.state !== "correct") {
            if (newState === "incorrect" && array_key === "answer") {
              setTimeout(() => {
                addError(levelSettings.id);
              });
            }
            return {
              ...e,
              state: newState,
            };
          } else {
            return {
              ...e,
            };
          }
        })
      );
    });
  };

  const checkSelected = (setData, array) => {
    const selected = array.findIndex((e) => e.state === "select");
    if (selected !== -1) {
      setTimeout(() => {
        setData(
          array.map((e) => {
            if (array[selected] === e) {
              return {
                ...e,
                state: "unselect",
              };
            } else {
              return {
                ...e,
              };
            }
          })
        );
      });
    }
  };

  useEffect(() => {
    const answersList = options.map((op) => {
      return {
        text: op.answer,
        answer: op.text,
        state: op.state,
      };
    });
    setAnswers(shuffle(answersList));
  }, []);

  useEffect(() => {
    if (pair.answer && pair.option) {
      if (pair.answer === pair.option) {
        check(setOptions, options, "answer", "answer", "correct");
        check(setAnswers, answers, "text", "option", "correct");
        setTimeout(() => {
          const win = options.filter((e) => e.state !== "correct");
          if (win.length <= 1) {
            setTimeout(() => {
              changeLevel(levelSettings.id);
            });
            setTimeout(() => {
              addCorrect(levelSettings.id);
            });
          }
        });
      } else {
        check(setOptions, options, "answer", "option", "incorrect");
        check(setAnswers, answers, "text", "answer", "incorrect");
        setTimeout(() => {
          check(setOptions, options, "answer", "option", "unselect");
          check(setAnswers, answers, "text", "answer", "unselect");
        }, 1500);
      }
      setPair({
        answer: null,
        option: null,
      });
    } else {
      if (pair.option) {
        check(setOptions, options, "answer", "option", "select");
        checkSelected(setOptions, options);
      } else if (pair.answer) {
        check(setAnswers, answers, "text", "answer", "select");
        checkSelected(setAnswers, answers);
      }
    }
  }, [pair]);

  return (
    <>
      <div className={styles["table"]}>
        <div className={styles["options"]}>
          {options.map((op) => {
            return (
              <span
                key={op.text}
                className={styles[op.state]}
                onClick={() => setPair({ ...pair, option: op.answer })}
              >
                <span>{op.text}</span>
              </span>
            );
          })}
        </div>
        <div className={styles["answers"]}>
          {answers.map((ans) => {
            return (
              <span
                key={ans.text}
                className={styles[ans.state]}
                onClick={() => setPair({ ...pair, answer: ans.text })}
              >
                <span>{ans.text}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PairedTerms;
