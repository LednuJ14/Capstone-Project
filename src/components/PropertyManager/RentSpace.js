import React, { useEffect, useMemo, useState } from 'react';

const statusToBadgeClass = {
  Vacant: 'bg-green-100 text-green-800 border-green-200',
  Occupied: 'bg-gray-100 text-gray-700 border-gray-200',
  Draft: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const STORAGE_KEY = 'pm_properties_v1';
const LISTINGS_STORAGE_KEY = 'pm_listings_v1';

const ManagerRentSpace = ({ onPageChange = () => {} }) => {
  // Seed data for properties
  const seedProperties = useMemo(
    () => [
      {
        id: 'P-1001',
        name: 'Sunset Gardens Residences',
        address: '123 Sunset Boulevard, Cebu City',
        totalUnits: 28,
        occupiedUnits: 22,
        vacantUnits: 6,
        monthlyRevenue: 125000,
        averageRent: 4500,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 2
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
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 5
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
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 12
      },
      {
        id: 'P-1004',
        name: 'Golden Valley Complex',
        address: '321 Valley Road, Cebu City',
        totalUnits: 24,
        occupiedUnits: 20,
        vacantUnits: 4,
        monthlyRevenue: 156000,
        averageRent: 6500,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 1
      },
      {
        id: 'P-1005',
        name: 'Emerald Plaza Suites',
        address: '654 Emerald Avenue, Cebu City',
        totalUnits: 22,
        occupiedUnits: 18,
        vacantUnits: 4,
        monthlyRevenue: 132000,
        averageRent: 6000,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 7
      },
      {
        id: 'P-1006',
        name: 'Riverside Gardens',
        address: '987 River Street, Cebu City',
        totalUnits: 20,
        occupiedUnits: 16,
        vacantUnits: 4,
        monthlyRevenue: 98000,
        averageRent: 4900,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 3
      },
      {
        id: 'P-1007',
        name: 'Crystal Tower Residences',
        address: '147 Crystal Lane, Mandaue City',
        totalUnits: 32,
        occupiedUnits: 28,
        vacantUnits: 4,
        monthlyRevenue: 192000,
        averageRent: 6000,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 4
      },
      {
        id: 'P-1008',
        name: 'Pine Grove Apartments',
        address: '258 Pine Street, Cebu City',
        totalUnits: 16,
        occupiedUnits: 13,
        vacantUnits: 3,
        monthlyRevenue: 78000,
        averageRent: 5200,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        lastUpdated: Date.now() - 1000 * 60 * 60 * 24 * 6
      }
    ],
    []
  );

  // Seed data for listings (spaces/rooms)
  const seedListings = useMemo(
    () => [
      // Sunset Gardens Residences (P-1001) - 28 units
      {
        id: 'L-1001',
        propertyId: 'P-1001',
        propertyName: 'Sunset Gardens Residences',
        unitName: 'Studio A-101',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 25,
        price: 4800,
        status: 'Vacant',
        inquiriesCount: 5,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1002',
        propertyId: 'P-1001',
        propertyName: 'Sunset Gardens Residences',
        unitName: '1BR B-205',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 32,
        price: 5200,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1003',
        propertyId: 'P-1001',
        propertyName: 'Sunset Gardens Residences',
        unitName: '2BR C-301',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 45,
        price: 6800,
        status: 'Vacant',
        inquiriesCount: 8,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1004',
        propertyId: 'P-1001',
        propertyName: 'Sunset Gardens Residences',
        unitName: 'Studio A-102',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 24,
        price: 4600,
        status: 'Draft',
        inquiriesCount: 2,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1005',
        propertyId: 'P-1001',
        propertyName: 'Sunset Gardens Residences',
        unitName: '1BR B-206',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 30,
        price: 5000,
        status: 'Vacant',
        inquiriesCount: 6,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Oceanview Heights (P-1002) - 18 units
      {
        id: 'L-1006',
        propertyId: 'P-1002',
        propertyName: 'Oceanview Heights',
        unitName: 'Ocean Studio 101',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 28,
        price: 5800,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1007',
        propertyId: 'P-1002',
        propertyName: 'Oceanview Heights',
        unitName: 'Sea View 1BR 202',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 35,
        price: 6200,
        status: 'Vacant',
        inquiriesCount: 4,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1008',
        propertyId: 'P-1002',
        propertyName: 'Oceanview Heights',
        unitName: 'Coastal 2BR 303',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 48,
        price: 7800,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Maple Street Apartments (P-1003) - 15 units
      {
        id: 'L-1009',
        propertyId: 'P-1003',
        propertyName: 'Maple Street Apartments',
        unitName: 'Maple Studio 1A',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 26,
        price: 5000,
        status: 'Vacant',
        inquiriesCount: 7,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1010',
        propertyId: 'P-1003',
        propertyName: 'Maple Street Apartments',
        unitName: 'Oak 1BR 2B',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 34,
        price: 5400,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1011',
        propertyId: 'P-1003',
        propertyName: 'Maple Street Apartments',
        unitName: 'Elm 2BR 3C',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 42,
        price: 6800,
        status: 'Draft',
        inquiriesCount: 3,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Golden Valley Complex (P-1004) - 24 units
      {
        id: 'L-1012',
        propertyId: 'P-1004',
        propertyName: 'Golden Valley Complex',
        unitName: 'Valley Studio 101',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 27,
        price: 6800,
        status: 'Vacant',
        inquiriesCount: 9,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1013',
        propertyId: 'P-1004',
        propertyName: 'Golden Valley Complex',
        unitName: 'Hillside 1BR 202',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 36,
        price: 7200,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1014',
        propertyId: 'P-1004',
        propertyName: 'Golden Valley Complex',
        unitName: 'Mountain 2BR 303',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 50,
        price: 8800,
        status: 'Vacant',
        inquiriesCount: 6,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1015',
        propertyId: 'P-1004',
        propertyName: 'Golden Valley Complex',
        unitName: 'Summit 3BR 404',
        bedrooms: 3,
        bathrooms: 2,
        sizeSqm: 65,
        price: 12000,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Emerald Plaza Suites (P-1005) - 22 units
      {
        id: 'L-1016',
        propertyId: 'P-1005',
        propertyName: 'Emerald Plaza Suites',
        unitName: 'Plaza Studio A',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 29,
        price: 6200,
        status: 'Vacant',
        inquiriesCount: 5,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1017',
        propertyId: 'P-1005',
        propertyName: 'Emerald Plaza Suites',
        unitName: 'Suite 1BR B',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 38,
        price: 6800,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1018',
        propertyId: 'P-1005',
        propertyName: 'Emerald Plaza Suites',
        unitName: 'Deluxe 2BR C',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 52,
        price: 9200,
        status: 'Vacant',
        inquiriesCount: 7,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Riverside Gardens (P-1006) - 20 units
      {
        id: 'L-1019',
        propertyId: 'P-1006',
        propertyName: 'Riverside Gardens',
        unitName: 'River Studio 1',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 26,
        price: 5200,
        status: 'Vacant',
        inquiriesCount: 4,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1020',
        propertyId: 'P-1006',
        propertyName: 'Riverside Gardens',
        unitName: 'Garden 1BR 2',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 33,
        price: 5600,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1021',
        propertyId: 'P-1006',
        propertyName: 'Riverside Gardens',
        unitName: 'Waterfront 2BR 3',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 44,
        price: 7200,
        status: 'Draft',
        inquiriesCount: 2,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Crystal Tower Residences (P-1007) - 32 units
      {
        id: 'L-1022',
        propertyId: 'P-1007',
        propertyName: 'Crystal Tower Residences',
        unitName: 'Crystal Studio 101',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 30,
        price: 6500,
        status: 'Vacant',
        inquiriesCount: 8,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1023',
        propertyId: 'P-1007',
        propertyName: 'Crystal Tower Residences',
        unitName: 'Tower 1BR 202',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 40,
        price: 7200,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1024',
        propertyId: 'P-1007',
        propertyName: 'Crystal Tower Residences',
        unitName: 'Premium 2BR 303',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 55,
        price: 9500,
        status: 'Vacant',
        inquiriesCount: 6,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1025',
        propertyId: 'P-1007',
        propertyName: 'Crystal Tower Residences',
        unitName: 'Luxury 3BR 404',
        bedrooms: 3,
        bathrooms: 2,
        sizeSqm: 70,
        price: 13500,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },

      // Pine Grove Apartments (P-1008) - 16 units
      {
        id: 'L-1026',
        propertyId: 'P-1008',
        propertyName: 'Pine Grove Apartments',
        unitName: 'Pine Studio 1A',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 25,
        price: 5400,
        status: 'Vacant',
        inquiriesCount: 5,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1027',
        propertyId: 'P-1008',
        propertyName: 'Pine Grove Apartments',
        unitName: 'Grove 1BR 2B',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqm: 32,
        price: 5800,
        status: 'Occupied',
        inquiriesCount: 0,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'L-1028',
        propertyId: 'P-1008',
        propertyName: 'Pine Grove Apartments',
        unitName: 'Forest 2BR 3C',
        bedrooms: 2,
        bathrooms: 1,
        sizeSqm: 45,
        price: 7800,
        status: 'Vacant',
        inquiriesCount: 4,
        updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      }
    ],
    []
  );

  const [properties, setProperties] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bedroomsFilter, setBedroomsFilter] = useState('All');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('Recent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewListing, setPreviewListing] = useState(null);
  const [newSpace, setNewSpace] = useState({
    unitName: '',
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: '',
    price: '',
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    company: '',
    propertyManager: '',
    description: '',
    amenities: [],
    floorNumber: '',
    parkingSpaces: 0,
    balcony: false,
    furnished: false,
    airConditioning: false,
    wifi: false,
    security: false,
    images: []
  });
  const itemsPerPage = 6;

  // Load properties and listings from localStorage or use seed data
  useEffect(() => {
    const persistedProperties = localStorage.getItem(STORAGE_KEY);
    const persistedListings = localStorage.getItem(LISTINGS_STORAGE_KEY);
    
    // Force load new seed data by clearing old localStorage
    if (persistedProperties || persistedListings) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LISTINGS_STORAGE_KEY);
    }
    
    setProperties(seedProperties);
    setListings(seedListings);
  }, [seedProperties, seedListings]);

  // Save properties and listings to localStorage
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    }
  }, [properties]);

  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
    }
  }, [listings]);

  // Get filtered listings for selected property
  const filteredListings = useMemo(() => {
    if (!selectedProperty) return [];
    
    return listings.filter(listing => {
      if (listing.propertyId !== selectedProperty.id) return false;
      
      const matchesSearch = listing.unitName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || listing.status === statusFilter;
      const matchesBedrooms = bedroomsFilter === 'All' || listing.bedrooms.toString() === bedroomsFilter;
      const matchesPriceMin = !priceMin || listing.price >= parseInt(priceMin);
      const matchesPriceMax = !priceMax || listing.price <= parseInt(priceMax);
      
      return matchesSearch && matchesStatus && matchesBedrooms && matchesPriceMin && matchesPriceMax;
    });
  }, [listings, selectedProperty, searchTerm, statusFilter, bedroomsFilter, priceMin, priceMax]);

  const sortedListings = useMemo(() => {
    const sorted = [...filteredListings].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'Recent':
          comparison = b.updatedAt - a.updatedAt;
          break;
        case 'Price':
          comparison = a.price - b.price;
          break;
        case 'Inquiries':
          comparison = b.inquiriesCount - a.inquiriesCount;
          break;
        case 'Size':
          comparison = a.sizeSqm - b.sizeSqm;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return sorted;
  }, [filteredListings, sortBy, sortOrder]);

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return sortedListings.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedListings, page]);

  const totalPages = Math.ceil(sortedListings.length / itemsPerPage);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setPage(1);
    setSearchTerm('');
    setStatusFilter('All');
    setBedroomsFilter('All');
    setPriceMin('');
    setPriceMax('');
    setSelectedIds(new Set());
  };

  const handleBackToProperties = () => {
    setSelectedProperty(null);
    setPage(1);
    setSearchTerm('');
    setStatusFilter('All');
    setBedroomsFilter('All');
    setPriceMin('');
    setPriceMax('');
    setSelectedIds(new Set());
  };

  const handleBulkAction = (action) => {
    if (selectedIds.size === 0) return;
    
    const newListings = listings.map(listing => {
      if (selectedIds.has(listing.id)) {
        switch (action) {
          case 'publish':
            return { ...listing, status: 'Vacant' };
          case 'unpublish':
            return { ...listing, status: 'Draft' };
          case 'delete':
            return null;
          default:
            return listing;
        }
      }
      return listing;
    }).filter(Boolean);
    
    setListings(newListings);
    setSelectedIds(new Set());
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setShowEditModal(true);
  };

  const handlePreview = (listing) => {
    setPreviewListing(listing);
    setShowPreviewModal(true);
  };

  const handleInquiries = () => {
    if (onPageChange) {
      onPageChange('inquiries');
    }
  };

  const handleSaveEdit = (updatedListing) => {
    setListings(prev => prev.map(listing => 
      listing.id === updatedListing.id ? updatedListing : listing
    ));
    setShowEditModal(false);
    setEditingListing(null);
  };

  const handleAddSpace = () => {
    if (!newSpace.unitName || !newSpace.sizeSqm || !newSpace.price) {
      alert('Please fill in all required fields');
      return;
    }

    const newListing = {
      id: `L-${Date.now()}`,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      unitName: newSpace.unitName,
      bedrooms: parseInt(newSpace.bedrooms),
      bathrooms: parseInt(newSpace.bathrooms),
      sizeSqm: parseInt(newSpace.sizeSqm),
      price: parseInt(newSpace.price),
      status: newSpace.status,
      inquiriesCount: 0,
      updatedAt: Date.now(),
      image: newSpace.image,
      company: newSpace.company || selectedProperty.company || 'Prime Properties Inc.',
      propertyManager: newSpace.propertyManager || selectedProperty.propertyManager || 'Sarah Johnson',
      description: newSpace.description,
      amenities: newSpace.amenities,
      floorNumber: newSpace.floorNumber,
      parkingSpaces: parseInt(newSpace.parkingSpaces),
      balcony: newSpace.balcony,
      furnished: newSpace.furnished,
      airConditioning: newSpace.airConditioning,
      wifi: newSpace.wifi,
      security: newSpace.security,
      images: newSpace.images.length > 0 ? newSpace.images : [newSpace.image]
    };

    setListings(prev => [...prev, newListing]);
    
    // Update property counts
    setProperties(prev => prev.map(property => {
      if (property.id === selectedProperty.id) {
        return {
          ...property,
          totalUnits: property.totalUnits + 1,
          vacantUnits: newSpace.status === 'Vacant' ? property.vacantUnits + 1 : property.vacantUnits,
          occupiedUnits: newSpace.status === 'Occupied' ? property.occupiedUnits + 1 : property.occupiedUnits,
          monthlyRevenue: property.monthlyRevenue + parseInt(newSpace.price)
        };
      }
      return property;
    }));

    // Reset form and close modal
    setNewSpace({
      unitName: '',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqm: '',
      price: '',
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      company: '',
      propertyManager: '',
      description: '',
      amenities: [],
      floorNumber: '',
      parkingSpaces: 0,
      balcony: false,
      furnished: false,
      airConditioning: false,
      wifi: false,
      security: false,
      images: []
    });
    setShowAddSpaceModal(false);
  };

  const handleInputChange = (field, value) => {
    setNewSpace(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setNewSpace(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setNewSpace(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setNewSpace(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const formatDate = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Render Properties View
  const renderPropertiesView = () => (
    <div>
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white mb-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manage Your Properties</h1>
              <p className="text-gray-300 text-lg">Select a property to manage its spaces and rooms</p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{properties.length} Properties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm">{properties.reduce((sum, p) => sum + (p.vacantUnits || 0), 0)} Vacant Units</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">{properties.reduce((sum, p) => sum + (p.occupiedUnits || 0), 0)} Occupied Units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => handlePropertyClick(property)}
          >
            {/* Property Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  {property.vacantUnits > 0 ? 'Available' : 'Full'}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <h3 className="font-bold text-gray-900 text-xl mb-2">{property.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{property.address}</p>
              
              {/* Property Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Units</p>
                  <p className="font-semibold text-gray-900">{property.totalUnits || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Vacant</p>
                  <p className="font-semibold text-green-600">{property.vacantUnits || 0}</p>
                </div>
              </div>

              {/* Revenue Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Monthly Revenue</span>
                  <span className="text-lg font-bold text-black">₱{(property.monthlyRevenue || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Avg Rent</span>
                  <span className="text-sm font-medium text-gray-700">₱{(property.averageRent || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Click to Manage Button */}
              <div className="mt-4">
                <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Manage Spaces
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Spaces/Rooms View
  const renderSpacesView = () => (
    <div>
      {/* Back Button and Property Header */}
      <div className="mb-6">
        <button
          onClick={handleBackToProperties}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Properties</span>
        </button>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h1>
                <p className="text-gray-600">{selectedProperty.address}</p>
                <div className="flex items-center space-x-6 mt-2">
                  <span className="text-sm text-gray-500">
                    {selectedProperty.totalUnits || 0} total units • {selectedProperty.vacantUnits || 0} vacant • {selectedProperty.occupiedUnits || 0} occupied
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAddSpaceModal(true)}
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Add New Space
            </button>
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
              placeholder="Search spaces..."
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
              <option value="Vacant">Vacant</option>
              <option value="Occupied">Occupied</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
            <select
              value={bedroomsFilter}
              onChange={(e) => setBedroomsFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            >
              <option value="All">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
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
              <option value="Price">Price</option>
              <option value="Inquiries">Inquiries</option>
              <option value="Size">Size</option>
            </select>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price (₱)</label>
            <input
              type="number"
              placeholder="0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₱)</label>
            <input
              type="number"
              placeholder="∞"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium">
              {selectedIds.size} space{selectedIds.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkAction('unpublish')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                Unpublish
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spaces Grid */}
      {currentPageItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          {filteredListings.length === 0 ? (
            <div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No spaces available</h3>
              <p className="text-gray-600 mb-4">Get started by adding spaces to this property</p>
              <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                Add New Space
              </button>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No spaces match your filters</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPageItems.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Space Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={listing.image}
                  alt={listing.unitName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(listing.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedIds);
                      if (e.target.checked) {
                        newSelected.add(listing.id);
                      } else {
                        newSelected.delete(listing.id);
                      }
                      setSelectedIds(newSelected);
                    }}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusToBadgeClass[listing.status]}`}>
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Space Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{listing.unitName}</h3>
                    <p className="text-gray-600 text-sm">{listing.propertyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-black">₱{listing.price.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">per month</p>
                  </div>
                </div>

                {/* Space Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{listing.bedrooms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold text-gray-900">{listing.bathrooms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-semibold text-gray-900">{listing.sizeSqm} sqm</p>
                  </div>
                </div>

                {/* Inquiries and Last Updated */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>{listing.inquiriesCount} inquiries</span>
                  <span>{formatDate(listing.updatedAt)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium" onClick={() => handlePreview(listing)}>
                    Preview
                  </button>
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium" onClick={handleInquiries}>
                    Inquiries
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
              Previous
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
              localStorage.removeItem(LISTINGS_STORAGE_KEY);
              setProperties(seedProperties);
              setListings(seedListings);
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProperty ? renderSpacesView() : renderPropertiesView()}
      </div>

      {/* Add Space Modal */}
      {showAddSpaceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Space</h2>
              <button
                onClick={() => setShowAddSpaceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., Studio A-101, 1BR B-205"
                        value={newSpace.unitName}
                        onChange={(e) => handleInputChange('unitName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                        <select
                          value={newSpace.bedrooms}
                          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        >
                          <option value={1}>1 Bedroom</option>
                          <option value={2}>2 Bedrooms</option>
                          <option value={3}>3+ Bedrooms</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                        <select
                          value={newSpace.bathrooms}
                          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        >
                          <option value={1}>1 Bathroom</option>
                          <option value={2}>2 Bathrooms</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Size (sqm) *</label>
                        <input
                          type="number"
                          placeholder="e.g., 25"
                          value={newSpace.sizeSqm}
                          onChange={(e) => handleInputChange('sizeSqm', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent (₱) *</label>
                        <input
                          type="number"
                          placeholder="e.g., 5000"
                          value={newSpace.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <select
                        value={newSpace.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Vacant">Vacant</option>
                        <option value="Occupied">Occupied</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Description
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Space Description</label>
                    <textarea
                      placeholder="Brief description of the space, features, and highlights..."
                      value={newSpace.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Floor Number</label>
                      <input
                        type="number"
                        placeholder="e.g., 1"
                        value={newSpace.floorNumber}
                        onChange={(e) => handleInputChange('floorNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Spaces</label>
                      <input
                        type="number"
                        placeholder="e.g., 1"
                        value={newSpace.parkingSpaces}
                        onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={newSpace.balcony} 
                        onChange={() => handleAmenityToggle('balcony')} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Balcony
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={newSpace.furnished} 
                        onChange={() => handleAmenityToggle('furnished')} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Furnished
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={newSpace.airConditioning} 
                        onChange={() => handleAmenityToggle('airConditioning')} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Air Conditioning
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={newSpace.wifi} 
                        onChange={() => handleAmenityToggle('wifi')} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      WiFi
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={newSpace.security} 
                        onChange={() => handleAmenityToggle('security')} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Security
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Images
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Images</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {newSpace.images.map((imageUrl, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <img src={imageUrl} alt={`Space ${index + 1}`} className="w-full h-full object-cover" />
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
                      <label htmlFor="image-upload" className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50 hover:bg-gray-100">
                        <input type="file" id="image-upload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-1 text-xs text-gray-600 text-center">Add Images</p>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Upload multiple images to showcase the space. First image will be the main display image.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 p-2 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAddSpaceModal(false)}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSpace}
                className="flex-1 px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Add Space
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewListing && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[150vh] shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-lg font-black text-black">Unit Details</h1>
                  <p className="text-xs text-gray-500">Property Information</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-56px-72px)]">
              {/* Image Display */}
              <div className="p-4">
                <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={previewListing.image}
                    alt={previewListing.unitName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded-md">
                    1 / 1
                  </div>
                </div>
              </div>

              {/* Title / Location / Price */}
              <div className="px-4 pb-4">
                <h2 className="text-2xl font-black text-black uppercase tracking-wide mb-2">
                  {previewListing.unitName}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{previewListing.propertyName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-black">₱{previewListing.price.toLocaleString()}</span>
                    <p className="text-[11px] text-gray-500">per month</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-2xl mb-1">🛏️</div>
                    <div className="text-xs font-bold text-gray-800">{previewListing.bedrooms} bed</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-2xl mb-1">🛁</div>
                    <div className="text-xs font-bold text-gray-800">{previewListing.bathrooms} bathroom</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-2xl mb-1">🏠</div>
                    <div className="text-xs font-bold text-gray-800">1 kitchen</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-2xl mb-1">📏</div>
                    <div className="text-xs font-bold text-gray-800">{previewListing.sizeSqm}m²</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="px-4 pb-4">
                <h3 className="text-base font-black text-black mb-2 flex items-center">
                  <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
                  Details
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {previewListing.description || `A cozy ${previewListing.bedrooms}-bedroom ${previewListing.bathrooms === 1 ? 'apartment' : 'unit'} with a functional layout and modern amenities. This ${previewListing.sizeSqm} square meter space offers comfortable living with ${previewListing.bedrooms === 1 ? 'a bedroom' : `${previewListing.bedrooms} bedrooms`} and ${previewListing.bathrooms === 1 ? 'a bathroom' : `${previewListing.bathrooms} bathrooms`}. Perfect for ${previewListing.bedrooms === 1 ? 'individuals or couples' : 'families or roommates'} looking for quality accommodation.`}
                  </p>
                </div>
              </div>

              {/* Company & Property Manager */}
              <div className="px-4 pb-4">
                <h3 className="text-base font-black text-black mb-2 flex items-center">
                  <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
                  Company & Management
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Company</span>
                          <p className="text-sm font-semibold text-gray-800">{previewListing.company || 'Prime Properties Inc.'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Property Manager</span>
                          <p className="text-sm font-semibold text-gray-800">{previewListing.propertyManager || 'Sarah Johnson'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Rating */}
              <div className="px-4 pb-4">
                <h3 className="text-base font-black text-black mb-2 flex items-center">
                  <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
                  Property Rating
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${star <= 4.2 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-800">4.2</span>
                        <span className="text-sm text-gray-500 ml-1">/ 5.0</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Based on</span>
                      <p className="text-sm font-semibold text-gray-800">12 reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="px-4 pb-4">
                <h3 className="text-base font-black text-black mb-2 flex items-center">
                  <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
                  Recent Reviews
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-gray-600">M</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">Maria Santos</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-500 ml-2">5/5</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">1 week ago</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Excellent property! The location is perfect and the amenities are exactly as described. Highly recommend!
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-gray-600">J</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">Juan Dela Cruz</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-500 ml-2">4/5</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">2 weeks ago</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Great place to stay. Clean and well-maintained. The staff is very helpful and responsive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Landmarks */}
              <div className="px-4 pb-4">
                <h3 className="text-base font-black text-black mb-2 flex items-center">
                  <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
                  Nearby Landmarks
                </h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">SM City Cebu</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">5 min walk</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Cebu IT Park</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">10 min drive</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Ayala Center Cebu</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">15 min drive</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Cebu Business Park</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">8 min drive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer Actions */}
            <div className="px-6 py-2 border-t border-gray-200 bg-white">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleEdit(previewListing);
                  }}
                  className="w-full sm:flex-1 bg-black text-white py-3 rounded-lg font-black text-sm hover:bg-gray-800 transition-all shadow-md"
                >
                  EDIT UNIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Space</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Unit Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., Studio A-101, 1BR B-205"
                        value={editingListing.unitName}
                        onChange={(e) => setEditingListing({...editingListing, unitName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                        <select
                          value={editingListing.bedrooms}
                          onChange={(e) => setEditingListing({...editingListing, bedrooms: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        >
                          <option value={1}>1 Bedroom</option>
                          <option value={2}>2 Bedrooms</option>
                          <option value={3}>3+ Bedrooms</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                        <select
                          value={editingListing.bathrooms}
                          onChange={(e) => setEditingListing({...editingListing, bathrooms: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        >
                          <option value={1}>1 Bathroom</option>
                          <option value={2}>2 Bathrooms</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Size (sqm) *</label>
                        <input
                          type="number"
                          placeholder="e.g., 25"
                          value={editingListing.sizeSqm}
                          onChange={(e) => setEditingListing({...editingListing, sizeSqm: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent (₱) *</label>
                        <input
                          type="number"
                          placeholder="e.g., 5000"
                          value={editingListing.price}
                          onChange={(e) => setEditingListing({...editingListing, price: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <select
                        value={editingListing.status}
                        onChange={(e) => setEditingListing({...editingListing, status: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Vacant">Vacant</option>
                        <option value="Occupied">Occupied</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Description
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Space Description</label>
                    <textarea
                      placeholder="Brief description of the space, features, and highlights..."
                      value={editingListing.description || ''}
                      onChange={(e) => setEditingListing({...editingListing, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Floor Number</label>
                      <input
                        type="number"
                        placeholder="e.g., 1"
                        value={editingListing.floorNumber || ''}
                        onChange={(e) => setEditingListing({...editingListing, floorNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Spaces</label>
                      <input
                        type="number"
                        placeholder="e.g., 1"
                        value={editingListing.parkingSpaces || 0}
                        onChange={(e) => setEditingListing({...editingListing, parkingSpaces: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={editingListing.balcony || false} 
                        onChange={(e) => setEditingListing({...editingListing, balcony: e.target.checked})} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Balcony
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={editingListing.furnished || false} 
                        onChange={(e) => setEditingListing({...editingListing, furnished: e.target.checked})} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Furnished
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={editingListing.airConditioning || false} 
                        onChange={(e) => setEditingListing({...editingListing, airConditioning: e.target.checked})} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Air Conditioning
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={editingListing.wifi || false} 
                        onChange={(e) => setEditingListing({...editingListing, wifi: e.target.checked})} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      WiFi
                    </label>
                    <label className="flex items-center text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={editingListing.security || false} 
                        onChange={(e) => setEditingListing({...editingListing, security: e.target.checked})} 
                        className="mr-3 h-4 w-4 text-black focus:ring-black rounded" 
                      />
                      Security
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-6 p-2 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(editingListing)}
                className="flex-1 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerRentSpace;


