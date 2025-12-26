import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/data";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="relative h-56 w-full">
              <Image 
                src={event.image} 
                alt={event.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="font-headline text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{event.description}</p>
              <div className="space-y-2 text-sm text-muted-foreground border-t pt-4 mt-auto">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> <span>{event.date}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>{event.time}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> <span>{event.location}</span></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
