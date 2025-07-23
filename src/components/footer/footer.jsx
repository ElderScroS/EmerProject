import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./footer.css";
import visaLogo from "../../assets/img/often/visa.webp";
import mastercardLogo from "../../assets/img/often/mastercard.webp";
import youtubeLogo from "../../assets/img/often/youtube.png";
import instagramLogo from "../../assets/img/often/instagram.png";
import tiktokLogo from "../../assets/img/often/tiktok.png";

function Footer() {
  const { t } = useTranslation(); 

  const contactLinks = [
    { href: "mailto:info@emer.az", icon: "fa-solid fa-envelope", text: "info@emer.az" },
  ];

  const footerButtons = [
    { href: "https://play.google.com/store/apps/details?id=su.client798c.taxi_emer&pcampaignid=web_share", text: t("footer.downloadEmer") },
    { href: "https://play.google.com/store/apps/details?id=su.skat.client798_EMERDriver", text: t("footer.downloadEmerDriver") },
  ];

  const footerLinks = [
    { href: "https://client798c.cloudtaxi.ru/client/privacy-policy/", text: t("footer.termsConditions") },
    { href: "https://client798c.cloudtaxi.ru/client/privacy-policy/", text: t("footer.privacyPolicy") },
    { href: "/support", text: t("footer.helpSupport") },
  ];

  return (
    <footer>
      <div className="footer-header">
        <div className="logo italic-text">
          emer
        </div>
        <nav>
          <NavLink to="/company">{t("footer.company")}</NavLink>
          <NavLink to="/support">{t("footer.contact")}</NavLink>
          <NavLink to="/">{t("footer.services")}</NavLink>
        </nav>
      </div>
      <hr className="footer-divider" />
      <div className="footer-container">
        <div className="footer-left">
          <ul>
            {contactLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-contact-link">
                  <i className={link.icon}></i> {link.text}
                </a>
              </li>
            ))}
          </ul>
          <div className="footer-accept">
            <span>{t("footer.acceptedPayments")}</span>
            <img src={visaLogo} alt="Visa" className="payment-icon" />
            <img src={mastercardLogo} alt="MasterCard" className="payment-icon" />
          </div>
        </div>

        <div className="footer-center">
          <p>&copy; 2024 MMC. {t("footer.allRightsReserved")}</p>
          <div className="footer-socials">
            <a href="https://facebook.com">
              <img src={youtubeLogo} alt="Youtube" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/emer.az?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.tiktok.com/@emer.az?is_from_webapp=1&sender_device=pc">
              <img src={tiktokLogo} alt="TikTok" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <ul>
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link">{link.text}</a>
              </li>
            ))}
          </ul>
          <div className="footer-buttons">
            {footerButtons.map((button, index) => (
              <a key={index} href={button.href} className="footer-btn">{button.text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
