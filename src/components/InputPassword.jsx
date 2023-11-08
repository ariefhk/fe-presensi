"use client";

import clsx from "clsx";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function InputPassword({ id, className, ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);
    return (
        <div className="relative w-full">
            <input
                id={id}
                {...props}
                type={showPassword ? "text" : "password"}
                className={clsx("w-full cursor-pointer appearance-none border-2 outline-none", className)}
            />
            {showPassword ? (
                <FiEye
                    onClick={togglePassword}
                    className={clsx("absolute right-1 top-[50%] mr-3 h-[10px] w-[10px] translate-y-[-50%] cursor-pointer")}
                />
            ) : (
                <FiEyeOff
                    onClick={togglePassword}
                    className={clsx("absolute right-1 top-[50%] mr-3 h-[10px] w-[10px] translate-y-[-50%] cursor-pointer")}
                />
            )}
        </div>
    );
}
