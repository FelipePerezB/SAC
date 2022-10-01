import AppContext from "context/appContext";
import { useRouter } from "next/router";
import styles from "@styles/victory.module.css";
import React, { useContext, useEffect, useState } from "react";
import Button from "@components/Button";

const Victory = ({ id, stats, title }) => {
  const { setCompleteLevel, setTimer } = useContext(AppContext);
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => setTime(setTimer(id)));
  }, []);
  const router = useRouter();

  const completeLevel = () => {
    router.push("/");
    setCompleteLevel(id);
  };
  return (
    <div className={styles["container"]}>
      <h2 onClick={() => completeLevel()}>{title}</h2>
      <div className={styles["video-container"]}>
        <video autoPlay loop>
          <source src="/victory.mp4" />
          <source src="/victory.hevc.mp4" />
        </video>
      </div>
      <div className={styles["stats"]}>
        {stats?.map((stat) => {
          if (stat.type === "time" && !stat.value) {
            stat.value = time;
          }
          return (
            <>
              <span className={styles[stat.type]}>
                <span className={styles["text"]}>
                  {stat.type.toUpperCase()}
                </span>
                <span className={styles["number"]}>{stat.value}</span>
              </span>
            </>
          );
        })}
      </div>
      <Button text={"Continue"} type="primary" callback={completeLevel} />
    </div>
  );
};

export default Victory;

