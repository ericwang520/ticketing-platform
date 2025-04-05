import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

const sendPayment = async () => {
  try {
    console.log('Starting payment process...')
    
    // 模擬 API 調用，生成一個隨機 ID
    const id = Math.random().toString(36).substring(2, 15)
    console.log('Generated payment ID:', id)

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
    }
    
    console.log('Payment payload:', JSON.stringify(payload))

    if (!MiniKit.isInstalled()) {
      console.error('MiniKit is not installed')
      alert('Worldcoin MiniKit is not installed. Please install it to continue.')
      return
    }
    
    console.log('MiniKit is installed, proceeding with payment...')

    // 直接調用 MiniKit 的 pay 方法，這應該會跳出 drawer
    const { finalPayload } = await MiniKit.commandsAsync.pay(payload)
    console.log('Payment response:', finalPayload)

    // 模擬支付成功
    console.log('Payment successful!')
    alert('Payment successful!')
    
  } catch (error) {
    console.error('Payment error:', error)
    // 顯示錯誤給用戶
    alert(`Payment error: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export default sendPayment;