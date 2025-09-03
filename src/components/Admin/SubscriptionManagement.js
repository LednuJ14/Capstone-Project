import React, { useState } from 'react';

const SubscriptionManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const subscriptionStats = [
    { title: 'Total Subscribers', value: '156', change: '+12%', icon: '👥', color: 'text-blue-600' },
    { title: 'Active Subscriptions', value: '142', change: '+8%', icon: '✅', color: 'text-green-600' },
    { title: 'Monthly Revenue', value: '₱712,500', change: '+15%', icon: '💰', color: 'text-yellow-600' },
    { title: 'Pending Renewals', value: '23', change: '-5%', icon: '⏰', color: 'text-orange-600' }
  ];

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₱2,500',
      subscribers: 45,
      revenue: '₱112,500',
      status: 'active',
      features: ['Up to 5 properties', 'Basic analytics', 'Email support']
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '₱5,000',
      subscribers: 89,
      revenue: '₱445,000',
      status: 'active',
      features: ['Up to 25 properties', 'Advanced analytics', 'Priority support', 'API access']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₱12,000',
      subscribers: 22,
      revenue: '₱264,000',
      status: 'active',
      features: ['Unlimited properties', 'Enterprise analytics', '24/7 support', 'Custom integrations']
    }
  ];

  const subscribers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Metro Property Management',
      email: 'sarah.johnson@propertymanager.com',
      plan: 'Professional',
      status: 'active',
      startDate: '2023-06-15',
      nextBilling: '2024-02-15',
      properties: 18,
      revenue: '₱5,000'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Cebu Real Estate Solutions',
      email: 'michael.chen@ceburealestate.com',
      plan: 'Enterprise',
      status: 'active',
      startDate: '2023-08-20',
      nextBilling: '2024-02-20',
      properties: 45,
      revenue: '₱12,000'
    },
    {
      id: 3,
      name: 'Maria Santos',
      company: 'Island Property Group',
      email: 'maria.santos@islandproperty.com',
      plan: 'Basic',
      status: 'active',
      startDate: '2023-12-01',
      nextBilling: '2024-02-01',
      properties: 4,
      revenue: '₱2,500'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      company: 'Urban Living Properties',
      email: 'david.rodriguez@urbanliving.com',
      plan: 'Professional',
      status: 'expired',
      startDate: '2023-05-10',
      nextBilling: '2024-01-10',
      properties: 22,
      revenue: '₱5,000'
    },
    {
      id: 5,
      name: 'Lisa Tan',
      company: 'Coastal Property Management',
      email: 'lisa.tan@coastalproperty.com',
      plan: 'Professional',
      status: 'active',
      startDate: '2023-09-15',
      nextBilling: '2024-02-15',
      properties: 19,
      revenue: '₱5,000'
    }
  ];

  const revenueData = [
    { month: 'Jan', basic: 112500, pro: 445000, enterprise: 264000 },
    { month: 'Feb', basic: 120000, pro: 460000, enterprise: 276000 },
    { month: 'Mar', basic: 125000, pro: 475000, enterprise: 288000 },
    { month: 'Apr', basic: 130000, pro: 490000, enterprise: 300000 },
    { month: 'May', basic: 135000, pro: 505000, enterprise: 312000 },
    { month: 'Jun', basic: 140000, pro: 520000, enterprise: 324000 }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Performance */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Plan Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">{plan.price}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscribers:</span>
                  <span className="font-medium">{plan.subscribers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium text-green-600">{plan.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {plan.status}
                  </span>
                </div>
              </div>
              
              <ul className="text-sm text-gray-600 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Subscription Trends</h3>
        <div className="h-80 flex items-end justify-between space-x-4">
          {revenueData.map((data, index) => {
            const totalRevenue = data.basic + data.pro + data.enterprise;
            const maxRevenue = Math.max(...revenueData.map(d => d.basic + d.pro + d.enterprise));
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                {/* Revenue Values */}
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    ₱{totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total Revenue
                  </div>
                </div>
                
                {/* Stacked Bar Chart */}
                <div className="w-full flex flex-col space-y-1">
                  {/* Basic Plan - Blue */}
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ 
                      height: `${(data.basic / maxRevenue) * 200}px`,
                      minHeight: '4px'
                    }}
                    title={`Basic: ₱${data.basic.toLocaleString()}`}
                  ></div>
                  
                  {/* Professional Plan - Green */}
                  <div 
                    className="w-full bg-green-500 transition-all duration-300 hover:bg-green-600"
                    style={{ 
                      height: `${(data.pro / maxRevenue) * 200}px`,
                      minHeight: '4px'
                    }}
                    title={`Professional: ₱${data.pro.toLocaleString()}`}
                  ></div>
                  
                  {/* Enterprise Plan - Purple */}
                  <div 
                    className="w-full bg-purple-500 rounded-b transition-all duration-300 hover:bg-purple-600"
                    style={{ 
                      height: `${(data.enterprise / maxRevenue) * 200}px`,
                      minHeight: '4px'
                    }}
                    title={`Enterprise: ₱${data.enterprise.toLocaleString()}`}
                  ></div>
                </div>
                
                {/* Month Label */}
                <div className="text-sm text-gray-500 font-medium">{data.month}</div>
                
                {/* Plan Breakdown */}
                <div className="text-center space-y-1 mt-2">
                  <div className="text-xs text-blue-600">
                    Basic: ₱{data.basic.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">
                    Pro: ₱{data.pro.toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-600">
                    Enterprise: ₱{data.enterprise.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Basic Plan</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Professional Plan</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Enterprise Plan</span>
          </div>
        </div>
        
        {/* Chart Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">
              ₱{revenueData[revenueData.length - 1].basic.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600">Basic Plan Revenue</div>
            <div className="text-xs text-blue-500 mt-1">
              {revenueData[revenueData.length - 1].basic > revenueData[0].basic ? '+' : ''}
              {((revenueData[revenueData.length - 1].basic - revenueData[0].basic) / revenueData[0].basic * 100).toFixed(1)}% from Jan
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-bold text-green-600">
              ₱{revenueData[revenueData.length - 1].pro.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Professional Plan Revenue</div>
            <div className="text-xs text-green-500 mt-1">
              {revenueData[revenueData.length - 1].pro > revenueData[0].pro ? '+' : ''}
              {((revenueData[revenueData.length - 1].pro - revenueData[0].pro) / revenueData[0].pro * 100).toFixed(1)}% from Jan
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-lg font-bold text-purple-600">
              ₱{revenueData[revenueData.length - 1].enterprise.toLocaleString()}
            </div>
            <div className="text-sm text-purple-600">Enterprise Plan Revenue</div>
            <div className="text-xs text-purple-500 mt-1">
              {revenueData[revenueData.length - 1].enterprise > revenueData[0].enterprise ? '+' : ''}
              {((revenueData[revenueData.length - 1].enterprise - revenueData[0].enterprise) / revenueData[0].enterprise * 100).toFixed(1)}% from Jan
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscribers = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Add Subscriber
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subscriber</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Properties</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Next Billing</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{subscriber.name}</div>
                      <div className="text-sm text-gray-500">{subscriber.company}</div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      subscriber.plan === 'Basic' ? 'bg-gray-100 text-gray-800' :
                      subscriber.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {subscriber.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{subscriber.properties}</td>
                  <td className="py-3 px-4 text-gray-700">{subscriber.nextBilling}</td>
                  <td className="py-3 px-4 font-medium text-green-600">{subscriber.revenue}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      {/* Billing Overview */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Billing Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">₱712,500</div>
            <div className="text-sm text-gray-500">Monthly Recurring Revenue</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₱8,550,000</div>
            <div className="text-sm text-gray-500">Annual Recurring Revenue</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">95.6%</div>
            <div className="text-sm text-gray-500">Retention Rate</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">₱4,583</div>
            <div className="text-sm text-gray-500">Average Revenue Per User</div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {subscribers.slice(0, 5).map((subscriber) => (
            <div key={subscriber.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{subscriber.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{subscriber.name}</div>
                  <div className="text-sm text-gray-500">{subscriber.company}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">{subscriber.revenue}</div>
                <div className="text-sm text-gray-500">{subscriber.plan}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Next: {subscriber.nextBilling}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {subscriber.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Plan Management */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Management</h3>
        <div className="space-y-6">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{plan.name} Plan</h4>
                  <p className="text-sm text-gray-500">₱{plan.price} per month</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit Plan
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Manage Features
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Disable Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium">Create New Plan</span>
            </div>
          </button>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-renewal</h4>
              <p className="text-sm text-gray-500">Allow automatic subscription renewals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Payment reminders</h4>
              <p className="text-sm text-gray-500">Send payment reminders before expiration</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Usage tracking</h4>
              <p className="text-sm text-gray-500">Track property usage and send alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
              <p className="text-gray-600 mt-1">Manage all property manager subscriptions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'subscribers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Subscribers
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'billing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'subscribers' && renderSubscribers()}
        {activeTab === 'billing' && renderBilling()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
