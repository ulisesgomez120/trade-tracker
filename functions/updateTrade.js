const query = require("./utils/query");
const UPDATE_TRADE = `
mutation($atr: Float, $basis: Float,$stop_loss: Float,$oe_score: Float, $trend: String, $status: String, $asset_type: String, $platform: String, $name: String, $ticker: String, $action: String, $date_purchased: Time, $notes: String, $id: ID!,$date_sold: Time, $sale_price: Float, $gain_loss: Float) {
  updateTrade(id: $id, data: {
    action: $action,
    basis: $basis,
    ticker: $ticker,
    date_purchased: $date_purchased,
    name: $name,
    platform: $platform,
    asset_type: $asset_type,
    status: $status,
    trend: $trend,
    atr: $atr,
    stop_loss: $stop_loss,
    oe_score: $oe_score,
    notes: $notes,
    date_sold: $date_sold, 
    sale_price: $sale_price, 
    gain_price: $gain_loss
  }){
      action
      basis 
      ticker
      date_purchased 
      name
      platform 
      asset_type
      status
      trend 
      atr
      notes
      stop_loss 
      oe_score 
      date_sold 
      sale_price
      gain_loss
      _id
  }
}
  `;
exports.handler = async (event, context) => {
  const {
    action,
    basis,
    ticker,
    date_purchased,
    name,
    platform,
    asset_type,
    status,
    trend,
    atr,
    stop_loss,
    oe_score,
    date_sold,
    sale_price,
    gain_loss,
    notes,
  } = JSON.parse(event.body);
  const { data, errors } = await query(CREATE_TRADE, {
    action,
    basis,
    ticker,
    date_purchased,
    name,
    platform,
    asset_type,
    status,
    trend,
    atr,
    stop_loss,
    oe_score,
    date_sold,
    sale_price,
    gain_loss,
    notes,
  });
  if (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
