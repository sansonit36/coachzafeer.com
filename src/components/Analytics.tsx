import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, Calendar, DollarSign, Clock, Award } from 'lucide-react';
import { leadsService } from '../services/leadsService';
import type { Lead } from '../lib/supabase';


interface AnalyticsProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const Analytics: React.FC<AnalyticsProps> = ({ currentUser }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dateRange, setDateRange] = useState('30'); // days

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const fetchLeads = async () => {
      try {
        const data = await leadsService.getLeads();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads for analytics:', error);
        alert('Failed to load analytics data. Please refresh the page or contact support.');
        setLeads([]);
      }
    };
    
    fetchLeads();
  };

  // Filter leads by date range
  const getFilteredLeads = () => {
    const days = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return leads.filter(lead => new Date(lead.created_at) >= cutoffDate);
  };

  const filteredLeads = getFilteredLeads();

  // Analytics calculations
  const totalLeads = filteredLeads.length;
  const qualifiedLeads = filteredLeads.filter(l => l.qualified).length;
  const convertedLeads = filteredLeads.filter(l => l.status === 'converted').length;
  const qualificationRate = totalLeads > 0 ? (qualifiedLeads / totalLeads * 100).toFixed(1) : '0';
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(1) : '0';

  // Lead sources by goal
  const goalStats = filteredLeads.reduce((acc, lead) => {
    acc[lead.primary_goal] = (acc[lead.primary_goal] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Investment range analysis
  const investmentStats = filteredLeads.reduce((acc, lead) => {
    acc[lead.investment_range] = (acc[lead.investment_range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Status distribution
  const statusStats = filteredLeads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Average qualification score
  const avgQualificationScore = totalLeads > 0 
    ? (filteredLeads.reduce((sum, lead) => sum + lead.qualification_score, 0) / totalLeads).toFixed(1)
    : '0';

  // Leads by time period (last 7 days)
  const getLeadsByDay = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayLeads = filteredLeads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate.toDateString() === date.toDateString();
      }).length;
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        leads: dayLeads
      });
    }
    return last7Days;
  };

  const dailyLeads = getLeadsByDay();
  const maxDailyLeads = Math.max(...dailyLeads.map(d => d.leads), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your lead generation and conversion performance</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Qualified Rate</p>
              <p className="text-3xl font-bold text-green-600">{qualificationRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-purple-600">{conversionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-3xl font-bold text-orange-600">{avgQualificationScore}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Leads Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Leads (Last 7 Days)</h3>
          <div className="space-y-3">
            {dailyLeads.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-sm font-medium text-gray-600">{day.date}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(day.leads / maxDailyLeads) * 100}%` }}
                  >
                    {day.leads > 0 && (
                      <span className="text-white text-xs font-bold">{day.leads}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Lead Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(statusStats).map(([status, count]) => {
              const percentage = totalLeads > 0 ? (count / totalLeads * 100).toFixed(1) : '0';
              const colors = {
                new: 'bg-blue-500',
                contacted: 'bg-yellow-500',
                qualified: 'bg-green-500',
                unqualified: 'bg-red-500',
                converted: 'bg-purple-500',
                lost: 'bg-gray-500'
              };
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="w-16 text-sm font-medium text-gray-600 capitalize">{status}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className={`${colors[status as keyof typeof colors]} h-6 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-white text-xs font-bold">{count}</span>
                    </div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-600">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Primary Goals */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Primary Goals</h3>
          <div className="space-y-3">
            {Object.entries(goalStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([goal, count]) => {
                const percentage = totalLeads > 0 ? (count / totalLeads * 100).toFixed(1) : '0';
                return (
                  <div key={goal} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{goal}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Investment Ranges */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Ranges</h3>
          <div className="space-y-3">
            {Object.entries(investmentStats)
              .sort(([,a], [,b]) => b - a)
              .map(([range, count]) => {
                const percentage = totalLeads > 0 ? (count / totalLeads * 100).toFixed(1) : '0';
                return (
                  <div key={range} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{range}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Strengths</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {qualificationRate > '50' && <li>• High qualification rate ({qualificationRate}%)</li>}
              {avgQualificationScore > '60' && <li>• Strong lead quality (avg score: {avgQualificationScore})</li>}
              {convertedLeads > 0 && <li>• Active conversions ({convertedLeads} converted)</li>}
              {totalLeads > 10 && <li>• Good lead volume ({totalLeads} leads)</li>}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Opportunities</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {qualificationRate < '30' && <li>• Improve lead qualification process</li>}
              {conversionRate < '20' && <li>• Focus on conversion optimization</li>}
              {statusStats.new > totalLeads * 0.5 && <li>• Follow up on new leads faster</li>}
              {avgQualificationScore < '50' && <li>• Target higher-quality prospects</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;