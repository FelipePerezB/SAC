import ProgressVar from "@components/ProgressVar";
import Layout from "@layouts/Layout";
import styles from "@styles/practice.module.css";
import React from "react";

const Practice = () => {
  const addTime = () => {
    return 90;
  };

  return (
    <Layout type="layout-without-nav">
      <div className={styles["game-info"]}>
        <div className={styles["left-game"]}>
          <span></span>
        </div>
        <ProgressVar type={"practice"} cb={addTime} />
      </div>
    </Layout>
  );
};

export default Practice;
