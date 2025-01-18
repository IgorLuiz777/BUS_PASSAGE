import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import {
  Bus,
  HelpCircle,
  Package,
  User,
  UserPlus,
  Menu,
  Compass,
  Tag
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <User className="w-4 h-4" />,
      label: "Entrar",
      variant: "default" as const,
    },
    {
      icon: <UserPlus className="w-4 h-4" />,
      label: "Criar conta",
      variant: "outline" as const,
    },
    {
      icon: <Package className="w-4 h-4" />,
      label: "Meus pedidos",
      variant: "ghost" as const,
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Ajuda",
      variant: "ghost" as const,
    },
    {
      icon: <Tag className="w-4 h-4" />,
      label: "Ofertas",
      variant: "ghost" as const,
    },
    {
      icon: <Compass className="w-4 h-4" />,
      label: "Explorar",
      variant: "ghost" as const,
    },
  ];

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex hover:text-gray-200 items-center gap-2 text-xl font-bold text-white">
              <Bus className="w-6 h-6" />
              BusTrip
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
              Ajuda
            </a>
            <a href="#" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <Package className="w-4 h-4" />
              Meus pedidos
            </a>
            <Button
              variant="secondary"
              className="flex items-center gap-2 hover:bg-white/90"
            >
              <User className="w-4 h-4" />
              Entrar
            </Button>
            <Button
              variant="outline"
              className="text-black border-white hover:bg-white"
            >
              <UserPlus className="w-4 h-4" />
              Criar conta
            </Button>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-white text-white hover:bg-white hover:text-primary"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={item.variant}
                    className={`w-full justify-start gap-2 text-left ${
                      item.variant === "default"
                        ? "bg-primary text-white hover:bg-primary/90"
                        : item.variant === "outline"
                        ? "border-primary text-primary hover:bg-primary hover:text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
