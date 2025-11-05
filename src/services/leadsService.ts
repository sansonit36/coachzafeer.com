import { supabase, type Lead } from '../lib/supabase'

export class LeadsService {
  // Get all leads
  async getLeads(): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        throw new Error(`Failed to fetch leads: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getLeads:', error)
      throw error
    }
  }

  // Create a new lead
  async createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
    try {
      return await mysqlLeadsService.createLead(leadData)
    } catch (error) {
      console.error('Error in createLead service:', error);
      throw error;
    }
  }

  // Update a lead
  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      return await mysqlLeadsService.updateLead(id, updates)
    } catch (error) {
      console.error('Error in updateLead:', error)
      throw error
    }
  }

  // Delete a lead
  async deleteLead(id: string): Promise<void> {
    try {
      await mysqlLeadsService.deleteLead(id)
    } catch (error) {
      console.error('Error in deleteLead:', error)
      throw error
    }
  }

  // Get lead by email
  async getLeadByEmail(email: string): Promise<Lead | null> {
    try {
      return await mysqlLeadsService.getLeadByEmail(email)
    } catch (error) {
      console.error('Error in getLeadByEmail:', error)
      throw error
    }
  }

  // Get leads by status
  async getLeadsByStatus(status: Lead['status']): Promise<Lead[]> {
    try {
      return await mysqlLeadsService.getLeadsByStatus(status)
    } catch (error) {
      console.error('Error in getLeadsByStatus:', error)
      throw error
    }
  }

  // Get qualified leads
  async getQualifiedLeads(): Promise<Lead[]> {
    try {
      return await mysqlLeadsService.getQualifiedLeads()
    } catch (error) {
      console.error('Error in getQualifiedLeads:', error)
      throw error
    }
  }
}

// Export singleton instance
export const leadsService = new LeadsService()