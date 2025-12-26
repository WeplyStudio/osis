
import React from 'react';
import fs from 'fs';
import path from 'path';
import ClientDashboardPage from './ClientDashboardPage';

// Read data directly on the server side
const dbPath = path.join(process.cwd(), 'src', 'lib', 'database.json');
const dbFile = fs.readFileSync(dbPath, 'utf-8');
const { teamMembers, aboutUsImage } = JSON.parse(dbFile);

export default function DashboardPage() {
  return <ClientDashboardPage teamMembers={teamMembers} aboutUsImage={aboutUsImage} />;
}
