import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Text,
  useColorModeValue,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Badge,
  Button,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useUser } from "../share/UserContext";

function ExcelModal({ examSlotID, examRoomID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, flag, setFlag, URL } = useUser();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("examSlotID", examSlotID);
    formData.append("examRoomID", examRoomID);

    fetch(`${URL}/exam-room/import-excel`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
        setFlag(!flag);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button bgColor="green.500" onClick={onOpen}>
        Nhập bằng Excel
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mời bạn chọn File Excel cần nhập</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Mã phòng thi</FormLabel>
                <Input ref={initialRef} value={examRoomID} readOnly />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Mã ca thi</FormLabel>
                <Input value={examSlotID} readOnly />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tải lên File Excel</FormLabel>
                <Input
                  type="file"
                  name="excelFile"
                  id="excelFile"
                  accept=".xls, .xlsx"
                  required
                />
              </FormControl>

              <Button mt={4} colorScheme="blue" type="submit">
                Thêm
              </Button>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default ExcelModal;
