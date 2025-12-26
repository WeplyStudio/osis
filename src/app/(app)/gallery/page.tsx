import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery'));

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Event Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden group relative aspect-square shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-full p-4">
              <p className="text-white text-sm font-semibold drop-shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">{image.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
