import React from "react";
import styles from "@styles/progressvar.module.css";

const ProgressVar = ({ progress, type }) => {
  return (
    <div className={styles[type]}>
      <div
        style={{ width: `${progress}%` }}
        className={styles["progress"]}
      >
        <div className={styles["progress-decoration"]}></div>
      </div>
    </div>
  );
};

export default ProgressVar;
