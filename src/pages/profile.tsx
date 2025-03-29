import DefaultLayout from "@/layouts/default";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

export default function IndexPage() {
  // per sicurezza controllo se c'è un utente: se non c'è lo rimando alla home
  const user = useSelector(selectUser);
  // prendo l'username, se ci sta, oppure il name
  const userName = user?.user_metadata.user_name
    ? user?.user_metadata.user_name.charAt(0).toUpperCase() +
      user?.user_metadata.user_name.slice(1)
    : user?.user_metadata.name
      ? user?.user_metadata.name.charAt(0).toUpperCase() +
        user?.user_metadata.name.slice(1)
      : "Guest";

  const [, navigate] = useLocation();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <DefaultLayout>
      <div className="ml-1.5 text-xl font-bold mb-3">{userName}</div>

      <div className="flex w-full flex-col">
        <Tabs isVertical={true}>
          <Tab key="Profile" title="Profile">
            <Card>
              <CardBody>TODO CAMPI PROFILE</CardBody>
            </Card>
          </Tab>
          <Tab key="LocalStat" title="Local Statistics">
            <Card>
              <CardBody>
                TODO CAMPI STATISTICHE LOCALI DA FARE DOPO AVER DEFINITO IL DB
              </CardBody>
            </Card>
          </Tab>
          <Tab key="MultiStat" title="Multiplayer Statistics">
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
