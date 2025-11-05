import React, { useState, useEffect } from 'react';
import { Activity, User, Calendar, Filter, Search, Eye, Edit, Trash2, UserPlus, Settings } from 'lucide-react';

interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  details: string;
  timestamp: string;
  action: 'view' | 'edit' | 'delete' | 'create' | 'status_change' | 'note_add' | 'user_create' | 'user_edit' | 'login' | 'call_booked';
  targetType: 'lead' | 'user' | 'system';
  targetId?: string;
  targetName?: string;
  ipAddress?: string;
}

interface ActivityLogProps {
  currentUser: { id: string; name: string; email: string; role: string };
}

const ActivityLog: React.FC<ActivityLogProps> = ({ currentUser }) => {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [activities, searchTerm, actionFilter, userFilter, dateFilter]);

  const loadActivities = () => {
    // TODO: Implement activity loading with Supabase
    // For now, load from localStorage as fallback
    const storedActivities = localStorage.getItem('dashboard-activities');
    if (storedActivities) {
      const activities = JSON.parse(storedActivities);
      setActivities(activities.sort((a: ActivityLogEntry, b: ActivityLogEntry) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }
  };

  const filterActivities = () => {
    let filtered = activities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.targetName && activity.targetName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Action filter
    if (actionFilter !== 'all') {
      filtered = filtered.filter(activity => activity.action === actionFilter);
    }

    // User filter
    if (userFilter !== 'all') {
      filtered = filtered.filter(activity => activity.userId === userFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(activity => 
          new Date(activity.timestamp) >= filterDate
        );
      }
    }

    setFilteredActivities(filtered);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view': return <Eye className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'create': return <UserPlus className="w-4 h-4" />;
      case 'status_change': return <Settings className="w-4 h-4" />;
      case 'note_add': return <Edit className="w-4 h-4" />;
      case 'user_create': return <UserPlus className="w-4 h-4" />;
      case 'user_edit': return <Edit className="w-4 h-4" />;
      case 'login': return <User className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'bg-blue-100 text-blue-800';
      case 'edit': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'create': return 'bg-green-100 text-green-800';
      case 'status_change': return 'bg-purple-100 text-purple-800';
      case 'note_add': return 'bg-indigo-100 text-indigo-800';
      case 'user_create': return 'bg-emerald-100 text-emerald-800';
      case 'user_edit': return 'bg-orange-100 text-orange-800';
      case 'login': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return time.toLocaleDateString();
  };

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(activities.map(a => a.userId)))
    .map(userId => activities.find(a => a.userId === userId))
    .filter(Boolean) as ActivityLogEntry[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Activity Log</h2>
        <p className="text-gray-600">Track all user actions and system events</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Actions</option>
            <option value="view">View</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            <option value="create">Create</option>
            <option value="status_change">Status Change</option>
            <option value="login">Login</option>
          </select>
          
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userName}
              </option>
            ))}
          </select>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activities Found</h3>
              <p className="text-gray-600">No activities match your current filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${getActionColor(activity.action)}`}>
                      {getActionIcon(activity.action)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{activity.userName}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                            {activity.action.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                      
                      <p className="text-gray-700 mt-1">{activity.details}</p>
                      
                      {activity.targetName && (
                        <p className="text-sm text-gray-500 mt-1">
                          Target: <span className="font-medium">{activity.targetName}</span>
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                        {activity.ipAddress && (
                          <span>IP: {activity.ipAddress}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-blue-600">
            {activities.filter(a => a.action === 'view').length}
          </div>
          <div className="text-sm text-gray-600">Views</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {activities.filter(a => a.action === 'edit').length}
          </div>
          <div className="text-sm text-gray-600">Edits</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-green-600">
            {activities.filter(a => a.action === 'create').length}
          </div>
          <div className="text-sm text-gray-600">Creates</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="text-2xl font-bold text-gray-600">
            {uniqueUsers.length}
          </div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;