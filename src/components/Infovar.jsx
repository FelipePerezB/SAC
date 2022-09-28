import AppContext from "context/appContext";
import React, { useContext } from "react";
import styles from "@styles/infovar.module.css";
import Image from "next/image";
import avatar from "@assets/avatar.svg";
const Infovar = ({ type = "infovar" }) => {
  const { state } = useContext(AppContext);
  return (
    <div className={styles[type]}>
      <div className={styles["infovar-elements"]}>
        <div className={styles["avatar"]}>
          <Image alt="duck-avatar" src={avatar} />
        </div>
        <div className={styles["lives"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              stroke="black"
              fill="#F85555"
            >
              <path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1Z" />
            </svg>
          <span>{state?.user?.lives}</span>
        </div>
      </div>
    </div>
  );
};

export default Infovar;
