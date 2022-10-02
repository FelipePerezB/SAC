import React, { useContext, useEffect, useState } from "react";
import AppContext from "context/appContext";
import { useRouter } from "next/router";
import GameLayout from "layouts/GameLayout";
import Head from "next/head";
import GameSelector from "@components/GameSelector";

const Exercise = () => {
  const { state, setTimer } = useContext(AppContext);
  const [games, setGames] = useState();
  const [id, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTimer();
  }, [router?.isReady]);

  useEffect(() => {
    const { id } = router.query;
    setId(id);
    setTimeout(() => {
      setGames(state.levels.find((level) => level.settings.id === id));
    });
  }, [router?.isReady, state?.levels]);

  let actualGame = games?.settings?.number;
  let progress = Math.round((100 / games?.settings?.totalLevels) * actualGame);

  return (
    <>
      <Head>
        <title>Level | SAC</title>
      </Head>
      <GameLayout
        type={games?.settings.type}
        settings={{
          stats: [
            {
              type:"corrects",
              value:games?.settings.corrects
            },
            {
              type:"errors",
              value:games?.settings.errors
            },
            {
              type:"time",
              value:null
            },
          ],
          levelId: id,
          progress: progress,
          isFinalGame: actualGame >= games?.levels?.length,
        }}
      >
        <GameSelector type={games?.settings?.type} level={games} />
      </GameLayout>
    </>
  );
};

export default Exercise;
