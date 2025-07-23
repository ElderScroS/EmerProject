import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./css/fleet-css/hero.css";
import "./css/fleet-css/modal.css";

const FleetPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleCount, setVehicleCount] = useState("1-10");

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

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

  useEffect(() => {
    const savedButtonState = localStorage.getItem("isSubmitDisabled");
    const savedStartTime = localStorage.getItem("startTime");

    if (savedButtonState && savedStartTime) {
      const timeElapsed = Math.floor((Date.now() - parseInt(savedStartTime, 10)) / 1000);
      const remainingTime = 300 - timeElapsed;

      if (remainingTime > 0) {
        setIsSubmitDisabled(true);
        setTimer(remainingTime);

        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsSubmitDisabled(false);
              localStorage.removeItem("isSubmitDisabled");
              localStorage.removeItem("startTime");
              localStorage.removeItem("timer");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setIsSubmitDisabled(false);
        setTimer(0);
        localStorage.removeItem("isSubmitDisabled");
        localStorage.removeItem("startTime");
        localStorage.removeItem("timer");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("vehicle_count", vehicleCount);

    try {
      const response = await fetch("/register.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSuccessVisible(true);
        setEmail("");
        setPhone("");
        setVehicleCount("1-10");
        setIsSubmitDisabled(true);
        setTimer(300);

        localStorage.setItem("isSubmitDisabled", "true");
        localStorage.setItem("startTime", Date.now().toString());

        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsSubmitDisabled(false);
              localStorage.removeItem("isSubmitDisabled");
              localStorage.removeItem("startTime");
              localStorage.removeItem("timer");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      } else {
        
        setIsErrorVisible(true);
      }
    } catch (error) {
      setIsErrorVisible(true);
    }
  };

  const closeModal = () => {
    setIsSuccessVisible(false);
    setIsErrorVisible(false);
  };

  return (
    <main>
      <section className="hero-fleet fade-in-bottom">
        <div className="content">
          <div className="text-section">
            <h2>{t("fleetPage.hero.text.header")}</h2>
            <ul>
              <li>{t("fleetPage.hero.text.step1")}</li>
              <li>{t("fleetPage.hero.text.step2")}</li>
              <li>{t("fleetPage.hero.text.step3")}</li>
            </ul>
          </div>
          <div className="form-section">
            <form className="registration-form" onSubmit={handleSubmit}>
              <label>
                {t("fleetPage.hero.registration.emailLabel")}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("fleetPage.hero.registration.emailPlaceholder")}
                  required
                />
              </label>

              <label>
                {t("fleetPage.hero.registration.phoneLabel")}
                <div className="phone-input">
                  <span>+994</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("fleetPage.hero.registration.phonePlaceholder")}
                    required
                  />
                </div>
              </label>

              <label>
                {t("fleetPage.hero.registration.vehicleCountLabel")}
                <select value={vehicleCount} onChange={(e) => setVehicleCount(e.target.value)}>
                  <option value="1-10">1-10</option>
                  <option value="11-20">11-20</option>
                  <option value="21-50">21-50</option>
                  <option value="50+">50+</option>
                </select>
              </label>

              <button
                className="submit-button"
                type="submit"
                disabled={isSubmitDisabled}
                style={{ opacity: isSubmitDisabled ? 0.6 : 1 }}
              >
                {isSubmitDisabled
                  ? `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`
                  : t("fleetPage.hero.registration.submitButton")}
              </button>

              <p className="existing-account">
                {t("fleetPage.hero.registration.existingAccount")} <a href="https://798c.cloudtaxi.ru:10010/login/"> {t("fleetPage.hero.registration.loginLink")}</a>
              </p>

              <p className="terms">
                {t("fleetPage.hero.registration.termsStart")} <a href="https://client798c.cloudtaxi.ru/client/privacy-policy/">{t("fleetPage.hero.registration.privacyPolicy")}</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {isSuccessVisible && (
        <div className="modal-fleet-overlay visible" onClick={closeModal}>
          <div className="modal-fleet visible">
            <span className="close-fleet" onClick={closeModal}></span>
            <div className="modal-fleet-checkmark">✔</div>
            <h2 className="success">{t("fleetPage.hero.registration.successTitle")}</h2>
            <p className="success-desc">{t("fleetPage.hero.registration.successDescription")}</p>
          </div>
        </div>
      )}

      {isErrorVisible && (
        <div className="modal-fleet-overlay visible" onClick={closeModal}>
          <div className="modal-fleet visible error-fleet-modal">
            <span className="close-fleet" onClick={closeModal}></span>
            <div className="modal-fleet-error">❌</div>
            <h2 className="error-title">{t("fleetPage.hero.registration.errorTitle")}</h2>
            <p className="error-desc">{t("fleetPage.hero.registration.errorDescription")}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default FleetPage;
