import React, { useState } from 'react';

const UnitDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleInquiry = () => {
    console.log('Inquiry submitted for:', property.name);
    alert('Inquiry submitted successfully! We will contact you soon.');
  };

  const handleSave = () => {
    console.log('Property saved:', property.name);
    alert('Property saved to your favorites!');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[150vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
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
          {/* Image Carousel */}
          <div className="p-4">
            <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={property.images[currentImageIndex]}
                alt={`${property.imageAlt} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-1.5 rounded-full hover:bg-opacity-80 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-1.5 rounded-full hover:bg-opacity-80 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-[10px] px-2 py-0.5 rounded-md">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white scale-150' : 'bg-white/60 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title / Location / Price */}
          <div className="px-4 pb-4">
            <h2 className="text-2xl font-black text-black uppercase tracking-wide mb-2">
              {property.name || 'TAHANAN APARTMENT'}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-2">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium">{property.location}</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-black">{property.price}</span>
                <p className="text-[11px] text-gray-500">per month</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl mb-1">🛏️</div>
                <div className="text-xs font-bold text-gray-800">1 bed</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl mb-1">🛁</div>
                <div className="text-xs font-bold text-gray-800">1 bathroom</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl mb-1">🏠</div>
                <div className="text-xs font-bold text-gray-800">1 kitchen</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl mb-1">📏</div>
                <div className="text-xs font-bold text-gray-800">60m²</div>
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
                A cozy one-bedroom apartment with a small living area, a functional kitchen, and a clean bathroom.
                The room is simply furnished with a bed, a table, and a wardrobe, offering a quiet and comfortable
                space for everyday living. Natural light filters in through a single window, giving the room a warm
                and inviting feel.
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
                      <p className="text-sm font-semibold text-gray-800">{property.company || 'Prime Properties Inc.'}</p>
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
                      <p className="text-sm font-semibold text-gray-800">{property.propertyManager || 'Sarah Johnson'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Rating */}
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
                        className={`w-5 h-5 ${star <= (property.rating || 4.2) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-800">{property.rating || '4.2'}</span>
                    <span className="text-sm text-gray-500 ml-1">/ 5.0</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Based on</span>
                  <p className="text-sm font-semibold text-gray-800">{property.reviewCount || '12'} reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Comments */}
          <div className="px-4 pb-4">
            <h3 className="text-base font-black text-black mb-2 flex items-center">
              <span className="w-1 h-4 bg-black rounded-full mr-2"></span>
              Recent Reviews
            </h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="space-y-4">
                {property.reviews && property.reviews.length > 0 ? (
                  property.reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-gray-600">
                              {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : 'A'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {review.reviewerName || `Anonymous User ${index + 1}`}
                            </p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-500 ml-2">{review.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{review.date || '2 weeks ago'}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {review.comment || 'Great property! The location is perfect and the amenities are exactly as described. Highly recommend!'}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No reviews yet</p>
                    <p className="text-xs text-gray-400 mt-1">Be the first to review this property!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Landmarks */}
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
              onClick={handleInquiry}
              className="w-full sm:flex-1 bg-black text-white py-3 rounded-lg font-black text-sm hover:bg-gray-800 transition-all shadow-md"
            >
              INQUIRE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetails;
