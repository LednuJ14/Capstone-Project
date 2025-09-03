import React, { useState } from 'react';

const AdminPropertyReview = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for property submissions
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Sunset Apartments Complex',
      manager: 'John Smith',
      managerEmail: 'john.smith@sunset.com',
      managerPhone: '+1 (555) 123-4567',
      location: '123 Sunset Blvd, Los Angeles, CA',
      type: 'Residential Complex',
      units: 48,
      priceRange: '₱60,000 - ₱140,000',
      description: 'Modern residential complex with amenities including pool, gym, and parking.',
      amenities: ['Swimming Pool', 'Fitness Center', 'Parking', 'Security System', 'Garden'],
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      documents: ['Business License', 'Property Insurance', 'Building Permits'],
      submittedDate: '2024-01-15',
      status: 'pending',
      notes: 'Property looks well-maintained, all documents are in order.',
      managerNotes: 'This property has been successfully managed for 5 years with 95% occupancy rate.'
    },
    {
      id: 2,
      name: 'Downtown Office Plaza',
      manager: 'Sarah Johnson',
      managerEmail: 'sarah.johnson@downtown.com',
      managerPhone: '+1 (555) 987-6543',
      location: '456 Business Ave, New York, NY',
      type: 'Commercial Office',
      units: 24,
      priceRange: '₱175,000 - ₱400,000',
      description: 'Premium office space in the heart of downtown with modern facilities.',
      amenities: ['24/7 Security', 'High-Speed Internet', 'Conference Rooms', 'Parking', 'Cafeteria'],
      images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400'],
      documents: ['Business License', 'Property Insurance', 'Fire Safety Certificate'],
      submittedDate: '2024-01-14',
      status: 'pending',
      notes: 'High-end commercial property, excellent location.',
      managerNotes: 'Currently 80% occupied with strong tenant retention.'
    },
    {
      id: 3,
      name: 'Riverside Retail Center',
      manager: 'Mike Davis',
      managerEmail: 'mike.davis@riverside.com',
      managerPhone: '+1 (555) 456-7890',
      location: '789 River Road, Chicago, IL',
      type: 'Retail Center',
      units: 12,
      priceRange: '₱100,000 - ₱250,000',
      description: 'Shopping center with high foot traffic and modern retail spaces.',
      amenities: ['Parking Lot', 'Security Cameras', 'Loading Docks', 'Customer Restrooms'],
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
      documents: ['Business License', 'Property Insurance', 'Zoning Permits'],
      submittedDate: '2024-01-13',
      status: 'approved',
      notes: 'Approved - Excellent retail location with strong market potential.',
      managerNotes: 'Located in high-traffic area with easy access to major highways.'
    },
    {
      id: 4,
      name: 'Harbor View Condos',
      manager: 'Lisa Wilson',
      managerEmail: 'lisa.wilson@harbor.com',
      managerPhone: '+1 (555) 321-0987',
      location: '321 Harbor Drive, Miami, FL',
      type: 'Luxury Condominiums',
      units: 36,
      priceRange: '₱225,000 - ₱600,000',
      description: 'Luxury waterfront condominiums with premium amenities and ocean views.',
      amenities: ['Private Beach Access', 'Marina', 'Spa & Wellness Center', 'Concierge Service', 'Rooftop Pool'],
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
      documents: ['Business License', 'Property Insurance', 'Coastal Permits', 'Environmental Impact Assessment'],
      submittedDate: '2024-01-12',
      status: 'rejected',
      notes: 'Rejected - Missing environmental compliance documents and coastal zone permits.',
      managerNotes: 'Property has been operating successfully for 3 years with high tenant satisfaction.'
    }
  ]);

  const handleStatusChange = (propertyId, newStatus, adminNotes) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, status: newStatus, notes: adminNotes }
          : prop
      )
    );
    setShowModal(false);
    setSelectedProperty(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  const filteredProperties = properties.filter(prop => 
    activeTab === 'all' ? true : prop.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Review</h1>
              <p className="text-gray-600 mt-1">Review and approve property submissions from Property Managers</p>
            </div>
            <div className="flex items-center space-x-4">
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
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Review ({properties.filter(p => p.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approved'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approved ({properties.filter(p => p.status === 'approved').length})
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rejected'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rejected ({properties.filter(p => p.status === 'rejected').length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Properties ({properties.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {/* Property Images */}
              <div className="relative h-48 bg-gray-200">
                {property.images.length > 0 && (
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                    {getStatusText(property.status)}
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{property.type}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {property.manager}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {property.units} units
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{property.priceRange}</span>
                  <span className="text-xs text-gray-500">Submitted {property.submittedDate}</span>
                </div>

                {/* Action Buttons */}
                {property.status === 'pending' && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Review Details
                    </button>
                  </div>
                )}

                {property.status !== 'pending' && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Admin Notes:</span> {property.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500">There are no properties in the {activeTab} status.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Review Property Submission</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Property Images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProperty.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${selectedProperty.name} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Property Name</label>
                      <p className="text-sm text-gray-900">{selectedProperty.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <p className="text-sm text-gray-900">{selectedProperty.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900">{selectedProperty.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Units</label>
                      <p className="text-sm text-gray-900">{selectedProperty.units}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price Range</label>
                      <p className="text-sm text-gray-900">{selectedProperty.priceRange}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Manager Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900">{selectedProperty.manager}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-sm text-gray-900">{selectedProperty.managerEmail}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-sm text-gray-900">{selectedProperty.managerPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                      <p className="text-sm text-gray-900">{selectedProperty.submittedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description and Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description & Amenities</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900">{selectedProperty.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.amenities.map((amenity, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedProperty.documents.map((doc, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manager Notes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Manager Notes</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{selectedProperty.managerNotes}</p>
                </div>
              </div>

              {/* Admin Decision */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Decision</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Add your notes about this property submission..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleStatusChange(selectedProperty.id, 'rejected', 'Rejected after review')}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Submission
                </button>
                <button
                  onClick={() => handleStatusChange(selectedProperty.id, 'approved', 'Approved after review')}
                  className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyReview;
