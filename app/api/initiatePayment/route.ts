import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	try {
		const uuid = crypto.randomUUID().replace(/-/g, '');
		
		// 在 cookie 中設置 payment-nonce
		const cookieStore = await cookies();
		cookieStore.set('payment-nonce', uuid, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60, // 1 小時
			path: '/',
		});
		
		console.log(uuid);
		
		// TODO: Store the ID field in your database so you can verify the payment later

		return NextResponse.json({ id: uuid });
	} catch (error) {
		console.error('Error initiating payment:', error);
		return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
	}
}