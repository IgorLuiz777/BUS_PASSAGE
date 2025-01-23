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
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const logOut = useAuthStore(state => state.logout)

  const logOutHandler = () => {
    logOut()
    navigator('/entrar')
  }

  const menuItems = [
    {
      label: "Ajuda",
      icon: HelpCircle,
      variant: "outline" as const,
      action: () => {},
      showWhenAuthenticated: true
    },
    {
      label: "Meus pedidos",
      icon: Package,
      variant: "outline" as const,
      action: () => navigator("/meus-pedidos"),
      showWhenAuthenticated: true
    },
    {
      label: "Entrar",
      icon: User,
      variant: "default" as const,
      action: () => navigator('/entrar'),
      showWhenAuthenticated: false
    },
    {
      label: "Criar conta",
      icon: UserPlus,
      variant: "outline" as const,
      action: () => navigator('/criar-conta'),
      showWhenAuthenticated: false
    },
    {
      label: "Sair",
      icon: User,
      variant: "secondary" as const,
      action: logOutHandler,
      showWhenAuthenticated: true
    }
  ];

  return (
    <header className="bg-primary text-white py-4 px-4 md:px-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              onClick={() => navigator("/")}
              className="flex hover:text-gray-200 items-center gap-2 text-xl font-bold text-white cursor-pointer"
            >
              <Bus className="w-6 h-6" />
              BusTrip
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <a href="#" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  Ajuda
                </a>
                <a
                  onClick={() => navigator("/meus-pedidos")}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  Meus pedidos
                </a>
                <Button
                  onClick={logOutHandler}
                  variant="secondary"
                  className="flex items-center gap-2 hover:bg-white/90"
                >
                  <User className="w-4 h-4" />
                  Sair
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Button
                  onClick={() => navigator('/entrar')}
                  variant="secondary"
                  className="flex items-center gap-2 hover:bg-white/90"
                >
                  <User className="w-4 h-4" />
                  Entrar
                </Button>
                <Button
                  onClick={() => navigator('/criar-conta')}
                  variant="outline"
                  className="text-black border-white hover:bg-white"
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </Button>
              </>
            )}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-white border-primary text-primary "
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <Bus className="h-6 w-6" />
                  BusTrip
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-2">
                {menuItems
                  .filter(item =>
                    (isAuthenticated && item.showWhenAuthenticated) ||
                    (!isAuthenticated && !item.showWhenAuthenticated)
                  )
                  .map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      variant={item.variant}
                      className={`w-full justify-start gap-2 text-left bg-white ${
                        item.variant === "default"
                          ? "bg-primary text-white hover:bg-primary/90"
                          : item.variant === "outline"
                            ? "border-primary text-primary hover:bg-primary/10"
                            : "text-gray-700 hover:bg-gray-100 bg-gray-100/70"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
