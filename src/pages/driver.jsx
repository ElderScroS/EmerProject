import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";
import "./css/driver-css/hero.css";
import "./css/driver-css/info.css";
import "./css/driver-css/download-driver.css";
import "./css/driver-css/features.css";
import playMarketUrl from "../assets/img/driver/playMarketBlack.webp";
import appUrl from "../assets/img/driver/emerDriver.webp";

const DriverPage = () => {
  const { t } = useTranslation(); 

  const playMarketDriver = "https://play.google.com/store/apps/details?id=su.skat.client798_EMERDriver&hl=ru";

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in-bottom");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="main">
      <section className="hero-section fade-in-bottom">
        <div className="hero-content">
          <div className="text-content">
            <h1>{t("driverPage.hero.title")}</h1>
            <p> {t("driverPage.hero.description")}</p>
            <a className="playmarket-hero" href={playMarketDriver}>
              <img src={playMarketUrl} alt="Play market" />
            </a>
          </div>
          <div className="image-content">
            <QRCodeCanvas value={playMarketDriver} size={270} bgColor="#ffffff" fgColor="#000000" level="L"/>
          </div>
        </div>
        <div className="background-overlay"></div>
      </section>

      <section className="info-section fade-in-bottom">
        <h2>{t("driverPage.info.title")}</h2>
        <p>{t("driverPage.info.description1")}</p>
        <p>{t("driverPage.info.description2")}</p>
      </section>

      <section className="features-section fade-in-bottom">
        <div className="features-container">
          <div className="feature-item">
            <i className="fa-solid fa-download feature-icon"></i>
            <h3 className="feature-title">1. {t("driverPage.features.title1")}</h3>
            <p className="feature-description">{t("driverPage.features.description1")}</p>
          </div>
          <div className="feature-item">
            <i className="fa-solid fa-calendar-days feature-icon"></i>
            <h3 className="feature-title">2. {t("driverPage.features.title2")}</h3>
            <p className="feature-description">{t("driverPage.features.description2")}</p>
          </div>
          <div className="feature-item">
            <i className="fa-solid fa-right-to-bracket feature-icon"></i>
            <h3 className="feature-title">3. {t("driverPage.features.title3")}</h3>
            <p className="feature-description">{t("driverPage.features.description3")}</p>
          </div>
        </div>
      </section>

      <section className="download-driver-section fade-in-bottom">
        <div className="left">
          <h1 className="download-text">{t("driverPage.downloadApp.title")}</h1>
          <h2 className="download-text2">{t("driverPage.downloadApp.description")}</h2>

          <a href={playMarketDriver}>
            <img src={playMarketUrl} alt="Play market"/>
          </a>
        </div>
        <img className="app" src={appUrl} alt="Emer Driver" />
      </section>
    </main>
  );
};

export default DriverPage;