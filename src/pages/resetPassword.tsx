import React, { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import ResetPasswordForm from "@/components/authComponents/resetPasswordForm";
import authRedirect from "../hooks/authRedirect";
import { Card, CardBody } from "@heroui/card";

const resetPassword = () => {
  // controllo se c'è un utente: se non c'è lo rimando alla home
  // TODO: fixare il erdirect, perché rompe il magic link
  // const user = authRedirect("/");

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-2/4">
          <CardBody>
            <ResetPasswordForm />
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default resetPassword;
