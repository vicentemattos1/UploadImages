import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent
        background="pGray.800"
        mx="auto"
        w="auto"
        h="auto"
        maxW={['300px', '500px', '900px']}
        maxH={['350px', '450px', '600px']}
      >
        <ModalBody p="0">
          <Image
            src={imgUrl}
            maxW={['300px', '500px', '900px']}
            maxH={['350px', '450px', '600px']}
          />
        </ModalBody>

        <ModalFooter
          justifyContent="start"
          h="2rem"
          py="5px"
          fontSize="14px"
          fontFamily="Roboto"
          borderBottomRadius="6px"
        >
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
