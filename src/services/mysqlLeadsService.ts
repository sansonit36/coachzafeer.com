import { getConnection, initializeDatabase, type Lead } from '../lib/mysql'
import { v4 as uuidv4 } from 'uuid'

export class MySQLLeadsService {
  private initialized = false;

  private async ensureInitialized() {
    if (!this.initialized) {
      try {
        await initializeDatabase();
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
      }
    }
  }

  // Get all leads
  async getLeads(): Promise<Lead[]> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();
      
      const [rows] = await connection.execute(
        'SELECT * FROM leads ORDER BY created_at DESC'
      );

      return (rows as any[]).map(row => ({
        ...row,
        current_challenges: typeof row.current_challenges === 'string' 
          ? JSON.parse(row.current_challenges) 
          : row.current_challenges || [],
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString()
      }));
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error(`Failed to fetch leads: ${error.message}`);
    }
  }

  // Create a new lead
  async createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
    try {
      await this.ensureInitialized();
      console.log('Creating lead with MySQL:', { email: leadData.email });
      
      const connection = await getConnection();
      const id = uuidv4();
      
      const [result] = await connection.execute(`
        INSERT INTO leads (
          id, first_name, last_name, email, phone, age, occupation, work_hours, income,
          primary_goal, timeframe, previous_experience, current_challenges, weekly_commitment,
          investment_range, ready_to_start, seriousness, obstacles, motivation,
          qualification_score, status, notes, qualified, facebook_pixel_tracked
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id,
        leadData.first_name,
        leadData.last_name,
        leadData.email,
        leadData.phone || null,
        leadData.age || null,
        leadData.occupation || null,
        leadData.work_hours || null,
        leadData.income || null,
        leadData.primary_goal || null,
        leadData.timeframe || null,
        leadData.previous_experience || null,
        JSON.stringify(leadData.current_challenges || []),
        leadData.weekly_commitment || null,
        leadData.investment_range || null,
        leadData.ready_to_start || null,
        leadData.seriousness || null,
        leadData.obstacles || null,
        leadData.motivation || null,
        leadData.qualification_score,
        leadData.status,
        leadData.notes,
        leadData.qualified,
        leadData.facebook_pixel_tracked
      ]);

      // Fetch the created lead
      const [rows] = await connection.execute(
        'SELECT * FROM leads WHERE id = ?',
        [id]
      );

      const createdLead = (rows as any[])[0];
      console.log('Lead created successfully with MySQL:', id);

      return {
        ...createdLead,
        current_challenges: JSON.parse(createdLead.current_challenges || '[]'),
        created_at: createdLead.created_at.toISOString(),
        updated_at: createdLead.updated_at.toISOString()
      };
    } catch (error) {
      console.error('Error creating lead with MySQL:', error);
      throw new Error(`Failed to create lead: ${error.message}`);
    }
  }

  // Update a lead
  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();

      // Build dynamic update query
      const updateFields = [];
      const values = [];

      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
          updateFields.push(`${key} = ?`);
          if (key === 'current_challenges') {
            values.push(JSON.stringify(value));
          } else {
            values.push(value);
          }
        }
      });

      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      values.push(id);

      await connection.execute(
        `UPDATE leads SET ${updateFields.join(', ')} WHERE id = ?`,
        values
      );

      // Fetch updated lead
      const [rows] = await connection.execute(
        'SELECT * FROM leads WHERE id = ?',
        [id]
      );

      const updatedLead = (rows as any[])[0];
      if (!updatedLead) {
        throw new Error('Lead not found after update');
      }

      return {
        ...updatedLead,
        current_challenges: JSON.parse(updatedLead.current_challenges || '[]'),
        created_at: updatedLead.created_at.toISOString(),
        updated_at: updatedLead.updated_at.toISOString()
      };
    } catch (error) {
      console.error('Error updating lead:', error);
      throw new Error(`Failed to update lead: ${error.message}`);
    }
  }

  // Delete a lead
  async deleteLead(id: string): Promise<void> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();

      const [result] = await connection.execute(
        'DELETE FROM leads WHERE id = ?',
        [id]
      );

      if ((result as any).affectedRows === 0) {
        throw new Error('Lead not found');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw new Error(`Failed to delete lead: ${error.message}`);
    }
  }

  // Get lead by email
  async getLeadByEmail(email: string): Promise<Lead | null> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();

      const [rows] = await connection.execute(
        'SELECT * FROM leads WHERE email = ?',
        [email]
      );

      const leads = rows as any[];
      if (leads.length === 0) {
        return null;
      }

      const lead = leads[0];
      return {
        ...lead,
        current_challenges: JSON.parse(lead.current_challenges || '[]'),
        created_at: lead.created_at.toISOString(),
        updated_at: lead.updated_at.toISOString()
      };
    } catch (error) {
      console.error('Error fetching lead by email:', error);
      throw new Error(`Failed to fetch lead: ${error.message}`);
    }
  }

  // Get leads by status
  async getLeadsByStatus(status: Lead['status']): Promise<Lead[]> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();

      const [rows] = await connection.execute(
        'SELECT * FROM leads WHERE status = ? ORDER BY created_at DESC',
        [status]
      );

      return (rows as any[]).map(row => ({
        ...row,
        current_challenges: JSON.parse(row.current_challenges || '[]'),
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString()
      }));
    } catch (error) {
      console.error('Error fetching leads by status:', error);
      throw new Error(`Failed to fetch leads: ${error.message}`);
    }
  }

  // Get qualified leads
  async getQualifiedLeads(): Promise<Lead[]> {
    try {
      await this.ensureInitialized();
      const connection = await getConnection();

      const [rows] = await connection.execute(
        'SELECT * FROM leads WHERE qualified = TRUE ORDER BY created_at DESC'
      );

      return (rows as any[]).map(row => ({
        ...row,
        current_challenges: JSON.parse(row.current_challenges || '[]'),
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString()
      }));
    } catch (error) {
      console.error('Error fetching qualified leads:', error);
      throw new Error(`Failed to fetch qualified leads: ${error.message}`);
    }
  }
}

// Export singleton instance
export const mysqlLeadsService = new MySQLLeadsService();