import Button from "@components/Button";
import React from "react";

const Practice = ({ completedLevels }) => {
  return (
    <>
      <h1>PRACTICE MODE</h1>
      {completedLevels.length > 0 ? (
        <Button text={"Play"} type="primary" url={"/Practice"} />
      ) : <p>Complete a level for unlock this mode.</p>}
    </>
  );
};

export default Practice;
