"use client";

import clsx from "clsx";
import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputPasswordRef = forwardRef(function InputPasswordRef({ id, className, ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);
    return (
        <div className="relative w-full">
            <input
                id={id}
                {...props}
                type={showPassword ? "text" : "password"}
                ref={ref}
                className={clsx(
                    "w-full bg-input-1 text-[12px] leading-normal md:w-[285px] h-[30px] rounded-[4px] pl-[18px] cursor-pointer appearance-none outline-input-1 focus:outline-base-1 text-black pr-[36px]",
                    className
                )}
            />
            {showPassword ? (
                <FiEye
                    onClick={togglePassword}
                    className={clsx(
                        "absolute right-[4px] top-[50%] mr-[12px] h-[14px] w-[14px] translate-y-[-50%] cursor-pointer"
                    )}
                />
            ) : (
                <FiEyeOff
                    onClick={togglePassword}
                    className={clsx(
                        "absolute right-[4px] top-[50%] mr-[12px] h-[14px] w-[14px]  translate-y-[-50%] cursor-pointer"
                    )}
                />
            )}
        </div>
    );
});

export default InputPasswordRef;
