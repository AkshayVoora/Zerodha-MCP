import { KiteConnect } from "kiteconnect";

const apiKey = "";
let accessToken = "";

const kc = new KiteConnect({ api_key: apiKey });

export async function placeOrder(tradingSymbol: string, quantity:number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(accessToken);
    await kc.placeOrder("regular", {
      exchange: "NSE",
      tradingsymbol: "HDFCBANK",
      transaction_type: "BUY",
      quantity: 1,
      product: "CNC",
      order_type: "MARKET"
    });
  } catch (err) {
    console.error(err);
  }
}
// Initialize the API calls
