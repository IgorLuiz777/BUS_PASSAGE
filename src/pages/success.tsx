import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Home } from "lucide-react";

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-lg mx-auto py-16 px-4">
      <Card className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Compra realizada com sucesso!</h1>
        <p className="text-muted-foreground mb-8">
          Seu pedido foi confirmado e suas passagens estão prontas.
        </p>

        <div className="space-y-4">
          <Button className="w-full" onClick={() => { }}>
            <Download className="w-4 h-4 mr-2" />
            Baixar passagens
          </Button>
          <Button
            variant="outline"
            className="w-full bg-white text-primary hover:bg-primary hover:text-white border border-primary"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar para página inicial
          </Button>
        </div>
      </Card>
    </div>
  );
}
