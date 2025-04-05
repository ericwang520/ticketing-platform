import { MiniKit, tokenToDecimals, Tokens } from "@worldcoin/minikit-js";
import getWLDPrice from "./getWLDPrice";

const sendPayment = async (price:number) => {
  try {
    const to_address = "0x5877210c0cd8a77b2c01072787b666709328b6ab";
    const res = await fetch(
      `/api/initiatePayment`,
      {
        method: "POST",
      }
    );
    const WLD_price = await getWLDPrice();
    const { id } = await res.json();
    const wld_amount = Number((price / WLD_price).toFixed(2));
    console.log(id);

    const payload = {
      reference: id,
      to: to_address, // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error) {
    console.log("Error sending payment", error);
    return null;
  }
};

const handlePay = async (price:number) => {
  const username = MiniKit.user?.username;
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const sendPaymentResponse = await sendPayment(price);
  const response = sendPaymentResponse?.finalPayload;
  if (!response) {
    return;
  }

  if (response.status == "success") {
    const res = await fetch(`/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response ,username}),
    });
    const payment = await res.json();
    if (payment.success) {
      // Congrats your payment was successful!
      console.log("SUCESS!");
    } else {
      // Payment failed
      console.log("FAILED!");
    }
  }
};

export default handlePay;
