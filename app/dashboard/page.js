'use client'
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Dashboard onSearch={setSearchTerm} />
  );
};

export default DashboardPage;
