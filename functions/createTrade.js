const query = require("./utils/query");
const CREATE_TRADE = `
mutation($atr: Float, $basis: Float,$stop_loss: Float,$oe_score: Float, $trend: String, $status: String, $asset_type: String, $platform: String, $name: String, $ticker: String, $action: String, $date_purchased: Time, $notes: String, $shares: Float) {
  createTrade(data: {
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
    shares: $shares,
    user: {connect: "295141954559148548"}
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
      stop_loss 
      oe_score
      shares
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
    notes,
    shares,
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
    notes,
    shares,
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
