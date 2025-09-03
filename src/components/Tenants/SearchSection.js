import React, { useState } from 'react';

const SearchSection = () => {
  const [classificationOpen, setClassificationOpen] = useState(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const classifications = [
    'Apartment',
    'Bed Spacer',
    'Boarding House',
    'Dormitory'
  ];

  const toggleClassification = () => {
    setClassificationOpen(!classificationOpen);
    setPriceRangeOpen(false);
  };

  const togglePriceRange = () => {
    setPriceRangeOpen(!priceRangeOpen);
    setClassificationOpen(false);
  };

  const handleClassificationSelect = (classification) => {
    setSelectedClassification(classification);
    setClassificationOpen(false);
  };

  const handleApplyPriceRange = () => {
    setPriceRangeOpen(false);
    // Here you would typically apply the filter
    console.log('Price range applied:', { minPrice, maxPrice });
  };

  const handleClearFilters = () => {
    setSelectedClassification('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Location"
            defaultValue="Basak San Nicolas Cebu City"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Classification Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleClassification}
              className={`flex items-center justify-center space-x-2 px-4 py-3 border rounded-lg transition-colors ${
                selectedClassification 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{selectedClassification || 'Classification'}</span>
              <svg className={`w-4 h-4 transition-transform ${classificationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Classification Dropdown Menu */}
            {classificationOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-blue-500 rounded-lg shadow-xl z-50">
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2 px-2">classification</div>
                  <div className="space-y-0">
                    {classifications.map((classification, index) => (
                      <button
                        key={index}
                        onClick={() => handleClassificationSelect(classification)}
                        className={`w-full text-left px-3 py-3 text-lg font-medium hover:bg-gray-50 transition-colors ${
                          selectedClassification === classification ? 'bg-blue-50 text-blue-700' : 'text-black'
                        } ${index !== classifications.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        {classification}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Range Dropdown */}
          <div className="relative">
            <button 
              onClick={togglePriceRange}
              className={`flex items-center justify-center space-x-2 px-4 py-3 border rounded-lg transition-colors ${
                (minPrice || maxPrice) 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="font-medium">₱</span>
              <span>Price Range</span>
              <svg className={`w-4 h-4 transition-transform ${priceRangeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Price Range Dropdown Menu */}
            {priceRangeOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-4">price range</div>
                  
                  {/* Min Price */}
                  <div className="mb-4">
                    <label className="block text-lg font-medium text-black mb-2">Min</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  {/* Max Price */}
                  <div className="mb-6">
                    <label className="block text-lg font-medium text-black mb-2">Max</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={handleApplyPriceRange}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {(selectedClassification || minPrice || maxPrice) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedClassification || minPrice || maxPrice) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedClassification && (
            <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              <span>Classification: {selectedClassification}</span>
              <button
                onClick={() => setSelectedClassification('')}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          )}
          {(minPrice || maxPrice) && (
            <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              <span>Price: ₱{minPrice || '0'} - ₱{maxPrice || '∞'}</span>
              <button
                onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdowns */}
      {(classificationOpen || priceRangeOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setClassificationOpen(false);
            setPriceRangeOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default SearchSection;
