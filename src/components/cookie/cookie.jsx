import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./cookie.css";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>{t("cookies.cookieMessage")}</p>
        <div className="cookies-button">
          <button onClick={handleAgree} className="agree-btn">
            {t("cookies.agree")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
