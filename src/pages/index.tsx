import DefaultLayout from "@/layouts/default";
import { Tabs, Tab } from "@heroui/tabs";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col justify-center items-center">
        <Tabs size="lg">
          <Tab key="Local" title="Local">
            {" "}
            TODO campi per partita locale{" "}
          </Tab>
          <Tab key="Multi" title="Mutliplayer">
            {" "}
            TODO campi per partita multiplayer
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
