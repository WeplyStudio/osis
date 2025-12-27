import React from 'react';
import ClientDashboardPage from './ClientDashboardPage';
import { unstable_noStore as noStore } from 'next/cache';

export default async function DashboardPage() {
  noStore();
  return <ClientDashboardPage />;
}

    