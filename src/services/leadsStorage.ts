// Simple leads storage service using JSON file in public folder

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  occupation: string;
  workHours: string;
  income: string;
  primaryGoal: string;
  timeframe: string;
  previousExperience: string;
  currentChallenges: string[];
  weeklyCommitment: string;
  investmentRange: string;
  readyToStart: string;
  seriousness: string;
  obstacles: string;
  motivation: string;
  qualificationScore: number;
  timestamp: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost' | 'call_booked';
  notes: string;
  qualified: boolean;
  callBooked?: boolean;
  callBookedAt?: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  targetType: string;
  targetId?: string;
  targetName?: string;
  details: string;
  timestamp: string;
}

class LeadsStorageService {
  private leadsUrl = '/leadsdata.json';
  private activitiesUrl = '/activitiesdata.json';

  // Get all leads
  async getLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(this.leadsUrl + '?t=' + Date.now());
      if (!response.ok) {
        console.log('No leads file found, returning empty array');
        return [];
      }
      const leads = await response.json();
      return Array.isArray(leads) ? leads : [];
    } catch (error) {
      console.error('Error fetching leads:', error);
      return [];
    }
  }

  // Save lead
  async saveLead(leadData: Omit<Lead, 'id' | 'timestamp'>): Promise<{ success: boolean; lead: Lead }> {
    try {
      // Get existing leads
      const existingLeads = await this.getLeads();
      
      // Create new lead with ID and timestamp
      const newLead: Lead = {
        ...leadData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      };
      
      // Add to leads array
      const updatedLeads = [...existingLeads, newLead];
      
      // Save to localStorage as the file (since we can't write to public folder directly from frontend)
      localStorage.setItem('leadsdata', JSON.stringify(updatedLeads));
      
      // Also trigger a download of the updated file for manual replacement
      this.downloadLeadsFile(updatedLeads);
      
      return { success: true, lead: newLead };
    } catch (error) {
      console.error('Error saving lead:', error);
      throw new Error('Failed to save lead');
    }
  }

  // Update lead
  async updateLead(id: string, updateData: Partial<Lead>): Promise<{ success: boolean; lead: Lead }> {
    try {
      const existingLeads = await this.getLeads();
      const leadIndex = existingLeads.findIndex(lead => lead.id === id);
      
      if (leadIndex === -1) {
        throw new Error('Lead not found');
      }
      
      // Update the lead
      existingLeads[leadIndex] = { 
        ...existingLeads[leadIndex], 
        ...updateData, 
        timestamp: new Date().toISOString() 
      };
      
      // Save updated leads
      localStorage.setItem('leadsdata', JSON.stringify(existingLeads));
      this.downloadLeadsFile(existingLeads);
      
      return { success: true, lead: existingLeads[leadIndex] };
    } catch (error) {
      console.error('Error updating lead:', error);
      throw new Error('Failed to update lead');
    }
  }

  // Delete lead
  async deleteLead(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const existingLeads = await this.getLeads();
      const filteredLeads = existingLeads.filter(lead => lead.id !== id);
      
      if (filteredLeads.length === existingLeads.length) {
        throw new Error('Lead not found');
      }
      
      // Save updated leads
      localStorage.setItem('leadsdata', JSON.stringify(filteredLeads));
      this.downloadLeadsFile(filteredLeads);
      
      return { success: true, message: 'Lead deleted successfully' };
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw new Error('Failed to delete lead');
    }
  }

  // Get activities
  async getActivities(): Promise<Activity[]> {
    try {
      const response = await fetch(this.activitiesUrl + '?t=' + Date.now());
      if (!response.ok) {
        console.log('No activities file found, returning empty array');
        return [];
      }
      const activities = await response.json();
      return Array.isArray(activities) ? activities : [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }

  // Save activity
  async saveActivity(activityData: Omit<Activity, 'id' | 'timestamp'>): Promise<{ success: boolean; activity: Activity }> {
    try {
      const existingActivities = await this.getActivities();
      
      const newActivity: Activity = {
        ...activityData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      };
      
      const updatedActivities = [newActivity, ...existingActivities];
      
      localStorage.setItem('activitiesdata', JSON.stringify(updatedActivities));
      this.downloadActivitiesFile(updatedActivities);
      
      return { success: true, activity: newActivity };
    } catch (error) {
      console.error('Error saving activity:', error);
      throw new Error('Failed to save activity');
    }
  }

  // Helper method to download leads file
  private downloadLeadsFile(leads: Lead[]) {
    const dataStr = JSON.stringify(leads, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leadsdata.json';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('📥 Downloaded updated leadsdata.json - Please replace the file in your public folder');
  }

  // Helper method to download activities file
  private downloadActivitiesFile(activities: Activity[]) {
    const dataStr = JSON.stringify(activities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'activitiesdata.json';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('📥 Downloaded updated activitiesdata.json - Please replace the file in your public folder');
  }

  // Initialize data from localStorage if available
  async initializeFromLocalStorage() {
    const storedLeads = localStorage.getItem('leadsdata');
    const storedActivities = localStorage.getItem('activitiesdata');
    
    if (storedLeads) {
      try {
        const leads = JSON.parse(storedLeads);
        this.downloadLeadsFile(leads);
      } catch (error) {
        console.error('Error parsing stored leads:', error);
      }
    }
    
    if (storedActivities) {
      try {
        const activities = JSON.parse(storedActivities);
        this.downloadActivitiesFile(activities);
      } catch (error) {
        console.error('Error parsing stored activities:', error);
      }
    }
  }
}

export const leadsStorage = new LeadsStorageService();