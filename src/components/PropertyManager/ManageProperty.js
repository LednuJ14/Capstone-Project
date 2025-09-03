import React, { useEffect, useMemo, useState } from 'react';

const statusToBadgeClass = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Approved: 'bg-green-100 text-green-800 border-green-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
  Active: 'bg-blue-100 text-blue-800 border-blue-200',
  Inactive: 'bg-gray-100 text-gray-700 border-gray-200'
};

const STORAGE_KEY = 'pm_buildings_v1';

const ManageProperty = ({ onOpenManageUnits = () => {} }) => {
  const seedBuildings = useMemo(() => [
    {
      id: 'B-1001',
      companyName: 'Metro Plaza Development Corp.',
      buildingName: 'Metro Plaza',
      subdomain: 'metroplaza',
      address: '123 Business District, Cebu City',
      totalUnits: 150,
      occupiedUnits: 120,
      vacantUnits: 30,
      status: 'Approved',
      adminApproval: 'Approved',
      adminNotes: 'All documents verified. Building meets all requirements.',
      monthlyRevenue: 4500000,
      averageRent: 30000,
      contactPerson: 'Maria Santos',
      contactEmail: 'maria.santos@metroplaza.com',
      contactPhone: '+63 912 345 6789',
      registrationDate: new Date('2024-01-15'),
      approvalDate: new Date('2024-01-20'),
      lastUpdated: new Date('2025-08-14T18:17:29'),
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'B-1002',
      companyName: 'Mountain Ridge Properties Inc.',
      buildingName: 'Mountain Ridge Residences',
      subdomain: 'mountainridge',
      address: '456 Highland Avenue, Baguio City',
      totalUnits: 80,
      occupiedUnits: 65,
      vacantUnits: 15,
      status: 'Pending',
      adminApproval: 'Pending',
      adminNotes: 'Application under review. Additional documents requested.',
      monthlyRevenue: 1950000,
      averageRent: 24000,
      contactPerson: 'Juan Dela Cruz',
      contactEmail: 'juan.delacruz@mountainridge.com',
      contactPhone: '+63 923 456 7890',
      registrationDate: new Date('2025-08-10'),
      approvalDate: null,
      lastUpdated: new Date('2025-08-13T14:30:15'),
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'B-1003',
      companyName: 'Tech Hub Real Estate LLC',
      buildingName: 'Tech Hub Apartments',
      subdomain: 'techhub',
      address: '789 Innovation Street, Taguig City',
      totalUnits: 200,
      occupiedUnits: 180,
      vacantUnits: 20,
      status: 'Active',
      adminApproval: 'Approved',
      adminNotes: 'High-tech building with excellent amenities. Fully operational.',
      monthlyRevenue: 7200000,
      averageRent: 40000,
      contactPerson: 'Ana Rodriguez',
      contactEmail: 'ana.rodriguez@techhub.com',
      contactPhone: '+63 934 567 8901',
      registrationDate: new Date('2023-11-20'),
      approvalDate: new Date('2023-12-01'),
      lastUpdated: new Date('2025-08-12T09:45:22'),
      image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ], []);

  const [buildings, setBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [approvalFilter, setApprovalFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsBuilding, setDetailsBuilding] = useState(null);
  const [newProperty, setNewProperty] = useState({
    companyName: '',
    buildingName: '',
    subdomain: '',
    address: '',
    totalUnits: '',
    propertyType: '',
    yearBuilt: '',
    floorCount: '',
    parkingSpaces: '',
    contactPerson: '',
    contactPosition: '',
    contactEmail: '',
    contactPhone: '',
    businessRegNumber: '',
    tin: '',
    businessPermitNumber: '',
    businessPermitExpiry: '',
    fireSafetyCert: null,
    buildingPermit: null,
    occupancyPermit: null,
    electricalCert: null,
    amenities: [],
    additionalNotes: '',
    images: []
  });
  const itemsPerPage = 6;

  // Load buildings from localStorage or use seed data
  useEffect(() => {
    const persistedRaw = localStorage.getItem(STORAGE_KEY);
    if (persistedRaw) {
      try {
        const parsed = JSON.parse(persistedRaw);
        if (parsed && parsed.length > 0) {
          setBuildings(parsed);
          return;
        }
      } catch (error) {
        console.log('Failed to parse localStorage data:', error);
      }
    }
    setBuildings(seedBuildings);
  }, [seedBuildings]);

  // Save buildings to localStorage
  useEffect(() => {
    if (buildings.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(buildings));
    }
  }, [buildings]);

  const filteredBuildings = useMemo(() => {
    return buildings.filter(building => {
      const matchesSearch = building.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           building.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           building.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || building.status === statusFilter;
      const matchesApproval = approvalFilter === 'All' || building.adminApproval === approvalFilter;
      
      return matchesSearch && matchesStatus && matchesApproval;
    });
  }, [buildings, searchTerm, statusFilter, approvalFilter]);

  const sortedBuildings = useMemo(() => {
    const sorted = [...filteredBuildings].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'Recent':
          const dateA = typeof a.lastUpdated === 'string' ? new Date(a.lastUpdated) : a.lastUpdated;
          const dateB = typeof b.lastUpdated === 'string' ? new Date(b.lastUpdated) : b.lastUpdated;
          comparison = dateB - dateA;
          break;
        case 'Revenue':
          comparison = b.monthlyRevenue - a.monthlyRevenue;
          break;
        case 'Units':
          comparison = b.totalUnits - a.totalUnits;
          break;
        case 'Name':
          comparison = a.companyName.localeCompare(b.companyName);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return sorted;
  }, [filteredBuildings, sortBy, sortOrder]);

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return sortedBuildings.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedBuildings, page]);

  const totalPages = Math.ceil(sortedBuildings.length / itemsPerPage);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    // Convert string to Date object if needed
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'N/A';
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSubdomainUrl = (subdomain) => {
    return `https://${subdomain}.jacs.com`;
  };

  const handleEditClick = (building) => {
    // Create a shallow copy to edit
    setEditingBuilding({ ...building });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingBuilding) return;
    const updated = { ...editingBuilding, lastUpdated: new Date() };
    setBuildings(prev => prev.map(b => (b.id === updated.id ? updated : b)));
    setShowEditModal(false);
    setEditingBuilding(null);
  };

  const handleViewDetails = (building) => {
    setDetailsBuilding(building);
    setShowDetailsModal(true);
  };

  const handleInputChange = (field, value) => {
    setNewProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setNewProperty(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setNewProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setNewProperty(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New property data:', newProperty);
    setShowAddModal(false);
    // Reset form
    setNewProperty({
      companyName: '',
      buildingName: '',
      subdomain: '',
      address: '',
      totalUnits: '',
      propertyType: '',
      yearBuilt: '',
      floorCount: '',
      parkingSpaces: '',
      contactPerson: '',
      contactPosition: '',
      contactEmail: '',
      contactPhone: '',
      businessRegNumber: '',
      tin: '',
      businessPermitNumber: '',
      businessPermitExpiry: '',
      fireSafetyCert: null,
      buildingPermit: null,
      occupancyPermit: null,
      electricalCert: null,
      amenities: [],
      additionalNotes: '',
      images: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold mb-2">Property Management</h1>
                <p className="text-gray-300 text-lg">Manage your property and subdomains</p>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">{buildings.filter(b => b.status === 'Active').length} Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm">{buildings.filter(b => b.status === 'Pending').length} Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">{buildings.filter(b => b.status === 'Approved').length} Approved</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium"
                >
                  Add New Property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search buildings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Approval</label>
              <select
                value={approvalFilter}
                onChange={(e) => setApprovalFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              >
                <option value="All">All Approvals</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              >
                <option value="Recent">Recent</option>
                <option value="Revenue">Revenue</option>
                <option value="Units">Total Units</option>
                <option value="Name">Company Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buildings Grid */}
        {currentPageItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            {buildings.length === 0 ? (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Property available</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first property company</p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Add New Property
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No property match your filters</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPageItems.map((building) => (
              <div key={building.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Building Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={building.image}
                    alt={building.buildingName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(building.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedIds);
                        if (e.target.checked) {
                          newSelected.add(building.id);
                        } else {
                          newSelected.delete(building.id);
                        }
                        setSelectedIds(newSelected);
                      }}
                      className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusToBadgeClass[building.status]}`}>
                      {building.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                      building.adminApproval === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                      building.adminApproval === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }`}>
                      {building.adminApproval}
                    </span>
                  </div>
                </div>

                {/* Building Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{building.buildingName}</h3>
                      <p className="text-gray-600 text-sm">{building.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black">{formatCurrency(building.monthlyRevenue)}</p>
                      <p className="text-gray-500 text-sm">monthly revenue</p>
                    </div>
                  </div>

                  {/* Subdomain */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Subdomain:</span>
                      <a 
                        href={getSubdomainUrl(building.subdomain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {building.subdomain}.jacs.com
                      </a>
                    </div>
                  </div>

                  {/* Building Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Total Units</p>
                      <p className="font-semibold text-gray-900">{building.totalUnits}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Occupied</p>
                      <p className="font-semibold text-green-600">{building.occupiedUnits}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Vacant</p>
                      <p className="font-semibold text-orange-600">{building.vacantUnits}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 text-sm text-gray-600">
                    <p><span className="font-medium">Contact:</span> {building.contactPerson}</p>
                    <p><span className="font-medium">Email:</span> {building.contactEmail}</p>
                  </div>

                  {/* Registration and Last Updated */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <span>Registered: {formatDate(building.registrationDate)}</span>
                    <span>Updated: {formatDate(building.lastUpdated)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditClick(building)} className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleViewDetails(building)} className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                      View Details
                    </button>
                    <button onClick={() => onOpenManageUnits(building)} className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      Manage Units
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
            
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setBuildings(seedBuildings);
                setSelectedIds(new Set());
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Reset to Sample Data
            </button>
          </div>
        )}
      </div>

      {/* Add Building Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
               {/* Basic Information */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                     <input
                       type="text"
                       placeholder="Enter company name"
                       value={newProperty.companyName}
                       onChange={(e) => handleInputChange('companyName', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Property Name *</label>
                     <input
                       type="text"
                       placeholder="Enter building name"
                       value={newProperty.buildingName}
                       onChange={(e) => handleInputChange('buildingName', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Subdomain *</label>
                   <div className="flex items-center">
                     <input
                       type="text"
                       placeholder="subdomain"
                       value={newProperty.subdomain}
                       onChange={(e) => handleInputChange('subdomain', e.target.value)}
                       className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                     <span className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-xl text-gray-600">
                       .jacs.com
                     </span>
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                   <textarea
                     placeholder="Enter complete building address including city, province, and postal code"
                     rows="3"
                     value={newProperty.address}
                     onChange={(e) => handleInputChange('address', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     required
                   ></textarea>
                 </div>
               </div>

               {/* Property Images */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Images</h3>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Property Images</label>
                   <div className="flex flex-wrap items-center gap-3">
                     {newProperty.images.map((imageUrl, index) => (
                       <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                         <img src={imageUrl} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
                         <button
                           type="button"
                           onClick={() => removeImage(index)}
                           className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 flex items-center justify-center hover:bg-red-600 transition-colors"
                         >
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                     ))}
                     <label htmlFor="property-image-upload" className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50 hover:bg-gray-100">
                       <input type="file" id="property-image-upload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                       <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                       </svg>
                       <p className="mt-1 text-xs text-gray-600 text-center">Add Images</p>
                     </label>
                   </div>
                   <p className="text-xs text-gray-500 mt-2">Upload multiple images to showcase the property. First image will be the main display image.</p>
                 </div>
               </div>

               {/* Building Details */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Total Units *</label>
                     <input
                       type="number"
                       placeholder="0"
                       min="1"
                       value={newProperty.totalUnits}
                       onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                     <select 
                       value={newProperty.propertyType}
                       onChange={(e) => handleInputChange('propertyType', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     >
                       <option value="">Select building type</option>
                       <option value="apartment">Apartment Building</option>
                       <option value="condominium">Condominium</option>
                       <option value="boarding-house">Boarding House</option>
                       <option value="dormitory">Dormitory</option>
                       <option value="commercial">Commercial Building</option>
                       <option value="mixed-use">Mixed Use</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Year Built</label>
                     <input
                       type="number"
                       placeholder="2020"
                       min="1900"
                       max="2030"
                       value={newProperty.yearBuilt}
                       onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Floor Count</label>
                     <input
                       type="number"
                       placeholder="Number of floors"
                       min="1"
                       value={newProperty.floorCount}
                       onChange={(e) => handleInputChange('floorCount', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Spaces</label>
                     <input
                       type="number"
                       placeholder="Available parking spaces"
                       min="0"
                       value={newProperty.parkingSpaces}
                       onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                 </div>
               </div>

               {/* Contact Information */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                     <input
                       type="text"
                       placeholder="Full name of contact person"
                       value={newProperty.contactPerson}
                       onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Position</label>
                     <input
                       type="text"
                       placeholder="e.g., Property Manager, Owner"
                       value={newProperty.contactPosition}
                       onChange={(e) => handleInputChange('contactPosition', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email *</label>
                     <input
                       type="email"
                       placeholder="email@example.com"
                       value={newProperty.contactEmail}
                       onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone *</label>
                     <input
                       type="tel"
                       placeholder="+63 912 345 6789"
                       value={newProperty.contactPhone}
                       onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       required
                     />
                   </div>
                 </div>
               </div>

               {/* Business Information */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Business Registration Number</label>
                     <input
                       type="text"
                       placeholder="DTI/SEC registration number"
                       value={newProperty.businessRegNumber}
                       onChange={(e) => handleInputChange('businessRegNumber', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Identification Number (TIN)</label>
                     <input
                       type="text"
                       placeholder="BIR TIN number"
                       value={newProperty.tin}
                       onChange={(e) => handleInputChange('tin', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Business Permit Number</label>
                     <input
                       type="text"
                       placeholder="Local business permit number"
                       value={newProperty.businessPermitNumber}
                       onChange={(e) => handleInputChange('businessPermitNumber', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Business Permit Expiry</label>
                     <input
                       type="date"
                       value={newProperty.businessPermitExpiry}
                       onChange={(e) => handleInputChange('businessPermitExpiry', e.target.value)}
                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                     />
                   </div>
                 </div>
               </div>

               {/* Certifications & Compliance */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Compliance</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Fire Safety Certificate</label>
                     <div className="flex items-center space-x-4">
                       <input
                         type="file"
                         accept=".pdf,.jpg,.jpeg,.png"
                         className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       />
                       <span className="text-sm text-gray-500">PDF, JPG, PNG</span>
                     </div>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Building Permit</label>
                     <div className="flex items-center space-x-4">
                       <input
                         type="file"
                         accept=".pdf,.jpg,.jpeg,.png"
                         className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       />
                       <span className="text-sm text-gray-500">PDF, JPG, PNG</span>
                     </div>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Occupancy Permit</label>
                     <div className="flex items-center space-x-4">
                       <input
                         type="file"
                         accept=".pdf,.jpg,.jpeg,.png"
                         className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       />
                       <span className="text-sm text-gray-500">PDF, JPG, PNG</span>
                     </div>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Electrical Safety Certificate</label>
                     <div className="flex items-center space-x-4">
                       <input
                         type="file"
                         accept=".pdf,.jpg,.jpeg,.png"
                         className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                       />
                       <span className="text-sm text-gray-500">PDF, JPG, PNG</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Amenities & Features */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Features</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('WiFi')}
                       onChange={() => handleAmenityToggle('WiFi')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">WiFi</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Security')}
                       onChange={() => handleAmenityToggle('Security')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Security</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Parking')}
                       onChange={() => handleAmenityToggle('Parking')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Parking</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('CCTV')}
                       onChange={() => handleAmenityToggle('CCTV')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">CCTV</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Generator')}
                       onChange={() => handleAmenityToggle('Generator')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Generator</span>
                     </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Water Tank')}
                       onChange={() => handleAmenityToggle('Water Tank')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Water Tank</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Garden')}
                       onChange={() => handleAmenityToggle('Garden')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Garden</span>
                   </label>
                   <label className="flex items-center space-x-2">
                     <input 
                       type="checkbox" 
                       checked={newProperty.amenities.includes('Laundry')}
                       onChange={() => handleAmenityToggle('Laundry')}
                       className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" 
                     />
                     <span className="text-sm text-gray-700">Laundry</span>
                   </label>
                 </div>
               </div>

               {/* Additional Notes */}
               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                 <textarea
                   placeholder="Any additional information about the building, special features, or requirements..."
                   rows="4"
                   value={newProperty.additionalNotes}
                   onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                 ></textarea>
               </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Add Building
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Building Modal */}
      {showEditModal && editingBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Property</h2>
              <button onClick={() => { setShowEditModal(false); setEditingBuilding(null); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input type="text" value={editingBuilding.companyName} onChange={(e) => setEditingBuilding({ ...editingBuilding, companyName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property Name</label>
                  <input type="text" value={editingBuilding.buildingName} onChange={(e) => setEditingBuilding({ ...editingBuilding, buildingName: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subdomain</label>
                <div className="flex items-center">
                  <input type="text" value={editingBuilding.subdomain} onChange={(e) => setEditingBuilding({ ...editingBuilding, subdomain: e.target.value })} className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                  <span className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-xl text-gray-600">.jacs.com</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea rows="3" value={editingBuilding.address} onChange={(e) => setEditingBuilding({ ...editingBuilding, address: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Units</label>
                  <input type="number" min="0" value={editingBuilding.totalUnits} onChange={(e) => setEditingBuilding({ ...editingBuilding, totalUnits: parseInt(e.target.value || '0') })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupied Units</label>
                  <input type="number" min="0" value={editingBuilding.occupiedUnits} onChange={(e) => setEditingBuilding({ ...editingBuilding, occupiedUnits: parseInt(e.target.value || '0') })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vacant Units</label>
                  <input type="number" min="0" value={editingBuilding.vacantUnits} onChange={(e) => setEditingBuilding({ ...editingBuilding, vacantUnits: parseInt(e.target.value || '0') })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select value={editingBuilding.status} onChange={(e) => setEditingBuilding({ ...editingBuilding, status: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Approval</label>
                  <select value={editingBuilding.adminApproval} onChange={(e) => setEditingBuilding({ ...editingBuilding, adminApproval: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Avg Rent (₱)</label>
                  <input type="number" min="0" value={editingBuilding.averageRent} onChange={(e) => setEditingBuilding({ ...editingBuilding, averageRent: parseInt(e.target.value || '0') })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                  <input type="text" value={editingBuilding.contactPerson} onChange={(e) => setEditingBuilding({ ...editingBuilding, contactPerson: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                  <input type="tel" value={editingBuilding.contactPhone} onChange={(e) => setEditingBuilding({ ...editingBuilding, contactPhone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
                  <input type="email" value={editingBuilding.contactEmail} onChange={(e) => setEditingBuilding({ ...editingBuilding, contactEmail: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input type="text" value={editingBuilding.image} onChange={(e) => setEditingBuilding({ ...editingBuilding, image: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
              </div>

              <div className="flex space-x-3 pt-2">
                <button onClick={() => { setShowEditModal(false); setEditingBuilding(null); }} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && detailsBuilding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
              <button onClick={() => { setShowDetailsModal(false); setDetailsBuilding(null); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={detailsBuilding.image} alt={detailsBuilding.buildingName} className="w-full h-56 object-cover rounded-xl border border-gray-200" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{detailsBuilding.buildingName}</h3>
                <p className="text-gray-700">{detailsBuilding.companyName}</p>
                <p className="text-gray-600 text-sm">{detailsBuilding.address}</p>
                <a href={getSubdomainUrl(detailsBuilding.subdomain)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800">{detailsBuilding.subdomain}.jacs.com</a>
                <div className="pt-2 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Total Units</p>
                    <p className="font-semibold text-gray-900">{detailsBuilding.totalUnits}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Occupied</p>
                    <p className="font-semibold text-green-600">{detailsBuilding.occupiedUnits}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Vacant</p>
                    <p className="font-semibold text-orange-600">{detailsBuilding.vacantUnits}</p>
                  </div>
                </div>
                <div className="pt-2 text-sm text-gray-700">
                  <p><span className="font-medium">Monthly Revenue:</span> {formatCurrency(detailsBuilding.monthlyRevenue)}</p>
                  <p><span className="font-medium">Average Rent:</span> {formatCurrency(detailsBuilding.averageRent)}</p>
                  <p><span className="font-medium">Status:</span> {detailsBuilding.status}</p>
                  <p><span className="font-medium">Admin Approval:</span> {detailsBuilding.adminApproval}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contacts</h4>
                <p><span className="font-medium">Person:</span> {detailsBuilding.contactPerson}</p>
                <p><span className="font-medium">Email:</span> {detailsBuilding.contactEmail}</p>
                <p><span className="font-medium">Phone:</span> {detailsBuilding.contactPhone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                <p><span className="font-medium">Registered:</span> {formatDate(detailsBuilding.registrationDate)}</p>
                <p><span className="font-medium">Approved:</span> {formatDate(detailsBuilding.approvalDate)}</p>
                <p><span className="font-medium">Last Updated:</span> {formatDate(detailsBuilding.lastUpdated)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperty;
