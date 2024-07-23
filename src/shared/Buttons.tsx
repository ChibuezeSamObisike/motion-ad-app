import { ButtonHTMLAttributes, forwardRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { cn } from "lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, style, isLoading, ...props }, ref) => {
    return (
      <div>
        <button
          {...props}
          style={style}
          ref={ref}
          className={cn(
            "bg-[#006E88] p-2 rounded-[100px] w-full text-[#fff] disabled:bg-[#d2d2d2] disabled:text-[#8E8E8E] disabled:cursor-not-allowed",
            className?.toString()
          )}
          disabled={isLoading || props.disabled}
        >
          {isLoading ? <CircularProgress size={24} /> : children}
        </button>
      </div>
    );
  }
);

export default PrimaryButton;

const OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, style, isLoading, ...props }, ref) => {
    return (
      <div>
        <button
          style={{ border: "1px solid #79747E", ...style }}
          className={`border border-gray-300 p-2 text-center rounded-full text-gray-700 font-medium hover:bg-gray-100 focus:outline-none  focus:bg-[#006E88] focus:text-white  ${className}`}
          {...props}
          ref={ref}
          disabled={isLoading || props.disabled}
        >
          {isLoading ? <CircularProgress size={24} /> : children}
        </button>
      </div>
    );
  }
);

export { PrimaryButton, OutlineButton };
