import React from 'react';
import ClientLandingPage from './ClientLandingPage';
import { unstable_noStore as noStore } from 'next/cache';

export default function LandingPage() {
  noStore();
  return <ClientLandingPage />;
}
