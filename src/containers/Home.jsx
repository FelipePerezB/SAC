import AppContext from "context/appContext";
import Link from "next/link";
import { useContext } from "react";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { state, setTimer } = useContext(AppContext);
  let levelNumber = 0;
  return (
    <>
      <h1>FIRST CONDITIONAL</h1>

      <div className={styles["levels"]}>
        {state.levels.map((level) => {
          const isCompleted = state.completedLevels.some(
            (id) => id === level?.settings?.id
          );
          const containerClass = isCompleted
            ? "levelCompleted"
            : "levelIncompleted";
          levelNumber++;
          var url = "";
          if (state.user.lives <= 0) {
            url = "/GetLifes";
          } else if (!isCompleted) {
            url = `/exercise/${level?.settings?.id}`;
          } else {
            url = "";
          }
          return (
            <Link key={levelNumber} href={url}>
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
