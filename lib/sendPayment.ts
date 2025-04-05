import { MiniKit, tokenToDecimals, Tokens } from "@worldcoin/minikit-js";
import getWLDPrice from "./getWLDPrice";

const sendPayment = async (price:number) => {
  try {
    const to_address = "0x5877210c0cd8a77b2c01072787b666709328b6ab";
    const WLD_price = await getWLDPrice();
    const wld_amount = Number((price / WLD_price).toFixed(2));
    
    // First initiate the payment to get a reference ID
    const res = await fetch(
      `/api/initiatePayment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ price, wld_amount })
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to initiate payment: ${res.status}`);
    }
    
    const { id } = await res.json();
    console.log("Payment reference ID:", id);

    const payload = {
      reference: id,
      to: to_address,
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(wld_amount, Tokens.WLD).toString(),
        }
      ],
      description: `Payment for service - ${wld_amount} WLD`,
    };
    
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error) {
    console.error("Error sending payment", error);
    return null;
  }
};

const handlePay = async (price:number) => {
  try {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed");
      return { success: false, error: "MiniKit is not installed" };
    }
    
    const username = MiniKit.user?.username;
    if (!username) {
      console.error("User not logged in");
      return { success: false, error: "User not logged in" };
    }
    
    console.log(`Initiating payment for ${price}`);
    const sendPaymentResponse = await sendPayment(price);
    
    if (!sendPaymentResponse) {
      console.error("Payment failed - no response from MiniKit");
      return { success: false, error: "Payment failed - no response from MiniKit" };
    }
    
    const response = sendPaymentResponse?.finalPayload;
    if (!response) {
      console.error("Payment failed - no final payload");
      return { success: false, error: "Payment failed - no final payload" };
    }

    if (response.status === "success") {
      console.log("Payment successful, confirming with backend");
      const res = await fetch(`/api/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: response, username }),
      });
      
      if (!res.ok) {
        console.error(`Failed to confirm payment: ${res.status}`);
        return { success: false, error: `Failed to confirm payment: ${res.status}` };
      }
      
      const payment = await res.json();
      if (payment.success) {
        console.log("Payment confirmed successfully!");
        return { success: true };
      } else {
        console.error("Payment confirmation failed:", payment.error || "Unknown error");
        return { success: false, error: payment.error || "Payment confirmation failed" };
      }
    } else {
      console.error("Payment failed with status:", response.status);
      return { success: false, error: `Payment failed with status: ${response.status}` };
    }
  } catch (error: any) {
    console.error("Unexpected error in handlePay:", error);
    return { success: false, error: `Unexpected error: ${error.message || 'Unknown error'}` };
  }
};

export default handlePay;
