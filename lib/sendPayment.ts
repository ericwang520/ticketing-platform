import { MiniKit, tokenToDecimals, Tokens } from "@worldcoin/minikit-js";

const sendPayment = async (price: number) => {
  try {
    const wldPrice = 0.732;
    const usdcePrice = 1;
    const res = await fetch(
      `/api/initiatePayment`,
      {
        method: "POST",
      }
    );

    const { id } = await res.json();

    console.log(id);

    const payload = {
      reference: id,
      to: "0x0c892815f0B058E69987920A23FBb33c834289cf", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(price / wldPrice, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(price * usdcePrice, Tokens.USDCE).toString(),
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

const handlePay = async (price: number) => {
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
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
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