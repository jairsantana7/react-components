import React from "react";
import "./Button.css";

const UIButon = ({
  children,
  className,
  component: Component,
  theme,
  ...props
}) => {
  return (
    <Component
      {...props}
      className={`ui-button ui-button--${theme} ${className}`}
    >
      {children}
    </Component>
  );
};

UIButon.defaultProps = {
  component: "a",
  className: "",
  theme: "bordered-blue"
};

export default UIButon;
