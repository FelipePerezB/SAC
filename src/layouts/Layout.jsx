import React from "react";
import styles from "@styles/layout.module.css";
import Infovar from "@components/Infovar";
import Navar from "@components/Navar";

const Layout = ({ children, type = "normal" }) => {
  return (
    <div className={styles[type]}>
      <Infovar type={type}/>
      <main className={styles["main-content"]}>{children}</main>
      <Navar />
    </div>
  );
};

export default Layout;
