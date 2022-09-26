import AppContext from "context/appContext";
import { useRouter } from "next/router";
import styles from "@styles/victory.module.css";
import React, { useContext, useEffect, useState } from "react";

const Victory = ({ id, settings }) => {
  const { setCompleteLevel, setTimer } = useContext(AppContext);
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => setTime(setTimer(id)));
  });
  const router = useRouter();

  const completeLevel = () => {
    setCompleteLevel(id);
    router.push("/");
  };
  return (
    <div className={styles["container"]}>
      <h2 onClick={() => completeLevel()}>¡NIVEL COMPLETADO!</h2>
      <div className={styles["video-container"]}>
        <video autoPlay loop>
          <source src="/victory.mp4" />
        </video>
      </div>
      <div className={styles["stats"]}>
        <div>
          <span className={styles["errors"]}>
            <span className={styles["text"]}>ERRORES</span>
            <span className={styles["number"]}>{settings.errors}</span>
          </span>
          <span className={styles["corrects"]}>
            <span className={styles["text"]}>CORRECTAS</span>
            <span className={styles["number"]}>{settings.corrects}</span>
          </span>
        </div>
        <span className={styles["time"]}>
          <span className={styles["text"]}>TIEMPO</span>
          <span className={styles["number"]}>{time}</span>
        </span>
      </div>
      <div
        onClick={() => {
          completeLevel();
        }}
        className={styles["button"]}
      >
        <span>Continuar</span>
      </div>
    </div>
  );
};

export default Victory;
//
