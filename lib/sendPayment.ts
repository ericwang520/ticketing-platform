import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

const sendPayment = async () => {
  // Add issue bread for debugging
  const issueBread = (message: string) => {
    // @ts-ignore - Next.js issue bread
    if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
      // @ts-ignore - Next.js issue bread
      window.__NEXT_DATA__.props.pageProps.issueBread = message;
    }
  };

  try {
    issueBread('Starting payment process...');
    
    const res = await fetch('/api/initiate-payment', {
      method: 'POST',
    });
    issueBread('Payment initiation API called');
    
    const { id } = await res.json();
    issueBread(`Payment initiated with ID: ${id}`);

    const payload: PayCommandInput = {
      reference: id,
      to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(3, Tokens.USDCE).toString(),
        },
      ],
      description: 'Test example payment for minikit',
    };

    issueBread('Checking if MiniKit is installed...');
    if (!MiniKit.isInstalled()) {
      issueBread('MiniKit is not installed');
      return;
    }
    issueBread('MiniKit is installed, calling pay command...');

    const { finalPayload } = await MiniKit.commandsAsync.pay(payload);
    issueBread(`Pay command response: ${JSON.stringify(finalPayload)}`);

    if (finalPayload.status == 'success') {
      issueBread('Payment successful, confirming with backend...');
      const res = await fetch(`/api/confirm-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });
      const payment = await res.json();
      if (payment.success) {
        issueBread('Payment confirmed successfully!');
        // Congrats your payment was successful!
      }
    }
  } catch (error) {
    issueBread(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default sendPayment;