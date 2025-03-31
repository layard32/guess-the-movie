import DefaultLayout from "@/layouts/default";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import authRedirect from "../hooks/authRedirect";
import ProfileFieldsForm from "@/components/profileComponents/profileFieldsForm";
import giveUsername from "@/hooks/giveUsername";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  // controllo se c'è un utente: se non c'è lo rimando alla home`
  const user = authRedirect("/");
  // prendo l'username dal custom hook
  const userName = giveUsername();
  // utilizzo matchmedia per controllare se sono su mobile o desktop
  // ed use effect per aggiornare dinamicamente
  const [isMediumSize, setIsMediumSize] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 800px)");
    // event listener
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMediumSize(e.matches);
    };
    mediaQuery.addEventListener("change", handleResize);
    // cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <DefaultLayout>
      <div className="ml-1.5 text-xl font-bold mb-3">{userName}</div>

      <div className="flex w-full flex-col">
        {/* se lo schermo è sm o md, tabs sono orizzontali; se no verticali */}
        <Tabs isVertical={isMediumSize} className="lg:mr-10">
          <Tab key="Profile" title="Profile">
            <Card className="w-[min(85vw,600px)]">
              <CardBody>
                <ProfileFieldsForm />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="LocalStat" title="Local Statistics">
            <Card>
              <CardBody>
                TODO CAMPI STATISTICHE LOCALI DA FARE DOPO AVER DEFINITO IL DB
              </CardBody>
            </Card>
          </Tab>
          <Tab key="MultiStat" title="Online Statistics" isDisabled={true}>
            <Card>
              <CardBody>
                TODO CAMPI STATISTICHE MULTIPLAYER DA FARE DOPO AVER DEFINITO IL
                DB
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
