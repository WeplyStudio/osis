'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teamMembers, aboutUsImage } from '@/lib/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Users, LogOut, BarChart3, Home, Loader2, Save } from 'lucide-react';

const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const [newName, setNewName] = React.useState(member.name);
  const [newImageUrl, setNewImageUrl] = React.useState('');
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateMember = async () => {
    if (!newName && !newImageUrl) {
      toast({
        variant: "destructive",
        title: 'Tidak Ada Perubahan',
        description: 'Harap masukkan nama atau URL gambar baru.',
      });
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'teamMember',
          id: member.id,
          name: newName,
          url: newImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui data anggota');
      }

      toast({
        title: `Data ${member.name} Diperbarui!`,
        description: 'Perubahan akan terlihat setelah me-refresh halaman.',
      });
      setNewImageUrl('');
      router.refresh(); 
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: 'Uh oh! Terjadi kesalahan.',
        description: error.message || 'Tidak dapat menyimpan perubahan.',
      });
    } finally {
        setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image src={member.image} alt={member.name} width={60} height={60} className="rounded-full object-cover" />
          <div>
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor={`name-${member.id}`}>Nama Anggota</Label>
            <Input
                id={`name-${member.id}`}
                type="text"
                placeholder="Nama baru"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                disabled={isUpdating}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor={`image-url-${member.id}`}>URL Gambar Baru</Label>
            <Input
                id={`image-url-${member.id}`}
                type="url"
                placeholder="https://example.com/image.png"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                disabled={isUpdating}
            />
        </div>
        <Button onClick={handleUpdateMember} className="w-full" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
            Simpan Perubahan
        </Button>
      </CardContent>
    </Card>
  );
};


const AboutUsCard = () => {
  const [newImageUrl, setNewImageUrl] = React.useState('');
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateImage = async () => {
    if (!newImageUrl) {
        toast({
            variant: "destructive",
            title: 'URL Kosong',
            description: 'Harap masukkan URL gambar yang valid.',
        });
        return;
    }
    setIsUpdating(true);
    try {
        const response = await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'aboutUsImage',
                url: newImageUrl,
            }),
        });

        if (!response.ok) {
            throw new Error('Gagal memperbarui gambar');
        }

        toast({
            title: `Gambar "Tentang Kami" Diperbarui!`,
            description: 'Perubahan akan terlihat setelah me-refresh halaman.',
        });
        setNewImageUrl('');
        router.refresh();
    } catch (error: any) {
         toast({
            variant: "destructive",
            title: 'Uh oh! Terjadi kesalahan.',
            description: error.message || 'Tidak dapat menyimpan gambar.',
        });
    } finally {
        setIsUpdating(false);
    }
  };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5"/> Gambar "Tentang Kami"</CardTitle>
                 <div className="relative aspect-video w-full rounded-md overflow-hidden mt-2">
                     <Image src={aboutUsImage.url} alt="Current About Us" fill className="object-cover" />
                 </div>
            </CardHeader>
            <CardContent className="space-y-2">
                 <Label htmlFor="about-us-image-url">URL Gambar Baru</Label>
                <div className="flex gap-2">
                    <Input
                    id="about-us-image-url"
                    type="url"
                    placeholder="https://example.com/image.png"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    disabled={isUpdating}
                    />
                    <Button onClick={handleUpdateImage} size="icon" variant="outline" disabled={isUpdating}>
                         {isUpdating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    try {
      localStorage.removeItem('pin_authenticated');
      toast({
        title: 'Berhasil Keluar',
        description: 'Anda telah keluar dari halaman admin.',
      });
      router.push('/admin/login');
    } catch (e) {
       toast({
        variant: "destructive",
        title: 'Error',
        description: 'Could not log out.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40">
        <header className="bg-background border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <h1 className="text-xl font-body font-extrabold text-foreground italic uppercase">
                        OSIS<span className="text-primary">Kigra</span>
                    </h1>
                    <span className="text-sm font-bold text-muted-foreground border-l pl-4">DASHBOARD</span>
                </div>
                <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" onClick={() => router.push('/')}><Home className="mr-2 h-4 w-4" />Lihat Situs</Button>
                    <Button variant="destructive" size="sm" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Keluar</Button>
                </div>
            </div>
        </header>

      <main className="container mx-auto p-4 md:p-8 space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Selamat Datang, Admin!</h1>
            <p className="text-muted-foreground">Kelola konten website dari halaman ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pengunjung Hari Ini</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,250</div>
                    <p className="text-xs text-muted-foreground">+20.1% dari kemarin</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Aspirasi</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 sejak minggu lalu</p>
                </CardContent>
            </Card>
        </div>


        <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="w-6 h-6 text-primary"/> Tim Kami</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>
        </section>

         <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3"><ImageIcon className="w-6 h-6 text-primary"/> Konten Lainnya</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AboutUsCard />
            </div>
        </section>
      </main>
    </div>
  );
}
