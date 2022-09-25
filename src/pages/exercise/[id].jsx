import React, { useContext, useEffect, useState } from "react";
import PairedTerms from "containers/PairedTerms";
import MultipleChoice from "containers/MultipleChoice";
import styles from "@styles/pairedTerms.module.css";
import AppContext from "context/appContext";
import { useRouter } from "next/router";
import GameLayout from "layouts/GameLayout";
import Head from "next/head";

const Exercise = () => {
  const { state } = useContext(AppContext);
  const [games, setGames] = useState();
  const [id, setId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    setId(id);
    setTimeout(() => {
      setGames(state.levels.find((level) => level.settings.id === id));
    });
  }, [router?.isReady]);

  let actualGame = games?.settings?.number;
  let progress = Math.round((100 / games?.settings?.totalLevels) * actualGame);

  return (
    <>
      <Head>
        <title>Level | SAC</title>
      </Head>
      <GameLayout
        settings={{
          others: games?.settings,
          levelId: id,
          progress: progress,
          isFinalGame: actualGame >= games?.levels?.length,
        }}
      >
        <div className={styles["game-container"]}>
          {games?.levels?.map((game) => {
            const gameIndex = games.levels.findIndex((g) => g.id === game.id);
            var element = "";
            switch (game.type) {
              case "Alternativa múltiple":
                element = (
                  <MultipleChoice
                    levelSettings={games?.settings}
                    settings={game.options}
                  />
                );
                break;
              case "términos pareados":
                element = (
                  <PairedTerms
                    levelSettings={games?.settings}
                    settings={game.options}
                  />
                );
            }

            if (games.levels[actualGame] === games.levels[gameIndex]) {
              return (
                <>
                  <h2 key={game.id}>{game.type.toLocaleUpperCase()}</h2>
                  <span className={styles["question"]}>{game.description}</span>
                  {element}
                </>
              );
            }
          })}
        </div>
      </GameLayout>
    </>
  );
};

export default Exercise;
