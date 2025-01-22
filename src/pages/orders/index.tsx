import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Download,
  ExternalLink,
  MapPin,
  QrCode,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  status: "confirmed" | "cancelled" | "completed";
  trip: {
    origin: string;
    destination: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    company: string;
  };
  passengers: number;
  totalPrice: number;
  qrCode: string;
}

const mockOrders: Order[] = [
  {
    id: "123456",
    status: "confirmed",
    trip: {
      origin: "SÃO PAULO - TIETÊ",
      destination: "RIO DE JANEIRO - NOVO RIO",
      departureDate: "19 Jan 2024",
      departureTime: "22:30",
      arrivalDate: "20 Jan 2024",
      arrivalTime: "05:10",
      company: "VIAÇÃO GARCIA",
    },
    passengers: 2,
    totalPrice: 429.98,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER123456",
  },
  {
    id: "123457",
    status: "completed",
    trip: {
      origin: "RIO DE JANEIRO - NOVO RIO",
      destination: "SÃO PAULO - TIETÊ",
      departureDate: "15 Jan 2024",
      departureTime: "23:00",
      arrivalDate: "16 Jan 2024",
      arrivalTime: "05:45",
      company: "VIAÇÃO GARCIA",
    },
    passengers: 1,
    totalPrice: 214.99,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER123457",
  },
  {
    id: "123458",
    status: "cancelled",
    trip: {
      origin: "SÃO PAULO - TIETÊ",
      destination: "CURITIBA - RODOFERROVIÁRIA",
      departureDate: "10 Jan 2024",
      departureTime: "20:00",
      arrivalDate: "11 Jan 2024",
      arrivalTime: "06:30",
      company: "VIAÇÃO GARCIA",
    },
    passengers: 1,
    totalPrice: 180.00,
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER123458",
  },
];

const statusMap = {
  confirmed: {
    label: "Confirmado",
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  completed: {
    label: "Concluído",
    color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
};

export function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  const handleShowQRCode = (order: Order) => {
    setSelectedOrder(order);
    setIsQRCodeOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Meus pedidos</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Buscar por número do pedido"
            className="w-full pl-10"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="w-full md:w-48">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="confirmed">Confirmado</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Pedido #{order.id}
                  </p>
                  <Badge
                    variant="secondary"
                    className={statusMap[order.status].color}
                  >
                    {statusMap[order.status].label}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="text-lg font-bold">{order.trip.departureTime}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.trip.departureDate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.trip.origin}
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      6:40h
                    </div>
                    <div className="w-20 h-px bg-gray-300 relative">
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold">{order.trip.arrivalTime}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.trip.arrivalDate}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.trip.destination}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{order.trip.company}</span>
                </div>
              </div>

              <div className="md:w-48 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">
                    {order.passengers} {order.passengers === 1 ? "passageiro" : "passageiros"}
                  </div>
                  <div className="text-xl font-bold">
                    R$ {order.totalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-2">
                  {order.status === "confirmed" && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleShowQRCode(order)}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Ver QR Code
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* QR Code Dialog */}
      <Dialog open={isQRCodeOpen} onOpenChange={setIsQRCodeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code da passagem</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={selectedOrder.qrCode}
                alt="QR Code"
                className="w-48 h-48"
              />
              <p className="text-sm text-muted-foreground text-center">
                Apresente este QR Code no embarque
              </p>
              <Button className="w-full" onClick={() => window.open(selectedOrder.qrCode, '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Baixar QR Code
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
