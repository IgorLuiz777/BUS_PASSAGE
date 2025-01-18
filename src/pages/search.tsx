import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Info } from "lucide-react";
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
  type: "LEITO" | "CABINE CAMA";
  price: {
    original: number;
    current: number;
  };
  availableSeats: number;
}

const mockTrips: Trip[] = [
  {
    id: "1",
    company: "VIAÇÃO GARCIA",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
    departure: {
      time: "10:15",
      location: "SÃO PAULO - RODOVIÁRIA BARRA FUNDA - SP",
    },
    arrival: {
      time: "18:00",
      location: "LONDRINA - PR",
    },
    duration: "7h45m",
    type: "LEITO",
    price: {
      original: 262.27,
      current: 162.80,
    },
    availableSeats: 1,
  },
  {
    id: "2",
    company: "VIAÇÃO GARCIA",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
    departure: {
      time: "10:15",
      location: "SÃO PAULO - RODOVIÁRIA BARRA FUNDA - SP",
    },
    arrival: {
      time: "18:00",
      location: "LONDRINA - PR",
    },
    duration: "7h45m",
    type: "LEITO",
    price: {
      original: 262.27,
      current: 149.98,
    },
    availableSeats: 4,
  },
  {
    id: "3",
    company: "VIAÇÃO GARCIA",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=64&h=64&auto=format&fit=crop",
    departure: {
      time: "10:15",
      location: "SÃO PAULO - RODOVIÁRIA BARRA FUNDA - SP",
    },
    arrival: {
      time: "18:00",
      location: "LONDRINA - PR",
    },
    duration: "7h45m",
    type: "CABINE CAMA",
    price: {
      original: 380.92,
      current: 229.99,
    },
    availableSeats: 2,
  },
];

export function SearchPage() {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [hasGratuity, setHasGratuity] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("19/jan");

  const dates = [
    { day: 17, weekDay: "sexta", month: "jan" },
    { day: 18, weekDay: "sábado", month: "jan" },
    { day: 19, weekDay: "domingo", month: "jan" },
    { day: 20, weekDay: "segunda", month: "jan" },
    { day: 21, weekDay: "terça", month: "jan" },
    { day: 22, weekDay: "quarta", month: "jan" },
    { day: 23, weekDay: "quinta", month: "jan" },
    { day: 24, weekDay: "sexta", month: "jan" },
    { day: 25, weekDay: "sábado", month: "jan" },
  ];

  return (
    <TooltipProvider>
      <div className="container mx-auto py-6">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Saindo de:</label>
              <Select defaultValue="sao-paulo">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sao-paulo">SÃO PAULO - RODOV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Indo para:</label>
              <Select defaultValue="londrina">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="londrina">LONDRINA - PR</SelectItem>
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
                <PopoverContent className="w-auto p-0">
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
          <div className="mt-4 flex items-center gap-2">
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
          <div className="mt-6">
            <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600">
              Buscar
            </Button>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Passagens de ônibus {">"} SÃO PAULO - RODOVIÁRIA BARRA FUNDA - SP para
              LONDRINA - PR
            </h2>
            <h3 className="text-xl font-bold mb-6">
              Selecione a passagem de ida de SÃO PAULO - RODOVIÁRIA BARRA FUNDA - SP
              para LONDRINA - PR
            </h3>
          </div>

          {/* Date Selector */}
          <div className="flex overflow-x-auto gap-2 pb-4">
            {dates.map(({ day, weekDay, month }) => (
              <Button
                key={`${day}/${month}`}
                variant={selectedDate === `${day}/${month}` ? "default" : "outline"}
                className={cn(
                  "min-w-[100px] flex-col h-auto py-2",
                  selectedDate === `${day}/${month}` && ""
                )}
                onClick={() => setSelectedDate(`${day}/${month}`)}
              >
                <span className="text-xs capitalize">{weekDay}</span>
                <span className="text-lg font-bold">
                  {day}/{month}
                </span>
              </Button>
            ))}
          </div>

          {/* Trip List */}
          <div className="space-y-4">
            {mockTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="flex items-center gap-4 min-w-[200px]">
                  <img
                    src={trip.logo}
                    alt={trip.company}
                    className="w-12 h-12 rounded"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{trip.company}</p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{trip.departure.time}</span>
                      <span>•</span>
                      <span>{trip.duration}</span>
                    </div>
                    <p className="text-sm mt-1">{trip.departure.location}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{trip.arrival.time}</span>
                    </div>
                    <p className="text-sm mt-1">{trip.arrival.location}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{trip.type}</span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>BILHETE ELETRÔNICO</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[200px]">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">A partir de</p>
                    <p className="text-sm line-through text-gray-500">
                      R$ {trip.price.original.toFixed(2)}
                    </p>
                    <p className="text-2xl font-bold">
                      R$ {trip.price.current.toFixed(2)}
                    </p>
                  </div>
                  <Button className="w-full  hover:bg-blue-700">
                    Reservar poltrona
                  </Button>
                  <p className="text-sm text-gray-500">
                    {trip.availableSeats} {trip.availableSeats === 1 ? "Disponível" : "Disponíveis"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
