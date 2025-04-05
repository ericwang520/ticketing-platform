import { NextRequest, NextResponse } from 'next/server'
import { MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js'
import { getPayment, confirmPayment } from '@/lib/db/payments'

interface IRequestPayload {
	payload: MiniAppPaymentSuccessPayload
}

export async function POST(req: NextRequest) {
	try {
		const { payload } = (await req.json()) as IRequestPayload

		// Get the payment reference from our database
		const payment = await getPayment(payload.transaction_id)

		if (!payment) {
			return NextResponse.json(
				{ success: false, error: 'Payment not found' },
				{ status: 404 }
			)
		}
		// 1. 檢查從 mini app 接收的交易是否與我們發送的交易相同
		if (payload.reference === payment.id) {
			const response = await fetch(
				`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
					},
				}
			)

			if (!response.ok) {
				console.error('Failed to fetch transaction:', response.status, response.statusText)
				return NextResponse.json({ success: false, error: 'Failed to verify transaction' })
			}

			// TODO - missing types
			const transaction = (await response.json()) as any

			// 2. 這裡我們樂觀地確認交易
			// 否則，您可以輪詢直到 status == mined
			if (transaction.reference === payment.id && transaction.status !== 'failed') {
				await confirmPayment(payload.transaction_id , payment.to_address, payment.token, payment.amount)
				return NextResponse.json({ success: true })
			} else {
				return NextResponse.json({ success: false, error: 'Transaction verification failed' })
			}
		} else {
			return NextResponse.json({ success: false, error: 'Reference mismatch' })
		}
	} catch (error) {
		console.error('Error confirming payment:', error)
		return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
	}
}
