import { useRouter } from "next/router";
import { useState } from "react";
import levels from "./useGetLevels";

const initialState = {
  practice: {
    addedTime: 0,
    levels: {},
  },
  completedLevels: [],
  levels: levels,
  user: {
    lives: 10,
    navarState: "home",
  },
};

const useInitialState = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
  });

  const addTime = (time) => {
    const isCorrect = time > 0 ? true : false;
    const level = state.practice.levels.settings;
    setState({
      ...state,
      user: {
        ...state.user,
        lives: (isCorrect) ? state.user.lives + 1 : state.user.lives
      },
      practice: {
        ...state.practice,
        addedTime: state.practice.addedTime + time,
        levels: {
          ...state.practice.levels,
          settings: {
            ...state.practice.levels.settings,
            number: isCorrect ? level.number + 1 : level.number,
            errors: isCorrect ? level.errors : level.errors + 1,
            corrects: isCorrect ? level.corrects + 1 : level.corrects,
          },
        },
      },
    });
  };

  const setPracticeLevels = (newLevels) => {
    setState({
      ...state,
      practice: {
        ...state.practice,
        addedTime:0,
        levels: newLevels,
      },
    });
  };

  const changeLevel = (levelId) => {
    setTimeout(() => {
      setState({
        ...state,
        levels: levels.map((level) => {
          if (level.settings.id === levelId) {
            return {
              ...level,
              settings: {
                ...level.settings,
                number: (level.settings.number += 1),
              },
            };
          } else {
            return {
              ...level,
            };
          }
        }),
      });
    }, 500);
  };

  const setTimer = (levelId) => {
    if (levelId) {
      const newDate = new Date();
      const newSeconds = newDate.getSeconds();
      const newMinutes = newDate.getMinutes();
      let finalSeconds = Math.abs(newSeconds - time.seconds);
      let finalMinutes = Math.abs(newMinutes - time.minutes);
      if (finalSeconds === 0) {
        finalSeconds = "00";
      } else if (finalSeconds < 10) {
        finalSeconds = "0" + finalSeconds;
      }
      const finalTime = `${finalMinutes}:${finalSeconds}`;
      return finalTime;
    } else {
      const date = new Date();
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      setTime({
        seconds: seconds,
        minutes: minutes,
      });
    }
  };

  const addError = (levelId) => {
    if (state.user.lives > 1) {
      setState({
        ...state,
        user: {
          ...state.user,
          lives: (state.user.lives -= 1),
        },
        levels: levels.map((level) => {
          if (level.settings.id === levelId) {
            return {
              ...level,
              settings: {
                ...level.settings,
                errors: (level.settings.errors += 1),
              },
            };
          } else {
            return {
              ...level,
            };
          }
        }),
      });
    } else {
      router.push("/GetLifes");
    }
  };
  const addCorrect = (levelId) => {
    setState({
      ...state,
      levels: levels.map((level) => {
        if (level.settings.id === levelId) {
          return {
            ...level,
            settings: {
              ...level.settings,
              corrects: (level.settings.corrects += 1),
              number: (level.settings.number += 1),
            },
          };
        } else {
          return {
            ...level,
          };
        }
      }),
    });
  };

  const addLives = (lives) => {
    setTimeout(() => {
      setState({
        ...state,
        user: {
          ...state.user,
          lives: (state.user.lives + lives),
        },
      });
    });
  };
  const setCompleteLevel = (id) => {
    setTimeout(() => {
      setState({
        ...state,
        user: {
          ...state.user,
          navarState: "home",
        },
        levels: state.levels.map((level) => {
          if (level.settings.id === id) {
            state.completedLevels.push(id);
            return {
              ...level,
              settings: {
                ...level.settings,
                number: 0,
                time: "",
                errors: 0,
                corrects: 0,
              },
            };
          } else {
            return {
              ...level,
            };
          }
        }),
      });
    });
  };

  const changeNavState = (newState) => {
    setTimeout(() => {
      setState({
        ...state,
        user: {
          ...state.user,
          navarState: newState,
        },
      });
    });
  };
  return {
    state,
    setState,
    addTime,
    setPracticeLevels,
    changeLevel,
    setCompleteLevel,
    addError,
    addCorrect,
    addLives,
    setTimer,
    changeNavState,
  };
};

export default useInitialState;
