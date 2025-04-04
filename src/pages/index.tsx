import DefaultLayout from "@/layouts/default";
import { Tabs, Tab } from "@heroui/tabs";
import LocalGameForm from "@/components/indexComponents/localGameForm";
import { Card, CardBody } from "@heroui/card";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col justify-center items-center">
        <Tabs size="lg" className="mb-2.5">
          <Tab key="Local" title="Local">
            <Card className="w-[min(500px,80vw)]">
              <CardBody>
                <LocalGameForm />
              </CardBody>
            </Card>{" "}
          </Tab>
          <Tab key="Online" title="Online" isDisabled={true}>
            TODO
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
