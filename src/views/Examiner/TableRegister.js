// Library imports
import React, { useEffect, useState } from "react";
import axios from "axios";
// Chakra imports
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
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// You should also import some data for the table
import { useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

// Import useContext value
import { useCourse } from "../../components/share/CourseContext";
import { DELETE_SLOT } from "assets/api";
import { useExamSchedule } from "../../components/share/ExamScheduleContext";
import { useExamRoom } from "../../components/share/ExamRoomContext";
import { useUser } from "../../components/share/UserContext";
import { REGISTER_EXAM_SCHEDULE } from "assets/api";

function TableRegister() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const history = useHistory();

  // Custone hook
  const toast = useToast();
  const { user, login, logout, flag, setFlag, URL } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { examSchedule, loading } = useExamSchedule();

  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [dataRegister, setDataRegister] = useState({});

  // Function handle
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  //RegisterExamSchedule
  const RegisterExamSchedule = async (body) => {
    console.log(body);
    let text = "Bạn đã đăng kí lịch trực ca thi này";
    if (confirm(text) == true) {
      try {
        const obj = {
          examinerID: localStorage.getItem("ID"),
          examSlotID: body,
        };
        const { url, options } = REGISTER_EXAM_SCHEDULE(obj);
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(obj);

        if (json.ok) {
          toast({
            status: "success",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Đăng kí trực",
            description: "Đăng kí thành công",
          });
          setFlag(!flag);
        } else {
          toast({
            status: "error",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Đăng kí trực",
            description: "Đăng kí ca không thành công",
          });
        }
      } catch (error) {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Đăng kí trực",
          description: "Đăng kí ca không thành công",
        });
      }
    } else {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Đăng kí trực",
        description: "Đăng kí ca không thành công",
      });
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Lịch Thi
            </Text>
            <Spacer />
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th borderColor={borderColor} color="gray.400">
                  Mã môn
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Tên môn
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Giờ bắt đầu
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Giờ kết thúc
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Trạng thái
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Chức năng
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!loading &&
                examSchedule.map((row, index, arr) => {
                  return (
                    <Tr>
                      {/* subCode */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {row.subjectID}
                          </Text>
                        </Flex>
                      </Td>
                      {/* subName */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {row.courseName}
                          </Text>
                        </Flex>
                      </Td>
                      {/* startTime */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="bold"
                          pb=".5rem"
                        >
                          {new Date(row.startTime).getHours() +
                            ":" +
                            new Date(row.startTime).getMinutes() +
                            " " +
                            (new Date(row.startTime).getDate() + 1) +
                            "/" +
                            (new Date(row.startTime).getMonth() + 1) +
                            "/" +
                            new Date(row.startTime).getFullYear()}
                        </Text>
                      </Td>
                      {/* endTime */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="bold"
                          pb=".5rem"
                        >
                          {new Date(row.endTime).getHours() +
                            ":" +
                            new Date(row.endTime).getMinutes() +
                            " " +
                            (new Date(row.endTime).getDate() + 1) +
                            "/" +
                            (new Date(row.endTime).getMonth() + 1) +
                            "/" +
                            new Date(row.endTime).getFullYear()}
                        </Text>
                      </Td>
                      {/* Status */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Badge
                          bg={
                            "CHƯA BẮT ĐẦU" === "CHƯA BẮT ĐẦU"
                              ? "green.400"
                              : "red"
                          }
                          color={
                            row.status === "CHƯA BẮT ĐẦU" ? "white" : "black"
                          }
                          fontSize="16px"
                          p="3px 10px"
                          borderRadius="8px"
                        >
                          CHƯA BẮT ĐẦU
                        </Badge>
                      </Td>
                      {/* Edit */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Menu>
                          {console.log(row)}
                          <Button
                            colorScheme="orange"
                            onClick={() => RegisterExamSchedule(row.examSlotID)}
                            as={Button}
                          >
                            Đăng kí
                          </Button>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {/* <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xác thực đăng kí ca thi</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Flex>
  );
}

export default TableRegister;
