import AppContext from "context/appContext";
import React, { useContext } from "react";
import styles from "@styles/infovar.module.css";
import Image from "next/image";
import avatar from "@assets/avatar.jpeg"
import heart from "@assets/heart.svg";

const Infovar = ({type="infovar"}) => {
  const { state } = useContext(AppContext);
  return (
    <div className={styles[type]}>
      <div className={styles["infovar-elements"]}>
        <div className={styles["avatar"]}>
          <Image src={avatar}  />
        </div>
        <div className={styles["lives"]}>
          <span className={styles["heart-container"]}>
            <Image src={heart} />
          </span>
          <span>{state?.user?.lives}</span>
        </div>
      </div>
    </div>
  );
};

export default Infovar;
