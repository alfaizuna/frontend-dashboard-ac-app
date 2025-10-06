-- TukangAC Database Schema
-- Initial database setup for development

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'technician', 'customer')) NOT NULL DEFAULT 'customer',
    phone VARCHAR(20),
    address TEXT,
    specialization VARCHAR(255), -- for technicians
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technicians table
CREATE TABLE technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    duration_hours INTEGER NOT NULL DEFAULT 1,
    category VARCHAR(50) CHECK (category IN ('installation', 'maintenance', 'repair', 'cleaning')) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('unpaid', 'paid', 'overdue', 'cancelled')) DEFAULT 'unpaid',
    issued_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    paid_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoice items table
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    description VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_technicians_email ON technicians(email);
CREATE INDEX idx_technicians_specialization ON technicians(specialization);
CREATE INDEX idx_schedules_date ON schedules(scheduled_date);
CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_schedules_customer ON schedules(customer_id);
CREATE INDEX idx_schedules_technician ON schedules(technician_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);

-- Insert sample data
-- Admin user
INSERT INTO users (email, password_hash, name, role, phone) VALUES 
('admin@tukangac.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.ZJNu4VrFztV.t6dPpZ8DXOXh2V7.ZfS', 'Admin TukangAC', 'admin', '08123456789');

-- Sample services
INSERT INTO services (name, description, price, duration_hours, category) VALUES 
('AC Installation - Split', 'Instalasi AC split untuk rumah dan kantor', 2500000, 4, 'installation'),
('AC Installation - Window', 'Instalasi AC window unit', 1500000, 2, 'installation'),
('AC Maintenance', 'Perawatan rutin AC meliputi cleaning dan service', 150000, 2, 'maintenance'),
('AC Repair - Minor', 'Perbaikan AC masalah ringan', 300000, 2, 'repair'),
('AC Repair - Major', 'Perbaikan AC dengan penggantian spare part utama', 750000, 3, 'repair'),
('AC Deep Cleaning', 'Pembersihan menyeluruh AC termasuk evaporator dan kondensor', 300000, 3, 'cleaning');

-- Sample customers
INSERT INTO users (email, password_hash, name, role, phone, address) VALUES 
('john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.ZJNu4VrFztV.t6dPpZ8DXOXh2V7.ZfS', 'John Doe', 'customer', '08123456780', 'Jl. Contoh No. 123, Jakarta');

INSERT INTO customers (user_id, name, email, phone, address) 
SELECT id, name, email, phone, address FROM users WHERE email = 'john@example.com';

-- Sample technicians
INSERT INTO users (email, password_hash, name, role, phone, specialization) VALUES 
('ahmad@tukangac.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.ZJNu4VrFztV.t6dPpZ8DXOXh2V7.ZfS', 'Ahmad Subandi', 'technician', '08234567890', 'AC Split & Central');

INSERT INTO technicians (user_id, name, email, phone, specialization, experience_years, rating) 
SELECT id, name, email, phone, specialization, 5, 4.8 FROM users WHERE email = 'ahmad@tukangac.com';

-- Triggers to update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_technicians_updated_at BEFORE UPDATE ON technicians FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();