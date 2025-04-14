import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

const LocalGameSearch = () => {
  // volendo si potrebbe spostare la logica all'interno di un hook
  // LOGICA API CALL
  const [apiResponse, setApiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // prendo l'api tramite vite
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;

  const handleSearch = async () => {
    // operazioni preliminari
    setIsLoading(true);
    setApiResponse("");

    const queryUrl = `https://api.clip.cafe/?api_key=${clipcafeKey}&size=100&views=1000000-10000000`;
    try {
      const response = await fetch(queryUrl);
      const result = await response.json();

      // prendo soltanto le clipID della risposta (se esistono)
      //   if (result.hits?.hits) {
      //     const totalClipIDs = result.hits.hits.map(
      //       (hit: any) => hit._source.clipID
      //     );
      //   }

      setApiResponse(result); // Update state with the response
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onPress={handleSearch}
        size={"lg"}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Search
      </Button>
      <p>API Response: {apiResponse}</p>
    </div>
  );
};

export default LocalGameSearch;
