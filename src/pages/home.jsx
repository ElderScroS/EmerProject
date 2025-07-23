import React, { useState, useEffect } from "react";
import QRModal from "../components/qr-modal/qr";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ContactSection from "../components/contact-section/contact";
import DownloadSection from "../components/download-section/download";
import "./css/home-css/hero.css";
import "./css/home-css/tariffs.css";
import "./css/home-css/driver.css";
import "./css/home-css/services.css";

import passengerImageUrl from "../assets/img/home/passenger.webp";
import isciUrl from "../assets/img/home/driver.webp";

import econom from "../assets/img/home/econom.webp";
import emer from "../assets/img/home/emer.webp";
import comfort from "../assets/img/home/comfort.webp";
import comfortPlus from "../assets/img/home/comfort+.webp";
import electroComfort from "../assets/img/home/electrocomfort.webp";
import minivan from "../assets/img/home/minivan.webp";
import business from "../assets/img/home/biznes.webp";
import delievery from "../assets/img/home/send.webp";
import cityToCity from "../assets/img/home/fromCTC.webp";
import soberDriver from "../assets/img/home/sober.webp";
import evakuator from "../assets/img/home/evakuator.webp";

const HomePage = () => {
  const { t } = useTranslation(); 

  const tariffs = [
    { 
      title: t("homePage.tariffs.econom"), description: t("homePage.tariffs.economDesc"), imageUrl: econom 
    },
    { 
      title: t("homePage.tariffs.emer"), description: t("homePage.tariffs.emerDesc"), imageUrl: emer 
    },
    { 
      title: t("homePage.tariffs.comfort"), description: t("homePage.tariffs.comfortDesc"), imageUrl: comfort 
    },
    { 
      title: t("homePage.tariffs.comfortPlus"), description: t("homePage.tariffs.comfortPlusDesc"), imageUrl: comfortPlus 
    },
    { 
      title: t("homePage.tariffs.electroComfort"), description: t("homePage.tariffs.electroComfortDesc"), imageUrl: electroComfort 
    },
    { 
      title: t("homePage.tariffs.minivan"), description: t("homePage.tariffs.minivanDesc"), imageUrl: minivan 
    },
    { 
      title: t("homePage.tariffs.business"), description: t("homePage.tariffs.businessDesc"), imageUrl: business 
    },
    { 
      title: t("homePage.tariffs.delivery"), description: t("homePage.tariffs.deliveryDesc"), imageUrl: delievery },
    { 
      title: t("homePage.tariffs.cityToCity"), description: t("homePage.tariffs.cityToCityDesc"), imageUrl: cityToCity 
    },
    { 
      title: t("homePage.tariffs.soberDriver"), description: t("homePage.tariffs.soberDriverDesc"), imageUrl: soberDriver 
    },
    { 
      title: t("homePage.tariffs.towTruck"), description: t("homePage.tariffs.towTruckDesc"), imageUrl: evakuator 
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = (e) => {
    if (isVisible) {
        const modal = document.querySelector(".qr-modal");
        const overlay = document.querySelector(".qr-modal-overlay");
        
        modal.classList.remove("opening");
        modal.classList.add("closing");
        
        overlay.classList.remove("opening");
        overlay.classList.add("closing");
        
        setTimeout(() => {
            setIsVisible(false);
            document.body.classList.remove("qr-modal-open");
        }, 500);
    } else {
        setIsVisible(true);
        document.body.classList.add("qr-modal-open");
        
        setTimeout(() => {
            const modal = document.querySelector(".qr-modal");
            const overlay = document.querySelector(".qr-modal-overlay");
            
            modal.classList.add("opening");
            overlay.classList.add("opening");
        }, 10);
    }
  };

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
      <section className="hero fade-in-bottom">
        <div>
          <h1>{t("homePage.hero.title")}</h1>
          <p>{t("homePage.hero.description")}</p>
          <button onClick={toggleModal}>{t("homePage.hero.downloadButton")}</button>
        </div>
      </section>

      <QRModal isVisible={isVisible} toggleModal={toggleModal} />

      <section className="ServicesSection fade-in-bottom">
        <h1 className="header">{t("homePage.services.header")}</h1>
        <div className="ServicesDiv">
          <img src={passengerImageUrl} alt={t("homePage.services.passengerAlt")} />
          <div className="texts">
            <h2>{t("homePage.services.header2")}</h2>
            <p>{t("homePage.services.description")}</p>
            <button onClick={toggleModal}>{t("homePage.services.downloadButton")}</button>
          </div>
        </div>
      </section>

      <DownloadSection t={t} />

      <section className="TariffsSection fade-in-bottom">
        <h1 className="header">{t("homePage.tariffs.header")}</h1>
        <div id="cardSection" className="cards">
          <ul>
            {tariffs.map((service, index) => (
              <li key={index}>
                <div className="card fade-in-bottom">
                  <h1>{service.title}</h1>
                  <img className="icon" alt="icons" src={service.imageUrl}></img>
                  <p className="desc">{service.description}</p>
                  <p className="price">{service.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="DriversSectionForHome fade-in-bottom">
        <div className="texts">
          <h1>{t("homePage.drivers.title")}</h1>
          <p>{t("homePage.drivers.description")}</p>
          <NavLink className="Hometo-drive-page" to="/driver">{t("homePage.drivers.button")}</NavLink>
        </div>
        <img src={isciUrl} alt={t("homePage.drivers.alt")} />
      </section>

      <ContactSection t={t}/>
    </main>
  );
}

export default HomePage;