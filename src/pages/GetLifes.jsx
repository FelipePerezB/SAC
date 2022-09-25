import Button from "@components/Button";
import Layout from "layouts/Layout";
import React, { useContext } from "react";
import styles from "@styles/getLifes.module.css";
import Image from "next/image";
import duck from "@assets/duck-crying.jpeg";
import AppContext from "context/appContext";
import { useRouter } from "next/router";
import Head from "next/head";

const GetLifes = () => {
  const { addLives } = useContext(AppContext);
  const router = useRouter();
  const getLives = () => {
    addLives(5);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Get Lives | SAC</title>
      </Head>
      <Layout type="layout-without-ui">
        <div className={styles["container"]}>
          <h2>¡TE QUEDASTE SIN VIDAS!</h2>
          <div className={styles["image-container"]}>
            <Image src={duck} />
          </div>
          <Button
            type={"primary"}
            callback={getLives}
            text={"Recuperar vidas"}
          />
          <Button
            type={"secundary"}
            action={"link"}
            url={"/"}
            text={"Volver al home"}
          />
        </div>
      </Layout>
    </>
  );
};

export default GetLifes;
