import LayoutBase from "@/layouts/layoutBase";
import { CheckoutPage } from "@/pages/checkout";
import { HomePage } from "@/pages/home";
import { SignInPage } from "@/pages/login";
import { OrdersPage } from "@/pages/orders";
import { SignUpPage } from "@/pages/register";
import { SearchPage } from "@/pages/search";
import { SuccessPage } from "@/pages/success";
import { TripDetailsPage } from "@/pages/tripDetail";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <LayoutBase><HomePage /></LayoutBase>,
  },
  {
    path: 'pesquisa',
    element: <LayoutBase><SearchPage /></LayoutBase>
  },
  {
    path: 'detalhe-passagem/:id',
    element: <LayoutBase><TripDetailsPage /></LayoutBase>
  },
  {
    path: 'finalizar-compra',
    element: <LayoutBase><CheckoutPage /></LayoutBase>
  },
  {
    path: 'compra-realizada',
    element: <LayoutBase><SuccessPage /></LayoutBase>
  },
  {
    path: 'meus-pedidos',
    element: <LayoutBase><OrdersPage /></LayoutBase>
  },
  {
    path: 'entrar',
    element: <SignInPage />
  },
  {
    path: 'criar-conta',
    element: <SignUpPage />
  },
]);
