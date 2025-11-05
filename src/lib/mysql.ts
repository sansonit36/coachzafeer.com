import mysql from 'mysql2/promise';

// MySQL connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'coach_zafeer',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : false,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
};

console.log('MySQL Config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  ssl: !!dbConfig.ssl
});

// Create connection pool
let pool: mysql.Pool | null = null;

export const getConnection = async () => {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log('MySQL pool created successfully');
      
      // Test connection
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('MySQL connection test successful');
    } catch (error) {
      console.error('MySQL connection failed:', error);
      throw error;
    }
  }
  return pool;
};

// Initialize database tables
export const initializeDatabase = async () => {
  try {
    const connection = await getConnection();
    
    // Create leads table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        age VARCHAR(50),
        occupation VARCHAR(255),
        work_hours VARCHAR(100),
        income VARCHAR(100),
        primary_goal VARCHAR(255),
        timeframe VARCHAR(100),
        previous_experience VARCHAR(255),
        current_challenges JSON,
        weekly_commitment VARCHAR(100),
        investment_range VARCHAR(100),
        ready_to_start VARCHAR(100),
        seriousness VARCHAR(10),
        obstacles TEXT,
        motivation TEXT,
        qualification_score INT DEFAULT 0,
        status ENUM('new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost', 'call_booked') DEFAULT 'new',
        notes TEXT DEFAULT '',
        qualified BOOLEAN DEFAULT FALSE,
        facebook_pixel_tracked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_qualified (qualified),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create calendly_bookings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS calendly_bookings (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        calendly_event_id VARCHAR(255) NOT NULL UNIQUE,
        lead_id VARCHAR(36),
        invitee_name VARCHAR(255) NOT NULL,
        invitee_email VARCHAR(255) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        event_start_time TIMESTAMP NOT NULL,
        event_end_time TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        calendly_uri TEXT,
        location TEXT,
        cancel_url TEXT,
        reschedule_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
        INDEX idx_calendly_event_id (calendly_event_id),
        INDEX idx_lead_id (lead_id),
        INDEX idx_email (invitee_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

// Database types (same as before)
export interface Lead {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  age?: string
  occupation?: string
  work_hours?: string
  income?: string
  primary_goal?: string
  timeframe?: string
  previous_experience?: string
  current_challenges?: string[]
  weekly_commitment?: string
  investment_range?: string
  ready_to_start?: string
  seriousness?: string
  obstacles?: string
  motivation?: string
  qualification_score: number
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost' | 'call_booked'
  notes: string
  qualified: boolean
  facebook_pixel_tracked: boolean
  created_at: string
  updated_at: string
}

export interface CalendlyBooking {
  id: string
  calendly_event_id: string
  lead_id?: string
  invitee_name: string
  invitee_email: string
  event_name: string
  event_start_time: string
  event_end_time: string
  status: string
  calendly_uri?: string
  location?: string
  cancel_url?: string
  reschedule_url?: string
  created_at: string
  updated_at: string
}