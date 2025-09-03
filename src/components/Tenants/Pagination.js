import React from 'react';

const Pagination = () => {
  return (
    <div className="flex justify-center items-center space-x-1 md:space-x-2 mb-8">
      <button className="px-3 py-2 md:px-4 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base">
        Previous
      </button>
      <button className="px-3 py-2 md:px-4 bg-black text-white rounded-lg text-sm md:text-base">
        1
      </button>
      <button className="px-3 py-2 md:px-4 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base">
        2
      </button>
      <button className="px-3 py-2 md:px-4 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base">
        3
      </button>
      <button className="px-3 py-2 md:px-4 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base">
        Next
      </button>
    </div>
  );
};

export default Pagination;
