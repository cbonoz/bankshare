import React from "react";
import "./styles.scss";

function CenteredColumns(props) {
  return (
    <div className="columns is-centered is-variable is-4 is-multiline">
      {props.children}
    </div>
  );
}

export default CenteredColumns;
