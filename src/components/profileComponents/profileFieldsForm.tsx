import React, { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "@/state/userValidation";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import giveUsername from "@/hooks/giveUsername";
import { addToast } from "@heroui/toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { updateUser } from "@/state/thunks";

const profileFieldsForm = () => {
  // prendo email ed username dall'utente
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(giveUsername());
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // per gestire editabilità dei campi
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // gestione validazione conferma password
  const handlePasswordValidation = () => {
    return passwordValidation(password, confirmPassword);
  };

  // per prevenire più invii di submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  // gestione logica form
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    // utilizzo formdata per prendere i campi email, password ed username inseriti
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("name") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    // try catch per gestire gli errori
    try {
      const result = await dispatch(
        updateUser({ email: email, password: password, username: username })
      ).unwrap();
      if (result?.user) {
        // se la modifica è riuscita, mostriamo un toast ed usciamo dalla modalità editable
        setIsEditable((prevState) => !prevState);
        addToast({
          title: "Account successfully updated",
          color: "success",
          timeout: 3500,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error: any) {
      // se il signup fallisce mostriamo il toast con l'errore
      addToast({
        title: "Error when updating the account",
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
    <Form
      className="w-full min-w-[500px] flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      {" "}
      <Input
        isRequired
        label="Username"
        value={username}
        type="text"
        labelPlacement="inside"
        name="name"
        isDisabled={!isEditable}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        validate={nameValidation ? (value) => nameValidation(value) : undefined}
      />
      <Input
        isRequired
        label="Email"
        value={email}
        type="text"
        labelPlacement="inside"
        name="email"
        isDisabled={!isEditable}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        validate={
          emailValidation ? (value) => emailValidation(value) : undefined
        }
      />
      <div className="flex gap-4 w-full">
        <Input
          className="max-w-[48%]"
          isRequired
          label="Password"
          value={password}
          type="password"
          labelPlacement="inside"
          name="password"
          isDisabled={!isEditable}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          validate={
            passwordValidation
              ? (value) => passwordValidation(value)
              : undefined
          }
        />
        {isEditable && (
          <Input
            className="max-w-[48%]"
            isRequired
            label="Confirm new password"
            value={confirmPassword}
            type="password"
            labelPlacement="inside"
            name="confirmPassword"
            isDisabled={!isEditable}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            validate={handlePasswordValidation}
          />
        )}
      </div>
      <div className="basis-full h-0 w-0"> </div>
      <div className="-mt-3.5">
        {isEditable ? (
          <Button type="submit" color="secondary">
            Apply changes
          </Button>
        ) : (
          <Button
            type="button"
            color="primary"
            onPress={() => setIsEditable((prevState) => !prevState)}
          >
            Edit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default profileFieldsForm;
