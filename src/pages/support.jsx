import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ContactSection from "../components/contact-section/contact";
import DownloadSection from "../components/download-section/download";
import "./css/support-css/hero.css";
import "./css/support-css/drivers.css";
import "./css/support-css/driver-or-customer.css";
import isciUrl from "../assets/img/support/driver.webp";

function SupportPage() {
  const { t } = useTranslation(); 

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
    <main>
      <section className="hero-support fade-in-bottom">
        <h1>{t("supportPage.hero.header")}</h1>
        <div className="searchDiv">
          <input
            type="text"
            name="supportSearch"
            id="support_search"
            placeholder={t("supportPage.hero.placeholder")}
            aria-label="Support search"
          />
          <button id="sendBtn" type="button" aria-label="Send Support Query">
            {t("supportPage.hero.sendBtn")}
          </button>
        </div>
      </section>

      <section className="driver-or-customer fade-in-bottom">
        <div className="cards">
          <div className="card">
            <h1>{t("supportPage.help.header1")}</h1>
          </div>
          <div className="card">
            <h1>{t("supportPage.help.header2")}</h1>
          </div>
          <div className="card">
            <h1>{t("supportPage.help.header3")}</h1>
          </div>
        </div>
      </section>

      <section className="DriversSection fade-in-bottom">
        <div className="DriversDiv">
          <img src={isciUrl} alt="driver" />
          <div className="texts">
            <h1>{t("supportPage.drivers.header")}</h1>
            <p>{t("supportPage.drivers.description")}</p>
            <NavLink className="to-drive-page" to="/driver">{t("supportPage.drivers.button")}</NavLink>
          </div>
        </div>
      </section>

      <DownloadSection t={t} />

      <ContactSection t={t}/>
    </main>
  );
}

export default SupportPage;