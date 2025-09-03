import React, { useState } from 'react';

const Inquiries = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState('tenant1');
  const [message, setMessage] = useState('');

  // Tenants that Property Managers are chatting with
  const tenants = [
    { 
      id: 'tenant1', 
      name: 'John Smith', 
      property: 'Sunset Gardens Residences - Studio A-101',
      lastMessage: 'Hi, I\'m interested in the studio. Is it still available?', 
      time: '3:24 am', 
      unread: 2,
      avatar: 'JS',
      status: 'online',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'tenant2', 
      name: 'Sarah Johnson', 
      property: 'Oceanview Heights - Sea View 1BR 202',
      lastMessage: 'What are the payment terms for the 1BR unit?', 
      time: '2:15 pm', 
      unread: 0,
      avatar: 'SJ',
      status: 'offline',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'tenant3', 
      name: 'Mike Davis', 
      property: 'Golden Valley Complex - Valley Studio 101',
      lastMessage: 'Can I schedule a viewing for tomorrow?', 
      time: '1:30 pm', 
      unread: 1,
      avatar: 'MD',
      status: 'online',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'tenant4', 
      name: 'Lisa Wilson', 
      property: 'Emerald Plaza Suites - Plaza Studio A',
      lastMessage: 'Is parking included in the monthly rent?', 
      time: '12:45 pm', 
      unread: 0,
      avatar: 'LW',
      status: 'offline',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'tenant5', 
      name: 'David Brown', 
      property: 'Crystal Tower Residences - Crystal Studio 101',
      lastMessage: 'What utilities are included in the rent?', 
      time: '11:20 am', 
      unread: 3,
      avatar: 'DB',
      status: 'online',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
  ];

  // New tenant inquiries that Property Managers can respond to
  const newInquiries = [
    { 
      id: 'inquiry1', 
      tenant: 'Emma Garcia', 
      property: 'Sunset Gardens Residences - 1BR B-206',
      price: '₱5,000/month',
      location: 'Cebu City',
      status: 'New Inquiry',
      time: 'Just now',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'inquiry2', 
      tenant: 'Alex Chen', 
      property: 'Maple Street Apartments - Maple Studio 1A',
      price: '₱5,000/month',
      location: 'Cebu City',
      status: 'New Inquiry',
      time: '2 min ago',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 'inquiry3', 
      tenant: 'Maria Rodriguez', 
      property: 'Riverside Gardens - River Studio 1',
      price: '₱5,200/month',
      location: 'Cebu City',
      status: 'New Inquiry',
      time: '5 min ago',
      propertyImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
  ];

  const messages = {
    tenant1: [
      { id: 1, text: 'Hi, I\'m interested in the studio. Is it still available?', sender: 'tenant', time: '3:20 am' },
      { id: 2, text: 'Yes, the studio is still available! When would you like to view it?', sender: 'manager', time: '3:24 am' },
      { id: 3, text: 'Great! Can I schedule for tomorrow afternoon?', sender: 'tenant', time: '3:26 am' },
      { id: 4, text: 'Perfect! I\'ll send you the details and address.', sender: 'manager', time: '3:27 am' },
    ],
    tenant2: [
      { id: 1, text: 'Hi, I\'m interested in the 1BR unit. What are the payment terms?', sender: 'tenant', time: '2:10 pm' },
      { id: 2, text: 'Payment terms are monthly with 2 months deposit. Utilities not included.', sender: 'manager', time: '2:15 pm' },
    ],
    tenant3: [
      { id: 1, text: 'Hi, I\'m interested in the studio. Can I schedule a viewing?', sender: 'tenant', time: '1:25 pm' },
      { id: 2, text: 'Yes, we can schedule a viewing tomorrow. What time works for you?', sender: 'manager', time: '1:30 pm' },
    ],
    tenant4: [
      { id: 1, text: 'Hi, I\'m interested in the studio. Is parking included?', sender: 'tenant', time: '12:40 pm' },
      { id: 2, text: 'Yes, parking is included in the monthly rent.', sender: 'manager', time: '12:45 pm' },
    ],
    tenant5: [
      { id: 1, text: 'Hi, I\'m interested in the studio. What utilities are included?', sender: 'tenant', time: '11:15 am' },
      { id: 2, text: 'Basic utilities like water and electricity are included. Internet is separate.', sender: 'manager', time: '11:20 am' },
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
    console.log('Starting inquiry with:', inquiry.tenant);
    alert(`Starting conversation with ${inquiry.tenant} about ${inquiry.property}`);
  };

  const handleMarkAsRead = (tenantId) => {
    // Handle marking messages as read
    console.log('Marking messages as read for:', tenantId);
  };

  const handleBack = () => {
    // Navigate back to the previous page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-black text-black">Tenant Inquiries</h1>
              <p className="text-sm text-gray-500">Manage and respond to tenant inquiries about your properties</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {tenants.filter(t => t.unread > 0).reduce((sum, t) => sum + t.unread, 0)} unread messages
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex h-[calc(100vh-300px)]">
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
                  New Inquiries
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
                    placeholder={activeTab === 'chats' ? "Search tenants..." : "Search inquiries..."}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Chat/Inquiry List */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'chats' ? (
                  // Active Chats with Tenants
                  <div className="space-y-1 px-2">
                    {tenants.map((tenant) => (
                      <div
                        key={tenant.id}
                        onClick={() => {
                          setSelectedChat(tenant.id);
                          if (tenant.unread > 0) {
                            handleMarkAsRead(tenant.id);
                          }
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === tenant.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-600">{tenant.avatar}</span>
                            </div>
                            {tenant.status === 'online' && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{tenant.name}</p>
                              <span className="text-xs text-gray-500">{tenant.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">{tenant.property.split(' - ')[0]}</p>
                            <p className="text-xs text-gray-500 truncate">{tenant.lastMessage}</p>
                          </div>
                          {tenant.unread > 0 && (
                            <div className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                              {tenant.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // New Tenant Inquiries
                  <div className="space-y-1 px-2">
                    {newInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{inquiry.tenant}</h4>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{inquiry.status}</span>
                          </div>
                          <p className="text-xs text-gray-600">{inquiry.property.split(' - ')[0]}</p>
                          <p className="text-xs text-gray-500">{inquiry.location}</p>
                          <p className="text-sm font-medium text-black">{inquiry.price}</p>
                          <p className="text-xs text-gray-400">{inquiry.time}</p>
                          <button
                            onClick={() => handleStartInquiry(inquiry)}
                            className="w-full mt-2 px-3 py-1 bg-black text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            Respond to Inquiry
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
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">
                        {tenants.find(t => t.id === selectedChat)?.avatar || 'TN'}
                      </span>
                    </div>
                    {tenants.find(t => t.id === selectedChat)?.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {tenants.find(t => t.id === selectedChat)?.name || 'Tenant'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {tenants.find(t => t.id === selectedChat)?.property || 'Property'}
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
                    className={`flex ${msg.sender === 'manager' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'manager'
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'manager' ? 'text-gray-300' : 'text-gray-500'
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
                    placeholder="Type your response to the tenant..."
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
                  You're chatting with {tenants.find(t => t.id === selectedChat)?.name || 'this tenant'} about {tenants.find(t => t.id === selectedChat)?.property || 'their inquiry'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
