"use client";
import { useEffect, useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
import clsx from "clsx";

import Clock from "@/components/Clock";

const Marker = ({ text, className }) => <p className={clsx("font-bold", className)}>{text}</p>;

export default function AbsenPage() {
    const [latitude, setLatitude] = useState(-7.4038438718131445);
    const [longitude, setLongitude] = useState(109.24631906927465);
    const zoom = 15;

    const centerMap = useMemo(() => {
        return {
            lat: -7.4038438718131445,
            lng: 109.24631906927465,
        };
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchID = navigator.geolocation.watchPosition((position) => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });

            return () => navigator.geolocation.clearWatch(watchID);
        } else {
            console.log("Location Not Available");
        }
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-base-2">
            <div className="flex flex-col gap-[10px] w-[328px]">
                <Clock />
                <section className="bg-white rounded-[12px] h-[388px] flex flex-col items-center gap-[24px]">
                    <div className="flex flex-col gap-[24px] items-center  h-[280px] w-full shadow-base rounded-[12px] overflow-y-hidden relative">
                        <div className="flex flex-col items-center w-[184px] rounded-[12px] h-[40px] z-10 bg-white absolute text-base-1  justify-center">
                            <h1 className="text-[10px] leading-[20px] font-bold">Muhammad Dani Mu’ti</h1>
                            <p className="text-[8px] leading-[12px]">UI / UX Designer</p>
                        </div>
                        <div style={{ height: "100%", width: "100%", position: "relative" }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GMAP_KEY }}
                                defaultCenter={centerMap}
                                defaultZoom={zoom}
                            >
                                <Marker
                                    className={"text-green-700"}
                                    lat={-7.4038438718131445}
                                    lng={109.24631906927465}
                                    text="your Marker"
                                />
                                <Marker className={"text-red-700"} lat={-7.406444} lng={109.247512} text="My Marker" />
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="flex items-center text-base-1 gap-[20px]">
                        <div className="flex items-center gap-[8px]">
                            <input id="wfo" type="radio" name="absen_type" />
                            <label htmlFor="wfo" className="text-[10px] leading-[12px]">
                                WFO
                            </label>
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <input id="wfh" type="radio" name="absen_type" />
                            <label htmlFor="wfh" className="text-[10px] leading-[12px]">
                                WFH
                            </label>
                        </div>
                    </div>
                    <button className="text-[10px] leading-[12px] hover:bg-input-2 text-white bg-base-1 rounded-[4px] w-[114px] h-[30px]">
                        Masuk
                    </button>
                </section>
            </div>
        </div>
    );
}
