import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import Oauth from "./oauth";
import NewUserForm from "./newUserForm";
import {
  passwordValidation,
  emailValidation,
  nameValidation,
} from "@/state/userValidation";
import ExistingUserForm from "./existingUserForm";
import { Link } from "@heroui/link";
import ForgottenPasswordForm from "./forgottenPasswordForm";

interface Props {
  login: boolean;
  signin: boolean;
  forgetPassword: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
}

const AuthModal: React.FC<Props> = ({
  login,
  signin,
  isOpen,
  forgetPassword,
  onOpenChange,
}: Props) => {
  // per gestire il cambio modale utilizzo uno stato che imposto
  // in base ai props e resetto alla chiusura del modale
  const [currentModal, setCurrentModal] = React.useState<string>(
    login
      ? "login"
      : signin
        ? "signin"
        : forgetPassword
          ? "forgetPassword"
          : "signin"
  );
  const handleOpenChange = () => {
    onOpenChange();
    setCurrentModal(
      login
        ? "login"
        : signin
          ? "signin"
          : forgetPassword
            ? "forgetPassword"
            : "signin"
    );
  };

  return (
    <>
      {currentModal == "signin" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          isDismissable={false}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create a new account or sign in with your favorite social
                  <p className="text-small">
                    Already have an account?{" "}
                    <Link
                      onPress={() => setCurrentModal("login")}
                      className="cursor-pointer"
                    >
                      {" "}
                      Log in{" "}
                    </Link>
                  </p>
                </ModalHeader>
                <ModalBody className="mb-2.5">
                  <Oauth />
                  <NewUserForm
                    passwordValidation={passwordValidation}
                    emailValidation={emailValidation}
                    usernameValidation={nameValidation}
                    closeModal={onOpenChange}
                  />
                  <p className="text-small">
                    Forget your password?{" "}
                    <Link
                      onPress={() => setCurrentModal("forgetPassword")}
                      className="cursor-pointer"
                    >
                      {" "}
                      Reset it{" "}
                    </Link>
                  </p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {currentModal == "login" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          isDismissable={false}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Login with your account or your favorite social
                  <p className="text-small">
                    Don't have an account?{" "}
                    <Link
                      onPress={() => setCurrentModal("signin")}
                      className="cursor-pointer"
                    >
                      {" "}
                      Register{" "}
                    </Link>
                  </p>
                </ModalHeader>
                <ModalBody className="mb-2.5">
                  <Oauth />
                  <ExistingUserForm
                    passwordValidation={passwordValidation}
                    emailValidation={emailValidation}
                    closeModal={onOpenChange}
                  />
                  <p className="text-small">
                    Forget your password?{" "}
                    <Link
                      onPress={() => setCurrentModal("forgetPassword")}
                      className="cursor-pointer"
                    >
                      {" "}
                      Reset it{" "}
                    </Link>
                  </p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {currentModal == "forgetPassword" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          isDismissable={false}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Reset your password
                  <p className="text-small">
                    Go back to{" "}
                    <Link
                      onPress={() => setCurrentModal("login")}
                      className="cursor-pointer"
                    >
                      {" "}
                      login{" "}
                    </Link>
                  </p>
                </ModalHeader>
                <ModalBody className="mb-2.5">
                  <ForgottenPasswordForm
                    closeModal={onOpenChange}
                    emailValidation={emailValidation}
                    handleOpenChange={handleOpenChange}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AuthModal;
