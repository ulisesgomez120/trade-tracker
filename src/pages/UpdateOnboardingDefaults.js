import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const OnboardingDefaults = () => {
  const [accountDetails, setAccountDetails] = useState({
    capital: 2100,
    risk: 0.005,
    leverage: 1,
    open_positions: 5,
  });
  const updateDetails = (event) => {
    switch (event.currentTarget.id) {
      case "capital":
        setAccountDetails({
          ...accountDetails,
          ...{ capital: event.currentTarget.value },
        });
        break;
      case "risk":
        setAccountDetails({
          ...accountDetails,
          ...{ risk: event.currentTarget.value },
        });
        break;
      case "leverage":
        setAccountDetails({
          ...accountDetails,
          ...{ leverage: event.currentTarget.value },
        });
        break;
      case "open_positions":
        setAccountDetails({
          ...accountDetails,
          ...{ open_positions: event.currentTarget.value },
        });
        break;
      default:
        console.log("hello");
    }
  };
  return (
    <section>
      <h2>onboard/update</h2>
      {/* how to make multi step form  */}
      <label htmlFor='capital'>Capital</label>
      <input
        id='capital'
        type='number'
        onChange={updateDetails}
        value={accountDetails.capital}
      />
      <label htmlFor='risk'>Max Risk (.5% of capital default)</label>
      <input
        id='risk'
        type='number'
        onChange={updateDetails}
        value={accountDetails.risk}
      />

      <label htmlFor='leverage'>Leverage</label>
      <input
        id='leverage'
        type='number'
        onChange={updateDetails}
        value={accountDetails.leverage}
      />
      <label htmlFor='open_positions'># of Open positions</label>
      <input
        id='open_positions'
        type='number'
        onChange={updateDetails}
        value={accountDetails.open_positions}
      />
      <button
        onClick={() => {
          axios
            .post("/.netlify/functions/updateAccount", accountDetails)
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error: catch", error);
            });
        }}>
        Submit
      </button>

      <Link to='/' className='nav-btn'>
        Next
      </Link>
    </section>
  );
};

export default OnboardingDefaults;
