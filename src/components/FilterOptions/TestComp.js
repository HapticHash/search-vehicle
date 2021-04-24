import React from "react";

function TestComp(props) {
  return (
    <div>
      {props.make.map((todo) => {
        // using props in child component and looping
        return <h3>{todo.value}</h3>;
      })}
    </div>
  );
}

export default TestComp;
