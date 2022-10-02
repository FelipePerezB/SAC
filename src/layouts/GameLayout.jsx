import React, { useEffect, useState } from "react";
import styles from "@styles/gameLayout.module.css";
import Victory from "@containers/Victory";
import Layout from "./Layout";
import ProgressVar from "@components/ProgressVar";

const GameLayout = ({ children, settings, type }) => {
  const [layout, setLayout] = useState("")
  useEffect(()=>{
    if(settings.isFinalGame){
      console.log("A")
      setLayout("layout-without-ui")
    } else if(type!=="tutorial"){
      setLayout("layout-without-nav")
    } else{
      setLayout("tutorial")
    }
  }, [settings])
  return (
    <>
      <Layout type={layout}>
        {settings.isFinalGame ? (
          <Victory title={"LEVEL COMPLETED!"} stats={settings.stats} id={settings.levelId} />
        ) : (
          <div className={styles["game-container"]}>
            <ProgressVar type={"levels"} progress={settings.progress}/>
            {children}
          </div>
        )}
      </Layout>
    </>
  );
};

export default GameLayout;
