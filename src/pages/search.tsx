import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Info,
  Bus,
  Wifi,
  Coffee,
  Snowflake,
  Clock,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: string;
  company: string;
  logo: string;
  departure: {
    time: string;
    location: string;
  };
  arrival: {
    time: string;
    location: string;
  };
  duration: string;
  type: "LEITO" | "SEMILEITO" | "EXECUTIVO";
  price: {
    original: number;
    current: number;
  };
  availableSeats: number;
  amenities: string[];
  isFastest?: boolean;
  isCheapest?: boolean;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    company: "VIAÇÃO GARCIA",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
    departure: {
      time: "22:30",
      location: "SÃO PAULO - RODOVIÁRIA TIETÊ",
    },
    arrival: {
      time: "05:10",
      location: "RIO DE JANEIRO - NOVO RIO",
    },
    duration: "6:40h",
    type: "SEMILEITO",
    price: {
      original: 262.27,
      current: 214.99,
    },
    availableSeats: 1,
    amenities: ["wifi", "ac", "coffee"],
    isFastest: true
  },
  {
    id: "2",
    company: "VIAÇÃO GARCIA",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
    departure: {
      time: "00:30",
      location: "SÃO PAULO - RODOVIÁRIA TIETÊ",
    },
    arrival: {
      time: "07:15",
      location: "RIO DE JANEIRO - NOVO RIO",
    },
    duration: "6:45h",
    type: "SEMILEITO",
    price: {
      original: 262.27,
      current: 148.99,
    },
    availableSeats: 1,
    amenities: ["wifi", "ac", "coffee"],
    isCheapest: true
  }
];

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

export function SearchPage() {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [hasGratuity, setHasGratuity] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("19/jan");
  const [isLoading, setIsLoading] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    types: [] as string[],
    companies: [] as string[],
    departureTimes: [] as string[],
  });
  const navigator = useNavigate();

  const dates = [
    { day: 17, weekDay: "sexta", month: "jan" },
    { day: 18, weekDay: "sábado", month: "jan" },
    { day: 19, weekDay: "domingo", month: "jan" },
    { day: 20, weekDay: "segunda", month: "jan" },
    { day: 21, weekDay: "terça", month: "jan" },
    { day: 22, weekDay: "quarta", month: "jan" },
    { day: 23, weekDay: "quinta", month: "jan" }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].includes(value)
        ? prev[type as keyof typeof prev].filter(item => item !== value)
        : [...prev[type as keyof typeof prev], value]
    }));
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto py-6">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Saindo de:</label>
              <Select defaultValue="sao-paulo">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent className="bg-white/95">
                  <SelectItem value="sao-paulo">SÃO PAULO - TIETÊ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Indo para:</label>
              <Select defaultValue="rio">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o destino" />
                </SelectTrigger>
                <SelectContent className="bg-white/95">
                  <SelectItem value="rio">RIO DE JANEIRO - NOVO RIO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ida:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !departureDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departureDate ? (
                      format(departureDate, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Volta (opcional):
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? (
                      format(returnDate, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="gratuity"
                checked={hasGratuity}
                onCheckedChange={(checked) => setHasGratuity(checked as boolean)}
              />
              <div className="flex items-center gap-2">
                <label
                  htmlFor="gratuity"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Tenho direito à Gratuidade
                </label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Passe Livre, Idoso ou ID Jovem</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Select
                value={passengers.toString()}
                onValueChange={(value) => setPassengers(parseInt(value))}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95">
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Passageiro" : "Passageiros"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="w-full md:w-auto"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  Buscar passagens
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <Bus className="w-4 h-4" />
                <span>Passagens de ônibus</span>
              </div>
              <div className="text-sm text-muted-foreground">
                São Paulo - Tietê → Rio de Janeiro - Novo Rio
              </div>
              <h2 className="text-xl font-semibold mt-2">
                Selecione sua passagem
              </h2>
            </div>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            {mockTrips.map((trip) => (
              <div key={trip.id} className="w-full max-w-[800px]">
                <div className="bg-white rounded-lg border p-4 hover:border-primary transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Time and Duration */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                          <div className="text-2xl font-bold">{trip.departure.time}</div>
                          <div className="text-sm text-muted-foreground">{trip.departure.location}</div>
                        </div>
                        <div className="text-center px-4">
                          <div className="text-sm text-muted-foreground mb-1">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {trip.duration}
                          </div>
                          <div className="w-20 h-px bg-gray-300 relative">
                            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-300" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-bold">{trip.arrival.time}</div>
                          <div className="text-sm text-muted-foreground">{trip.arrival.location}</div>
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="secondary" className="font-medium">
                          {trip.type}
                        </Badge>
                        {trip.isFastest && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                            MAIS RÁPIDO
                          </Badge>
                        )}
                        {trip.isCheapest && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            MAIS BARATO
                          </Badge>
                        )}
                        <div className="flex items-center gap-2">
                          {trip.amenities.map((amenity) => (
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
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-col justify-between gap-4 md:w-48 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6">
                      <div>
                        <div className="text-sm text-muted-foreground">A partir de</div>
                        <div className="text-sm line-through text-muted-foreground">
                          R$ {trip.price.original.toFixed(2)}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          R$ {trip.price.current.toFixed(2)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          onClick={() => navigator('/trip/1')}
                          className="w-full">
                          Selecionar
                        </Button>
                        <div className="text-sm text-center text-muted-foreground">
                          {trip.availableSeats} {trip.availableSeats === 1 ? "lugar" : "lugares"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
