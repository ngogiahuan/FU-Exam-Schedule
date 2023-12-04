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
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import StudentModal from "components/Modal/StudentModal.js";
import ExcelModal from "components/Modal/ExcelModal.js";
// Import useContext value
import { useExamRoom } from "../../components/share/ExamRoomContext";
import { useClassRoom } from "../../components/share/ClassRoomContext";
import { useExaminer } from "../../components/share/ExaminerContext";
import { useUser } from "components/share/UserContext";
import { useHistory } from "react-router-dom";
import { GET_ALL_EXAMROOM } from "assets/api";

function ExamRoom() {
  const history = useHistory();
  const [isAddStudentrOpen, setIsAddStudentrOpen] = useState(false);
  const [isAddStudentExcelOpen, setIsAddStudentExcelOpen] = useState(false);
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  // Custone hook
  const { user, login, logout, flag, setFlag, URL } = useUser();
  const {
    examRoom,
    loadingExamRoom,
    subjectID,
    subjectName,
    examSlotID,
  } = useExamRoom();
  const { classRoom, loadingClassRoom } = useClassRoom();
  const { examiner, loadingExaminer } = useExaminer();
  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [dataExamRoom, setDataExamRoom] = useState();
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
    const getAllExamRoom = async () => {
      try {
        const { url, options } = GET_ALL_EXAMROOM();
        const response = await fetch(url, options);
        const json = await response.json();
        setDataExamRoom(json.result);
      } catch (error) {}
    };
    getAllExamRoom();
  }, []);
  const openAddStudentr = () => {
    setIsAddStudentrOpen(true);
  };
  const closeAddStudentr = () => {
    setIsAddStudentrOpen(false);
  };
  const openAddStudentExcel = () => {
    setIsAddStudentExcelOpen(true);
  };
  const closeAddStudentExcel = () => {
    setIsAddStudentExcelOpen(false);
  };
  // Call api tạo thông tin phòng thi
  const handleCreateExamRoom = async (e) => {
    e.preventDefault();
    const { classRoomID, examSlotID, subjectID, examinerID } = formData;
    try {
      const response = await axios.post(`${URL}/exam-room`, {
        classRoomID: classRoomID,
        examSlotID: examSlotID,
        subjectID: subjectID,
        examinerID: examinerID,
      });
      if (response.status === 200) {
        alert("Tạo phòng thi thành công");
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert("Tạo phòng thi thất bại");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("https://swp3191.onrender.com/exam-room/import-excel", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Danh sách phòng thi
            </Text>
            <Spacer />
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  STT
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Phòng thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Mã slot thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Mã môn
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Mã giám thị
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Chức năng
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataExamRoom &&
                dataExamRoom?.map((examRoom, index) => {
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
                              {index + 1}
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
                      {/* classRoomCode */}
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
                            {examRoom.classRoomCode}
                          </Text>
                        </Flex>
                      </Td>
                      {/* examSlotID */}
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
                            {examRoom.examSlotID}
                          </Text>
                        </Flex>
                      </Td>
                      {/* subjectID */}
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
                          {examRoom.subjectID}
                        </Text>
                      </Td>
                      {/* examinerID */}
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
                          {examRoom.examinerID}
                        </Text>
                      </Td>
                      {/* Edit */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        <StudentModal
                          examSlotID={examRoom.examSlotID}
                          examRoomID={examRoom.examRoomID}
                        />
                        <ExcelModal
                          examSlotID={examRoom.examSlotID}
                          examRoomID={examRoom.examRoomID}
                        />
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {/* Add Student */}
      <Drawer
        isOpen={isAddStudentrOpen}
        placement="right"
        onClose={closeAddStudentr}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Nhập thông tin phòng thi
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={(e) => handleCreateExamRoom(e)}>
              {/* Chọn thông tin lớp */}
              <FormControl marginBottom={5} id="classRoomID" isRequired>
                <FormLabel>Mã lớp</FormLabel>
                <Select
                  placeholder="Lựa chọn phòng thi"
                  id="classRoomID"
                  value={formData.classRoomID}
                  onChange={handleInputChange}
                >
                  {!loadingClassRoom &&
                    classRoom.map((item) => (
                      <option key={item.ID} value={item.ID}>
                        {item.ID}
                      </option>
                    ))}
                </Select>
              </FormControl>

              {/* Chọn thông giám thị coi thi */}
              <FormControl marginBottom={5} id="examinerID" isRequired>
                <FormLabel>Giám thị</FormLabel>
                <Select
                  placeholder="Lựa chọn giám thị"
                  id="examinerID"
                  value={formData.examinerID}
                  onChange={handleInputChange}
                >
                  {!loadingExaminer &&
                    examiner.map((item) => (
                      <option key={item.ID} value={item.ID}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              {/* Thông tin slot thi vừa tạo */}
              <FormControl marginBottom={5} id="examSlotID" isRequired>
                <FormLabel>Slot vừa tạo</FormLabel>
                <Input
                  type="text"
                  id="examSlotID"
                  defaultValue={examSlotID}
                  readOnly
                />
              </FormControl>

              {/* Thông tin mã môn thi */}
              <FormControl marginBottom={5} id="subjectName" isRequired>
                <FormLabel>Tên môn thi</FormLabel>
                <Input
                  type="text"
                  id="subjectName"
                  defaultValue={subjectName}
                  readOnly
                />
                <Input
                  type="text"
                  id="subjectID"
                  defaultValue={subjectID}
                  style={{ display: "none" }}
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

export default ExamRoom;
