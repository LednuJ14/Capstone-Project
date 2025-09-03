import React, { useState } from 'react';

const AnalyticsReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedProperty, setSelectedProperty] = useState('all');

  // Mock data for multiple properties
  const properties = [
    {
      id: 'P-1001',
      name: 'Sunset Gardens Residences',
      address: '123 Sunset Boulevard, Cebu City',
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
      profitMargin: 73
    },
    {
      id: 'P-1002',
      name: 'Oceanview Heights',
      address: '456 Coastal Drive, Mandaue City',
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
      profitMargin: 80
    },
    {
      id: 'P-1003',
      name: 'Maple Street Apartments',
      address: '789 Maple Street, Cebu City',
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
      profitMargin: 78
    }
  ];

  // Get selected property data
  const getSelectedPropertyData = () => {
    if (selectedProperty === 'all') {
      // Aggregate data from all properties
      return properties.reduce((acc, property) => ({
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
        profitMargin: Math.round((acc.profitMargin + property.profitMargin) / properties.length)
      }), {
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
        profitMargin: 0
      });
    }
    return properties.find(p => p.id === selectedProperty) || properties[0];
  };

  const analyticsData = getSelectedPropertyData();

  // Monthly data for selected property
  const getMonthlyData = () => {
    const baseRevenue = analyticsData.monthlyRevenue;
    const baseExpenses = analyticsData.expenses;
    
    return [
      { month: 'Jan', revenue: baseRevenue * 0.95, expenses: baseExpenses * 0.9, occupancy: 85 },
      { month: 'Feb', revenue: baseRevenue * 0.98, expenses: baseExpenses * 0.95, occupancy: 87 },
      { month: 'Mar', revenue: baseRevenue * 1.0, expenses: baseExpenses * 1.0, occupancy: 88 },
      { month: 'Apr', revenue: baseRevenue * 1.02, expenses: baseExpenses * 1.05, occupancy: 87 },
      { month: 'May', revenue: baseRevenue * 1.05, expenses: baseExpenses * 1.08, occupancy: 89 },
      { month: 'Jun', revenue: baseRevenue * 1.08, expenses: baseExpenses * 1.1, occupancy: 90 }
    ];
  };

  const monthlyData = getMonthlyData();

  const maintenanceData = [
    { type: 'Plumbing', count: Math.ceil(analyticsData.maintenanceRequests * 0.3), avgTime: '2.5 days' },
    { type: 'Electrical', count: Math.ceil(analyticsData.maintenanceRequests * 0.25), avgTime: '1.8 days' },
    { type: 'HVAC', count: Math.ceil(analyticsData.maintenanceRequests * 0.15), avgTime: '3.2 days' },
    { type: 'General', count: Math.ceil(analyticsData.maintenanceRequests * 0.3), avgTime: '1.5 days' }
  ];

  const tenantData = [
    { name: 'John Smith', unit: 'A101', rent: 1800, status: 'Current', daysLate: 0 },
    { name: 'Sarah Johnson', unit: 'B205', rent: 2100, status: 'Current', daysLate: 0 },
    { name: 'Mike Davis', unit: 'C301', rent: 1950, status: 'Late', daysLate: 5 },
    { name: 'Lisa Wilson', unit: 'A203', rent: 1750, status: 'Current', daysLate: 0 },
    { name: 'David Brown', unit: 'B102', rent: 2200, status: 'Current', daysLate: 0 }
  ];

  const renderPropertySelector = () => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6">
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
                {property.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderPropertySummary = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-black">{analyticsData.totalUnits}</p>
          <p className="text-sm text-gray-600">Total Units</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{analyticsData.occupiedUnits}</p>
          <p className="text-sm text-gray-600">Occupied Units</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-orange-600">{analyticsData.vacantUnits}</p>
          <p className="text-sm text-gray-600">Vacant Units</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-blue-600">
            {Math.round((analyticsData.occupiedUnits / analyticsData.totalUnits) * 100)}%
          </p>
          <p className="text-sm text-gray-600">Occupancy Rate</p>
        </div>
      </div>
    </div>
  );

  const renderPropertyComparison = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">Property</th>
              <th className="text-center py-3 px-4 font-semibold">Units</th>
              <th className="text-center py-3 px-4 font-semibold">Occupancy</th>
              <th className="text-center py-3 px-4 font-semibold">Revenue</th>
              <th className="text-center py-3 px-4 font-semibold">Avg Rent</th>
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
                  ₱{property.averageRent.toLocaleString()}
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Occupancy Rate</p>
              <p className="text-3xl font-bold text-black">
                {Math.round((analyticsData.occupiedUnits / analyticsData.totalUnits) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">{analyticsData.occupiedUnits}/{analyticsData.totalUnits} units</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-black">₱{analyticsData.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">Avg: ₱{analyticsData.averageRent.toLocaleString()}/unit</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Maintenance</p>
              <p className="text-3xl font-bold text-black">{analyticsData.maintenanceRequests}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">{analyticsData.pendingRequests} pending</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Satisfaction</p>
              <p className="text-3xl font-bold text-black">{analyticsData.tenantSatisfaction}/5</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">{analyticsData.totalTenants} tenants</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Revenue & Expenses Trend - {selectedProperty === 'all' ? 'All Properties' : properties.find(p => p.id === selectedProperty)?.name}
        </h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                <div 
                  className="absolute bottom-0 w-full bg-black rounded-t-lg transition-all duration-300 hover:bg-gray-800"
                  style={{ height: `${(data.revenue / (analyticsData.monthlyRevenue * 1.2)) * 100}%` }}
                ></div>
                <div 
                  className="absolute bottom-0 w-full bg-gray-600 rounded-t-lg transition-all duration-300 hover:bg-gray-700"
                  style={{ height: `${(data.expenses / (analyticsData.expenses * 1.2)) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{data.month}</p>
                <p className="text-xs text-gray-500">₱{data.revenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-black rounded"></div>
            <span className="text-sm">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <span className="text-sm">Expenses</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">New Inquiries</h4>
          <p className="text-2xl font-bold text-black">{analyticsData.newInquiries}</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Conversion Rate</h4>
          <p className="text-2xl font-bold text-black">{analyticsData.conversionRate}%</p>
          <p className="text-sm text-gray-500">Inquiry to lease</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Profit Margin</h4>
          <p className="text-2xl font-bold text-black">{analyticsData.profitMargin}%</p>
          <p className="text-sm text-gray-500">Monthly</p>
        </div>
      </div>
    </div>
  );

     const renderMaintenanceReport = () => (
     <div className="space-y-6">
       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
         <h3 className="text-lg font-semibold mb-4">Maintenance Summary</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.maintenanceRequests}</p>
             <p className="text-sm text-gray-600">Total Requests</p>
           </div>
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.pendingRequests}</p>
             <p className="text-sm text-gray-600">Pending</p>
           </div>
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.completedRequests}</p>
             <p className="text-sm text-gray-600">Completed</p>
           </div>
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">2.1 days</p>
             <p className="text-sm text-gray-600">Avg Response</p>
           </div>
         </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-center py-3 px-4 font-semibold">Count</th>
                <th className="text-center py-3 px-4 font-semibold">Avg Time</th>
                <th className="text-center py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.type}</td>
                  <td className="py-3 px-4 text-center">{item.count}</td>
                  <td className="py-3 px-4 text-center">{item.avgTime}</td>
                                     <td className="py-3 px-4 text-center">
                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 border border-gray-300">
                       Active
                     </span>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

     const renderTenantReport = () => (
     <div className="space-y-6">
       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
         <h3 className="text-lg font-semibold mb-4">Tenant Overview</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.totalTenants}</p>
             <p className="text-sm text-gray-600">Total Tenants</p>
           </div>
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.occupiedUnits}</p>
             <p className="text-sm text-gray-600">Occupied Units</p>
           </div>
           <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
             <p className="text-2xl font-bold text-black">{analyticsData.vacantUnits}</p>
             <p className="text-sm text-gray-600">Vacant Units</p>
           </div>
         </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Tenant</th>
                <th className="text-left py-3 px-4 font-semibold">Unit</th>
                <th className="text-center py-3 px-4 font-semibold">Rent</th>
                <th className="text-center py-3 px-4 font-semibold">Status</th>
                <th className="text-center py-3 px-4 font-semibold">Days Late</th>
              </tr>
            </thead>
            <tbody>
              {tenantData.map((tenant, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{tenant.name}</td>
                  <td className="py-3 px-4">{tenant.unit}</td>
                  <td className="py-3 px-4 text-center">₱{tenant.rent}</td>
                                     <td className="py-3 px-4 text-center">
                     <span className={`px-2 py-1 text-xs rounded-full border border-gray-300 ${
                       tenant.status === 'Current' 
                         ? 'bg-gray-100 text-gray-800' 
                         : 'bg-gray-200 text-gray-800'
                     }`}>
                       {tenant.status}
                     </span>
                   </td>
                   <td className="py-3 px-4 text-center">
                     <span className={tenant.daysLate > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'}>
                       {tenant.daysLate}
                     </span>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

     const renderFinancialReport = () => (
     <div className="space-y-6">
       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
         <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <h4 className="font-semibold text-gray-800 mb-3">Income Breakdown</h4>
             <div className="space-y-3">
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Rental Income</span>
                 <span className="font-bold text-black">₱{analyticsData.monthlyRevenue.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Late Fees</span>
                 <span className="font-bold text-black">₱22,500</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Other Income</span>
                 <span className="font-bold text-black">₱10,000</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-300">
                 <span className="font-bold">Total Income</span>
                 <span className="font-bold text-black">₱{(analyticsData.monthlyRevenue + 32500).toLocaleString()}</span>
               </div>
             </div>
           </div>

           <div>
             <h4 className="font-semibold text-gray-800 mb-3">Expense Breakdown</h4>
             <div className="space-y-3">
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Maintenance</span>
                 <span className="font-bold text-black">₱{analyticsData.expenses.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Utilities</span>
                 <span className="font-bold text-black">₱14,000</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                 <span className="font-medium">Insurance</span>
                 <span className="font-bold text-black">₱6,000</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border border-gray-300">
                 <span className="font-bold">Total Expenses</span>
                 <span className="font-bold text-black">₱24,600</span>
               </div>
             </div>
           </div>
         </div>

         <div className="mt-6 p-4 bg-black text-white rounded-lg">
           <div className="flex justify-between items-center">
             <div>
               <p className="text-sm opacity-90">Net Profit</p>
               <p className="text-2xl font-bold">₱{(analyticsData.monthlyRevenue + 32500 - 24600).toLocaleString()}</p>
             </div>
             <div className="text-right">
               <p className="text-sm opacity-90">Profit Margin</p>
               <p className="text-2xl font-bold">{analyticsData.profitMargin}%</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );

  const renderPropertiesReport = () => (
    <div className="space-y-6">
      {/* Property Performance Overview */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Property Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div 
              key={property.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedProperty === property.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedProperty(property.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{property.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  (property.occupiedUnits / property.totalUnits) >= 0.9 
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : (property.occupiedUnits / property.totalUnits) >= 0.7
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {Math.round((property.occupiedUnits / property.totalUnits) * 100)}% Occupied
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">₱{property.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rent:</span>
                  <span className="font-medium">₱{property.averageRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Units:</span>
                  <span className="font-medium">{property.occupiedUnits}/{property.totalUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction:</span>
                  <span className="font-medium">{property.tenantSatisfaction}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Margin:</span>
                  <span className="font-medium">{property.profitMargin}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Metrics Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Key Metrics Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-black">
              {Math.round(properties.reduce((acc, p) => acc + (p.occupiedUnits / p.totalUnits), 0) / properties.length * 100)}%
            </p>
            <p className="text-sm text-gray-600">Avg Occupancy</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-black">
              ₱{Math.round(properties.reduce((acc, p) => acc + p.averageRent, 0) / properties.length).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Avg Rent</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-black">
              {Math.round(properties.reduce((acc, p) => acc + p.tenantSatisfaction, 0) / properties.length * 10) / 10}/5
            </p>
            <p className="text-sm text-gray-600">Avg Satisfaction</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-black">
              {Math.round(properties.reduce((acc, p) => acc + p.profitMargin, 0) / properties.length)}%
            </p>
            <p className="text-sm text-gray-600">Avg Profit Margin</p>
          </div>
        </div>
      </div>

      {/* Property Trends */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Property Trends</h3>
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-gray-900">{property.name}</h5>
                <span className="text-sm text-gray-500">
                  {property.newInquiries} new inquiries this month
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Maintenance:</span>
                  <span className="ml-2 font-medium">{property.maintenanceRequests} requests</span>
                </div>
                <div>
                  <span className="text-gray-600">Conversion:</span>
                  <span className="ml-2 font-medium">{property.conversionRate}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Revenue Growth:</span>
                  <span className="ml-2 font-medium text-green-600">+12%</span>
                </div>
                <div>
                  <span className="text-gray-600">Tenant Retention:</span>
                  <span className="ml-2 font-medium">94%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-black mb-2">Analytics & Reports</h1>
        <p className="text-gray-300">Comprehensive insights into your property performance</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedReport('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === 'overview'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedReport('properties')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === 'properties'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setSelectedReport('maintenance')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === 'maintenance'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setSelectedReport('tenants')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === 'tenants'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tenants
            </button>
            <button
              onClick={() => setSelectedReport('financial')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedReport === 'financial'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Financial
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {renderPropertySelector()}
      {renderPropertySummary()}
      {renderPropertyComparison()}
      {selectedReport === 'overview' && renderOverview()}
      {selectedReport === 'properties' && renderPropertiesReport()}
      {selectedReport === 'maintenance' && renderMaintenanceReport()}
      {selectedReport === 'tenants' && renderTenantReport()}
      {selectedReport === 'financial' && renderFinancialReport()}

             {/* Export Section */}
       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
         <h3 className="text-lg font-semibold mb-4">Export Reports</h3>
         <div className="flex flex-wrap gap-3">
           <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
             <span>Export PDF</span>
           </button>
           <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
             <span>Export Excel</span>
           </button>
           <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center space-x-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
             </svg>
             <span>Generate Report</span>
           </button>
         </div>
       </div>
    </div>
  );
};

export default AnalyticsReports;
