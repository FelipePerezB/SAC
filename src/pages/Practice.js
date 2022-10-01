import GameSelector from "@components/GameSelector";
import ProgressVar from "@components/ProgressVar";
import Victory from "@containers/Victory";
import Layout from "@layouts/Layout";
import styles from "@styles/practice.module.css";
import AppContext from "context/appContext";
import React, { useContext, useEffect, useState } from "react";

const Practice = () => {
  const { state, setPracticeLevels } = useContext(AppContext);
  let [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  const TOTAL_TIME = 25;
  const leftTime = TOTAL_TIME + state.practice.addedTime - time;
  let progress = (leftTime * 100) / TOTAL_TIME;
  let i = 0;
  const minutes = Math.trunc(leftTime / 60);
  const seconds = leftTime % 60 >= 10 ? leftTime % 60 : `0${leftTime % 60}`;

  useEffect(() => {
    if (i === 0) {
      const levels = getGames();
      setTimeout(() => {
        setPracticeLevels(levels);
      });
      setInterval(() => {
        setTime((time += 1));
      }, 1000);
      i++;
    }
  }, []);

  useEffect(() => {
    if (
      progress > 0 &&
      state?.practice?.levels?.settings?.totalLevels >
        state?.practice?.levels?.settings?.number
    ) {
      const minutes = Math.trunc(time / 60);
      const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
      setFinalTime(`${minutes}:${seconds}`);
    }
  }, [progress]);

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

  const getGames = () => {
    const levels = [];
    state.levels.map((level) =>
      state.completedLevels.forEach((levelCompletedId) => {
        if (levelCompletedId === level.settings.id) {
          levels.push(level);
        }
      })
    );
    const practiceLevels = levels.flatMap((level) => level.levels);
    return {
      settings: {
        id: "HSIXUHXHS",
        totalLevels: practiceLevels.length,
        title: "SH",
        number: 0,
        time: "",
        corrects: 0,
        errors: 0,
      },
      levels: shuffle(practiceLevels),
    };
  };

  return progress > 0 &&
    state?.practice?.levels?.settings?.totalLevels >
      state?.practice?.levels?.settings?.number ? (
    <Layout type="layout-without-nav">
      <div className={styles["game-info"]}>
        <div className={styles["time-left-container"]}>
          <span className={styles["time"]}>{`${minutes}:${seconds}`}</span>
        </div>
        <ProgressVar progress={progress} type={"practice"} />
      </div>
      <GameSelector level={state.practice.levels} type="practice" />
    </Layout>
  ) : (
    <Layout type="layout-without-ui">
      <Victory
        stats={[
          {
            type: "corrects",
            value: state.practice.levels.settings?.corrects,
          },
          {
            type: "errors",
            value: state.practice.levels.settings?.errors,
          },
          {
            type: "time",
            value: finalTime,
          },
        ]}
        title={"PRACTICE IS FINISHED"}
      />
    </Layout>
  );
};

export default Practice;
