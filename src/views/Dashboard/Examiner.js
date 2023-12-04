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
import { tablesTableData_ExamSlot } from "variables/examslot";
import { useDisclosure } from "@chakra-ui/react";

// Import useContext value
import { useExamSchedule } from "../../components/share/ExamScheduleContext";
import { useCourse } from "../../components/share/CourseContext";
import { DELETE_SLOT } from "assets/api";
import { useUser } from "../../components/share/UserContext";
import { GET_ALL_EXAMNIER } from "assets/api";
import { useHistory } from "react-router-dom";

function Examiner() {
  const history = useHistory();
  const toast = useToast();
  const { user, login, logout, flag, setFlag } = useUser();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");

  // Custone hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { course, loadingCourse } = useCourse();

  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // DataExaminer
  const [dataExaminer, setDataExaminer] = useState([]);
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
    const getAllExaminer = async () => {
      try {
        const { url, options } = GET_ALL_EXAMNIER();
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.result) {
          console.log(json?.result);
          setDataExaminer(json?.result);
          setFlag(!flag);
        }
      } catch (error) {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Examiner",
          description: "Hệ thống lỗi, mời bạn thử lại",
        });
      }
    };
    getAllExaminer();
  }, []);

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
      const response = await axios.post(
        "https://swp3191.onrender.com/exam-schedule",
        {
          courseID: courseID,
          code: code,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("POST request error:", error);
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
              Danh sách tất cả giám thị
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
                  Họ và tên
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Mail
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Năm kinh nghiệm
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Bộ môn
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Trạng thái
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {console.log(dataExaminer)}
              {dataExaminer &&
                dataExaminer?.map((row, index, arr) => {
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
                              {row.ID}
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
                            {row.name}
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
                            {row.email}
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
                          {row?.experienceYears}
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
                          {row?.specialization}
                        </Text>
                      </Td>
                      {/* Status */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <Badge
                          bg={row.status === true ? "green.400" : "red"}
                          color={row.status === true ? "white" : "black"}
                          fontSize="16px"
                          p="3px 10px"
                          borderRadius="8px"
                        >
                          {row?.status === true ? "Hoạt động" : "Tạm khóa"}
                        </Badge>
                      </Td>
                      {/* Edit */}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Thêm lịch thi mới</DrawerHeader>
          <DrawerBody>
            <form onSubmit={(e) => handleCreateExamSlot(e)}>
              <FormControl marginBottom={5} id="courseID" isRequired>
                <FormLabel>Course</FormLabel>
                <Select
                  placeholder="Lựa chọn Course"
                  id="courseID"
                  value={formData.courseID}
                  onChange={handleInputChange}
                >
                  {!loadingCourse &&
                    course.map((item) => (
                      <option key={item.ID} value={item.ID}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl marginBottom={5} id="code" isRequired>
                <FormLabel>Mã ca thi</FormLabel>
                <Input
                  type="text"
                  placeholder="Ví dụ: JS1701"
                  id="code"
                  value={formData.code}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl marginBottom={5} id="date" isRequired>
                <FormLabel>Ngày thi</FormLabel>
                <Input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl marginBottom={5} id="startTime" isRequired>
                <FormLabel>Thời gian bắt đầu</FormLabel>
                <Input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl marginBottom={5} id="endTime" isRequired>
                <FormLabel>Thời gian kết thúc</FormLabel>
                <Input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Flex mt={5}>
                <Button colorScheme="blue" type="submit">
                  Tạo mới
                </Button>
                <Spacer />
              </Flex>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Examiner;
