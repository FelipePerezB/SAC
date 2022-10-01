import React from "react";
import styles from "@styles/gameSelector.module.css";
import MultipleChoice from "@containers/MultipleChoice";
import PairedTerms from "@containers/PairedTerms";

const GameSelector = ({ level, type }) => {
  return (
    <div className={styles["game-container"]}>
      {level?.levels?.map((game) => {
        const gameIndex = level.levels.findIndex((g) => g.id === game.id);
        var element = "";
        switch (game.type) {
          case "Multiple Choice":
            element = (
              <MultipleChoice
                type={type}
                levelSettings={level?.settings}
                settings={game.options}
              />
            );
            break;
          case "match the sentences":
            element = (
              <PairedTerms
                type={type}
                levelSettings={level?.settings}
                settings={game.options}
              />
            );
        }

        if (level.levels[level?.settings?.number] === level.levels[gameIndex]) {
          return (
            <>
              <h2 key={game.id}>{game?.type?.toUpperCase()}</h2>
              <span className={styles["question"]}>{game.description}</span>
              {element}
            </>
          );
        }
      })}
    </div>
  );
};

export default GameSelector;
