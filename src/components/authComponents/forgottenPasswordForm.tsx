import React from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

interface Props {
  emailValidation: (value: string) => string | null;
  closeModal?: () => void;
}

const forgottenPasswordForm: React.FC<Props> = ({
  emailValidation,
  closeModal,
}: Props) => {
  // per evitare spam di submit
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // gestione logica del form per sign up con email e password
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // previene invio multiplo del form
    if (isSubmitting) return;
    setIsSubmitting(true);
    // utilizzo formdata per prendere i campi email
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    // try catch per gestire errori con api
    try {
      const result = await dispatch(
        sendPasswordResetEmail({ email: email })
      ).unwrap();
      // a prescindere dal risultato, mostriamo un modale di successo
      // se la registrazione è riuscita, chiudiamo messaggio e mostriamo il toast
      closeModal?.();
      addToast({
        title: "Password reset email sent",
        description: "Check your email to reset your password",
        color: "success",
        timeout: 3500,
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
        <Button type="submit" color="primary" className="mt-1">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default forgottenPasswordForm;
