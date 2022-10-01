import Layout from "layouts/Layout";
import AppContext from "context/appContext";
import { useContext } from "react";
import Home from "@containers/Home";
import Practice from "@containers/Practice";
import Head from "next/head";

export default function Main() {
  const { state } = useContext(AppContext);
  return (
    <>
    <Head>
      <title>Home | SAC</title>
    </Head>
    <Layout>
      {state.user.navarState === "home" ? <Home /> : <Practice completedLevels={state.completedLevels} />}
    </Layout>
    </>
  );
}
