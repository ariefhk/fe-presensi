"use client";

import { useState } from "react";
import OtpInput from "react-otp-input";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";

export default function OTPPage() {
    const [otp, setOtp] = useState("");

    console.log("otp: ", otp);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-base-2">
            <div className="bg-white h-[410px] w-[328px] rounded-[12px] flex justify-center items-center">
                <div className="flex flex-col items-center gap-[24px]">
                    <div className="rounded-full bg-base-1 w-[58px] h-[58px] flex justify-center items-center">
                        <MdLockOutline className="text-white w-[24px] h-[24px]" />
                    </div>
                    <h1 className="text-[16px] leading-[20px] text-base-1">Verifikasi</h1>
                    <OtpInput
                        inputStyle={"otp-style"}
                        value={otp}
                        inputType="number"
                        containerStyle={"flex gap-[16px] items-center"}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <button
                        type="submit"
                        className="w-[115px] h-[30px] text-white bg-base-2 hover:bg-base-1 rounded-[4px] text-[10px] leading-normal "
                    >
                        Masukan OTP
                    </button>
                    <Link href={"/login"} className="text-base-2 hover:text-base-1 text-[10px] leading-normal">
                        Kirim Ulang Kode Verifikasi
                    </Link>
                </div>
            </div>
        </div>
    );
}
