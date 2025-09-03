import React, { useState } from 'react';
import Header from './components/Header';
import LandingDashboard from './components/LandingDashboard';
import SearchSection from './components/Tenants/SearchSection';
import PropertyGrid from './components/Tenants/PropertyGrid';
import Pagination from './components/Tenants/Pagination';
import Footer from './components/Footer';
import Login from './components/Login';
import ManagerRentSpace from './components/PropertyManager/RentSpace';
import ManagerProfile from './components/PropertyManager/Profile';
import AnalyticsReports from './components/PropertyManager/AnalyticsReports';
import ManageProperty from './components/PropertyManager/ManageProperty';
import Settings from './components/PropertyManager/Settings';
import AboutContact from './components/AboutContact';
import AdminDashboard from './components/Admin/Dashboard';
import AdminProfile from './components/Admin/Profile';
import AdminSettings from './components/Admin/Settings';
import AdminPropertyReview from './components/Admin/PropertyReview';
import AdminAnalytics from './components/Admin/Analytics';
import AdminSubscriptionManagement from './components/Admin/SubscriptionManagement';
import Inquiries from './components/PropertyManager/Inquiries';
  
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('tenant'); // 'tenant' | 'manager' | 'admin'

  const handlePageChange = (nextPage) => {
    if (nextPage === 'logout') {
      setIsAuthenticated(false);
      setCurrentPage('dashboard');
      setUserRole('tenant');
      return;
    }
    setCurrentPage(nextPage);
  };

  const renderContent = () => {
    // Handle Admin specific pages
    if (userRole === 'admin' && isAuthenticated) {
      switch (currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-profile':
          return <AdminProfile />;
        case 'admin-settings':
          return <AdminSettings />;
        case 'admin-property-review':
          return <AdminPropertyReview />;
        case 'admin-analytics':
          return <AdminAnalytics />;
        case 'admin-subscription-management':
          return <AdminSubscriptionManagement />;
        case 'about-contact':
          return <AboutContact />;
        default:
          return <AdminDashboard />;
      }
    }
    
    // Handle Property Manager specific pages
    if (userRole === 'manager' && isAuthenticated) {
      switch (currentPage) {
        case 'rent-space':
          return <ManagerRentSpace onPageChange={handlePageChange} />;
        case 'profile':
          return <ManagerProfile />;
        case 'analyticsReports':
          return <AnalyticsReports />;
        case 'manageProperty':
          return <ManageProperty onOpenManageUnits={() => handlePageChange('rent-space')} />;
        case 'settings':
          return <Settings />;
        case 'inquiries':
          return <Inquiries />;
        case 'about-contact':
          return <AboutContact />;
        default:
          return <LandingDashboard />;
      }
    }
    
    // Handle Tenant and public pages
    switch (currentPage) {
      case 'dashboard':
        return <LandingDashboard />;
      case 'rent-space':
        return (
          <>
            <section className="mb-6 md:mb-8 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl p-4 md:p-6 shadow-lg">
              <h1 className="text-xl md:text-2xl font-black">Find Your Next Home</h1>
              <p className="text-xs md:text-sm text-gray-300 mt-1">Search and filter rental spaces that match your needs</p>
            </section>
            <div className="mb-6 md:mb-8">
              <SearchSection />
            </div>
            <PropertyGrid />
            <Pagination />
          </>
        );
      case 'about-contact':
        return <AboutContact />;
      default:
        return <LandingDashboard />;
    }
  };

  if (currentPage === 'login') {
    return (
      <Login
        onLoginSuccess={({ role }) => {
          setIsAuthenticated(true);
          if (role === 'admin') {
            setUserRole('admin');
            setCurrentPage('admin-dashboard');
          } else if (role === 'manager') {
            setUserRole('manager');
            setCurrentPage('dashboard');
          } else {
            setUserRole('tenant');
            setCurrentPage('dashboard');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
      />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
