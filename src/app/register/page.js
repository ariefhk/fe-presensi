"use client";

import InputPasswordRef from "@/components/InputPasswordRef";
import InputRef from "@/components/InputRef";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-base-2">
            <form className="relative h-[400px]  w-[328px] bg-white rounded-[12px] shadow-high">
                <section className="mt-[34px] md:text-[16px] md:leading-normal">
                    <h1 className="font-bold text-center text-base-2">Daftar Akun</h1>
                    <div className="  flex flex-col items-center md:gap-[14px] gap-[16px] md:mt-[10px] mx-[16px] md:mx-0">
                        <div className="flex flex-col  w-full md:w-max gap-[4px]">
                            <label htmlFor="nama" className="text-black text-[10px]">
                                Nama
                            </label>
                            <InputRef id="nama" type="text" />
                        </div>
                        <div className="flex flex-col md:gap-[4px] w-full md:w-max gap-[4px]">
                            <label htmlFor="email" className="text-black text-[10px]">
                                Email
                            </label>
                            <InputRef id="email" type="email" />
                        </div>
                        <div className="flex flex-col md:gap-[4px] w-full md:w-max gap-[4px]">
                            <label htmlFor="password" className="text-black text-[10px]">
                                Password
                            </label>
                            <InputPasswordRef id="password" placeholder="Password" />
                        </div>
                        <div className="flex flex-col md:gap-[4px] w-full md:w-max gap-[4px]">
                            <label htmlFor="ulangi-password" className="text-black text-[10px]">
                                Ulangi Password
                            </label>
                            <InputPasswordRef id="ulangi-password" placeholder="Password" />
                        </div>
                    </div>
                </section>
                <section className="absolute left-[50%] translate-x-[-50%] bottom-[16px] flex flex-col items-center w-full gap-[16px] ">
                    <button
                        type="submit"
                        className="w-[115px] h-[30px] text-white bg-base-2 hover:bg-base-1 rounded-[4px] text-[10px] leading-normal "
                    >
                        Daftar
                    </button>
                    <Link href={"/login"} className="text-base-2 hover:text-base-1 text-[10px] leading-normal">
                        Sudah memiliki akun ?
                    </Link>
                </section>
            </form>
        </div>
    );
}
