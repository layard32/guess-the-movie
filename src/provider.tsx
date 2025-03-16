import { HeroUIProvider } from "@heroui/system";
import { useLocation, Router } from "wouter";

export function Provider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  const navigate = (to: string) => {
    setLocation(to);
  };

  return (
    <HeroUIProvider navigate={navigate} useHref={() => location}>
      <Router>{children}</Router>
    </HeroUIProvider>
  );
}
