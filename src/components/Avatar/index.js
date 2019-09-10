import React from "react";
import "./styles.scss";

function Avatar(props) {
  const { image, size, alt, ...otherProps } = props;

  return (
    <figure className={"image" + (size ? ` is-${size}x${size}` : "")}>
      <img className="is-rounded" src={image} alt={alt} {...otherProps} />
    </figure>
  );
}

export default Avatar;
