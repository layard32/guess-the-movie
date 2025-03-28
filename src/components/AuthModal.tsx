import React, { useEffect } from "react";
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

interface Props {
  login?: boolean;
  signin?: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
}

const AuthModal: React.FC<Props> = ({
  login,
  signin,
  isOpen,
  onOpenChange,
}: Props) => {
  // per gestire il cambio modale utilizzo uno stato che imposto
  // in base ai props e resetto alla chiusura del modale
  const [isLogin, setIsLogin] = React.useState<boolean>(!!login);
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange();
    setIsLogin(!!login);
  };

  return (
    <>
      {signin && !isLogin && (
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
                </ModalHeader>
                <ModalBody>
                  <Oauth />
                  <NewUserForm
                    passwordValidation={passwordValidation}
                    emailValidation={emailValidation}
                    usernameValidation={nameValidation}
                    closeModal={onOpenChange}
                  />
                  <p className="text-small mb-2.5">
                    Already have an account?{" "}
                    <Link
                      onPress={() => setIsLogin(true)}
                      className="cursor-pointer"
                    >
                      {" "}
                      Log in{" "}
                    </Link>
                  </p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {(login || isLogin) && (
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
                </ModalHeader>
                <ModalBody>
                  <Oauth />
                  <ExistingUserForm
                    passwordValidation={passwordValidation}
                    emailValidation={emailValidation}
                    closeModal={onOpenChange}
                  />
                  <p className="text-small mb-2.5">
                    Don't have an account?{" "}
                    <Link
                      onPress={() => setIsLogin(false)}
                      className="cursor-pointer"
                    >
                      {" "}
                      Register{" "}
                    </Link>
                  </p>
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
