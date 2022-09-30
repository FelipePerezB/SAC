import Link from "next/link";
import React from "react";
import styles from "@styles/button.module.css";

const Button = ({ type, callback, text, url}) => {
  const a = [""];
  return a.map((e) => {
    return (url) ? (
      <>
        <Link href={url}>
          <div className={styles[type]}>
            <span>{text}</span>
          </div>
        </Link>
      </>
    ) : (
      <div onClick={() => callback()} className={styles[type]}>
        <span>{text + e}</span>
      </div>
    );
  });
};

export default Button;
