import DefaultLayout from "@/layouts/default";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import authRedirect from "../hooks/authRedirect";
import ProfileFieldsForm from "@/components/profileComponents/profileFieldsForm";
import giveUsername from "@/hooks/giveUsername";

export default function ProfilePage() {
  // controllo se c'è un utente: se non c'è lo rimando alla home`
  const user = authRedirect("/");
  // prendo l'username dal custom hook
  const userName = giveUsername();

  return (
    <DefaultLayout>
      <div className="ml-1.5 text-xl font-bold mb-3">{userName}</div>

      <div className="flex w-full flex-col">
        <Tabs isVertical={true}>
          <Tab key="Profile" title="Profile">
            <Card>
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
