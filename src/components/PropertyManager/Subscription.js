import React, { useState } from 'react';

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₱2,500',
      period: 'month',
      features: [
        'Up to 5 properties',
        'Basic analytics',
        'Email support',
        'Standard listing features',
        'Basic reporting'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '₱5,000',
      period: 'month',
      features: [
        'Up to 25 properties',
        'Advanced analytics',
        'Priority support',
        'Premium listing features',
        'Advanced reporting',
        'Custom branding',
        'API access'
      ],
      popular: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₱12,000',
      period: 'month',
      features: [
        'Unlimited properties',
        'Enterprise analytics',
        '24/7 dedicated support',
        'All premium features',
        'Custom integrations',
        'White-label solution',
        'Advanced security',
        'SLA guarantee'
      ],
      popular: false,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const currentSubscription = {
    plan: 'Professional',
    status: 'active',
    nextBilling: '2024-02-15',
    amount: '₱5,000',
    properties: 18,
    limit: 25,
    usage: '72%'
  };

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: '₱5,000',
      status: 'paid',
      invoice: 'INV-2024-001',
      plan: 'Professional'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: '₱5,000',
      status: 'paid',
      invoice: 'INV-2023-012',
      plan: 'Professional'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: '₱5,000',
      status: 'paid',
      invoice: 'INV-2023-011',
      plan: 'Professional'
    }
  ];

  const renderPlans = () => (
    <div className="space-y-8">
      {/* Current Plan Status */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Subscription</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{currentSubscription.plan}</div>
            <div className="text-sm text-gray-500 mt-1">Current Plan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{currentSubscription.status}</div>
            <div className="text-sm text-gray-500 mt-1">Status</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{currentSubscription.nextBilling}</div>
            <div className="text-sm text-gray-500 mt-1">Next Billing</div>
          </div>
        </div>
        
        {/* Usage Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Properties Usage</span>
            <span className="text-sm text-gray-500">{currentSubscription.properties}/{currentSubscription.limit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: currentSubscription.usage }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">{currentSubscription.usage} of limit used</div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                selectedPlan === plan.id ? 'border-blue-500 shadow-blue-100' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {plan.price}
                    <span className="text-lg text-gray-500">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Plan Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Feature</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Basic</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Professional</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4 text-gray-700">Properties Limit</td>
                <td className="py-3 px-4 text-center">5</td>
                <td className="py-3 px-4 text-center">25</td>
                <td className="py-3 px-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Analytics</td>
                <td className="py-3 px-4 text-center">Basic</td>
                <td className="py-3 px-4 text-center">Advanced</td>
                <td className="py-3 px-4 text-center">Enterprise</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Support</td>
                <td className="py-3 px-4 text-center">Email</td>
                <td className="py-3 px-4 text-center">Priority</td>
                <td className="py-3 px-4 text-center">24/7 Dedicated</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">API Access</td>
                <td className="py-3 px-4 text-center">❌</td>
                <td className="py-3 px-4 text-center">✅</td>
                <td className="py-3 px-4 text-center">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-8">
      {/* Billing Information */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-500">Expires 12/25</div>
              </div>
            </div>
            <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Update Payment Method
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Billing Address</h4>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-gray-900">Sarah Johnson</div>
              <div className="text-gray-700">Metro Property Management</div>
              <div className="text-gray-700">123 Business Ave, Cebu City</div>
              <div className="text-gray-700">Philippines 6000</div>
            </div>
            <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Update Address
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {billingHistory.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 text-gray-700">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{item.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{item.invoice}</td>
                  <td className="py-3 px-4 text-gray-700">{item.plan}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Analytics */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentSubscription.properties}</div>
            <div className="text-sm text-gray-500">Active Properties</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{currentSubscription.usage}</div>
            <div className="text-sm text-gray-500">Plan Usage</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">₱5,000</div>
            <div className="text-sm text-gray-500">Monthly Cost</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Subscription Settings */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscription Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-renewal</h4>
              <p className="text-sm text-gray-500">Automatically renew your subscription</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-500">Receive billing and renewal notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Usage alerts</h4>
              <p className="text-sm text-gray-500">Get notified when approaching plan limits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
        <h3 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-900">Cancel Subscription</h4>
            <p className="text-sm text-red-700 mb-3">This will immediately cancel your subscription and you'll lose access to premium features.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Cancel Subscription
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-red-900">Delete Account</h4>
            <p className="text-sm text-red-700 mb-3">This action cannot be undone. All your data will be permanently deleted.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
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
              <p className="text-gray-600 mt-1">Manage your subscription and billing</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
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
              onClick={() => setActiveTab('plans')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'plans'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Plans & Features
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'billing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Billing & History
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
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'billing' && renderBilling()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default Subscription;
