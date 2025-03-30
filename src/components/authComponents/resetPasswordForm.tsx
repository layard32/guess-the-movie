import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { resetPassword } from "@/state/thunks";
import { passwordValidation } from "@/state/userValidation";
import { addToast } from "@heroui/toast";
import { useLocation } from "wouter";

const resetPasswordForm = () => {
  // gestisco navigazione con wouter
  const [, navigate] = useLocation();

  // per evitare spam di submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // gestione logica del form per sign up con email e password
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // previene invio multiplo del form
    if (isSubmitting) return;
    setIsSubmitting(true);
    // utilizzo formdata per prendere il campo della password
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    // try catch per gestire gli errori di registrazione
    try {
      const result = await dispatch(
        resetPassword({ new_password: password })
      ).unwrap();
      if (result?.user) {
        // gestisco reset password riuscito
        navigate("/");
        addToast({
          title: "Password reset successfully",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error: any) {
      // gestisco reset password fallito
      addToast({
        title: "Error when resetting the password",
        description: error.message,
        color: "danger",
        timeout: 2500,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false); // reset dello stato di submitting
    }
  };

  // gestisco in realtime password e confirm password per applicare una custom validation su entrambi
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePasswordValidation = () => {
    return passwordValidation(password, confirmPassword);
  };

  return (
    <>
      <Form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          label="New password"
          placeholder="Enter your new password"
          type="password"
          labelPlacement="outside"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          validate={
            passwordValidation
              ? (value) => passwordValidation(value)
              : undefined
          }
        />
        <Input
          isRequired
          label="Confirm new password"
          placeholder="Enter your new password"
          type="password"
          labelPlacement="outside"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          validate={handlePasswordValidation}
        />
        <Button type="submit" color="primary" className="mt-1">
          Reset the password
        </Button>
      </Form>
    </>
  );
};

export default resetPasswordForm;
