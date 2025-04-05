import { NextRequest, NextResponse } from 'next/server';
import { initiatePayment } from '@/lib/db/payments';

export async function POST(req: NextRequest) {
	try {
		const uuid = crypto.randomUUID().replace(/-/g, '');
		const payment = await initiatePayment(uuid);
		
		if(!payment) {
			return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
		}
		// TODO: Store the ID field in your database so you can verify the payment later

		return NextResponse.json({ id: uuid });
	} catch (error) {
		console.error('Error initiating payment:', error);
		return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
	}
}