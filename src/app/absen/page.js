"use client";

import { absenLocationCoordinate } from "@/data/absenLocation";
import { useLoadScript, GoogleMap, MarkerF, Circle, DirectionsRenderer, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import Clock from "@/components/Clock";

const libraries = ["places"];

function haversine_distance(mk1Lat, mk1Lng, mk2Lat, mk2Lng) {
    let R = 6378000; // Radius of the Earth in miles
    let rlat1 = mk1Lat * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2Lat * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2Lng - mk1Lng) * (Math.PI / 180); // Radian difference (longitudes)

    let d =
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
            )
        );
    return d;
}

export default function AbsenPage() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const zoom = 19;
    const mapRef = useRef(null);
    const [absenLocation, setAbsenLocation] = useState(null);
    const [directionLocate, setDirectionLocate] = useState(null);
    const [userLocation, setUserLocation] = useState(null); //-7.406523077199722, 109.24753248839191
    const [loadingAbsensiLoc, setLoadingAbsensiLoc] = useState(true);
    const [userLocInfo, setUserLocInfo] = useState(null);
    const [absenLocInfo, setAbsenLocInfo] = useState(null);
    const [formattedAbsenLoc, setFormattedAbsenLoc] = useState(null);
    const [formattedUserLoc, setFormattedUserLoc] = useState(null);
    const svgMarker = useMemo(() => {
        return {
            path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: isLoaded && new google.maps.Point(0, 20),
        };
    }, [isLoaded]);

    const locations = useMemo(() => {
        return {
            lat: absenLocation?.lat,
            lng: absenLocation?.lng,
        };
    }, [absenLocation]);

    const options = useMemo(() => {
        return {
            disableDefaultUI: true,
            clickableIcons: true,
        };
    }, []);

    const onLoad = useCallback((map) => {
        // console.log(map);
        return (mapRef.current = map);
    }, []);

    const fetchDirections = (fromLocations, toLocations) => {
        if (!toLocations) return;
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: fromLocations,
                destination: toLocations,
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    // setDirections(result);
                    console.log(result);
                    setDirectionLocate(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    useEffect(() => {
        let ignore = false;
        try {
            if (!ignore) {
                async function getAbsenLocation() {
                    const data = await absenLocationCoordinate();
                    console.log("coordinate: ", data);
                    setAbsenLocation({ lat: data.latitude, lng: data.longitude });
                }
                getAbsenLocation();
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (!ignore) {
                setLoadingAbsensiLoc(false);
            }
        }
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const successGetLocation = (position) => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                const isReadyToAbsen = locations.absenLocation;

                if (isReadyToAbsen !== null && userLatitude === locations?.lat && userLongitude === locations?.lng) {
                    alert("Kamu bisa Absen!");
                }
                console.log({
                    "My Latitude ": userLatitude,
                    "My Longitude ": userLongitude,
                });

                if (locations?.lat && locations?.lng && isLoaded) {
                    const userGmapLatLang = new google.maps.LatLng(userLatitude, userLongitude);
                    const absenGmapLatLang = new google.maps.LatLng(locations?.lat, locations?.lng);
                    const radiusUserToAbsen = haversine_distance(userLatitude, userLongitude, locations?.lat, locations?.lng);

                    fetchDirections(userGmapLatLang, absenGmapLatLang);
                    setUserLocation({ lat: userLatitude, lng: userLongitude });
                    if (radiusUserToAbsen <= 5) {
                        alert("You're in locations!");
                    }
                }
            };

            const error = (err) => {
                console.error(`ERROR(${err.code}): ${err.message}`);
            };

            const options = {
                enableHighAccuracy: true, // high acc
                maximumAge: 0, //no cached loc, realtime result
                // timeout: 5000,
            };

            const watchID = navigator.geolocation.watchPosition(successGetLocation, error, options);

            return () => {
                if (watchID) {
                    navigator.geolocation.clearWatch(watchID);
                }
            };
        } else {
            console.log("Location Not Available");
        }
    }, [locations, isLoaded]);

    // useEffect(() => {
    //     const listener = (e) => {
    //         if (e.key === "Escape") {
    //             // setSelectedCenter(null);
    //             setUserLocInfo(null);
    //             setAbsenLocInfo(null);
    //         }
    //     };
    //     window.addEventListener("keydown", listener);
    //     return () => {
    //         window.removeEventListener("keydown", listener);
    //     };
    // }, []);
    // console.log("render page");

    //rendering
    if (!isLoaded) return <div>Loading MAP...</div>;

    if (isLoaded && !loadingAbsensiLoc && locations.lat && locations.lng) {
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
                                <GoogleMap
                                    onLoad={onLoad}
                                    options={options}
                                    center={locations}
                                    zoom={zoom}
                                    mapContainerClassName="w-full h-full"
                                >
                                    {directionLocate && (
                                        <DirectionsRenderer
                                            directions={directionLocate}
                                            options={{
                                                suppressMarkers: true,
                                                polylineOptions: {
                                                    zIndex: 50,
                                                    strokeColor: "#1976D2",
                                                    strokeWeight: 5,
                                                },
                                            }}
                                        />
                                    )}
                                    <MarkerF
                                        position={locations}
                                        onClick={(e) => {
                                            const geocoder = new google.maps.Geocoder();
                                            geocoder
                                                .geocode({ location: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()) })
                                                .then((response) => {
                                                    if (response.results[0]) {
                                                        setFormattedAbsenLoc(response.results[0].formatted_address);
                                                        console.log(response.results[0].formatted_address);
                                                    } else {
                                                        window.alert("No results found");
                                                    }
                                                })
                                                .catch((e) => window.alert("Geocoder failed due to: " + e));

                                            setAbsenLocInfo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                                        }}
                                        icon={svgMarker}
                                    />
                                    {absenLocInfo && (
                                        <InfoWindow
                                            onCloseClick={() => {
                                                setAbsenLocInfo(null);
                                            }}
                                            position={absenLocInfo}
                                        >
                                            {formattedAbsenLoc ? <h1>{formattedAbsenLoc}</h1> : <h1>Loading ...</h1>}
                                        </InfoWindow>
                                    )}
                                    <Circle center={locations} radius={5} options={closeOptions} />
                                    {userLocation && (
                                        <MarkerF
                                            // icon={svgMarker}
                                            position={userLocation}
                                            onClick={(e) => {
                                                const geocoder = new google.maps.Geocoder();
                                                geocoder
                                                    .geocode({ location: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()) })
                                                    .then((response) => {
                                                        if (response.results[0]) {
                                                            setFormattedUserLoc(response.results[0].formatted_address);
                                                            console.log(response.results[0].formatted_address);
                                                        } else {
                                                            window.alert("No results found");
                                                        }
                                                    })
                                                    .catch((e) => window.alert("Geocoder failed due to: " + e));
                                                setUserLocInfo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                                            }}
                                        />
                                    )}
                                    {userLocInfo && (
                                        <InfoWindow
                                            onCloseClick={() => {
                                                setUserLocInfo(null);
                                            }}
                                            position={userLocInfo}
                                        >
                                            {formattedUserLoc ? <h1>{formattedUserLoc}</h1> : <h1>Loading ...</h1>}
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
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
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#1976D2",
    fillColor: "#1976D2",
};
