import Layout from "layouts/Layout";
import AppContext from "context/appContext";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";

const Home = () => {
    const { state, setTimer } = useContext(AppContext);
    let levelNumber = 0;
  return (
    <>
      <h1>FIRST CONDITIONAL</h1>

      <div className={styles["levels"]}>
        {state.levels.map((level) => {
          const isCompleted = state.completedLevels.some((id)=>id===level?.settings?.id);
          const containerClass = isCompleted
            ? "levelCompleted"
            : "levelIncompleted";
          levelNumber++;
          if (state.user.lives <= 0) {
            var url = "/GetLifes";
          } else if (!isCompleted) {
            var url = `/exercise/${level?.settings?.id}`;
          } else {
            var url = "";
          }
          return (
            <Link href={url}>
              <div
                onClick={() => setTimer()}
                className={styles[containerClass]}
              >
                <div className={styles["level-number"]}>
                  <span>{levelNumber}</span>
                </div>
                <span>{level.settings?.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
