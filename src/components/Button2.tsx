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
      className="px-4 max-w-[345px] text-base font-bold w-full flex justify-center py-4 bg-white text-center items-center text-blue rounded-full 
                 hover:bg-lightGray transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};


export default Button;