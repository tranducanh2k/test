import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { reset, selectPark } from "./redux/uiSlice";
import { useTranslation } from "react-i18next";
import Login from "./page/Login";
import Register from "./page/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Map() {
    // const [selectedPark, setSelectedPark] = useState(null);
    const { selectedPark } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                dispatch(reset());
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: 21.010912, lng: 105.840516 }}
            defaultOptions={{ styles: mapStyles }}
        >
            {parkData.features.map((park) => (
                <Marker
                    key={park.properties.PARK_ID}
                    position={{
                        lat: park.geometry.coordinates[1],
                        lng: park.geometry.coordinates[0],
                    }}
                    onClick={(e) => {
                        dispatch(selectPark(park));
                    }}
                    icon={{
                        url: require("./assets/bike-park.png"),
                        scaledSize: new window.google.maps.Size(25, 25),
                    }}
                />
            ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        dispatch(reset());
                    }}
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0],
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                        <p>
                            {t("content.numberOfBike")}:{" "}
                            {selectedPark.properties.bikeList.length} &nbsp; (
                            {(selectedPark.properties.bikeList.length /
                                selectedPark.properties.capacity) *
                                100}{" "}
                            %)
                        </p>
                        <p>
                            {t("content.capacity")}:{" "}
                            {selectedPark.properties.capacity}
                        </p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {

    const isLogined = useSelector((state) => state.auth?.isLogined);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        isLogined ? (
                            <div style={{ width: "100vw", height: "90vh" }}>
                                <MapWrapped
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${"AIzaSyCGsi5STsQ8aAcC_VhNqxbo_s4223TZOaA"}`}
                                    loadingElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                    containerElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                    mapElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                />
                            </div>
                        ) : (
                            <div style={{fontSize: '2rem'}}>Hãy đăng nhập để thuê xe</div>
                        )
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <ToastContainer autoClose={1500} />
        </BrowserRouter>
    );
}
