import React from "react";
import { Link } from "react-router-dom";
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    console.log(sheet.title);
    const result = await sheet.addRow(row);
  } catch (e) {
    console.error("Error: ", e);
  }
};

const newRow = { Ticker: "new name", Name: "new value" };

const OnboardingDefaults = () => {
  appendSpreadsheet(newRow);
  return (
    <section>
      <h2>onboard/update</h2>
      {/* how to make multi step form  */}
      <form>
        <label htmlFor='capital'>Capital</label>
        <input id='capital' type='number' value='' />
        <label htmlFor='max-risk'>Max Risk (.5% of capital default)</label>
        <input id='max-risk' type='number' value='' />

        <label htmlFor='leverage'>Leverage</label>
        <input id='leverage' type='number' value='' />
        <label htmlFor='positions-open'># of Open positions</label>
        <input id='positions-open' type='number' value='' />
        <input type='submit' title='submit' />
      </form>
      <Link to='/tracker' className='nav-btn'>
        Next
      </Link>
    </section>
  );
};

export default OnboardingDefaults;
