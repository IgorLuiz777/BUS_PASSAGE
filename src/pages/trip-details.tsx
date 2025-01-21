import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Wifi,
  Coffee,
  Snowflake,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Seat {
  number: string;
  status: "available" | "occupied" | "selected";
  position: "window" | "aisle";
  floor: "lower" | "upper";
}

// Mock data
const mockTrip = {
  id: "1",
  company: "VIAÇÃO GARCIA",
  logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
  departure: {
    time: "22:30",
    date: "19 Jan 2024",
    location: "SÃO PAULO - RODOVIÁRIA TIETÊ",
  },
  arrival: {
    time: "05:10",
    date: "20 Jan 2024",
    location: "RIO DE JANEIRO - NOVO RIO",
  },
  duration: "6:40h",
  type: "LEITO",
  price: {
    original: 262.27,
    current: 214.99,
  },
  amenities: ["wifi", "ac", "coffee"],
};

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  // Gerar assentos do andar inferior (1-20)
  for (let i = 1; i <= 20; i++) {
    const number = i.toString().padStart(2, "0");
    seats.push({
      number,
      status: Math.random() > 0.3 ? "available" : "occupied",
      position: i % 2 === 0 ? "window" : "aisle",
      floor: "lower",
    });
  }
  // Gerar assentos do andar superior (21-40)
  for (let i = 21; i <= 44; i++) {
    const number = i.toString();
    seats.push({
      number,
      status: Math.random() > 0.3 ? "available" : "occupied",
      position: i % 2 === 0 ? "window" : "aisle",
      floor: "upper",
    });
  }
  return seats;
};

const AmenityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "wifi":
      return <Wifi className="w-4 h-4" />;
    case "ac":
      return <Snowflake className="w-4 h-4" />;
    case "coffee":
      return <Coffee className="w-4 h-4" />;
    default:
      return null;
  }
};

export function TripDetailsPage() {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState<"lower" | "upper">("lower");
  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    setSelectedSeats((prev) => {
      if (prev.includes(seat.number)) {
        return prev.filter((s) => s !== seat.number);
      }
      return [...prev, seat.number];
    });
  };

  const total = mockTrip.price.current * selectedSeats.length;

  // Dividir os assentos em grupos (esquerda e direita)
  const currentFloorSeats = seats.filter((seat) => seat.floor === selectedFloor);
  const leftSeats = currentFloorSeats.slice(0, currentFloorSeats.length / 2);
  const rightSeats = currentFloorSeats.slice(currentFloorSeats.length / 2);

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar para resultados
          </Button>

          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Detalhes da viagem */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="text-2xl font-bold">{mockTrip.departure.time}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockTrip.departure.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockTrip.departure.location}
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {mockTrip.duration}
                    </div>
                    <div className="w-20 h-px bg-gray-300 relative">
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold">{mockTrip.arrival.time}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockTrip.arrival.date}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockTrip.arrival.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="secondary" className="font-medium">
                    {mockTrip.type}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {mockTrip.amenities.map((amenity) => (
                      <Tooltip key={amenity}>
                        <TooltipTrigger>
                          <div className="p-1.5 bg-gray-100 rounded-md">
                            <AmenityIcon type={amenity} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="capitalize">{amenity}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Viação Garcia - Linha Regular</span>
                </div>
              </div>

              {/* Preço */}
              <div className="md:w-48 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6">
                <div className="text-sm text-muted-foreground">Preço por pessoa</div>
                <div className="text-sm line-through text-muted-foreground">
                  R$ {mockTrip.price.original.toFixed(2)}
                </div>
                <div className="text-3xl font-bold text-primary">
                  R$ {mockTrip.price.current.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Seleção de Assentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mapa de Assentos */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Selecione seus assentos</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant={selectedFloor === "upper" ? "default" : "outline"}
                    onClick={() => setSelectedFloor("upper")}
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Andar Superior
                  </Button>
                  <Button
                    variant={selectedFloor === "lower" ? "default" : "outline"}
                    onClick={() => setSelectedFloor("lower")}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Andar Inferior
                  </Button>
                </div>
              </div>

              {/* Legenda */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-primary" />
                  <span className="text-sm">Disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-gray-300" />
                  <span className="text-sm">Ocupado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-green-500" />
                  <span className="text-sm">Selecionado</span>
                </div>
              </div>

              {/* Ônibus */}
              <div className="relative max-w-[20rem] mx-auto">
                {/* Frente do ônibus */}
                <div className="w-full h-16 bg-gray-100 rounded-t-3xl mb-4 flex items-center justify-center">
                  <span className="text-sm text-gray-500">Frente do ônibus</span>
                </div>

                {/* Assentos */}
                <div className="flex justify-between gap-16 p-4 bg-gray-50 rounded-lg relative">
                  {/* Palavra CORREDOR na vertical */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                    <div className="writing-vertical text-gray-400 text-sm tracking-[0.2em]">
                      CORREDOR
                    </div>
                  </div>

                  {/* Fileiras da esquerda */}
                  <div className="grid grid-cols-2 gap-2">
                    {leftSeats.map((seat) => (
                      <Tooltip key={seat.number}>
                        <div className="border-none w-full gap-2">
                          <button
                            className={cn(
                              "w-12 h-12 rounded-t-lg border-2 flex items-center justify-center font-medium transition-colors",
                              seat.status === "occupied" && "bg-gray-300 cursor-not-allowed",
                              seat.status === "available" && "bg-primary text-white hover:bg-primary/90",
                              selectedSeats.includes(seat.number) && "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white",
                              "disabled:cursor-not-allowed"
                            )}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === "occupied"}
                          >
                            {seat.number}
                          </button>
                        </div>
                        <TooltipContent>
                          <p>
                            Assento {seat.number} - {seat.position === "window" ? "Janela" : "Corredor"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>

                  {/* Fileiras da direita */}
                  <div className="grid grid-cols-2 gap-2">
                    {rightSeats.map((seat) => (
                      <Tooltip key={seat.number}>
                        <div className="border-none w-full">
                          <button
                            className={cn(
                              "w-12 h-12 rounded-t-lg border-2 flex items-center justify-center font-medium transition-colors",
                              seat.status === "occupied" && "bg-gray-300 cursor-not-allowed",
                              seat.status === "available" && "bg-primary text-white hover:bg-primary/90",
                              selectedSeats.includes(seat.number) && "bg-green-500 border-green-600 hover:bg-green-600 hover:border-green-700 text-white",
                              "disabled:cursor-not-allowed"
                            )}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === "occupied"}
                          >
                            {seat.number}
                          </button>
                        </div>
                        <TooltipContent>
                          <p>
                            Assento {seat.number} - {seat.position === "window" ? "Janela" : "Corredor"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                {/* Traseira do ônibus */}
                <div className="w-full h-8 bg-gray-100 rounded-b-lg mt-4 flex items-center justify-center">
                  <span className="text-sm text-gray-500">Traseira do ônibus</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Resumo da compra */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Resumo da compra</h2>

              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {selectedSeats.length} {selectedSeats.length === 1 ? "assento" : "assentos"}
                      </span>
                      <span className="font-medium">{selectedSeats.join(", ")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Valor por passagem</span>
                      <span className="font-medium">R$ {mockTrip.price.current.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Taxa de serviço</span>
                      <span className="font-medium">R$ 0,00</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="text-xl font-bold text-primary">
                          R$ {total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/checkout")}
                  >
                    Continuar
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Selecione um ou mais assentos para continuar com sua compra
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
