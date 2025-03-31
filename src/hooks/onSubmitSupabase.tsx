import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";
import { useDispatch } from "react-redux";
import { fetchSession } from "@/state/thunks";

interface Args {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  thunk: any;
  toastSuccessTitle: string;
  toastSuccessDescription?: string;
  toastErrorTitle: string;
  toastErrorDescription?: string;
  confirmPasswordPresent?: boolean;
  closingAction?: () => void;
}

// gestione logica form per azione API supabase
const onSubmitSupabase = ({
  isSubmitting,
  setIsSubmitting,
  confirmPasswordPresent,
  thunk,
  closingAction,
  toastSuccessTitle,
  toastErrorTitle,
  toastSuccessDescription,
  toastErrorDescription,
}: Args) => {
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // previene invio multiplo del form
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("ajo");
    // utilizzo formdata per prendere i campi email e password inseriti
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let confirmPassword = "";
    if (confirmPasswordPresent)
      confirmPassword = formData.get("confirmPassword") as string;

    // try catch per gestire gli errori
    try {
      const result = await dispatch(
        thunk({
          email: email,
          password: password,
          ...(confirmPasswordPresent && { confirmPassword: confirmPassword }),
        })
      ).unwrap();
      if (result?.user) {
        // se l'azione supabse è riuscita, per sicurezza rifetchiamo la sessione
        // poi svolgiamo la closingAction e mostriamo il toast di successo
        await dispatch(fetchSession());
        closingAction?.();
        addToast({
          title: toastSuccessTitle,
          description: toastSuccessDescription || undefined,
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error: any) {
      // se l'azione supabase fallisce mostriamo il toast con l'errore
      addToast({
        title: toastErrorTitle,
        description: toastErrorDescription || error.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false); // reset dello stato di submitting
    }
  };

  return onSubmit;
};

export default onSubmitSupabase;
