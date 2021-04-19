import React, { useEffect, useState } from "react";
// import axios from "axios";
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
    _id: "",
    ticker: "",
    name: "",
    basis: "",
    sale_price: 0,
    date_purchased: "",
    date_sold: "",
    gain_loss: 0,
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
    setFormData(param.row);
  };
  const updateFormData = (e) => {
    if (e.currentTarget.type === "number") {
      setFormData((s) => {
        return {
          ...s,
          ...{ [e.currentTarget.id]: e.currentTarget.valueAsNumber },
        };
      });
    } else if (e.currentTarget.type === "text") {
      setFormData((s) => {
        return {
          ...s,
          ...{ [e.currentTarget.id]: e.currentTarget.value },
        };
      });
    } else {
      setFormData((s) => {
        return {
          ...s,
          ...{ [e.currentTarget.id]: e.currentTarget.valueAsDate },
        };
      });
    }
  };
  useEffect(() => {
    setRows([
      {
        action: "Short",
        asset_type: "Stock",
        atr: 1.56,
        basis: 29.2,
        date_purchased: "2021-04-16T14:53:42.320Z",
        date_sold: null,
        gain_loss: null,
        id: "296040244921238016",
        name: "",
        oe_score: 9,
        platform: "Think or Swim",
        sale_price: null,
        status: "Open",
        stop_loss: 0,
        ticker: "DRNA",
        trend: "Up",
        shares_bought: "0",
        shares_sold: "25",
        _id: "296040244921238016",
      },
    ]);
    // uncomment for production
    // axios
    //   .post("/.netlify/functions/getTrades")
    //   .then(({ data }) => {
    //     setRows(data.userByEmail.trades.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error: catch", error);
    //   });
  }, []);
  return (
    <section>
      <article style={{ width: "100%", height: "66vh" }}>
        <TradeTable rows={rows} editTrade={editTrade} />
      </article>
      <form>
        <TextField
          id='action'
          type='text'
          label='Action'
          value={formData.action}
          placeholder='Action'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='basis'
          type='number'
          label='Basis'
          value={formData.basis}
          placeholder='Basis'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='ticker'
          type='text'
          label='Ticker'
          value={formData.ticker}
          placeholder='Ticker'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='date_sold'
          type='date'
          label='Date Sold'
          value={formData.date_sold}
          placeholder='Date Sold'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='sale_price'
          type='number'
          label='Sale Price'
          value={formData.sale_price}
          placeholder='Sale Price'
          variant='filled'
          onChange={(e) => {
            updateFormData(e);
            formData.gain_loss = formData.basis - formData.sale_price;
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='gain_loss'
          type='number'
          label='Gain/Loss'
          value={formData.gain_loss}
          placeholder='Gain/Loss'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='oe_score'
          type='number'
          label='OE Score'
          value={formData.oe_score}
          placeholder='OE Score'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='shares_bought'
          type='number'
          label='Shares Bought'
          value={formData.shares_bought}
          placeholder='Shares Bought'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='shares_sold'
          type='number'
          label='Shares Sold'
          value={formData.shares_sold}
          placeholder='Shares Sold'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='notes'
          type='text'
          label='Notes'
          value={formData.notes}
          placeholder='Notes'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id='status'
          type='text'
          label='Status'
          value={formData.status}
          placeholder='Status'
          variant='filled'
          onChange={(e) => updateFormData(e)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={() => {
            calcGainLoss();
          }}
          variant='contained'>
          Default
        </Button>
      </form>
    </section>
  );
};

export default AllTrades;
