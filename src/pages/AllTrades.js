import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Button, TextField } from "@material-ui/core";

const TradeTable = ({ rows, editTrade }) => {
  rows.forEach((obj) => {
    obj.id = obj._id;
  });

  const columns = [
    { field: "ticker", headerName: "Ticker", width: 135 },
    { field: "basis", headerName: "Basis", width: 135 },
    { field: "sale_price", headerName: "Sale Price", width: 135 },
    { field: "gain_loss", headerName: "Gain/Loss", width: 135 },
    { field: "status", headerName: "Status", width: 135 },
    { field: "action", headerName: "Action", width: 135 },
    { field: "shares_bought", headerName: "Shares Bought", width: 135 },
    { field: "shares_sold", headerName: "Shares Sold", width: 135 },
    { field: "name", headerName: "Name", width: 135 },
    { field: "oe_score", headerName: "Score", width: 135 },
    { field: "date_purchased", headerName: "Purchased On", width: 135 },
    { field: "date_sold", headerName: "Sold On", width: 135 },
    { field: "notes", headerName: "Notes", width: 135 },
  ];

  return (
    <DataGrid
      rows={rows}
      onRowClick={(param) => editTrade(param)}
      columns={columns}
      pageSize={15}
      checkboxSelection
    />
  );
};
const AllTrades = () => {
  const [rows, setRows] = useState([]);
  //pull data from rows and pass to formData
  const [formData, setFormData] = useState({
    id: "",
    ticker: "",
    name: "",
    basis: "",
    sale_price: "",
    date_purchased: "",
    date_sold: "",
    gain_loss: "",
    action: "",
    status: "",
    shares_sold: "",
    shares_bought: "",
  });

  const calcGainLoss = () => {
    let { basis, sale_price, action, shares_bought, shares_sold } = formData;
    if (action === "Short") {
      setFormData((s) => {
        let price = (basis - sale_price) * shares_bought;
        return {
          ...s,
          ...{ gain_loss: price },
        };
      });
    } else {
      setFormData((s) => {
        let price = (sale_price - basis) * shares_sold;
        return {
          ...s,
          ...{ gain_loss: price },
        };
      });
    }
  };

  const editTrade = (param) => {
    console.log(param.row);

    setFormData(param.row);
  };
  const updateFormData = (e) => {
    e.persist();
    if (e.target.type === "number") {
      setFormData((s) => {
        return {
          ...s,
          ...{ [e.target.id]: parseFloat(e.target) },
        };
      });
    } else if (e.target.type === "text") {
      setFormData((s) => {
        return {
          ...s,
          ...{ [e.target.id]: e.target.value },
        };
      });
    } else {
      setFormData((s) => {
        return {
          ...s,
          ...{
            [e.target.id]: e.target.valueAsDate.toISOString(),
          },
        };
      });
    }
  };
  useEffect(() => {
    axios
      .post("/.netlify/functions/getTrades")
      .then(({ data }) => {
        setRows(data.userByEmail.trades.data);
      })
      .catch((error) => {
        console.error("Error: catch", error);
      });
  }, []);
  const updateTrade = (event) => {
    event.preventDefault();
    axios
      .post("/.netlify/functions/updateTrade", formData)
      .then(({ data }) => {})
      .catch((error) => {
        console.error("Error: catch", error);
      });
  };
  return (
    <section>
      <article style={{ width: "100%", height: "66vh" }}>
        <TradeTable rows={rows} editTrade={editTrade} />
      </article>
      <form onSubmit={updateTrade}>
        <TextField
          id='action'
          type='text'
          label='Action'
          value={formData.action}
          placeholder='Action'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='basis'
          type='number'
          label='Basis'
          value={formData.basis}
          placeholder='Basis'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='ticker'
          type='text'
          label='Ticker'
          value={formData.ticker}
          placeholder='Ticker'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='date_sold'
          type='date'
          label='Date Sold'
          value={formData.date_sold}
          placeholder='Date Sold'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='sale_price'
          type='number'
          label='Sale Price'
          value={formData.sale_price}
          placeholder='Sale Price'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='gain_loss'
          type='number'
          label='Gain/Loss'
          value={formData.gain_loss}
          placeholder='Gain/Loss'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='oe_score'
          type='number'
          label='OE Score'
          value={formData.oe_score}
          placeholder='OE Score'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='shares_bought'
          type='number'
          label='Shares Bought'
          value={formData.shares_bought}
          placeholder='Shares Bought'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='shares_sold'
          type='number'
          label='Shares Sold'
          value={formData.shares_sold}
          placeholder='Shares Sold'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='notes'
          type='text'
          label='Notes'
          value={formData.notes}
          placeholder='Notes'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='status'
          type='text'
          label='Status'
          value={formData.status}
          placeholder='Status'
          variant='filled'
          onChange={updateFormData}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={() => {
            calcGainLoss();
          }}
          variant='contained'>
          Calc Gain/Loss
        </Button>
        <Button type='submit' variant='contained'>
          Update
        </Button>
      </form>
    </section>
  );
};

export default AllTrades;
