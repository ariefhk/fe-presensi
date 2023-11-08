"use client";

import clsx from "clsx";
import { forwardRef } from "react";

const InputRef = forwardRef(function InputRef({ id, type = "text", className, ...props }, ref) {
    return (
        <input
            id={id}
            type={type}
            ref={ref}
            {...props}
            className={clsx(
                "w-full h-[30px] bg-input-1 text-[12px] leading-normal  md:w-[285px] rounded-[4px] pl-[18px] cursor-pointer appearance-none outline-input-1 focus:outline-base-1 text-black",
                className
            )}
        />
    );
});

export default InputRef;
