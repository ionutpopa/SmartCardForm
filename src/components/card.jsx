import { useState, useRef } from "react";

import "./card.css";

const Card = ({ closeCard }) => {
  const [cardNameExample, setCardNameExample] = useState("Name");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [cardNumberExample, setCardNumberExample] = useState(
    "**** **** **** ****"
  );
  const [expiration, setExpiration] = useState("MM/YY");

  const [cvv, setCVV] = useState("000");
  const expirationRef = useRef(null);
  const cvvRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const checkVisaCard = useRef(null);
  const checkMasterCard = useRef(null);

  const writeName = (e) => {
    setCardNameExample(e.target.value);
    if (e.target.value === "") {
      setCardNameExample("Name");
    }
  };

  let visaRegEx = /^(?:4[1-5][0-9]{14})$/;
  let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;

  const writeNumber = (e) => {
    if (visaRegEx.test(e.target.value)) {
      // you have a visa card
      checkVisaCard.current.style = "display: flex; animation: size 200ms;";
    } else {
      checkVisaCard.current.style = "display: none";
    }
    if (mastercardRegEx.test(e.target.value)) {
      // you have a master card
      checkMasterCard.current.style = "display: flex; animation: size 200ms;";
    } else {
      checkMasterCard.current.style = "display: none";
    }
    setCardNumber(
      e.target.value.replace(/[^\dA-Z]/g, "").replace(/(.{4})/g, "$1 ")
    );
    setCardNumberExample(
      e.target.value.replace(/[^\dA-Z]/g, "").replace(/(.{4})/g, "$1 ")
    );
    if (e.target.value === "") {
      setCardNumberExample("**** **** **** ****");
      setCardNumber("0000 0000 0000 0000");
    }
    if (e.target.value.length > 15) {
      expirationRef.current.focus();
    }
  };

  const writeExpiration = (e) => {
    e.target.value = e.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{2})/, "$1/")
      .trim();
    setExpiration(e.target.value);
    if (e.target.value === "") {
      setExpiration("MM/YY");
    }
    if (e.target.value.length > 4) {
      cvvRef.current.focus();
    }
  };

  const writeCVV = (e) => {
    setCVV(e.target.value);
    if (e.target.value.length > 2) {
      confirmBtnRef.current.focus();
    }
  };

  return (
    <div className="card">
      <div className="card-container">
        <div className="ics">
          <i onClick={closeCard} className="fa fa-times"></i>
        </div>
        <div className="card-details">
          <div className="card-name-card-example">
            <div className="card-name">
              <p>Card Holder Name</p>
              <input onChange={writeName} type="text" placeholder="Name" />
            </div>
            <div className="card-example">
              <div className="check-card">
                <i ref={checkVisaCard} className="fab fa-cc-visa"></i>
                <i ref={checkMasterCard} className="fab fa-cc-mastercard"></i>
              </div>
              <div className="card-square"></div>
              <p>{cardNumberExample}</p>
              <p>{cardNameExample}</p>
            </div>
          </div>

          <div className="esential-card-details">
            <div className="card-number">
              <p>Credit Card Number</p>
              <input
                onChange={writeNumber}
                type="text"
                placeholder={cardNumber}
              />
            </div>
            <div className="card-expiration">
              <p>Expiration Date</p>
              <input
                onChange={writeExpiration}
                type="text"
                placeholder={expiration}
                ref={expirationRef}
              />
            </div>
            <div className="card-cvv">
              <p>CVV</p>
              <input
                ref={cvvRef}
                onChange={writeCVV}
                type="text"
                placeholder={cvv}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        ref={confirmBtnRef}
        onClick={closeCard}
        className="confirm-button"
      >
        Confirm
      </button>
    </div>
  );
};

export default Card;
