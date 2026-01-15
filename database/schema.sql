 -- =====================================================
-- KASH CONTACT APPLICATION - POSTGRESQL DATABASE SCHEMA
-- =====================================================
-- AWS RDS PostgreSQL Database Schema
-- Version: 1.0
-- Date: January 5, 2026
-- =====================================================

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS - Define application-wide enumerations
-- =====================================================

CREATE TYPE user_type AS ENUM ('user', 'corporate', 'vendor');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'scheduled', 'completed', 'cancelled', 'paused');
CREATE TYPE campaign_type AS ENUM ('individual', 'group');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('contribution', 'payment', 'refund', 'withdrawal');
CREATE TYPE voucher_status AS ENUM ('active', 'redeemed', 'expired', 'cancelled');
CREATE TYPE booking_status AS ENUM ('pending', 'approved', 'rejected', 'completed', 'cancelled');
CREATE TYPE service_status AS ENUM ('active', 'inactive', 'out_of_stock');
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');
CREATE TYPE notification_type AS ENUM ('campaign', 'transaction', 'message', 'system', 'reminder');

-- =====================================================
-- TABLE: users
-- Core user table for all user types (User, Corporate, Vendor)
-- =====================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type user_type NOT NULL,
    status user_status DEFAULT 'pending_verification',
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    
    -- Contact Information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Verification
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(6),
    otp_expires_at TIMESTAMP,
    
    -- Security
    last_login TIMESTAMP,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- =====================================================
-- TABLE: corporate_profiles
-- Extended profile information for corporate users
-- =====================================================

CREATE TABLE corporate_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Company Information
    company_name VARCHAR(255) NOT NULL,
    company_registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    industry VARCHAR(100),
    company_size VARCHAR(50), -- 'small', 'medium', 'large', 'enterprise'
    website_url TEXT,
    logo_url TEXT,
    
    -- Business Details
    business_description TEXT,
    established_year INTEGER,
    
    -- Financial
    credit_limit DECIMAL(15, 2) DEFAULT 0.00,
    current_balance DECIMAL(15, 2) DEFAULT 0.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: vendor_profiles
-- Extended profile information for vendor/service providers
-- =====================================================

CREATE TABLE vendor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Vendor Information
    business_name VARCHAR(255) NOT NULL,
    business_registration_number VARCHAR(100),
    tax_id VARCHAR(100),
    service_category VARCHAR(100), -- 'accommodation', 'dining', 'activities', 'transportation', etc.
    
    -- Business Details
    business_description TEXT,
    operating_hours TEXT,
    rating DECIMAL(3, 2) DEFAULT 0.00, -- Average rating (0.00 to 5.00)
    total_reviews INTEGER DEFAULT 0,
    
    -- Banking Information
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    account_holder_name VARCHAR(255),
    routing_number VARCHAR(50),
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_rating CHECK (rating >= 0.00 AND rating <= 5.00)
);

-- =====================================================
-- TABLE: team_members
-- Corporate team members and their roles
-- =====================================================

CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    corporate_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    member_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    role VARCHAR(50) NOT NULL, -- 'admin', 'manager', 'member', 'viewer'
    permissions JSONB, -- Flexible permissions object
    
    invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    joined_at TIMESTAMP,
    status user_status DEFAULT 'pending_verification',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(corporate_user_id, member_user_id)
);

-- =====================================================
-- TABLE: campaigns
-- Campaigns created by users or corporate accounts
-- =====================================================

CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Campaign Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    campaign_type campaign_type NOT NULL,
    status campaign_status DEFAULT 'draft',
    
    -- Media
    cover_image_url TEXT,
    gallery_images JSONB, -- Array of image URLs
    
    -- Financial Goals
    goal_amount DECIMAL(15, 2) NOT NULL,
    current_amount DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    
    -- Dates
    start_date DATE,
    end_date DATE,
    
    -- Campaign Settings
    is_public BOOLEAN DEFAULT TRUE,
    allow_anonymous_contributions BOOLEAN DEFAULT TRUE,
    max_contributors INTEGER,
    min_contribution_amount DECIMAL(15, 2),
    
    -- Stats
    total_contributors INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    
    CONSTRAINT check_goal_amount CHECK (goal_amount > 0),
    CONSTRAINT check_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

-- =====================================================
-- TABLE: campaign_services
-- Services/products selected for campaigns
-- =====================================================

CREATE TABLE campaign_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(campaign_id, service_id)
);

-- =====================================================
-- TABLE: services
-- Services offered by vendors
-- =====================================================

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Service Details
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'accommodation', 'dining', 'activities', etc.
    sub_category VARCHAR(100),
    
    -- Pricing
    base_price DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    pricing_model VARCHAR(50), -- 'fixed', 'per_person', 'per_hour', 'per_day'
    
    -- Availability
    status service_status DEFAULT 'active',
    available_quantity INTEGER,
    min_booking_quantity INTEGER DEFAULT 1,
    max_booking_quantity INTEGER,
    
    -- Media
    featured_image_url TEXT,
    gallery_images JSONB,
    
    -- Location
    location_address TEXT,
    location_city VARCHAR(100),
    location_state VARCHAR(100),
    location_country VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Additional Details
    amenities JSONB, -- Array of amenities
    terms_and_conditions TEXT,
    cancellation_policy TEXT,
    
    -- Stats
    total_bookings INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_base_price CHECK (base_price >= 0)
);

-- =====================================================
-- TABLE: bookings
-- Service bookings related to campaigns
-- =====================================================

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Booking Details
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status booking_status DEFAULT 'pending',
    
    -- Quantities and Pricing
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    
    -- Dates
    booking_date DATE NOT NULL,
    check_in_date DATE,
    check_out_date DATE,
    
    -- Additional Information
    special_requests TEXT,
    customer_notes TEXT,
    vendor_notes TEXT,
    
    -- Timestamps
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_quantity CHECK (quantity > 0)
);

-- =====================================================
-- TABLE: contributions
-- User contributions to campaigns
-- =====================================================

CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    contributor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Contribution Details
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    is_anonymous BOOLEAN DEFAULT FALSE,
    
    -- Payment Information
    payment_method VARCHAR(50), -- 'credit_card', 'bank_transfer', 'paypal', etc.
    transaction_id VARCHAR(255),
    
    -- Message
    message TEXT,
    
    -- Status
    status transaction_status DEFAULT 'pending',
    
    -- Timestamps
    processed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_contribution_amount CHECK (amount > 0)
);

-- =====================================================
-- TABLE: transactions
-- All financial transactions in the system
-- =====================================================

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Transaction Parties
    from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Transaction Details
    transaction_type transaction_type NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status transaction_status DEFAULT 'pending',
    
    -- References
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    contribution_id UUID REFERENCES contributions(id) ON DELETE SET NULL,
    
    -- Payment Information
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    gateway_transaction_id VARCHAR(255),
    
    -- Description
    description TEXT,
    notes TEXT,
    
    -- Timestamps
    processed_at TIMESTAMP,
    failed_at TIMESTAMP,
    refunded_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    VITE_AUTH_API_URL=https://YOUR_ACTUAL_API_ID.execute-api.us-east-1.amazonaws.com
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_transaction_amount CHECK (amount > 0)
);

-- =====================================================
-- TABLE: vouchers
-- Vouchers/rewards for campaigns
-- =====================================================

CREATE TABLE vouchers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Issuer
    issued_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    -- Voucher Details
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Value
    discount_type VARCHAR(20), -- 'percentage', 'fixed_amount'
    discount_value DECIMAL(15, 2) NOT NULL,
    max_discount_amount DECIMAL(15, 2),
    min_purchase_amount DECIMAL(15, 2),
    
    -- Validity
    valid_from DATE,
    valid_until DATE,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    
    -- Redemption
    redeemed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    redeemed_at TIMESTAMP,
    
    status voucher_status DEFAULT 'active',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_discount_value CHECK (discount_value > 0),
    CONSTRAINT check_valid_dates CHECK (valid_until IS NULL OR valid_until >= valid_from)
);

-- =====================================================
-- TABLE: messages
-- Direct messaging between users
-- =====================================================

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Parties
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Message Content
    subject VARCHAR(255),
    message TEXT NOT NULL,
    attachments JSONB, -- Array of attachment URLs
    
    -- References
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    
    -- Status
    status message_status DEFAULT 'sent',
    read_at TIMESTAMP,
    
    -- Threading
    parent_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: notifications
-- System notifications for users
-- =====================================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification Details
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- References
    reference_id UUID, -- Generic reference to related entity
    reference_type VARCHAR(50), -- 'campaign', 'transaction', 'booking', etc.
    
    -- Action
    action_url TEXT,
    action_label VARCHAR(100),
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: reviews
-- Reviews and ratings for services
-- =====================================================

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Review Parties
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    
    -- Review Content
    rating INTEGER NOT NULL, -- 1 to 5
    title VARCHAR(255),
    review_text TEXT,
    
    -- Media
    images JSONB, -- Array of image URLs
    
    -- Status
    is_verified BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    
    -- Vendor Response
    vendor_response TEXT,
    vendor_responded_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_rating_range CHECK (rating >= 1 AND rating <= 5),
    UNIQUE(reviewer_id, booking_id)
);

-- =====================================================
-- TABLE: support_tickets
-- Customer support tickets
-- =====================================================

CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Ticket Details
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100), -- 'technical', 'billing', 'general', etc.
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    
    -- Assignment
    assigned_to_admin_id UUID,
    
    -- Resolution
    resolution TEXT,
    resolved_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: support_ticket_messages
-- Messages within support tickets
-- =====================================================

CREATE TABLE support_ticket_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    message TEXT NOT NULL,
    attachments JSONB,
    is_internal BOOLEAN DEFAULT FALSE, -- Internal notes vs customer-visible
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: activity_logs
-- Audit trail for important user actions
-- =====================================================

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Activity Details
    action VARCHAR(100) NOT NULL, -- 'login', 'create_campaign', 'make_contribution', etc.
    entity_type VARCHAR(50), -- 'campaign', 'booking', 'transaction', etc.
    entity_id UUID,
    
    -- Details
    description TEXT,
    metadata JSONB, -- Flexible JSON for additional data
    
    -- Request Information
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: payment_methods
-- Saved payment methods for users
-- =====================================================

CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Payment Method Details
    type VARCHAR(50) NOT NULL, -- 'credit_card', 'bank_account', 'paypal', etc.
    provider VARCHAR(50), -- 'stripe', 'paypal', etc.
    
    -- Card/Account Details (encrypted)
    last_four_digits VARCHAR(4),
    card_brand VARCHAR(50),
    expiry_month INTEGER,
    expiry_year INTEGER,
    
    -- Tokenization
    token VARCHAR(255), -- Payment gateway token
    
    -- Status
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: campaign_drafts
-- Saved drafts for campaigns
-- =====================================================

CREATE TABLE campaign_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Draft Content
    draft_data JSONB NOT NULL, -- Stores complete campaign data
    
    -- Metadata
    last_edited_section VARCHAR(100),
    completion_percentage INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE: reminders
-- Scheduled reminders for campaigns
-- =====================================================

CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Reminder Details
    title VARCHAR(255) NOT NULL,
    message TEXT,
    
    -- Scheduling
    scheduled_for TIMESTAMP NOT NULL,
    sent_at TIMESTAMP,
    
    -- Recipients
    recipient_type VARCHAR(50), -- 'all_contributors', 'specific_users', 'team_members'
    recipient_ids JSONB, -- Array of user IDs
    
    status VARCHAR(20) DEFAULT 'scheduled', -- 'scheduled', 'sent', 'failed', 'cancelled'
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES - Optimize query performance
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Campaigns indexes
CREATE INDEX idx_campaigns_creator ON campaigns(creator_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_type ON campaigns(campaign_type);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX idx_campaigns_created_at ON campaigns(created_at DESC);

-- Services indexes
CREATE INDEX idx_services_vendor ON services(vendor_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_location ON services(location_city, location_state);

-- Bookings indexes
CREATE INDEX idx_bookings_campaign ON bookings(campaign_id);
CREATE INDEX idx_bookings_service ON bookings(service_id);
CREATE INDEX idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);

-- Transactions indexes
CREATE INDEX idx_transactions_from_user ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user ON transactions(to_user_id);
CREATE INDEX idx_transactions_campaign ON transactions(campaign_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- Contributions indexes
CREATE INDEX idx_contributions_campaign ON contributions(campaign_id);
CREATE INDEX idx_contributions_contributor ON contributions(contributor_id);
CREATE INDEX idx_contributions_status ON contributions(status);

-- Messages indexes
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Vouchers indexes
CREATE INDEX idx_vouchers_code ON vouchers(code);
CREATE INDEX idx_vouchers_campaign ON vouchers(campaign_id);
CREATE INDEX idx_vouchers_status ON vouchers(status);

-- Reviews indexes
CREATE INDEX idx_reviews_service ON reviews(service_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);

-- Activity logs indexes
CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_action ON activity_logs(action);
CREATE INDEX idx_activity_created_at ON activity_logs(created_at DESC);

-- =====================================================
-- FUNCTIONS - Database utilities and triggers
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update campaign current amount when contribution is made
CREATE OR REPLACE FUNCTION update_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' THEN
        UPDATE campaigns
        SET current_amount = current_amount + NEW.amount,
            total_contributors = total_contributors + 1
        WHERE id = NEW.campaign_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update service rating
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE services
    SET average_rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM reviews
        WHERE service_id = NEW.service_id
    )
    WHERE id = NEW.service_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS - Automated database actions
-- =====================================================

-- Trigger to update updated_at on all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update campaign amount on contribution
CREATE TRIGGER update_campaign_on_contribution AFTER INSERT OR UPDATE ON contributions
    FOR EACH ROW EXECUTE FUNCTION update_campaign_amount();

-- Trigger to update service rating on review
CREATE TRIGGER update_service_on_review AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_service_rating();

-- =====================================================
-- VIEWS - Convenient data access patterns
-- =====================================================

-- View for active campaigns with creator details
CREATE VIEW active_campaigns_view AS
SELECT 
    c.*,
    u.first_name || ' ' || u.last_name AS creator_name,
    u.email AS creator_email,
    u.user_type AS creator_type
FROM campaigns c
JOIN users u ON c.creator_id = u.id
WHERE c.status = 'active'
AND c.deleted_at IS NULL;

-- View for vendor services with booking stats
CREATE VIEW vendor_services_view AS
SELECT 
    s.*,
    u.first_name || ' ' || u.last_name AS vendor_name,
    vp.business_name,
    COUNT(b.id) AS total_bookings,
    AVG(r.rating)::DECIMAL(3,2) AS average_rating
FROM services s
JOIN users u ON s.vendor_id = u.id
LEFT JOIN vendor_profiles vp ON u.id = vp.user_id
LEFT JOIN bookings b ON s.id = b.service_id
LEFT JOIN reviews r ON s.id = r.service_id
GROUP BY s.id, u.id, vp.id;

-- View for user transaction history
CREATE VIEW user_transactions_view AS
SELECT 
    t.*,
    u1.first_name || ' ' || u1.last_name AS from_user_name,
    u2.first_name || ' ' || u2.last_name AS to_user_name,
    c.title AS campaign_title
FROM transactions t
LEFT JOIN users u1 ON t.from_user_id = u1.id
LEFT JOIN users u2 ON t.to_user_id = u2.id
LEFT JOIN campaigns c ON t.campaign_id = c.id;

-- =====================================================
-- INITIAL DATA SETUP (Optional)
-- =====================================================

-- Insert system admin user (change credentials in production)
-- Password: Admin@123 (hashed with bcrypt)
INSERT INTO users (email, password_hash, user_type, first_name, last_name, status, email_verified)
VALUES ('admin@kashcontact.com', '$2a$10$YourHashedPasswordHere', 'user', 'System', 'Admin', 'active', TRUE);

-- =====================================================
-- GRANTS - Database permissions (adjust for your setup)
-- =====================================================

-- Grant permissions to application user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_user;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
