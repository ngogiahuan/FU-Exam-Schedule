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

function Billing() {
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
  }, []);
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
  const { setSubjectID, setSubjectName, setExamSlotID } = useExamRoom();
  const { course, loadingCourse } = useCourse();

  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Call api create Slot thi
  const handleCreateExamSlot = async (e) => {
    e.preventDefault();

    const { courseID, code, date, startTime, endTime } = formData;

    // Combine date and time strings
    const startDateTimeString = `${date}T${startTime}:00.000Z`;
    const endDateTimeString = `${date}T${endTime}:00.000Z`;

    // Convert to Date objects

    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);
    try {
      const response = await axios.post(`${URL}/exam-schedule`, {
        courseID: courseID,
        code: code,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      });
      console.log(response.data);
      if (response.data) {
        alert(
          "Tạo ca thi thành công, hệ thống sẽ điều hướng bạn đến trang nhập thông tin"
        );
        setSubjectID(response.data.result.subjectID);
        setSubjectName(response.data.result.subjectName);
        setExamSlotID(response.data.result.examSlotID);
        history.push("/admin/examRoom");
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert("Tạo ca thi thất bại");
    }
  };

  // Function handle
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // deleteExamSlotbyId
  const deleteExamSlotbyId = async (id) => {
    try {
      const { url, options } = DELETE_SLOT(id);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Exam Slot",
          description: "Bạn đã xóa thành công",
        });
        setFlag(!flag);
      }
    } catch (error) {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Exam Slot",
        description: "Bạn xóa không thành công",
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
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  ID
                </Th>
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
                  console.log(row);
                  return (
                    <Tr>
                      {/* ID */}
                      <Td
                        pl="0px"
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Flex
                          align="center"
                          py=".8rem"
                          minWidth="100%"
                          flexWrap="nowrap"
                        >
                          <Flex direction="column">
                            <Text
                              fontSize="md"
                              color={titleColor}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              {row.examSlotID}
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
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
                          <MenuButton as={Button}>Chức năng</MenuButton>
                          <MenuList>
                            <MenuItem>Chỉnh sửa</MenuItem>
                            <MenuItem
                              onClick={() =>
                                deleteExamSlotbyId(row?.examSlotID)
                              }
                            >
                              Xóa Slot
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Billing;
