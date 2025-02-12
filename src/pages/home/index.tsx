import { useEffect } from "react";
import { SearchForm } from "@/components/ui/search-form";
import { FeaturedDestinations } from "@/components/featured-destinations";
import { FeaturedTrips } from "@/components/featured-trips";
import type { SearchParams } from "@/types";
import { Bubble } from "@typebot.io/react";

export function HomePage() {
  const handleSearch = (params: SearchParams) => {
    console.log("Buscar viagens com params:", params);
  };

  useEffect(() => {
    const loadTypebot = async () => {
      const { default: Typebot } = await import("https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3.4/dist/web.js");
      Typebot.initBubble({
        typebot: "meu-typebot-xzsuc7q",
        apiHost: "https://typebot.jubimon.tech",
        theme: {
          button: { backgroundColor: "#0042DA" },
          chatWindow: { backgroundColor: "#fff" },
        },
      });
    };

    loadTypebot();
  }, []);

  return (
    <div className="w-full">
      <section className="w-full py-8 md:py-12 bg-gradient-to-br from-primary via-blue-600 to-blue-900 text-primary-foreground">
        <div className="w-full max-w-[1400px] px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-white">
              Encontre as melhores passagens de ônibus para sua próxima viagem
            </h1>

            <div className="bg-white text-foreground p-4 md:p-6 rounded-lg shadow-lg">
              <SearchForm onSubmit={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      <FeaturedDestinations />
      <FeaturedTrips />

      <Bubble
        typebot="meu-typebot-xzsuc7q"
        theme={{ button: { backgroundColor: "#0042DA" } }}
      />
    </div>
  );
}
