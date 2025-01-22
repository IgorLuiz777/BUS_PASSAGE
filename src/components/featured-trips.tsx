import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";

const trips = [
  {
    id: 1,
    origin: "São Paulo, SP",
    destination: "Rio de Janeiro, RJ",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    origin: "Rio de Janeiro, RJ",
    destination: "Belo Horizonte, MG",
    price: 200.00,
    image: "https://viagemeturismo.abril.com.br/wp-content/uploads/2011/09/GettyImages-1164542668.jpg"
  },
  {
    id: 3,
    origin: "São Paulo, SP",
    destination: "Curitiba, PR",
    price: 180.00,
    image: "https://media.staticontent.com/media/pictures/04641818-297a-4f28-b635-b15e2fb31087"
  }
];

export function FeaturedTrips() {
  const navigator = useNavigate();
  return (
    <section className="w-full py-8 md:py-12 bg-gray-50">
      <div className="w-full max-w-[1400px] px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Viagens em destaque</h2>
          <a
            onClick={() => navigator("/pesquisa")}
            className="text-sm md:text-base text-blue-600 hover:underline cursor-pointer">
            Ver todas as viagens
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
            {trips.map((trip) => (
              <CarouselItem key={trip.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={trip.image}
                      alt={`${trip.origin} para ${trip.destination}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">{trip.origin}</p>
                        <h3 className="font-bold text-sm md:text-base">{trip.destination}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">A partir de</p>
                        <p className="text-base md:text-lg font-bold text-blue-600">
                          R$ {trip.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <Button
                        onClick={() => navigator(`/pesquisa`)}
                        size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Ver detalhes
                      </Button>
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
