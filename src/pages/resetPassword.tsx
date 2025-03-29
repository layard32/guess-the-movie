import React from "react";
import DefaultLayout from "@/layouts/default";
import ResetPasswordForm from "@/components/authComponents/resetPasswordForm";

const resetPassword = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <ResetPasswordForm />
      </div>
    </DefaultLayout>
  );
};

export default resetPassword;
