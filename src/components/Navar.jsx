import React, { useContext, useState } from "react";
import styles from "@styles/navar.module.css";
import AppContext from "context/appContext";

const Navar = () => {
  const { changeNavState, state } = useContext(AppContext);
  const [icons, setIcons] = useState([
    {
      type: "home",
    },
    {
      type: "add-lifes",
    },
  ]);
  const activeIcon = (type, state) => {
    if (state !== "icon-active") {
      setTimeout(() => {
        setIcons([
          ...icons.map((icon) => {
            if (type === icon.type) {
              setTimeout(() => {
                changeNavState(type);
              });
              return {
                ...icon,
                state: "icon-active",
              };
            } else {
              if (icon?.state === "icon-active") {
                return {
                  ...icon,
                  state: "icon-inactive",
                };
              }
            }
          }),
        ]);
      });
    }
  };
  return (
    <nav className={styles["navar"]}>
      <ul>
        {icons.map((icon) => {
          if (icon.type === state.user.navarState) {
            icon.state = "icon-active";
          } else {
            icon.state = "icon-inactive";
          }
          let element = "";
          switch (icon.type) {
            case "home":
              element = (
                <svg
                  className={styles[icon?.state]}
                  xmlns="http://www.w3.org/2000/svg"
                  height={48}
                  width={48}
                >
                  <path d="M8 42V18L24.1 6 40 18v24H28.3V27.75h-8.65V42Zm3-3h5.65V24.75H31.3V39H37V19.5L24.1 9.75 11 19.5Zm13-14.65Z" />
                </svg>
              );
              break;
            case "add-lifes":
              element = (
                <svg
                  className={styles[icon?.state]}
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  width="48"
                >
                  <path d="M22 23.15Zm0 18.8-4.95-4.55q-4.35-4-7.225-6.85Q6.95 27.7 5.2 25.4q-1.75-2.3-2.475-4.325Q2 19.05 2 16.75q0-4.5 3.025-7.625T12.5 6q2.85 0 5.275 1.325Q20.2 8.65 22 11.2q2.1-2.7 4.45-3.95T31.5 6q4.05 0 6.775 2.75Q41 11.5 41.6 15.4h-2.95q-.45-2.75-2.325-4.575Q34.45 9 31.5 9q-2.55 0-4.75 1.55t-3.55 4.4h-2.45q-1.3-2.8-3.5-4.375Q15.05 9 12.5 9q-3.3 0-5.4 2.225Q5 13.45 5 16.75q0 1.95.775 3.8.775 1.85 2.7 4.2 1.925 2.35 5.225 5.5T22 38q1.6-1.45 3.025-2.7 1.425-1.25 2.825-2.45l.325.325q.325.325.725.7.4.375.725.7l.325.325q-1.35 1.2-2.8 2.45-1.45 1.25-3.1 2.75ZM36.5 34v-6.5H30v-3h6.5V18h3v6.5H46v3h-6.5V34Z"/>
                </svg>
              );
              break;
          }
          return (
            <li
              key={icon.type}
              onClick={() => activeIcon(icon.type, icon.state)}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navar;
