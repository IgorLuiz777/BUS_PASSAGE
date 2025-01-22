import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    city: "São Paulo",
    state: "SP",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1578002573559-689b0abc4148?w=800&auto=format&fit=crop",
    trending: true
  },
  {
    id: 2,
    city: "Rio de Janeiro",
    state: "RJ",
    price: 99.90,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&auto=format&fit=crop",
    trending: true
  },
  {
    id: 3,
    city: "Belo Horizonte",
    state: "MG",
    price: 129.90,
    image: "https://soubh.uai.com.br/wp-content/uploads/2021/12/main_EAFO.jpg",
    trending: true
  }
];

export function FeaturedDestinations() {
  const navigator = useNavigate();
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full max-w-[1400px] px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Destinos mais buscados</h2>
          <a href="#" className="text-sm md:text-base text-blue-600 hover:underline">
            Ver todos os destinos
          </a>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {destinations.map((destination) => (
              <CarouselItem key={destination.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="group overflow-hidden cursor-pointer" onClick={() => navigator(`/pesquisa`)}>
                  <div className="relative aspect-[16/9]">
                    <img
                      src={destination.image}
                      alt={`${destination.city} - ${destination.state}`}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm md:text-base">{destination.state}</span>
                        {destination.trending && (
                          <Badge variant="secondary" className="ml-2">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Em alta
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold">{destination.city}</h3>
                      <p className="text-sm">A partir de R$ {destination.price.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
