import React, { useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import ResetPasswordForm from "@/components/authComponents/resetPasswordForm";
import authRedirect from "../hooks/authRedirect";

const resetPassword = () => {
  // controllo se c'è un utente: se non c'è lo rimando alla home`
  const user = authRedirect("/");

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <ResetPasswordForm />
      </div>
    </DefaultLayout>
  );
};

export default resetPassword;
