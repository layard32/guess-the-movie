import React from "react";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import AuthModal from "./AuthModal";

interface Props {
  button?: boolean;
  link?: boolean;
}

const signIn: React.FC<Props> = ({ button, link }: Props) => {
  // per la gestione del modale di heroui
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
          Register
        </Link>
      )}
      {button && (
        <Button className="w-full" onPress={onOpen}>
          Register
        </Button>
      )}
      <AuthModal signin={true} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default signIn;
