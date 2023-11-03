import React from "react";
import { useState } from 'react';
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
  } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { useUser } from '../../components/share/UserContext';

function StudentModal({ examRoomID }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [studentID, setStudentID] = useState('');
    const { user, flag, setFlag } = useUser();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the form submission logic here
        // You can access the values using the studentID and examRoomID state variables
        console.log('Student ID:', studentID);
        console.log('Exam Room ID:', examRoomID);
        handleAddStudent(studentID, examRoomID)
        onClose();
      };

      const handleAddStudent = async (studentID, examRoomID) => {
        try {
          // Make the POST request
          const response = await axios.post("http://localhost:4000/exam-room/add-student", {
            studentID: studentID,
            examRoomID: examRoomID,
          });
      
          // Check the response status
          if (response.status === 200) {
            console.log(response.data);
            alert("Thêm sinh viên thành công");
            setFlag(!flag);
          } else {
            console.error('Server returned an error:', response.status);
            alert("Mã sinh viên không tồn tại hoặc đã có sẵn trong phòng thi");
          }
        } catch (error) {
          console.error("POST request error:", error.message);
          alert("Mã sinh viên không tồn tại hoặc đã có sẵn trong phòng thi");
        }
      };
      
    
  
    return (
      <>
        <Button onClick={onOpen}>Thêm sinh viên</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nhập thông tin sinh viên</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Mã sinh viên</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='StudentID'
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Mã phòng</FormLabel>
                <Input
                  value={examRoomID}
                  readOnly
                  placeholder='Mã phòng'
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit">
                Thêm
              </Button>
              <Button onClick={onClose}>Hủy</Button>
            </ModalFooter>
          </ModalContent>
        </form>
        </Modal>
      </>
    )
  }

export default StudentModal