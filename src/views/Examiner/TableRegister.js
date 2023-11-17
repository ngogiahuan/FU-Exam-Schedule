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
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// You should also import some data for the table
import { useHistory } from "react-router-dom";
// Import useContext value
import { useUser } from "../../components/share/UserContext";
import { REGISTER_EXAM_SCHEDULE, GET_ALL_EXAMSLOT } from "assets/api";
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
  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [dataExamSlot, setDataExamSlot] = useState();
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "navy.800");
  useEffect(() => {
    if (!localStorage.getItem("isLogin")) {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Đăng nhập",
        description: "Bạn cần phải đăng nhập tài khoản trước khi vào",
      });
      return history.push("/auth/signin");
    }

    const getAllExamSlot = async () => {
      try {
        const { url, options } = GET_ALL_EXAMSLOT();
        const response = await fetch(url, options);
        const json = await response.json();
        if (json && json.ok) {
          const dataDesc = json.result.sort((a, b) => {
            const startTimeA = new Date(a[1].startTime);
            const startTimeB = new Date(b[1].startTime);
            return startTimeB - startTimeA;
          });
          setDataExamSlot(dataDesc);
        }
      } catch (error) {}
    };
    getAllExamSlot();
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }, []);
  //RegisterExamSchedule
  const RegisterExamSchedule = async (examSlotID) => {
    let text = "Bạn đã đăng kí lịch trực ca thi này";
    if (confirm(text) == true) {
      try {
        const response = await fetch("https://swp3191.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examinerID: localStorage.getItem("ID"),
            examSlotID: examSlotID,
          }),
        });
        console.log(response);
        if (response.ok) {
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
              Danh sách các ca thi hiện có
            </Text>
            <Spacer />
            <InputGroup borderRadius="8px" w="200px">
              <InputLeftElement
                children={
                  <IconButton
                    bg="inherit"
                    borderRadius="inherit"
                    _hover="none"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                    icon={
                      <SearchIcon color={searchIconColor} w="15px" h="15px" />
                    }
                  ></IconButton>
                }
              />
              <Input
                id="myInput"
                type="text"
                variant="search"
                fontSize="xs"
                bg={inputBg}
                placeholder="Tìm kiếm..."
              />
            </InputGroup>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th borderColor={borderColor} color="gray.400">
                  STT
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Kỳ thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Mã ca thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Thời gian
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Ngày thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Trạng thái
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Chức năng
                </Th>
              </Tr>
            </Thead>
            <Tbody id="myTable">
              {dataExamSlot &&
                dataExamSlot?.map((row, index, arr) => {
                  return (
                    row[1]?.status === true && (
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
                              {index + 1}
                            </Text>
                          </Flex>
                        </Td>
                        {/* examBatchCode */}
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
                              {row[1]?.examBatchCode}
                            </Text>
                          </Flex>
                        </Td>
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
                              {row[1]?.examSlotID}
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
                            {String(
                              new Date(row[1]?.startTime).getHours() - 7
                            ).padStart(2, "0") +
                              ":" +
                              String(
                                new Date(row[1]?.startTime).getMinutes()
                              ).padStart(2, "0") +
                              " - " +
                              String(
                                new Date(row[1]?.endTime).getHours() - 7
                              ).padStart(2, "0") +
                              ":" +
                              String(
                                new Date(row[1]?.endTime).getMinutes()
                              ).padStart(2, "0")}
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
                            {new Date(row[1]?.startTime).getDate() +
                              "/" +
                              (new Date(row[1]?.startTime).getMonth() + 1) +
                              "/" +
                              new Date(row[1]?.startTime).getFullYear()}
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
                              row[1]?.status === "CHƯA BẮT ĐẦU"
                                ? "white"
                                : "black"
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
                            {console.log(row[1])}
                            {row[1]?.register?.find(
                              (item) =>
                                item?.examinerID ===
                                localStorage.getItem("examinerID")
                            ) ? (
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  RegisterExamSchedule(row[1]?.examSlotID)
                                }
                                as={Button}
                              >
                                Hủy đăng kí
                              </Button>
                            ) : (
                              <Button
                                colorScheme="orange"
                                onClick={() =>
                                  RegisterExamSchedule(row[1]?.examSlotID)
                                }
                                as={Button}
                              >
                                Đăng kí
                              </Button>
                            )}
                          </Menu>
                        </Td>
                      </Tr>
                    )
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
