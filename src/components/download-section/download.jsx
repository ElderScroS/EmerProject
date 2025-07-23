import React from "react";
import "./download.css";

import darkTheme from "../../assets/img/often/emerBlack.webp";
import lightTheme from "../../assets/img/often/emerWhite.webp";
import playMarket from "../../assets/img/often/googlePlayWhite.webp";
import appStore from "../../assets/img/often/appStoreWhite.webp";

function DownloadSection({ t }) {
  return (
  <section className="download-section fade-in-bottom">
    <img src={lightTheme} alt="Light Theme Program img" />
    <div className="download-content">
      <h1 className="download-text">{t("oftenUsed.downloadApp.title")}</h1>
      <h2 className="download-text2">{t("oftenUsed.downloadApp.description")}</h2>
      <a className="playmarket" href="https://play.google.com/store/apps/details?id=su.client798c.taxi_emer&pcampaignid=web_share">
        <img src={playMarket} alt="Play market" />
      </a>
      <a className="appstore" href="https://apps.apple.com/az/app/emer/id6744454234">
        <img src={appStore} alt="App Store" />
      </a>
    </div>
    <img src={darkTheme} alt="Dark Theme Program img" />
  </section>
  );
}

export default DownloadSection;
