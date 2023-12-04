// Library imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box } from "@chakra-ui/react";

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
import MonthDropdown from "components/MonthDropdown";
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
  const [selectedMonth, setSelectedMonth] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
  }, [flag]);
  //RegisterExamSchedule
  const RegisterExamSchedule = async (examSlotID) => {
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
  };
  //Update RegisterExamSchedule
  const UpdateRegisterExamSchedule = async (examSlotID) => {
      try {
        const response = await fetch(
          "https://swp3191.onrender.com/exam-room/update-register",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              examinerID: localStorage.getItem("examinerID"),
              examSlotID: examSlotID,
            }),
          }
        );
        console.log(response);
        if (response.ok) {
          toast({
            status: "success",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Hủy Đăng Ký",
            description: "Hủy Đăng Ký Thành Công",
          });
          setFlag(!flag);
        } else {
          toast({
            status: "error",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Hủy Đăng Ký",
            description: "Hủy Đăng Ký Không Thành Công",
          });
        }
      } catch (error) {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Hủy Đăng Ký",
          description: "Hủy Đăng Ký Không Thành Công",
        });
      }
  };
  const currentDate = new Date();
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <MonthDropdown onSelect={setSelectedMonth} />
          {/* ... (other code) */}
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
            {dataExamSlot &&
              dataExamSlot
                .filter((row) => {
                  if (!selectedMonth) return true;
                  const month = new Date(row[1]?.startTime).getMonth();
                  return month === months.indexOf(selectedMonth);
                })
                .map((row, index) => {
                  const isDisabled =
                    new Date(row[1]?.startTime).getTime() -
                      currentDate.getTime() <
                    1;
                  return (
                    row[1]?.status === true && (
                      <Box
                        key={index}
                        p="4"
                        borderWidth="1px"
                        borderRadius="md"
                        opacity={isDisabled ? 0.5 : 1} // Set opacity based on the condition
                      >
                        <Text fontSize="md" fontWeight="bold" pb=".5rem">
                          {row[1]?.examSlotID}
                        </Text>
                        <Text
                          className="flex flex-row justify-content-between"
                          fontSize="sm"
                          style={{ fontWeight: "bold" }}
                        >
                          <p>Thời gian</p>
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
                        <Text
                          className="flex flex-row justify-content-between"
                          fontSize="sm"
                          style={{ fontWeight: "bold" }}
                        >
                          <p>Ngày thi</p>
                          {String(
                            new Date(row[1]?.startTime).getDate()
                          ).padStart(2, "0") +
                            "/" +
                            String(
                              new Date(row[1]?.startTime).getMonth() + 1
                            ).padStart(2, "0") +
                            "/" +
                            String(new Date(row[1]?.startTime).getFullYear())}
                        </Text>
                        <Text
                          className="flex flex-row justify-content-between"
                          fontSize="sm"
                          style={{ fontWeight: "bold" }}
                        >
                          <p>Địa điểm</p>
                          {row[1]?.location}
                        </Text>

                        <Menu mt="4">
                          {console.log(row[1])}
                          {row[1]?.register?.find(
                            (item) =>
                              item?.examinerID ===
                              localStorage.getItem("examinerID")
                          ) ? (
                            <Button
                              colorScheme="red"
                              onClick={() =>
                                UpdateRegisterExamSchedule(row[1]?.examSlotID)
                              }
                              as={Button}
                              mt="2"
                            >
                              Hủy đăng kí
                            </Button>
                          ) : (
                            <Button
                              colorScheme="green"
                              onClick={() =>
                                RegisterExamSchedule(row[1]?.examSlotID)
                              }
                              as={Button}
                              mt="2"
                            >
                              Đăng kí
                            </Button>
                          )}
                        </Menu>
                      </Box>
                    )
                  );
                })}
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default TableRegister;
