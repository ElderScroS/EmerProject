import React, { useState, useEffect } from "react";
import "./form.css";
import "./modal.css";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const [isErrorVisible, setIsErrorVisible] = useState(false); 

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedButtonState = localStorage.getItem("isButtonDisabled");
    const savedStartTime = localStorage.getItem("startTime");

    if (savedButtonState && savedStartTime) {
      const timeElapsed = Math.floor((Date.now() - parseInt(savedStartTime, 10)) / 1000);
      const remainingTime = 300 - timeElapsed; 

      if (remainingTime > 0) {
        setIsButtonDisabled(true);
        setTimer(remainingTime);

        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsButtonDisabled(false);
              localStorage.removeItem("isButtonDisabled");
              localStorage.removeItem("startTime");
              localStorage.removeItem("timer");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(interval);
      } else {
        setIsButtonDisabled(false);
        setTimer(0);
        localStorage.removeItem("isButtonDisabled");
        localStorage.removeItem("startTime");
        localStorage.removeItem("timer");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phoneNumber);
    formData.append("message", message);

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsVisible(true);
        setIsButtonDisabled(true);
        setTimer(300); 

        localStorage.setItem("isButtonDisabled", "true");
        localStorage.setItem("startTime", Date.now().toString()); 

        setEmail("");
        setPhoneNumber("");
        setMessage("");

        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsButtonDisabled(false);
              localStorage.removeItem("isButtonDisabled");
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleModal = () => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modal = document.querySelector(".modal");

    if (isVisible) {
        modalOverlay.classList.remove("visible");
        modal.classList.remove("opening");
        modal.classList.add("closing");

        setTimeout(() => {
            setIsVisible(false);
            document.body.classList.remove("modal-open");
        }, 500);
    } else {
        setIsVisible(true);
        document.body.classList.add("modal-open");

        setTimeout(() => {
            modalOverlay.classList.add("visible");
            modal.classList.add("visible");
        }, 10);
    }
  };

  const toggleErrorModal = () => {
    setIsErrorVisible(false); 
  };

  return (
    <section className="contact-section">
      <h1>{t("oftenUsed.contact.title")}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="email-div">
          <input
            type="email"
            placeholder={t("oftenUsed.contact.emailPlaceholder")}
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
        </div>
        <div className="phone-div">
          <input
            type="tel"
            placeholder={t("oftenUsed.contact.phonePlaceholder")}
            name="phonenumber"
            id="phonenumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            aria-label="Phone number"
          />
        </div>
        <div className="message-div">
          <textarea
            placeholder={t("oftenUsed.contact.messagePlaceholder")}
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            aria-label="Your complaint or suggestion"
          ></textarea>
        </div>
        <button
          className="submit-btn"
          type="submit"
          aria-label="Submit form"
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? formatTime(timer) : t("oftenUsed.contact.submitButton")}
        </button>
      </form>

      {isVisible && (
        <div className={`modal-overlay ${isVisible ? "visible" : ""}`} onClick={toggleModal}>
          <div className={`modal ${isVisible ? "visible" : ""}`}>
            <span className="close" onClick={toggleModal}></span>
            <div className="modal-checkmark">✔</div>
            <h2 className="thanks">{t("oftenUsed.contact.thanks")}</h2>
            <p className="twenty">{t("oftenUsed.contact.247")}</p>
          </div>
        </div>
      )}

      {isErrorVisible && (
        <div className="modal-overlay visible" onClick={toggleErrorModal}>
          <div className="modal visible error-modal">
            <span className="close" onClick={toggleErrorModal}></span>
            <div className="modal-error">❌</div>
            <h2 className="wrong">{t("oftenUsed.contact.wrong")}</h2>
            <p className="try">{t("oftenUsed.contact.try")}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
