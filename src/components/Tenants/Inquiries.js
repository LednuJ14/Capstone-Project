import React, { useState } from 'react';

const Inquiries = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState('property1');
  const [message, setMessage] = useState('');

  // Property managers that tenants are chatting with
  const propertyManagers = [
    { 
      id: 'property1', 
      name: 'Ms. Sarah Johnson', 
      property: 'TAHANAN APARTMENT',
      lastMessage: 'The apartment is still available. When would you like to view it?', 
      time: '3:24 am', 
      unread: 2,
      avatar: 'SJ',
      status: 'online'
    },
    { 
      id: 'property2', 
      name: 'Mr. David Chen', 
      property: 'COMFORT STUDIO',
      lastMessage: 'Payment terms are monthly with 2 months deposit.', 
      time: '2:15 pm', 
      unread: 0,
      avatar: 'DC',
      status: 'offline'
    },
    { 
      id: 'property3', 
      name: 'Ms. Maria Garcia', 
      property: 'SIMPLE ROOM',
      lastMessage: 'Yes, we can schedule a viewing tomorrow.', 
      time: '1:30 pm', 
      unread: 1,
      avatar: 'MG',
      status: 'online'
    },
    { 
      id: 'property4', 
      name: 'Mr. Robert Wilson', 
      property: 'MODERN STUDIO',
      lastMessage: 'Parking is included in the monthly rent.', 
      time: '12:45 pm', 
      unread: 0,
      avatar: 'RW',
      status: 'offline'
    },
  ];

  // New property inquiries that tenants can start
  const newInquiries = [
    { 
      id: 'inquiry1', 
      property: 'TAHANAN APARTMENT', 
      manager: 'Ms. Sarah Johnson',
      price: '₱8,000/month',
      location: 'Cebu City',
      status: 'Available'
    },
    { 
      id: 'inquiry2', 
      property: 'COMFORT STUDIO', 
      manager: 'Mr. David Chen',
      price: '₱12,000/month',
      location: 'Mandaue City',
      status: 'Available'
    },
    { 
      id: 'inquiry3', 
      property: 'SHARED DORMITORY', 
      manager: 'Ms. Lisa Santos',
      price: '₱5,000/month',
      location: 'Cebu City',
      status: 'Available'
    },
  ];

  const messages = {
    property1: [
      { id: 1, text: 'Hi, I\'m interested in the TAHANAN APARTMENT. Is it still available?', sender: 'tenant', time: '3:20 am' },
      { id: 2, text: 'Yes, the apartment is still available! When would you like to view it?', sender: 'manager', time: '3:24 am' },
      { id: 3, text: 'Great! Can I schedule for tomorrow afternoon?', sender: 'tenant', time: '3:26 am' },
      { id: 4, text: 'Perfect! I\'ll send you the details and address.', sender: 'manager', time: '3:27 am' },
    ],
    property2: [
      { id: 1, text: 'Hi, I\'m interested in the COMFORT STUDIO. What are the payment terms?', sender: 'tenant', time: '2:10 pm' },
      { id: 2, text: 'Payment terms are monthly with 2 months deposit. Utilities not included.', sender: 'manager', time: '2:15 pm' },
    ],
    property3: [
      { id: 1, text: 'Hi, I\'m interested in the SIMPLE ROOM. Can I schedule a viewing?', sender: 'tenant', time: '1:25 pm' },
      { id: 2, text: 'Yes, we can schedule a viewing tomorrow. What time works for you?', sender: 'manager', time: '1:30 pm' },
    ],
    property4: [
      { id: 1, text: 'Hi, I\'m interested in the MODERN STUDIO. Is parking included?', sender: 'tenant', time: '12:40 pm' },
      { id: 2, text: 'Yes, parking is included in the monthly rent.', sender: 'manager', time: '12:45 pm' },
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleStartInquiry = (inquiry) => {
    // Handle starting a new inquiry conversation
    console.log('Starting inquiry for:', inquiry.property);
    alert(`Starting conversation with ${inquiry.manager} about ${inquiry.property}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] shadow-2xl overflow-hidden">
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
              <h1 className="text-lg font-black text-black">My Property Inquiries</h1>
              <p className="text-xs text-gray-500">Chat with property managers about available properties</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(90vh-72px)]">
          {/* Left Panel - Chat List */}
          <div className="w-80 border-r border-gray-200 bg-gray-50">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'chats'
                    ? 'bg-white text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                Active Chats
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-white text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                New Properties
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={activeTab === 'chats' ? "Search chats..." : "Search properties..."}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Chat/Property List */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'chats' ? (
                // Active Chats with Property Managers
                <div className="space-y-1 px-2">
                  {propertyManagers.map((manager) => (
                    <div
                      key={manager.id}
                      onClick={() => setSelectedChat(manager.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === manager.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{manager.avatar}</span>
                          </div>
                          {manager.status === 'online' && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{manager.name}</p>
                            <span className="text-xs text-gray-500">{manager.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{manager.property}</p>
                          <p className="text-xs text-gray-500 truncate">{manager.lastMessage}</p>
                        </div>
                        {manager.unread > 0 && (
                          <div className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                            {manager.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // New Properties Available for Inquiry
                <div className="space-y-1 px-2">
                  {newInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{inquiry.property}</h4>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">{inquiry.status}</span>
                        </div>
                        <p className="text-xs text-gray-600">{inquiry.manager}</p>
                        <p className="text-xs text-gray-500">{inquiry.location}</p>
                        <p className="text-sm font-medium text-black">{inquiry.price}</p>
                        <button
                          onClick={() => handleStartInquiry(inquiry)}
                          className="w-full mt-2 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Start Inquiry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat Conversation */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {propertyManagers.find(m => m.id === selectedChat)?.avatar || 'PM'}
                    </span>
                  </div>
                  {propertyManagers.find(m => m.id === selectedChat)?.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {propertyManagers.find(m => m.id === selectedChat)?.name || 'Property Manager'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {propertyManagers.find(m => m.id === selectedChat)?.property || 'Property'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedChat]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'tenant'
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'tenant' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to the property manager..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You're chatting with the property manager about {propertyManagers.find(m => m.id === selectedChat)?.property || 'this property'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
