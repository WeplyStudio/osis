import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { announcements, events } from "@/lib/data";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Dashboard() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="space-y-8">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        {heroImage && (
          <Image 
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold drop-shadow-lg">Welcome to OASISverse!</h1>
          <p className="mt-2 text-lg max-w-xl">Your central hub for all OSIS activities, announcements, and fun. Let's make school life more exciting!</p>
          <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link href="/ideas">
              Suggest an Initiative <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="font-headline text-2xl font-bold mb-4">📢 Announcements</h2>
          <Card className="shadow-md">
            <CardContent className="p-0">
              <ul className="divide-y">
                {announcements.map((item) => (
                  <li key={item.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                    <div className="p-3 bg-secondary rounded-full flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline text-2xl font-bold">🗓️ Upcoming Events</h2>
            <Button variant="link" asChild>
              <Link href="/events">View All <ArrowRight className="ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.slice(0, 2).map(event => (
              <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> <span>{event.date}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>{event.time}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> <span>{event.location}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
