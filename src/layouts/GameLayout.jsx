import React from "react";
import styles from "@styles/gameLayout.module.css";
import Victory from "@containers/Victory";
import Layout from "./Layout";

const GameLayout = ({ children, settings }) => {
  const layout = settings.isFinalGame
    ? "layout-without-ui"
    : "layout-without-nav";
  return (
    <>
      <Layout type={layout}>
        {settings.isFinalGame ? (
          <Victory settings={settings.others} id={settings.levelId} />
        ) : (
          <div className={styles["game-container"]}>
            <div className={styles["progress-var"]}>
              <div
                style={{ width: `${settings.progress}%` }}
                className={styles["progress"]}
              ></div>
            </div>
            {children}
          </div>
        )}
      </Layout>
    </>
  );
};

export default GameLayout;
