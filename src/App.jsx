import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, useDisclosure, Table, Thead,
   Tr, Th, Tbody, Td, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComponent from "./components/ModalComponent";

const App = () => {

  const { isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  //useBreakpointValue é um hook da biblioteca chakra, que verifica se a tela é executara na versão mobile
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const handleRemove = (email) => {
    const newArray = data.filter((item)=> item.email !== email);
    setData(newArray);
    localStorage.setItem("card_cliente", JSON.stringify(newArray));
  };

  useEffect(()=>{
    const db_customer = localStorage.getItem("card_cliente")
    ? JSON.parse(localStorage.getItem("card_cliente"))
    : [];
    setData(db_customer);
  },[setData]);

  return (
    <Flex h="100vh" align="center" justify="center" fontSize="20px" fontFamily="poppins">
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={()=>[setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>
        <Box overflowY="auto" height="100%">
        <Table mt="6">
          <Thead>
            <Tr>
              <Th maxW={isMobile ? 5 :100} fontSize="20px">Nome</Th>
              <Th maxW={isMobile ? 5 :100} fontSize="20px">E-mail</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({name, email}, index)=>(
              <Tr key={index} cursor="pointer" _hover={{bg: "gray.100"}}>
                <Td maxW={isMobile ? 5 :100} fontSize="20px">{name}</Td>
                <Td maxW={isMobile ? 5 :100} fontSize="20px">{email}</Td>
                <Td p={0}>
                  <EditIcon fontSize={20} 
                  onClick={()=>[
                    setDataEdit({name, email, index}),
                    onOpen(),
                  ]}/>
                </Td>
                <Td>
                  <DeleteIcon fontSize={20} onClick={()=> handleRemove(email)}/>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
