import Button from "@components/Button";
import Layout from "layouts/Layout";
import React, { useContext } from "react";
import styles from "@styles/getLifes.module.css";
import Image from "next/image";
import duck from "@assets/duck-crying.jpeg";
import { useRouter } from "next/router";
import Head from "next/head";
import AppContext from "context/appContext";

const GetLifes = () => {
  const { changeNavState } = useContext(AppContext);
  const router = useRouter();
  const getLives = () => {
    router.push("/");
    changeNavState("add-lifes");
  };
  return (
    <>
      <Head>
        <title>Get Lifes | SAC</title>
      </Head>
      <Layout type="layout-without-ui">
        <div className={styles["container"]}>
          <h2>GAME OVER</h2>
          <div className={styles["image-container"]}>
            <Image alt={"sad duck"} src={duck} />
          </div>
          <Button
            type={"primary"}
            callback={getLives}
            text={"Get More Lifes"}
          />
          <Button type={"secundary"} action={"link"} url={"/"} text={"Home"} />
        </div>
      </Layout>
    </>
  );
};

export default GetLifes;
