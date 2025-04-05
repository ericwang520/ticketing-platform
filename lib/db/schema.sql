-- Create payments table for tracking cryptocurrency transactions
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) ,
    to_address VARCHAR(255),
    token VARCHAR(50) ,
    amount DECIMAL(18,0) CHECK (amount > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'initiated' 
        CHECK (status IN ('initiated', 'pending', 'completed', 'failed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_token CHECK (token ~ '^[A-Za-z0-9]+$'),
    CONSTRAINT valid_address CHECK (to_address ~ '^0x[a-fA-F0-9]{40}$')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_token ON payments(token);

-- Add comment to table
COMMENT ON TABLE payments IS 'Stores cryptocurrency payment transactions'; 