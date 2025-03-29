import React from "react";
import DefaultLayout from "@/layouts/default";
import ResetPasswordForm from "@/components/authComponents/resetPasswordForm";
import { checkUserRedirect } from "@/hooks/checkUserRedirect";

const resetPassword = () => {
  // per sicurezza controllo se c'è un utente: se non c'è lo rimando alla home
  const user = checkUserRedirect("/");

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <ResetPasswordForm />
      </div>
    </DefaultLayout>
  );
};

export default resetPassword;
