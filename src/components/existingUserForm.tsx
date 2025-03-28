import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { login, fetchSession } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";

interface Props {
  usernameValidation?: (value: string) => string | null;
  emailValidation?: (value: string) => string | null;
  passwordValidation?: (value: string) => string | null;
  closeModal?: () => void;
}

const existingUserForm: React.FC<Props> = ({
  emailValidation,
  passwordValidation,
  closeModal,
}: Props) => {
  // per evitare spam di submit
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // gestione logica del form per login con email e password
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // previene invio multiplo del form
    if (isSubmitting) return;
    setIsSubmitting(true);
    // utilizzo formdata per prendere i campi email e password inseriti
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // try catch per gestire gli errori di registrazione
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result?.user) {
        // se il login è riuscito, fetchiamo la sessione, chiudiamo il modale e mostriamo il toast
        await dispatch(fetchSession());
        closeModal?.();
        addToast({
          title: "Successfully logged in",
          color: "success",
          timeout: 3500,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error: any) {
      // se il login fallisce mostriamo il toast con l'errore
      addToast({
        title: "Error when logging in",
        description: error.message,
        color: "danger",
        timeout: 2500,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false); // reset dello stato di submitting
    }
  };

  return (
    <>
      <Form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="text"
          labelPlacement="outside"
          name="email"
          validate={
            emailValidation ? (value) => emailValidation(value) : undefined
          }
        />
        <Input
          isRequired
          label="Password"
          placeholder="Enter your password"
          type="password"
          labelPlacement="outside"
          name="password"
          validate={
            passwordValidation
              ? (value) => passwordValidation(value)
              : undefined
          }
        />
        <Button type="submit" color="primary" className="mt-1">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default existingUserForm;
