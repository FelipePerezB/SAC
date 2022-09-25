import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import levels from "./useGetLevels";

const initialState = {
  completedLevels:[],
  levels: levels,
  user: {
    lives: 10,
    navarState: "home",
  },
  // actualLevel: {
  //   number: 0,
  //   name: "",
  //   errors: 0,
  //   corrects: 0,
  //   time: "",
  // },
};

const useInitialState = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
  });
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
      return(finalTime)
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
                errors: level.settings.errors += 1,
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
          lives: (state.user.lives += lives - 1),
        },
      });
    });
  };
  const setCompleteLevel = (id) => {
    setTimeout(() => {
      setState({
        ...state,
        user: {
          ...state.user.lives,
          lives: initialState.user.lives,
          navarState: "home",
        },
        levels: state.levels.map((level) => {
          if (level.settings.id === id) {
            state.completedLevels.push(id)
              return {
                ...level,
                settings: {
                  ...level.settings,
                  number: 0,
                  time:"",
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

  // const resetLevel = () => {
  //   setTimeout(() => {
  //     setState({
  //       ...state,
  //       actualLevel: {
  //         ...state.actualLevel,
  //         number: 0,
  //         name: "",
  //         errors: 0,
  //         corrects: 0,
  //         time: "",
  //       },
  //     });
  //   }, 1000);
  // };

  // const setActualGame = (id) => {
  //   setState({
  //     ...state,
  //     actualLevel: {
  //       ...state.actualLevel,
  //       name:id
  //     },

  //   })
  //   }

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

  setTimeout(()=>{
    console.log(state)
  })
  return {
    state,
    setState,
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
