'use client'

import { useState } from 'react'
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

export default function PayButton() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handlePayment = async () => {
    setLoading(true)
    setStatus(null)

    try {
      // Step 1: Initialize payment on backend
      const res = await fetch('/api/initiate-payment', { method: 'POST' })
      const { id } = await res.json()

      // Step 2: Prepare payment command payload
      const payload: PayCommandInput = {
        reference: id,
        to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // 接收者地址
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(1, Tokens.WLD).toString(), // 1 WLD
          },
        ],
        description: '購買票券 - 測試付款',
      }

      // Step 3: 檢查 MiniKit 安裝並發送支付指令
      if (!MiniKit.isInstalled()) {
        setStatus('請先安裝 World App。')
        setLoading(false)
        return
      }

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      // Step 4: 成功後回傳結果到後端驗證
      if (finalPayload.status === 'success') {
        const confirmRes = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalPayload),
        })

        const confirmResult = await confirmRes.json()
        if (confirmResult.success) {
          setStatus('付款成功！')
        } else {
          setStatus('付款驗證失敗。')
        }
      } else {
        setStatus('使用者取消或付款失敗。')
      }
    } catch (err) {
      console.error(err)
      setStatus('發生錯誤，請稍後再試。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 rounded-xl border shadow max-w-md mx-auto mt-10 text-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
      >
        {loading ? '處理中...' : '使用 World App 付款'}
      </button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  )
}
