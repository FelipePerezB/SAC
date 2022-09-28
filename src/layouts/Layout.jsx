import React from "react";
import styles from "@styles/layout.module.css";
import Infovar from "@components/Infovar";
import Navar from "@components/Navar";

const Layout = ({ children, type = "layout" }) => {
  return (
    <div className={styles[type]}>
      <Infovar />
      <main className={styles["main-content"]}>{children}</main>
      <Navar />
    </div>
  );
};

export default Layout;
