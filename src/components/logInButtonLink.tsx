import React from "react";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import AuthModal from "./AuthModal";

interface Props {
  button?: boolean;
  link?: boolean;
}

const logIn: React.FC<Props> = ({ button, link }: Props) => {
  // gestione del modal tramite heroui
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {link && (
        <Link
          className="w-full"
          onPress={onOpen}
          href="#"
          size="lg"
          color="foreground"
        >
          Log in
        </Link>
      )}
      {button && (
        <Button className="w-full" onPress={onOpen}>
          Log in
        </Button>
      )}
      <AuthModal
        login={true}
        signin={false}
        forgetPassword={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default logIn;
