import React from 'react';
import ClientDashboardPage from './ClientDashboardPage';
import { initializeFirebase } from '@/firebase';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';
import { unstable_noStore as noStore } from 'next/cache';


export default async function DashboardPage() {
  noStore();
  const { firestore } = initializeFirebase();
  
  const teamMembersCollection = collection(firestore, 'teamMembers');
  const teamMembersSnapshot = await getDocs(teamMembersCollection);
  const teamMembers = teamMembersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));

  const aboutUsDoc = doc(firestore, 'siteContent', 'aboutUs');
  const aboutUsSnapshot = await getDoc(aboutUsDoc);
const aboutUsImage = aboutUsSnapshot.data() as { url: string, hint: string };

  return <ClientDashboardPage teamMembers={teamMembers} aboutUsImage={aboutUsImage} />;
}
