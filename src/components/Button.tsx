import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 max-w-[345px] text-base font-bold transition-all duration-300 ease-in-out w-full flex justify-center py-4 bg-blue hover:bg-darkBlue text-center items-center text-white rounded-full"
    >
      {children}
    </button>
  );
};

export default Button;