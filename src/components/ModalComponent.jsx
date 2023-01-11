import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
   ModalCloseButton, Button, FormControl, FormLabel, Input, Box, ModalFooter} from "@chakra-ui/react";
import { useState } from "react";

const ModalComponent = ({ data, setData, dataEdit, isOpen, onClose}) => {

  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");

  const emailAlreadyExists = () => {
    if(dataEdit.email !== email && data?.length){
      return data.find((item)=> item.email === email);
    };
    return false;
  };

  const handleSave = () => {
    if(!name || !email) return;

    if(emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    };

    if(Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email};
    };

    const newDataArray = !Object.keys(dataEdit).length
    ? [...(data ? data : []),{ name, email }]
    : [...(data ? data : [])];

    localStorage.setItem("card_cliente", JSON.stringify(newDataArray));
    setData(newDataArray);
    onClose();
  };

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de Clientes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
            </Box>
            <Box>
              <FormLabel>E-mail</FormLabel>
              <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            SALVAR
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};

export default ModalComponent;