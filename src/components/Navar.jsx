import React, { useContext, useState } from "react";
import styles from "@styles/navar.module.css";
import AppContext from "context/appContext";

const Navar = () => {
  const { changeNavState } = useContext(AppContext);
  const [icons, setIcons] = useState([
    {
      type: "home",
      state: "icon-active",
    },
    {
      type: "magic",
      state: "icon-inactive",
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
            case "magic":
              element = (
                <svg
                  className={styles[icon?.state]}
                  xmlns="http://www.w3.org/2000/svg"
                  height="48"
                  width="48"
                >
                  <path d="m38.6 16.25-2.15-5-5.2-2.3 5.2-2.25 2.15-4.75 2.15 4.75 5.2 2.25-5.2 2.3Zm0 29.75-2.15-4.8-5.2-2.25 5.2-2.25 2.15-5.05 2.15 5.05 5.2 2.25-5.2 2.25Zm-21.95-7.7-4.6-9.85L2 23.95l10.05-4.5 4.6-9.8 4.65 9.8 10 4.5-10 4.5Zm0-7.4 2.4-4.8 4.9-2.15-4.9-2.15-2.4-4.8-2.35 4.8-4.95 2.15 4.95 2.15Zm0-6.95Z" />
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
