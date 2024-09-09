"use client";

import React, { useState } from "react";

const ButtonClick = ({ children }: any) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div onClick={handleClick}>
      {isToggled ? (
        <span className="bg-white text-yellow-400">{children}</span>
      ) : (
        <span className="bg-red-600 text-logout-btn">{children}</span>
      )}
    </div>
  );
};

export default ButtonClick;
