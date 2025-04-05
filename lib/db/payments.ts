import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

export type PaymentStatus = 'initiated' | 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Payment {
    id: string;
    user_id: string;
    to_address: string;
    token: string;
    amount: number;
    status: PaymentStatus;
    created_at: Date;
    updated_at: Date;
}

function convertToPayment(row: any): Payment {
    return {
        id: row.id,
        user_id: row.user_id,
        to_address: row.to_address,
        token: row.token,
        amount: Number(row.amount),
        status: row.status as PaymentStatus,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
    };
}

export async function initiatePayment(
    transaction_id: string,
): Promise<Payment> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            INSERT INTO payments (id,status)
            VALUES (${transaction_id}, 'initiated')
            RETURNING *
        `;
        return convertToPayment(data[0]);
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw new Error('Failed to initiate payment');
    }
}

export async function confirmPayment(
    transaction_id: string,
    to_address: string,
    token: string,
    amount: number
): Promise<Payment> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            UPDATE payments 
            SET to_address = ${to_address},
                token = ${token},
                amount = ${amount},
                status = 'completed',
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = ${transaction_id}
            RETURNING *
        `;
        if (!data[0]) {
            throw new Error('Payment not found');
        }
        return convertToPayment(data[0]);
    } catch (error) {
        console.error('Error confirming payment:', error);
        throw new Error('Failed to confirm payment');
    }
}

export async function updatePaymentStatus(
    id: string,
    status: PaymentStatus
): Promise<Payment> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            UPDATE payments 
            SET status = ${status},
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = ${id}
            RETURNING *
        `;
        if (!data[0]) {
            throw new Error('Payment not found');
        }
        return convertToPayment(data[0]);
    } catch (error) {
        console.error('Error updating payment status:', error);
        throw new Error('Failed to update payment status');
    }
}

export async function getPayment(id: string): Promise<Payment | null> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            SELECT * FROM payments WHERE id = ${id}
        `;
        return data[0] ? convertToPayment(data[0]) : null;
    } catch (error) {
        console.error('Error getting payment:', error);
        throw new Error('Failed to get payment');
    }
}

export async function getUserPayments(
    user_id: string,
    limit: number = 10,
    offset: number = 0,
    status?: PaymentStatus
): Promise<Payment[]> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            SELECT * FROM payments
            WHERE user_id = ${user_id}
            ${status ? sql`AND status = ${status}` : sql``}
            ORDER BY created_at DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;
        return data.map(convertToPayment);
    } catch (error) {
        console.error('Error listing user payments:', error);
        throw new Error('Failed to list user payments');
    }
}

export async function getPaymentsByToken(
    token: string,
    limit: number = 10,
    offset: number = 0,
    status?: PaymentStatus
): Promise<Payment[]> {
    const sql = neon(DATABASE_URL);
    try {
        const data = await sql`
            SELECT * FROM payments
            WHERE token = ${token}
            ${status ? sql`AND status = ${status}` : sql``}
            ORDER BY created_at DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `;
        return data.map(convertToPayment);
    } catch (error) {
        console.error('Error listing token payments:', error);
        throw new Error('Failed to list token payments');
    }
}