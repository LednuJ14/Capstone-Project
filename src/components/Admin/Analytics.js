import React, { useState } from 'react';

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [selectedProperty, setSelectedProperty] = useState('all');

  // Mock data for multiple properties
  const properties = [
    {
      id: 'P-1001',
      name: 'Sunset Gardens Apartments',
      company: 'Metro Plaza Development Corp.',
      address: '123 Sunset Boulevard, Cebu City',
      type: 'Apartments',
      totalUnits: 28,
      occupiedUnits: 22,
      vacantUnits: 6,
      monthlyRevenue: 125000,
      averageRent: 4500,
      maintenanceRequests: 8,
      pendingRequests: 3,
      completedRequests: 5,
      tenantSatisfaction: 4.2,
      totalTenants: 22,
      newInquiries: 12,
      conversionRate: 65,
      expenses: 12300,
      profitMargin: 73,
      occupancyRate: 78.6,
      location: 'Cebu City'
    },
    {
      id: 'P-1002',
      name: 'Coastal Breeze Bed & Breakfast',
      company: 'Mountain Ridge Properties Inc.',
      address: '456 Coastal Drive, Mandaue City',
      type: 'Bed & Breakfast',
      totalUnits: 18,
      occupiedUnits: 15,
      vacantUnits: 3,
      monthlyRevenue: 89000,
      averageRent: 5500,
      maintenanceRequests: 5,
      pendingRequests: 2,
      completedRequests: 3,
      tenantSatisfaction: 4.5,
      totalTenants: 15,
      newInquiries: 8,
      conversionRate: 70,
      expenses: 8900,
      profitMargin: 80,
      occupancyRate: 83.3,
      location: 'Mandaue City'
    },
    {
      id: 'P-1003',
      name: 'Maple Street Boarding House',
      company: 'Tech Hub Real Estate LLC',
      address: '789 Maple Street, Cebu City',
      type: 'Boarding House',
      totalUnits: 15,
      occupiedUnits: 12,
      vacantUnits: 3,
      monthlyRevenue: 72000,
      averageRent: 4800,
      maintenanceRequests: 6,
      pendingRequests: 1,
      completedRequests: 5,
      tenantSatisfaction: 4.1,
      totalTenants: 12,
      newInquiries: 6,
      conversionRate: 75,
      expenses: 7200,
      profitMargin: 78,
      occupancyRate: 80.0,
      location: 'Cebu City'
    },
    {
      id: 'P-1004',
      name: 'Student Haven Dormitories',
      company: 'Tech Hub Real Estate LLC',
      address: '321 University Street, Cebu City',
      type: 'Dormitories',
      totalUnits: 45,
      occupiedUnits: 38,
      vacantUnits: 7,
      monthlyRevenue: 180000,
      averageRent: 4000,
      maintenanceRequests: 12,
      pendingRequests: 4,
      completedRequests: 8,
      tenantSatisfaction: 4.3,
      totalTenants: 38,
      newInquiries: 15,
      conversionRate: 68,
      expenses: 18000,
      profitMargin: 82,
      occupancyRate: 84.4,
      location: 'Cebu City'
    }
  ];

  // Get selected property data
  const getSelectedPropertyData = () => {
    if (selectedProperty === 'all') {
      // Aggregate data from all properties
      return properties.reduce((acc, property) => ({
        totalProperties: acc.totalProperties + 1,
        totalUnits: acc.totalUnits + property.totalUnits,
        occupiedUnits: acc.occupiedUnits + property.occupiedUnits,
        vacantUnits: acc.vacantUnits + property.vacantUnits,
        monthlyRevenue: acc.monthlyRevenue + property.monthlyRevenue,
        averageRent: Math.round((acc.averageRent + property.averageRent) / 2),
        maintenanceRequests: acc.maintenanceRequests + property.maintenanceRequests,
        pendingRequests: acc.pendingRequests + property.pendingRequests,
        completedRequests: acc.completedRequests + property.completedRequests,
        tenantSatisfaction: Math.round((acc.tenantSatisfaction + property.tenantSatisfaction) * 10) / 10,
        totalTenants: acc.totalTenants + property.totalTenants,
        newInquiries: acc.newInquiries + property.newInquiries,
        conversionRate: Math.round((acc.conversionRate + property.conversionRate) / properties.length),
        expenses: acc.expenses + property.expenses,
        profitMargin: Math.round((acc.profitMargin + property.profitMargin) / properties.length),
        occupancyRate: Math.round((acc.occupancyRate + property.occupancyRate) / properties.length)
      }), {
        totalProperties: 0,
        totalUnits: 0,
        occupiedUnits: 0,
        vacantUnits: 0,
        monthlyRevenue: 0,
        averageRent: 0,
        maintenanceRequests: 0,
        pendingRequests: 0,
        completedRequests: 0,
        tenantSatisfaction: 0,
        totalTenants: 0,
        newInquiries: 0,
        conversionRate: 0,
        expenses: 0,
        profitMargin: 0,
        occupancyRate: 0
      });
    }
    return properties.find(p => p.id === selectedProperty) || properties[0];
  };

  const selectedPropertyData = getSelectedPropertyData();

  // Mock data for analytics
  const [analyticsData] = useState({
    overview: {
      totalProperties: 156,
      activeTenants: 1234,
      totalRevenue: 45678,
      occupancyRate: 89.2,
      averageRent: 1850,
      maintenanceRequests: 45,
      pendingApprovals: 12
    },
    revenue: {
      monthly: [32000, 35000, 38000, 42000, 45000, 45678],
      byPropertyType: [
        { type: 'Apartments', revenue: 28000, percentage: 61.3 },
        { type: 'Bed & Breakfast', revenue: 12000, percentage: 26.3 },
        { type: 'Boarding House', revenue: 4000, percentage: 8.8 },
        { type: 'Dormitories', revenue: 1678, percentage: 3.6 }
      ],
      growthRate: 15.2
    },
    properties: {
      byType: [
        { type: 'Apartments', count: 89, percentage: 57.1 },
        { type: 'Bed & Breakfast', count: 34, percentage: 21.8 },
        { type: 'Boarding House', count: 18, percentage: 11.5 },
        { type: 'Dormitories', count: 15, percentage: 9.6 }
      ],
      byLocation: [
        { location: 'Cebu City', count: 45, percentage: 28.8 },
        { location: 'Mandaue City', count: 38, percentage: 24.4 },
        { location: 'Lapu-Lapu City', count: 28, percentage: 17.9 },
        { location: 'Talisay City', count: 25, percentage: 16.0 },
        { location: 'Other', count: 20, percentage: 12.8 }
      ],
      occupancyByType: [
        { type: 'Apartments', occupancy: 92.1 },
        { type: 'Bed & Breakfast', occupancy: 85.3 },
        { type: 'Boarding House', occupancy: 78.9 },
        { type: 'Dormitories', occupancy: 95.2 }
      ]
    },
    tenants: {
      demographics: [
        { age: '18-25', count: 156, percentage: 12.6 },
        { age: '26-35', count: 345, percentage: 28.0 },
        { age: '36-45', count: 298, percentage: 24.1 },
        { age: '46-55', count: 234, percentage: 19.0 },
        { age: '55+', count: 201, percentage: 16.3 }
      ],
      satisfaction: 4.2,
      retentionRate: 87.5,
      averageTenure: 2.8
    },
    performance: {
      responseTime: 4.2,
      maintenanceResolution: 94.8,
      tenantSatisfaction: 4.2,
      systemUptime: 99.9,
      averageRentCollection: 96.3
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const getRevenueChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let baseRevenue;
    
    if (selectedProperty === 'all') {
      // For all properties, use the total revenue from all properties
      baseRevenue = properties.reduce((sum, property) => sum + property.monthlyRevenue, 0);
    } else {
      // For individual property, use that property's revenue
      baseRevenue = selectedPropertyData.monthlyRevenue;
    }
    
    // Generate realistic revenue progression with some variation
    return months.map((month, index) => {
      const growthFactor = 0.8 + (index * 0.08) + (Math.random() * 0.1 - 0.05); // Add some randomness
      return {
        month,
        revenue: Math.round(baseRevenue * growthFactor)
      };
    });
  };

  const renderPropertySelector = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Selection</h3>
          <p className="text-sm text-gray-600">
            {selectedProperty === 'all' 
              ? 'Viewing analytics for all properties combined' 
              : `Viewing analytics for ${properties.find(p => p.id === selectedProperty)?.name}`
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Select Property:</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="all">All Properties</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.name} - {property.company}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderPropertySummary = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-black">
            {selectedProperty === 'all' ? properties.length : 1}
          </p>
          <p className="text-sm text-gray-600">Properties</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{selectedPropertyData.totalUnits}</p>
          <p className="text-sm text-gray-600">Total Units</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-orange-600">{selectedPropertyData.vacantUnits}</p>
          <p className="text-sm text-gray-600">Vacant Units</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-blue-600">
            {selectedProperty === 'all' ? selectedPropertyData.occupancyRate : Math.round((selectedPropertyData.occupiedUnits / selectedPropertyData.totalUnits) * 100)}%
          </p>
          <p className="text-sm text-gray-600">Occupancy Rate</p>
        </div>
      </div>
    </div>
  );

  const renderPropertyComparison = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">Property</th>
              <th className="text-center py-3 px-4 font-semibold">Company</th>
              <th className="text-center py-3 px-4 font-semibold">Type</th>
              <th className="text-center py-3 px-4 font-semibold">Units</th>
              <th className="text-center py-3 px-4 font-semibold">Occupancy</th>
              <th className="text-center py-3 px-4 font-semibold">Revenue</th>
              <th className="text-center py-3 px-4 font-semibold">Satisfaction</th>
              <th className="text-center py-3 px-4 font-semibold">Profit Margin</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr 
                key={property.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  selectedProperty === property.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedProperty(property.id)}
              >
                <td className="py-3 px-4 font-medium">
                  <div>
                    <p className="font-semibold">{property.name}</p>
                    <p className="text-sm text-gray-500">{property.address}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm font-medium">{property.company}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm text-gray-600">{property.type}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="font-medium">{property.occupiedUnits}/{property.totalUnits}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    (property.occupiedUnits / property.totalUnits) >= 0.9 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : (property.occupiedUnits / property.totalUnits) >= 0.7
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {Math.round((property.occupiedUnits / property.totalUnits) * 100)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-medium">
                  ₱{property.monthlyRevenue.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <span className="font-medium mr-1">{property.tenantSatisfaction}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= property.tenantSatisfaction ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    property.profitMargin >= 80 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : property.profitMargin >= 60
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {property.profitMargin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive insights into your property management system</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'revenue'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('individual')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'individual'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Individual Properties
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tenants'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tenants
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Performance
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {renderPropertySelector()}
              {renderPropertySummary()}
              {renderPropertyComparison()}
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedProperty === 'all' ? properties.length : 1}
                      </p>
                    </div>
                    <div className="text-3xl">🏢</div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-green-600">+12%</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Tenants</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedPropertyData.totalTenants.toLocaleString()}</p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-green-600">+8%</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedPropertyData.monthlyRevenue)}</p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-green-600">+15%</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedProperty === 'all' ? selectedPropertyData.occupancyRate : Math.round((selectedPropertyData.occupiedUnits / selectedPropertyData.totalUnits) * 100)}%
                      </p>
                    </div>
                    <div className="text-3xl">📊</div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-green-600">+2.1%</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Revenue Trend (Last 6 Months) - {selectedProperty === 'all' ? 'All Properties' : properties.find(p => p.id === selectedProperty)?.name}
                </h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {getRevenueChartData().map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(data.revenue)}
                      </div>
                      <div 
                        className="w-16 bg-gradient-to-t from-black to-gray-600 rounded-t-lg"
                        style={{ height: `${(data.revenue / (selectedPropertyData.monthlyRevenue * 1.2)) * 200}px` }}
                      ></div>
                      <div className="text-sm text-gray-500">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Rent</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPropertyData.averageRent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Maintenance Requests</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPropertyData.maintenanceRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Requests</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPropertyData.pendingRequests}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Generate Report</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">View Details</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">All systems operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Database: Healthy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">API: Responsive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="space-y-6">
              {renderPropertySelector()}
              {renderPropertySummary()}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Overview */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Revenue</span>
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedPropertyData.monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="text-sm font-medium text-green-600">+{analyticsData.revenue.growthRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Monthly</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPropertyData.monthlyRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPropertyData.profitMargin}%</span>
                    </div>
                  </div>
                </div>

                {/* Revenue by Property Type */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Property Type</h3>
                  <div className="space-y-4">
                    {analyticsData.revenue.byPropertyType.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{item.type}</span>
                          <span className="text-sm text-gray-600">{formatCurrency(item.revenue)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{formatPercentage(item.percentage)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Monthly Revenue Trend - {selectedProperty === 'all' ? 'All Properties' : properties.find(p => p.id === selectedProperty)?.name}
                </h3>
                <div className="h-80 flex items-end justify-between space-x-4">
                  {getRevenueChartData().map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-3 flex-1">
                      <div className="text-sm font-medium text-gray-900 text-center">
                        {formatCurrency(data.revenue)}
                      </div>
                      <div 
                        className="w-full bg-gradient-to-t from-black to-gray-600 rounded-t-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-500"
                        style={{ height: `${(data.revenue / Math.max(...getRevenueChartData().map(d => d.revenue))) * 250}px` }}
                      ></div>
                      <div className="text-sm text-gray-500">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Revenue Comparison */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Revenue Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Property</th>
                        <th className="text-center py-3 px-4 font-semibold">Company</th>
                        <th className="text-center py-3 px-4 font-semibold">Monthly Revenue</th>
                        <th className="text-center py-3 px-4 font-semibold">Average Rent</th>
                        <th className="text-center py-3 px-4 font-semibold">Profit Margin</th>
                        <th className="text-center py-3 px-4 font-semibold">Occupancy Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr 
                          key={property.id} 
                          className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            selectedProperty === property.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedProperty(property.id)}
                        >
                          <td className="py-3 px-4 font-medium">
                            <div>
                              <p className="font-semibold">{property.name}</p>
                              <p className="text-sm text-gray-500">{property.address}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-medium">{property.company}</span>
                          </td>
                          <td className="py-3 px-4 text-center font-medium">
                            ₱{property.monthlyRevenue.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            ₱{property.averageRent.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              property.profitMargin >= 80 
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : property.profitMargin >= 60
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {property.profitMargin}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              (property.occupiedUnits / property.totalUnits) >= 0.9 
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : (property.occupiedUnits / property.totalUnits) >= 0.7
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {Math.round((property.occupiedUnits / property.totalUnits) * 100)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              {renderPropertySelector()}
              {renderPropertySummary()}
              {renderPropertyComparison()}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Properties by Type */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Type</h3>
                  <div className="space-y-4">
                    {analyticsData.properties.byType.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{item.type}</span>
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{formatPercentage(item.percentage)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Properties by Location */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Location</h3>
                  <div className="space-y-4">
                    {analyticsData.properties.byLocation.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{item.location}</span>
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{formatPercentage(item.percentage)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Occupancy by Property Type */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Rate by Property Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analyticsData.properties.occupancyByType.map((item, index) => (
                    <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{formatPercentage(item.occupancy)}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'individual' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Property Name</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Company</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.company}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Address</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Type</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Units</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.totalUnits}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.occupiedUnits}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vacant Units</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.vacantUnits}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedPropertyData.monthlyRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rent</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedPropertyData.averageRent)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Maintenance Requests</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.maintenanceRequests}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.pendingRequests}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Requests</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.completedRequests}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tenant Satisfaction</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.tenantSatisfaction}/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.totalTenants}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Inquiries</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.newInquiries}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expenses</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedPropertyData.expenses)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                    <p className="text-lg font-bold text-gray-900">{selectedPropertyData.profitMargin}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-lg font-bold text-gray-900">{formatPercentage(selectedPropertyData.occupancyRate)}</p>
                  </div>
                </div>
              </div>

              {/* Revenue Chart for Individual Property */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Revenue Trend (Last 6 Months) - {selectedPropertyData.name}
                </h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {getRevenueChartData().map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(data.revenue)}
                      </div>
                      <div 
                        className="w-16 bg-gradient-to-t from-black to-gray-600 rounded-t-lg"
                        style={{ height: `${(data.revenue / (selectedPropertyData.monthlyRevenue * 1.2)) * 200}px` }}
                      ></div>
                      <div className="text-sm text-gray-500">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Metrics for Individual Property */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Rent</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPropertyData.averageRent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Maintenance Requests</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPropertyData.maintenanceRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Requests</span>
                      <span className="text-sm font-medium text-gray-900">{selectedPropertyData.pendingRequests}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Generate Report</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">View Details</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">All systems operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Database: Healthy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">API: Responsive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tenant Demographics */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tenant Demographics</h3>
                  <div className="space-y-4">
                    {analyticsData.tenants.demographics.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{item.age}</span>
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{formatPercentage(item.percentage)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tenant Metrics */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tenant Performance</h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{analyticsData.tenants.satisfaction}/5.0</div>
                      <div className="text-sm text-gray-600 mt-1">Satisfaction Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{formatPercentage(analyticsData.tenants.retentionRate)}</div>
                      <div className="text-sm text-gray-600 mt-1">Retention Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{analyticsData.tenants.averageTenure} years</div>
                      <div className="text-sm text-gray-600 mt-1">Average Tenure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Response Time */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{analyticsData.performance.responseTime} hrs</div>
                    <div className="text-sm text-gray-600 mt-1">Average Response Time</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">85% efficiency</div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Resolution */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatPercentage(analyticsData.performance.maintenanceResolution)}</div>
                    <div className="text-sm text-gray-600 mt-1">Maintenance Resolution</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.8%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Excellent</div>
                    </div>
                  </div>
                </div>

                {/* System Uptime */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatPercentage(analyticsData.performance.systemUptime)}</div>
                    <div className="text-sm text-gray-600 mt-1">System Uptime</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Outstanding</div>
                    </div>
                  </div>
                </div>

                {/* Tenant Satisfaction */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{analyticsData.performance.tenantSatisfaction}/5.0</div>
                    <div className="text-sm text-gray-600 mt-1">Tenant Satisfaction</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Good</div>
                    </div>
                  </div>
                </div>

                {/* Rent Collection */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatPercentage(analyticsData.performance.averageRentCollection)}</div>
                    <div className="text-sm text-gray-600 mt-1">Rent Collection Rate</div>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '96.3%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Excellent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
