import React from 'react';
import "./map.css";

const MapContainer = () => {
  return (
    <section className="map-container fade-in-bottom">
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1519.5871863171058!2d49.838641024535555!3d40.38282779846509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da044366d0d%3A0xad2da94c2d67332f!2zQUYgQ8SwVFksIEFGIENJVFksIDY2IFIuQsO8bGLDvGwgUHIsIEJha8SxIDEwMDU!5e0!3m2!1sru!2saz!4v1732824833153!5m2!1sru!2saz"
        width="90%"
        height="400"
        className="map-iframe"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default MapContainer;