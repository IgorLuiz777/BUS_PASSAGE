import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, ChevronLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PassengerData {
  fullName: string;
  documentType: "cpf" | "rg";
  documentNumber: string;
}

interface PaymentForm {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão inválido"),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  expiryDate: z.string().min(5, "Data de validade inválida"),
  cvv: z.string().min(3, "CVV inválido"),
});

const passengerSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  documentType: z.enum(["cpf", "rg"], {
    required_error: "Selecione o tipo de documento",
  }),
  documentNumber: z.string().min(1, "Número do documento é obrigatório"),
});

export function CheckoutPage() {
  const navigate = useNavigate();
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit");
  const [isLoading, setIsLoading] = useState(false);
  const [passengers, setPassengers] = useState<PassengerData[]>([
    { fullName: "", documentType: "cpf", documentNumber: "" },
  ]);

  const passengerForm = useForm<PassengerData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      documentType: "cpf",
      documentNumber: "",
    }
  });

  const paymentForm = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    }
  });

  const handleSubmit = async (data: PaymentForm) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Payment data:", data);
    console.log("Passengers:", passengers);
    navigate("/success");
    setIsLoading(false);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { fullName: "", documentType: "cpf", documentNumber: "" },
    ]);
  };

  const removePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  // Mock trip data
  const trip = {
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
    price: 214.99,
    selectedSeats: ["12", "13", "14"],
  };

  const total = trip.price * passengers.length;

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => window.history.back()}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Voltar para seleção de assentos
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo da viagem</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="text-2xl font-bold">{trip.departure.time}</div>
                <div className="text-sm text-muted-foreground">
                  {trip.departure.date}
                </div>
                <div className="text-sm text-muted-foreground">
                  {trip.departure.location}
                </div>
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
                <div className="text-sm text-muted-foreground">
                  {trip.arrival.date}
                </div>
                <div className="text-sm text-muted-foreground">
                  {trip.arrival.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{trip.type}</Badge>
              <div className="text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 inline mr-1" />
                Assentos: {trip.selectedSeats.join(", ")}
              </div>
            </div>
          </Card>

          {/* Passenger Forms */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Dados dos passageiros</h2>
              <Button onClick={addPassenger} variant="outline">
                Adicionar passageiro
              </Button>
            </div>

            {passengers.map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg mb-4 last:mb-0"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Passageiro {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePassenger(index)}
                    >
                      Remover
                    </Button>
                  )}
                </div>

                <FormProvider {...passengerForm}>
                  <form className="space-y-4">
                    <div>
                      <FormLabel>Nome Completo</FormLabel>
                      <Input
                        {...passengerForm.register("fullName")}
                        placeholder="Digite seu nome completo"
                      />
                      {passengerForm.formState.errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {passengerForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Tipo de Documento</FormLabel>
                        <Select
                          value={passengerForm.watch("documentType")}
                          onValueChange={(value) => passengerForm.setValue("documentType", value as "cpf" | "rg")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cpf">CPF</SelectItem>
                            <SelectItem value="rg">RG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FormLabel>Número do Documento</FormLabel>
                        <Input
                          {...passengerForm.register("documentNumber")}
                          placeholder="Digite o número"
                        />
                        {passengerForm.formState.errors.documentNumber && (
                          <p className="text-red-500 text-sm">
                            {passengerForm.formState.errors.documentNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            ))}
          </Card>

          {/* Payment Form */}
          <FormProvider {...paymentForm}>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Dados do pagamento</h2>
              <form onSubmit={paymentForm.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={paymentForm.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentForm.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome como está no cartão" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={paymentForm.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de validade</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="cvv"
                      render={({ field }) => (
                        <div>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-span-full">
                    <h2 className="text-xl font-semibold mb-4">Detalhes dos Passageiros</h2>
                    {passengers.map((_, index) => (
                      <div key={index} className="mb-4 p-4 border rounded">
                        <div className="flex justify-between items-center">
                          <h3>Passageiro {index + 1}</h3>
                          {passengers.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removePassenger(index)}
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <FormLabel>Nome Completo</FormLabel>
                            <Input
                              {...passengerForm.register("fullName")}
                              placeholder="Digite seu nome completo"
                            />
                            {passengerForm.formState.errors.fullName && (
                              <p className="text-red-500 text-sm">
                                {passengerForm.formState.errors.fullName.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <FormLabel>Tipo de Documento</FormLabel>
                              <Select
                                value={passengerForm.watch("documentType")}
                                onValueChange={(value) => passengerForm.setValue("documentType", value as "cpf" | "rg")}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cpf">CPF</SelectItem>
                                  <SelectItem value="rg">RG</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <FormLabel>Número do Documento</FormLabel>
                              <Input
                                {...passengerForm.register("documentNumber")}
                                placeholder="Digite o número"
                              />
                              {passengerForm.formState.errors.documentNumber && (
                                <p className="text-red-500 text-sm">
                                  {passengerForm.formState.errors.documentNumber.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addPassenger}
                    >
                      Adicionar Passageiro
                    </Button>
                  </div>
                  <div className="col-span-full flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Finalizar Compra"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </FormProvider>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Resumo do pedido</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {passengers.length} {passengers.length === 1 ? "passagem" : "passagens"}
                </span>
                <span className="font-medium">
                  R$ {(trip.price * passengers.length).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Taxa de serviço
                </span>
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
          </Card>
        </div>
      </div>
    </div>
  );
}
