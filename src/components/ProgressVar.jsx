import React from "react";
import styles from "@styles/progressvar.module.css";

const ProgressVar = ({ progress, type, cb }) => {
  let progressWidth = type === "levels" ? progress : cb();
  return (
    <div className={styles[type]}>
      <div
        style={{ width: `${progressWidth}%` }}
        className={styles["progress"]}
      >
        <div className={styles["progress-decoration"]}></div>
      </div>
    </div>
  );
};

export default ProgressVar;
