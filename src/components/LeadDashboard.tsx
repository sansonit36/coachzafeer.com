import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, Edit, Trash2, Star, Phone, Mail, Calendar, Eye, Plus, X, Users, Activity, Settings, LogOut, BarChart3 } from 'lucide-react';
import LoginForm from './LoginForm';
import UserManagement from './UserManagement';
import ActivityLog from './ActivityLog';
import Analytics from './Analytics';
import AdminPanel from './AdminPanel';
import { leadsService } from '../services/leadsService';
import type { Lead } from '../lib/supabase';

interface ExtendedLead extends Lead {
  sessionId?: string;
  userJourney?: Array<{
    step: string;
    timestamp: string;
    data?: any;
  }>;
  source?: string;
  referrer?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: 'view' | 'edit' | 'delete' | 'create' | 'status_change' | 'note_add' | 'call_booked';
  targetType: 'lead' | 'user';
  targetId?: string;
  targetName?: string;
  details: string;
  timestamp: string;
}

const LeadDashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<ExtendedLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<ExtendedLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [qualificationFilter, setQualificationFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<ExtendedLead | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookedOnly, setShowBookedOnly] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');

  // Check for logged in user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dashboard-user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await leadsService.getLeads();
      setLeads(data.sort((a: ExtendedLead, b: ExtendedLead) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (error) {
      console.error('Error fetching leads:', error);
      alert('Failed to load leads. Please refresh the page or contact support.');
      setLeads([]);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filterLeads = () => {
    let filtered = leads;

    // Show only booked calls filter
    if (showBookedOnly) {
      filtered = filtered.filter(lead => lead.status === 'call_booked');
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.occupation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Qualification filter
    if (qualificationFilter === 'qualified') {
      filtered = filtered.filter(lead => lead.qualified);
    } else if (qualificationFilter === 'unqualified') {
      filtered = filtered.filter(lead => !lead.qualified);
    }

    setFilteredLeads(filtered);
  };

  useEffect(() => {
    filterLeads(); 
  }, [leads, searchTerm, statusFilter, qualificationFilter, showBookedOnly]);

  const logActivity = (action: ActivityLogEntry['action'], targetId?: string, targetName?: string, details?: string) => {
    const activity = {
      userId: currentUser!.id,
      userName: currentUser!.name,
      action,
      targetType: 'lead',
      targetId,
      targetName,
      details: details || `${action} action performed`
    };

    // TODO: Implement activity logging with Supabase
    console.log('Activity logged:', activity);
  };

  // Show login form if no user is logged in
  if (!currentUser) {
    return <LoginForm onLogin={setCurrentUser} />;
  }

  const updateLeadStatus = async (leadId: string, newStatus: ExtendedLead['status']) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      await leadsService.updateLead(leadId, { status: newStatus });
      
      // Update local state
      const updatedLeads = leads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      );
      setLeads(updatedLeads);
      
      if (lead) {
        logActivity('status_change', leadId, `${lead.first_name} ${lead.last_name}`, `Changed status to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('Failed to update lead status. Please try again.');
    }
  };

  const updateLeadNotes = async (leadId: string, notes: string) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      await leadsService.updateLead(leadId, { notes });
      
      // Update local state
      const updatedLeads = leads.map(lead =>
        lead.id === leadId ? { ...lead, notes } : lead
      );
      setLeads(updatedLeads);
      
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, notes });
      }
      
      if (lead) {
        logActivity('note_add', leadId, `${lead.first_name} ${lead.last_name}`, 'Added/updated notes');
      }
    } catch (error) {
      console.error('Error updating lead notes:', error);
      alert('Failed to update notes. Please try again.');
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      if (window.confirm('Are you sure you want to delete this lead?')) {
        await leadsService.deleteLead(leadId);
        
        // Update local state
        const updatedLeads = leads.filter(lead => lead.id !== leadId);
        setLeads(updatedLeads);
        
        if (lead) {
          logActivity('delete', leadId, `${lead.first_name} ${lead.last_name}`, 'Deleted lead');
        }
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Age', 'Occupation', 'Income', 'Primary Goal',
      'Investment Range', 'Qualification Score', 'Status', 'Timestamp', 'Notes'
    ];

    const csvData = filteredLeads.map(lead => [
      `${lead.first_name} ${lead.last_name}`,
      lead.email,
      lead.phone,
      lead.age,
      lead.occupation,
      lead.income,
      lead.primary_goal,
      lead.investment_range,
      lead.qualification_score,
      lead.status,
      new Date(lead.created_at).toLocaleDateString(),
      lead.notes.replace(/,/g, ';') // Replace commas to avoid CSV issues
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: ExtendedLead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'unqualified': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      case 'call_booked': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualificationBadge = (score: number) => {
    if (score >= 80) return { text: 'High', color: 'bg-green-500' };
    if (score >= 60) return { text: 'Medium', color: 'bg-yellow-500' };
    return { text: 'Low', color: 'bg-red-500' };
  };

  const openLeadModal = (lead: ExtendedLead) => {
    setSelectedLead(lead);
    setTempNotes(lead.notes);
    setShowModal(true);
    setEditingNotes(false);
    logActivity('view', lead.id, `${lead.first_name} ${lead.last_name}`, 'Viewed lead details');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('dashboard-user');
    setCurrentUser(null);
  };

  const tabs = [
    { id: 'leads', name: 'Leads', icon: Users, count: leads.length },
    { id: 'admin', name: 'Content', icon: Settings, count: null },
    { id: 'users', name: 'Users', icon: Settings, count: null },
    { id: 'activity', name: 'Activity Log', icon: Activity, count: null },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: null }
  ];

  const saveNotes = () => {
    if (selectedLead) {
      updateLeadNotes(selectedLead.id, tempNotes);
      setEditingNotes(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Coach Dashboard</h1>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span>{currentUser.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{currentUser.role}</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                  {tab.count !== null && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
                  <p className="text-gray-600 mt-1">Manage and track your fitness coaching leads</p>
                </div>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
                  <div className="text-sm text-blue-600">Total Leads</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {leads.filter(l => l.qualified).length}
                  </div>
                  <div className="text-sm text-green-600">Qualified</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {leads.filter(l => l.status === 'new').length}
                  </div>
                  <div className="text-sm text-yellow-600">New Leads</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {leads.filter(l => l.status === 'call_booked').length}
                  </div>
                  <div className="text-sm text-purple-600">Calls Booked</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="unqualified">Unqualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
                
                <select
                  value={qualificationFilter}
                  onChange={(e) => setQualificationFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Qualifications</option>
                  <option value="qualified">Qualified Only</option>
                  <option value="unqualified">Unqualified Only</option>
                </select>
                
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={showBookedOnly}
                    onChange={(e) => setShowBookedOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Booked Calls Only</span>
                </label>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => {
                      const qualification = getQualificationBadge(lead.qualification_score);
                      return (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {lead.first_name} {lead.last_name}
                              </div>
                              <div className="text-sm text-gray-500">{lead.occupation}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{lead.email}</div>
                            <div className="text-sm text-gray-500">{lead.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{lead.primary_goal}</div>
                            <div className="text-sm text-gray-500">{lead.timeframe}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lead.status === 'call_booked' ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  ✓ Call Booked
                                </span>
                              </div>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                No Call
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{lead.investment_range}</div>
                            <div className="text-sm text-gray-500">{lead.ready_to_start}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getQualificationBadge(lead.qualification_score).color}`}>
                              {lead.qualification_score} - {getQualificationBadge(lead.qualification_score).text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as ExtendedLead['status'])}
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${getStatusColor(lead.status)}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="unqualified">Unqualified</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                              <option value="call_booked">Call Booked</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openLeadModal(lead)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-orange-600 hover:text-orange-900"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminPanel currentUser={currentUser} />
        )}

        {activeTab === 'users' && (
          <UserManagement currentUser={currentUser} />
        )}

        {activeTab === 'activity' && (
          <ActivityLog currentUser={currentUser} />
        )}

        {activeTab === 'analytics' && (
          <Analytics currentUser={currentUser} />
        )}
      </div>

      {/* Lead Detail Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedLead.first_name} {selectedLead.last_name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {selectedLead.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedLead.phone}</p>
                    <p><span className="font-medium">Age:</span> {selectedLead.age}</p>
                    <p><span className="font-medium">Occupation:</span> {selectedLead.occupation}</p>
                    <p><span className="font-medium">Work Hours:</span> {selectedLead.work_hours}</p>
                    <p><span className="font-medium">Income:</span> {selectedLead.income}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Fitness Goals</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Primary Goal:</span> {selectedLead.primary_goal}</p>
                    <p><span className="font-medium">Timeframe:</span> {selectedLead.timeframe}</p>
                    <p><span className="font-medium">Experience:</span> {selectedLead.previous_experience}</p>
                    <p><span className="font-medium">Weekly Commitment:</span> {selectedLead.weekly_commitment}</p>
                    <p><span className="font-medium">Investment Range:</span> {selectedLead.investment_range}</p>
                    <p><span className="font-medium">Ready to Start:</span> {selectedLead.ready_to_start}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Challenges</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.current_challenges.map((challenge, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {challenge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Qualification Details</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p><span className="font-medium">Seriousness Level:</span> {selectedLead.seriousness}/10</p>
                  <p><span className="font-medium">Qualification Score:</span> {selectedLead.qualification_score}/100</p>
                  <p><span className="font-medium">Obstacles:</span> {selectedLead.obstacles}</p>
                  <p><span className="font-medium">Motivation:</span> {selectedLead.motivation}</p>
                  {selectedLead.status === 'call_booked' && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-green-800 font-semibold">✓ Call Booked</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                  {!editingNotes ? (
                    <button
                      onClick={() => setEditingNotes(true)}
                      className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Notes
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={saveNotes}
                        className="text-green-600 hover:text-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingNotes(false);
                          setTempNotes(selectedLead.notes);
                        }}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {editingNotes ? (
                  <textarea
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Add notes about this lead..."
                  />
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 min-h-[100px]">
                    {selectedLead.notes || 'No notes added yet.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDashboard;