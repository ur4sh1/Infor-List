import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
   ModalCloseButton, Button, FormControl, FormLabel, Input, Box, ModalFooter} from "@chakra-ui/react";
import { useState } from "react";
import InputMask from "react-input-mask";

const ModalComponent = ({ data, setData, dataEdit, isOpen, onClose}) => {

  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");
  const [tel, setTel] = useState(dataEdit.tel || "");

  const emailAlreadyExists = () => {
    if(dataEdit.email !== email && data?.length){
      return data.find((item)=> item.email === email);
    };
    return false;
  };

  const handleSave = () => {
    if(!name || !email || !tel) return;

    if(emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    };

    if(Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email, tel};
    };

    const newDataArray = !Object.keys(dataEdit).length
    ? [...(data ? data : []),{ name, email, tel }]
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
            <Box>
              <FormLabel>Telefone</FormLabel>
              <InputMask class="chakra-input css-1kp110w" mask="(99)99999-9999" type="text" value={tel} onChange={(e)=> setTel(e.target.value)}/>
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