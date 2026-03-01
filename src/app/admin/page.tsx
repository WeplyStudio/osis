
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    setDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { useFirestore, useCollection, useDoc, initializeFirebase, FirebaseClientProvider } from '@/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Plus, 
    Trash2, 
    Edit, 
    LogOut, 
    Calendar, 
    Users, 
    Settings,
    Save,
    Loader2,
    MessageSquare,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';

function AdminDashboardContent() {
    const router = useRouter();
    const firestore = useFirestore();
    const { toast } = useToast();
    
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        router.push('/login');
    };

    // --- PROGRAMS ---
    const programsQuery = query(collection(firestore, 'programs'), orderBy('createdAt', 'desc'));
    const { data: programs, loading: programsLoading } = useCollection<any>(programsQuery);
    
    const [programForm, setProgramForm] = useState({
        id: '',
        title: '',
        date: '',
        month: '',
        location: '',
        description: '',
        type: 'secondary' as 'main' | 'secondary'
    });

    const handleSaveProgram = (e: React.FormEvent) => {
        e.preventDefault();
        if (programForm.id) {
            const { id, ...data } = programForm;
            updateDoc(doc(firestore, 'programs', id), {
                ...data,
                updatedAt: serverTimestamp()
            });
            toast({ title: "Berhasil", description: "Program diperbarui." });
        } else {
            const { id, ...data } = programForm;
            addDoc(collection(firestore, 'programs'), {
                ...data,
                createdAt: serverTimestamp()
            });
            toast({ title: "Berhasil", description: "Program ditambahkan." });
        }
        setProgramForm({ id: '', title: '', date: '', month: '', location: '', description: '', type: 'secondary' });
    };

    const handleDeleteProgram = (id: string) => {
        if (confirm('Hapus program ini?')) {
            deleteDoc(doc(firestore, 'programs', id));
            toast({ title: "Dihapus", description: "Program telah dihapus." });
        }
    };

    // --- TEAM MEMBERS ---
    const teamQuery = query(collection(firestore, 'teamMembers'), orderBy('order', 'asc'));
    const { data: teamMembers, loading: teamLoading } = useCollection<any>(teamQuery);

    const [teamForm, setTeamForm] = useState({
        id: '',
        name: '',
        role: '',
        quote: '',
        image: '',
        order: 0
    });

    const handleSaveTeam = (e: React.FormEvent) => {
        e.preventDefault();
        if (teamForm.id) {
            const { id, ...data } = teamForm;
            updateDoc(doc(firestore, 'teamMembers', id), data);
            toast({ title: "Berhasil", description: "Anggota tim diperbarui." });
        } else {
            const { id, ...data } = teamForm;
            addDoc(collection(firestore, 'teamMembers'), data);
            toast({ title: "Berhasil", description: "Anggota tim ditambahkan." });
        }
        setTeamForm({ id: '', name: '', role: '', quote: '', image: '', order: 0 });
    };

    const handleDeleteTeam = (id: string) => {
        if (confirm('Hapus anggota ini?')) {
            deleteDoc(doc(firestore, 'teamMembers', id));
            toast({ title: "Dihapus", description: "Anggota telah dihapus." });
        }
    };

    // --- ASPIRATIONS ---
    const aspirationsQuery = query(collection(firestore, 'aspirations'), orderBy('createdAt', 'desc'));
    const { data: aspirations, loading: aspirationsLoading } = useCollection<any>(aspirationsQuery);

    const handleUpdateAspirationStatus = (id: string, newStatus: string) => {
        updateDoc(doc(firestore, 'aspirations', id), {
            status: newStatus
        });
        toast({ title: "Status Diperbarui", description: `Aspirasi sekarang berstatus ${newStatus}.` });
    };

    const handleDeleteAspiration = (id: string) => {
        if (confirm('Hapus aspirasi ini secara permanen?')) {
            deleteDoc(doc(firestore, 'aspirations', id));
            toast({ title: "Dihapus", description: "Aspirasi telah dihapus." });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'menunggu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dilihat': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'diproses': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'dipertimbangkan': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // --- SETTINGS ---
    const periodDocRef = doc(firestore, 'settings', 'period');
    const { data: periodSetting } = useDoc<any>(periodDocRef);
    const [periodText, setPeriodText] = useState('');

    useEffect(() => {
        if (periodSetting) {
            setPeriodText(periodSetting.value);
        }
    }, [periodSetting]);

    const handleSavePeriod = () => {
        setDoc(doc(firestore, 'settings', 'period'), {
            key: 'period',
            value: periodText
        });
        toast({ title: "Berhasil", description: "Periode OSIS diperbarui." });
    };

    return (
        <div className="min-h-screen bg-accent/5 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-body font-bold italic uppercase tracking-tighter">DASHBOARD <span className="text-primary">ADMIN</span></h1>
                        <p className="text-muted-foreground">Kelola konten OSIS Kigra di sini.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="font-bold border-destructive text-destructive hover:bg-destructive hover:text-white">
                        <LogOut className="mr-2 h-4 w-4" /> LOGOUT
                    </Button>
                </header>

                <Tabs defaultValue="programs" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="programs" className="font-bold uppercase"><Calendar className="mr-2 h-4 w-4" /> Program</TabsTrigger>
                        <TabsTrigger value="team" className="font-bold uppercase"><Users className="mr-2 h-4 w-4" /> Tim Kami</TabsTrigger>
                        <TabsTrigger value="aspirations" className="font-bold uppercase"><MessageSquare className="mr-2 h-4 w-4" /> Aspirasi</TabsTrigger>
                        <TabsTrigger value="settings" className="font-bold uppercase"><Settings className="mr-2 h-4 w-4" /> Pengaturan</TabsTrigger>
                    </TabsList>

                    <TabsContent value="programs">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="uppercase italic tracking-tighter">{programForm.id ? 'Edit' : 'Tambah'} Program</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSaveProgram} className="space-y-4">
                                        <Input placeholder="Judul Program" value={programForm.title} onChange={e => setProgramForm({...programForm, title: e.target.value})} required />
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input placeholder="Tgl (Ex: 21)" value={programForm.date} onChange={e => setProgramForm({...programForm, date: e.target.value})} required />
                                            <Input placeholder="Bulan (Ex: JUNI)" value={programForm.month} onChange={e => setProgramForm({...programForm, month: e.target.value})} required />
                                        </div>
                                        <Input placeholder="Lokasi (Ex: GOR)" value={programForm.location} onChange={e => setProgramForm({...programForm, location: e.target.value})} />
                                        <Textarea placeholder="Deskripsi Singkat" value={programForm.description} onChange={e => setProgramForm({...programForm, description: e.target.value})} required />
                                        <select 
                                            className="w-full p-2 border rounded-md text-sm bg-background"
                                            value={programForm.type}
                                            onChange={e => setProgramForm({...programForm, type: e.target.value as any})}
                                        >
                                            <option value="secondary">Secondary Event</option>
                                            <option value="main">Main Event</option>
                                        </select>
                                        <div className="flex gap-2">
                                            <Button type="submit" className="flex-1 font-bold"><Plus className="mr-2 h-4 w-4" /> SIMPAN</Button>
                                            {programForm.id && <Button variant="ghost" type="button" onClick={() => setProgramForm({id: '', title: '', date: '', month: '', location: '', description: '', type: 'secondary'})}>Batal</Button>}
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                            <div className="lg:col-span-2 space-y-4">
                                {programsLoading ? <Loader2 className="animate-spin mx-auto" /> : programs?.map((prog: any) => (
                                    <Card key={prog.id} className="hover:border-primary transition-colors">
                                        <CardContent className="p-4 flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold uppercase">{prog.title}</h3>
                                                    <Badge variant={prog.type === 'main' ? 'default' : 'outline'}>{prog.type}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{prog.date} {prog.month} • {prog.location || 'N/A'}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => setProgramForm(prog)}><Edit className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteProgram(prog.id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="team">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="uppercase italic tracking-tighter">{teamForm.id ? 'Edit' : 'Tambah'} Anggota</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSaveTeam} className="space-y-4">
                                        <Input placeholder="Nama Lengkap" value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} required />
                                        <Input placeholder="Jabatan (Ex: Ketua Umum)" value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} required />
                                        <Input placeholder="URL Gambar" value={teamForm.image} onChange={e => setTeamForm({...teamForm, image: e.target.value})} required />
                                        <Input type="number" placeholder="Urutan" value={teamForm.order} onChange={e => setTeamForm({...teamForm, order: parseInt(e.target.value) || 0})} />
                                        <Textarea placeholder="Quote Singkat" value={teamForm.quote} onChange={e => setTeamForm({...teamForm, quote: e.target.value})} required />
                                        <div className="flex gap-2">
                                            <Button type="submit" className="flex-1 font-bold"><Plus className="mr-2 h-4 w-4" /> SIMPAN</Button>
                                            {teamForm.id && <Button variant="ghost" type="button" onClick={() => setTeamForm({id: '', name: '', role: '', quote: '', image: '', order: 0})}>Batal</Button>}
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {teamLoading ? <Loader2 className="animate-spin mx-auto" /> : teamMembers?.map((member: any) => (
                                    <Card key={member.id} className="hover:border-primary transition-colors">
                                        <CardContent className="p-4 flex gap-4 items-center">
                                            <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-sm uppercase">{member.name}</h3>
                                                <p className="text-xs text-muted-foreground">{member.role}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button size="icon" variant="ghost" onClick={() => setTeamForm(member)}><Edit className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteTeam(member.id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="aspirations">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold italic uppercase tracking-tighter">DAFTAR <span className="text-primary">ASPIRASI SISWA</span></h2>
                                <Badge variant="outline" className="font-bold">{aspirations?.length || 0} TOTAL</Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {aspirationsLoading ? (
                                    <Loader2 className="animate-spin mx-auto h-8 w-8" />
                                ) : aspirations?.length === 0 ? (
                                    <Card className="bg-muted/50 border-dashed">
                                        <CardContent className="p-12 text-center text-muted-foreground">Belum ada aspirasi masuk.</CardContent>
                                    </Card>
                                ) : (
                                    aspirations?.map((asp: any) => (
                                        <Card key={asp.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                                    <div className="flex-grow space-y-3">
                                                        <div className="flex items-center gap-3">
                                                            <Badge className={cn("px-3 py-1 rounded-full font-bold uppercase text-[10px] border", getStatusColor(asp.status))}>
                                                                {asp.status}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground font-mono">ID: {asp.id}</span>
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {asp.createdAt ? format(asp.createdAt.toDate(), 'PP p', { locale: id }) : '-'}
                                                            </span>
                                                        </div>
                                                        <p className="text-foreground font-medium bg-accent/20 p-4 rounded-xl italic">"{asp.content}"</p>
                                                    </div>
                                                    <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                            {['menunggu', 'dilihat', 'diproses', 'dipertimbangkan', 'selesai'].map((status) => (
                                                                <Button 
                                                                    key={status}
                                                                    size="sm"
                                                                    variant={asp.status === status ? 'default' : 'outline'}
                                                                    className="h-7 text-[10px] font-bold uppercase"
                                                                    onClick={() => handleUpdateAspirationStatus(asp.id, status)}
                                                                >
                                                                    {status}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                        <Button 
                                                            variant="destructive" 
                                                            size="sm" 
                                                            className="w-full md:w-auto font-bold"
                                                            onClick={() => handleDeleteAspiration(asp.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" /> HAPUS
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle className="uppercase italic tracking-tighter">Pengaturan Umum</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider">Teks Periode Marquee</label>
                                    <div className="flex gap-4">
                                        <Input 
                                            placeholder="Ex: OSIS PERIODE 2025 / 2026" 
                                            value={periodText}
                                            onChange={e => setPeriodText(e.target.value)}
                                        />
                                        <Button onClick={handleSavePeriod} className="font-bold">
                                            <Save className="mr-2 h-4 w-4" /> UPDATE
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const { firebaseApp, firestore, auth } = initializeFirebase();
    return (
        <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
            <AdminDashboardContent />
        </FirebaseClientProvider>
    );
}
