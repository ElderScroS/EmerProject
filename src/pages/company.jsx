import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./css/company-css/drivers.css";
import "./css/company-css/hero.css";
import "./css/company-css/info.css";
import "./css/company-css/about.css";
import "./css/company-css/preferences.css";

import passengerImage from "../assets/img/company/about.webp";
import car from "../assets/img/company/car.webp";
import w247 from "../assets/img/company/24-7.webp";
import customerSupport from "../assets/img/company/support.webp";
import testProgram from "../assets/img/company/telephone.webp";
import driverSection from "../assets/img/company/driverSection.webp";
import contactMe from "../assets/img/company/info.webp";

const Card = ({ imgSrc, title, description, alt }) => (
  <div className="card">
    <img src={imgSrc} alt={alt} />
    <div className="texts">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </div>
);

const DriverItem = ({ title, description }) => (
  <li>
    <h2>{title}</h2>
    <p>{description}</p>
  </li>
);

const CompanyPage = () => {
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
      <section className="hero-company fade-in-bottom">
        <h1 className="title">{t("companyPage.hero.title")}</h1>
        <p className="hero-subtitle"> {t("companyPage.hero.description")} </p>
        <div className="cards">
          {[
            { textNum: "150+", text: t("companyPage.hero.card1") },
            { textNum: "All", text: t("companyPage.hero.card2") },
            { textNum: "230+", text: t("companyPage.hero.card3") },
          ].map((card, index) => (
            <div className="card" key={index}>
              <h1>{card.textNum}</h1>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="aboutCompany fade-in-bottom">
        <h1 className="header"> {t("companyPage.about.header1")} </h1>
        <p className="aboutCompanyP"> {t("companyPage.about.description1")} </p>
        <div className="goals">
          <img src={passengerImage} alt="Passenger" />
          <div className="texts">
            <h1>{t("companyPage.about.header2")}</h1>
            <p> {t("companyPage.about.description2")} </p>
          </div>
        </div>
      </section>

      <section className="preferences fade-in-bottom">
        <h1 className="header">{t("companyPage.preferences.header")}</h1>
        <div className="preferencesCards">
          {[
            {
              imgSrc: testProgram,
              title: t("companyPage.preferences.title1"),
              description: t("companyPage.preferences.description1"),
              alt: "application",
            },
            {
              imgSrc: w247,
              title: t("companyPage.preferences.title2"),
              description: t("companyPage.preferences.description2"),
              alt: "247support",
            },
            {
              imgSrc: car,
              title: t("companyPage.preferences.title3"),
              description: t("companyPage.preferences.description3"),
              alt: "car",
            },
            {
              imgSrc: customerSupport,
              title: t("companyPage.preferences.title4"),
              description: t("companyPage.preferences.description4"),
              alt: "application",
            },
          ].map((card, index) => ( <Card key={index} {...card} /> ))}
        </div>
      </section>

      <section className="drivers fade-in-bottom">
        <h1 className="header">{t("companyPage.drivers.header")}</h1>
        <div className="body">
          <div className="texts">
            <ul>
              {[
                {
                  title: t("companyPage.drivers.title1"),
                  description: t("companyPage.drivers.description1"),
                },
                {
                  title: t("companyPage.drivers.title2"),
                  description: t("companyPage.drivers.description2"),
                },
                {
                  title: t("companyPage.drivers.title3"),
                  description: t("companyPage.drivers.description3"),
                },
              ].map((item, index) => ( <DriverItem key={index} {...item} /> ))}
            </ul>
          </div>
          <img src={driverSection} alt="driver section" />
        </div>
      </section>

      <section className="infoEmer fade-in-bottom">
        <img src={contactMe} alt="Support" />
        <div className="texts">
          <h1 className="header">{t("companyPage.info.header")}</h1>
          <ul>
            <li>
              <h2>{t("companyPage.info.title1")}</h2>
              <p>+994515551555</p>
            </li>
            <li>
              <h2>{t("companyPage.info.title2")}</h2>
              <p>info@emer.az</p>
            </li>
            <li>
              <h2>{t("companyPage.info.title3")}</h2>
              <p>{t("companyPage.info.description3")}</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default CompanyPage;
