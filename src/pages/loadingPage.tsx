import React from "react";
import DefaultLayout from "@/layouts/default";
import { Spinner } from "@heroui/spinner";

const loadingPage = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center justify-center mt-20">
        <Spinner color="primary" label="Loading..." size="lg" />
      </div>
    </DefaultLayout>
  );
};

export default loadingPage;
