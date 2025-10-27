import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CampaignDetails, CreateCampaign, Profile, Home } from './pages';
import { Navbar, Sidebar } from './components';

const App: React.FC = () => {
  return (
    <div className='relative sm:p-8 p-4 main-bg min-h-screen flex flex-row transition-colors duration-300'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 '>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>

      </div>
    </div>
  );
};

export default App;

