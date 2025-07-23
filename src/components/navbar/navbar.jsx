import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import "./navbar.css";
import "../../App.css";
import logoUrl from "../../assets/img/often/EMER_LOGO.svg";
import flagEnUrl from "../../assets/img/often/flagEN.webp";
import flagRuUrl from "../../assets/img/often/flagRU.webp";
import flagAzUrl from "../../assets/img/often/flagAZ.webp";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const menuRef = useRef();

  const languages = [
    { code: "en", flag: flagEnUrl },
    { code: "ru", flag: flagRuUrl },
    { code: "az", flag: flagAzUrl },
  ];

  const toggleSignUpMenu = () => setIsSignUpMenuOpen((prev) => !prev);

  const toggleLanguageMenu = () => setIsLanguageMenuOpen((prev) => !prev);
  const handleLanguageOptionClick = (language) => {
    i18n.changeLanguage(language.code);
    setCurrentLanguage(language.code);
    setIsLanguageMenuOpen(false);

    Cookies.set("language", language.code, { expires: 1 });
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsNavbarHidden(true);
    } else {
      setIsNavbarHidden(false);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const closeLanguageMenuOnClickOutside = useCallback((event) => {
    if (
      !event.target.closest(".language-btn")
    ) {
      setIsLanguageMenuOpen(false);
    }
  }, []);
  const closeSignUpMenuOnClickOutside = useCallback((event) => {
    if (
      !event.target.closest(".signUpButton")
    ) {
      setIsSignUpMenuOpen(false);
    }
  }, []);
  const closeMenuOnClickOutside = useCallback((event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest(".menuBtn")
    ) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.addEventListener("click", closeSignUpMenuOnClickOutside);
    document.addEventListener("click", closeLanguageMenuOnClickOutside);
    document.addEventListener("click", closeMenuOnClickOutside);
    return () => {
      document.removeEventListener("click", closeSignUpMenuOnClickOutside);
      document.removeEventListener("click", closeLanguageMenuOnClickOutside);
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [closeSignUpMenuOnClickOutside, closeLanguageMenuOnClickOutside, closeMenuOnClickOutside]);
    
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('navbar-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('navbar-menu-open');
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);
  const handleLinkClick = () => { 
    closeMenu();
  };
  
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header>
        <nav id="navbar" className={isNavbarHidden  ? "hidden" : ""}>
          <ul className="brand">
            <li>
              <NavLink className="logo" to="/">
                <img onClick={handleLinkClick} src={logoUrl} alt="logo" />
              </NavLink>
            </li>
          </ul>
          <ul className={`links ${isMenuOpen ? "show" : ""}`} id="navLinks" ref={menuRef}>
            <li>
              <NavLink className="linkA" to='/company' onClick={handleLinkClick}>{t("navbar.company")}</NavLink>
            </li>
            <li>
              <NavLink className="linkA" to='/support' onClick={handleLinkClick}>{t("navbar.support")}</NavLink>
            </li>
            <li className="signUpLi">
              <button className={`signUpButton ${isSignUpMenuOpen ? "animate" : ""}`} onClick={toggleSignUpMenu} >
                {t("navbar.signUp")}
              </button>
              <div className={`signUp-menu ${isSignUpMenuOpen ? "show" : ""}`}>
                <NavLink className="beAdriver" to="/driver" onClick={handleLinkClick}>
                  <i className="fa-solid fa-car"></i> {t("navbar.beAdriver")}
                </NavLink>
                <NavLink className="addFleet" to="/fleet" onClick={handleLinkClick}>
                  <i className="fa-solid fa-parking"></i> {t("navbar.addFleet")}
                </NavLink>
              </div>
            </li>
            <li>
              <button className="language-btn" onClick={toggleLanguageMenu}>
              <img
                src={languages.find((lang) => lang.code === currentLanguage)?.flag || flagAzUrl}
                alt={currentLanguage}
                className="flag-icon"
              />
              <span id="currentLanguage">{currentLanguage.toUpperCase()}</span>
              <span id="arrow" className={`arrow ${isLanguageMenuOpen ? "rotate" : ""}`}>
              {isLanguageMenuOpen ? "▲" : "▼"}
              </span>
            </button>
            <div className={`language-menu ${isLanguageMenuOpen ? "show" : ""}`}>
              {languages.map((language) => (
                <div
                  key={language.code}
                  className="language-option"
                  onClick={() => handleLanguageOptionClick(language)}>
                  <img src={language.flag} alt={language.code} />
                  <span>{language.code.toUpperCase()}</span>
                </div>
              ))}
            </div>
            </li>
          </ul>

          <button className={`menuBtn ${isMenuOpen ? 'isNavbarOpen' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation menu">
            <span id="menuIcon" className={`arrowBtn ${isMenuOpen ? 'rotate' : ''}`}>
              {isMenuOpen ? "▲" : "▼"}
            </span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;