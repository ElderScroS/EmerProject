import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import MapContainer from "../components/map-section/map";
import "../App.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
      <MapContainer />
      <Footer />
    </div>
  );
}

export default Layout;
