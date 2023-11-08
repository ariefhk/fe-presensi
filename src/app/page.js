"use client";
import Clock from "@/components/Clock";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-base-2">
            <div className="flex flex-col gap-[10px] w-[328px]">
                <Clock />
                <section className="bg-white rounded-[12px] h-[388px] flex flex-col items-center gap-[46px]">
                    <div className="flex flex-col gap-[24px] items-center  h-[190px] w-[246px] shadow-base rounded-b-[12px] ">
                        <Image
                            alt="Profile"
                            src={"/images/arief-bebas.webp"}
                            width={81}
                            height={81}
                            priority
                            className="object-cover rounded-full mt-[24px]"
                        />

                        <div className="flex flex-col items-center gap-[6px] text-base-1">
                            <h1 className="font-bold text-[16px] leading-[20px]">Muhammad Dani Mu’ti</h1>
                            <p className="text-[10px] leading-[12px]">UI / UX Designer</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-base-1 gap-[6px]">
                        <p className="text-[10px] leading-[12px]">Jam Kerja</p>
                        <p className="text-[10px] leading-[12px]">
                            <span>08.00</span> <span>-</span> <span>16.00</span>
                        </p>
                    </div>

                    <button className="text-[10px] leading-[12px] hover:bg-base-1 text-white bg-input-2 rounded-[4px] w-[114px] h-[30px]">
                        Keluar
                    </button>
                </section>
            </div>
        </div>
    );
}
