import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@propertymanager.com',
      phone: '+63 912 345 6789',
      position: 'Senior Property Manager',
      company: 'Metro Property Management',
      location: 'Cebu City, Philippines',
      bio: 'Experienced property manager with over 8 years in residential and commercial property management. Specialized in student housing and boarding house operations.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    stats: {
      totalProperties: 24,
      activeListings: 18,
      totalUnits: 156,
      occupiedUnits: 142,
      monthlyRevenue: '₱2,450,000',
      averageOccupancy: '91%',
      responseRate: '98%',
      averageRating: 4.8
    },
    recentActivity: [
      {
        id: 1,
        type: 'listing',
        action: 'Published new listing',
        property: 'Student Haven Boarding House - Unit 3A',
        time: '2 hours ago',
        icon: '🏠',
        status: 'success'
      },
      {
        id: 2,
        type: 'inquiry',
        action: 'Responded to inquiry',
        property: 'Workers Lodge - Unit 5B',
        time: '4 hours ago',
        icon: '💬',
        status: 'info'
      },
      {
        id: 3,
        type: 'maintenance',
        action: 'Scheduled maintenance',
        property: 'Family Home Apartments - Unit 2C',
        time: '1 day ago',
        icon: '🔧',
        status: 'warning'
      },
      {
        id: 4,
        type: 'payment',
        action: 'Received rent payment',
        property: 'Downtown Apartments - Unit 7A',
        time: '2 days ago',
        icon: '💰',
        status: 'success'
      },
      {
        id: 5,
        type: 'inspection',
        action: 'Completed unit inspection',
        property: 'Budget Boarding House - Unit 1B',
        time: '3 days ago',
        icon: '✅',
        status: 'success'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  const handleInputChange = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Profile Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
                <img
                  src={profileData.personalInfo.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white text-gray-800 p-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-200 group-hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{profileData.personalInfo.name}</h1>
                <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{profileData.stats.averageRating}</span>
                </div>
              </div>
              <p className="text-xl text-gray-300 mb-1">{profileData.personalInfo.position}</p>
              <p className="text-gray-400 mb-4">{profileData.personalInfo.company}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profileData.personalInfo.location}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {profileData.personalInfo.phone}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">+8.2%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.totalProperties}</h3>
          <p className="text-gray-600 text-sm">Total Properties</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.activeListings}</h3>
          <p className="text-gray-600 text-sm">Active Listings</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">+3.1%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.averageOccupancy}</h3>
          <p className="text-gray-600 text-sm">Occupancy Rate</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">+15.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.monthlyRevenue}</h3>
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {profileData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  activity.status === 'success' ? 'bg-green-100 text-green-600' :
                  activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{activity.action}</p>
                  <p className="text-sm text-gray-600 mb-1">{activity.property}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        <p className="text-gray-600 mt-1">Update your personal details and contact information</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.name}
              onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.position}
              onChange={(e) => handleInputChange('personalInfo', 'position', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.company}
              onChange={(e) => handleInputChange('personalInfo', 'company', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={profileData.personalInfo.location}
              onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={4}
              value={profileData.personalInfo.bio}
              onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Notification Settings</h3>
          <p className="text-gray-600 mt-1">Manage your notification preferences</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <div>
                <p className="font-semibold text-gray-900">New Inquiry Notifications</p>
                <p className="text-sm text-gray-600 mt-1">Get notified when someone inquires about your properties</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <div>
                <p className="font-semibold text-gray-900">Payment Notifications</p>
                <p className="text-sm text-gray-600 mt-1">Receive alerts for rent payments and late fees</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <div>
                <p className="font-semibold text-gray-900">Maintenance Alerts</p>
                <p className="text-sm text-gray-600 mt-1">Get notified about maintenance requests and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
          <p className="text-gray-600 mt-1">Manage your account security</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
              Change Password
            </button>
            <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
              Enable Two-Factor Authentication
            </button>
            <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
              View Login History
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Account Actions</h3>
          <p className="text-gray-600 mt-1">Manage your account data</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <button className="w-full md:w-auto px-6 py-3 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-all duration-200 font-medium">
              Export My Data
            </button>
            <button className="w-full md:w-auto px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscription = () => (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Current Subscription</h3>
          <p className="text-gray-600 mt-1">Manage your subscription and billing</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">Professional</div>
              <div className="text-sm text-gray-500 mt-1">Current Plan</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="text-sm text-gray-500 mt-1">Status</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2024-02-15</div>
              <div className="text-sm text-gray-500 mt-1">Next Billing</div>
            </div>
          </div>
          
          {/* Usage Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Properties Usage</span>
              <span className="text-sm text-gray-500">18/25</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '72%' }}></div>
            </div>
            <div className="text-sm text-gray-500 mt-1">72% of limit used</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium">
              Manage Subscription
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
              View Billing History
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Available Plans</h3>
          <p className="text-gray-600 mt-1">Choose the plan that fits your needs</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Basic</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">₱2,500</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Up to 5 properties</li>
                <li>• Basic analytics</li>
                <li>• Email support</li>
              </ul>
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Current Plan
              </button>
            </div>
            
            <div className="border-2 border-blue-500 rounded-xl p-6 bg-blue-50">
              <div className="text-center mb-4">
                <div className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-2">Current Plan</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Professional</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">₱5,000</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Up to 25 properties</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
                <li>• API access</li>
              </ul>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Current Plan
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">₱12,000</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Unlimited properties</li>
                <li>• Enterprise analytics</li>
                <li>• 24/7 support</li>
                <li>• Custom integrations</li>
              </ul>
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Manager Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your property statistics</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'personal', label: 'Personal Info', icon: '👤' },
              { id: 'subscription', label: 'Subscription', icon: '💳' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'subscription' && renderSubscription()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
