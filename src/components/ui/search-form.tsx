import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Users } from "lucide-react";
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
import { cn } from "@/utils";
import type { SearchParams } from "@/types";
import { useNavigate } from "react-router-dom";

interface SearchFormProps {
  onSubmit: (params: SearchParams) => void;
  className?: string;
}

const cities = [
  { value: "sao-paulo", label: "SÃO PAULO - TIETÊ" },
  { value: "rio", label: "RIO DE JANEIRO - NOVO RIO" },
  { value: "curitiba", label: "CURITIBA - RODOFERROVIÁRIA" },
  { value: "belo-horizonte", label: "BELO HORIZONTE - TERMINAL" },
  { value: "salvador", label: "SALVADOR - RODOVIÁRIA" },
  { value: "brasilia", label: "BRASÍLIA - RODOVIÁRIA" },
  { value: "recife", label: "RECIFE - TERMINAL" },
  { value: "fortaleza", label: "FORTALEZA - TERMINAL" },
];

export function SearchForm({ onSubmit, className }: SearchFormProps) {
  const [origin, setOrigin] = useState("sao-paulo");
  const [destination, setDestination] = useState("rio");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const navigator = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      origin,
      destination,
      departureDate,
      returnDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Saindo de:</label>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a origem" />
            </SelectTrigger>
            <SelectContent className="bg-white/95">
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Indo para:</label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className=" bg-white">
              <SelectValue className=" bg-white" placeholder="Selecione o destino" />
            </SelectTrigger>
            <SelectContent className=" bg-white/95">
              {cities.filter((city) => city.value !== origin).map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
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
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                disabled={(date) => date < new Date()}
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
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) =>
                  date < (departureDate || new Date())
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center gap-4">
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

        <Button
          onClick={() => navigator('/pesquisa')}
          type="submit" className="w-full md:w-auto">
          Buscar passagens
        </Button>
      </div>
    </form>
  );
}
