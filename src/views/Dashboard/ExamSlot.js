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
  ButtonGroup,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// You should also import some data for the table
import { tablesTableData_ExamSlot } from "variables/examslot";
import { useDisclosure } from "@chakra-ui/react";

// Import useContext value
import { useClassRoom } from "../../components/share/ClassRoomContext";
import { useExaminer } from "../../components/share/ExaminerContext";
import { useExamSlot } from "../../components/share/ExamSlotContext";
import { useExamRoom } from "../../components/share/ExamRoomContext";
import { useUser } from "../../components/share/UserContext";
import { useExamSchedule } from "../../components/share/ExamScheduleContext";
import { useCourse } from "../../components/share/CourseContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { DELETE_EXAMSLOT_BY_ID, GET_ALL_EXAMSLOT } from "assets/api";

function Billing() {
  const history = useHistory();
  const [dataExamSlot, setDataExamSlot] = useState();
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
        const temp = json.result;
        temp.sort((a, b) => {
          const startTimeA = new Date(a.startTime);
          const startTimeB = new Date(b.startTime);
          return startTimeB - startTimeA;
        });
        setDataExamSlot(temp);
      } catch (error) {}
    };
    getAllExamSlot();
  }, []);

  console.log(dataExamSlot);
  //
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const [isSecondDrawerOpen, setIsSecondDrawerOpen] = useState(false);

  const openFirstDrawer = () => {
    setIsFirstDrawerOpen(true);
  };

  const closeFirstDrawer = () => {
    setIsFirstDrawerOpen(false);
  };

  const openSecondDrawer = () => {
    setIsSecondDrawerOpen(true);
  };

  const closeSecondDrawer = () => {
    setIsSecondDrawerOpen(false);
  };

  // Chakra color modeloadingExamSlot
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const toast = useToast();
  const { classRoom, loadingClassRoom } = useClassRoom();
  const { examiner, loadingExaminer } = useExaminer();
  const [dataExamSlotInfo, setExamSlotInfo] = useState({
    dataExamSlotID: "",
    subjectID: "",
    subjectName: "",
    dataExaminer: [],
  });

  const { user, login, logout, flag, setFlag, URL } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenCreateExamSlot, setIsOpenCreateExamSlot] = useState(false);
  const [isOnClose, setIsOnClose] = useState(false);
  const { examSchedule, loading } = useExamSchedule();
  const { setSubjectID, setSubjectName, setExamSlotID } = useExamRoom();
  const { course, loadingCourse } = useCourse();
  const [loadingExamSlotInfo, setLoadingExamSlotInfo] = useState(true);

  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Call api tạo thông tin phòng thi
  const handleCreateExamRoom = async (e) => {
    e.preventDefault();
    const { classRoomID, dataExamSlotID, subjectID, examinerID } = formData;
    try {
      const response = await axios.post(`${URL}/exam-room`, {
        classRoomID: classRoomID,
        dataExamSlotID: dataExamSlotID,
        subjectID: subjectID,
        examinerID: examinerID,
      });
      if (response.status === 200) {
        alert("Tạo phòng thi thành công");
        setFlag(!flag);
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert("Tạo phòng thi thất bại");
    }
  };

  function getInfoByExamSlot(id) {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`${URL}/examSlot/info/${id}`, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data) {
          let item = {
            dataExamSlotID: response?.data?.result[0].examSlotID,
            subjectID: response?.data?.result[0].subjectID,
            subjectName: response?.data?.result[0].subjectName,
          };
          setExamSlotInfo(item);
          setLoadingExamSlotInfo(false);
          onOpen();
        }
      } catch (error) {
        console.error("Error:", error);
        setLoadingExamSlotInfo(false);
        alert("Ca thi không có thông tin để thực hiện tạo phòng thi");
      }
    };
    fetchData(id);
  }

  // Function handle
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

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
      if (response.data) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Ca thi",
          description: "Bạn vừa tạo thành công ca thi",
        });
        setSubjectID(response.data.result.subjectID);
        setSubjectName(response.data.result.subjectName);
        setExamSlotID(response.data.result.dataExamSlotID);
        setFlag(!flag);
        // history.push("/admin/examRoom");
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert("Tạo ca thi thất bại");
    }
  };

  // Call API delete Exam Slot
  const deleteExamSlotByExamSlotId = async (id) => {
    if (localStorage.getItem("role").trim() === "Admin") {
      const { url, options } = DELETE_EXAMSLOT_BY_ID(id);
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
      if (json && json.isSuccess === true) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Ca thi",
          description: "Bạn đã xóa ca thi thành công",
        });
        setFlag(!flag);
      } else {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Ca thi",
          description:
            "Bạn không xóa được ca thi, do ca thi đã được đăng kí phòng thi",
        });
      }
      try {
      } catch (error) {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Hệ thống",
          description: "Hệ thống đang gặp lỗi, mời bạn thử lại sau",
        });
      }
    } else {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Phân quyền",
        description: "Bạn không phải là Admin nên sẽ không được xóa ca thi này",
      });
    }
  };
  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px" flexWrap>
            <Flex>
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Danh sách ca thi
              </Text>
              <Spacer />
              <ButtonGroup>
                <Button
                  onClick={openFirstDrawer}
                  colorScheme="blue"
                  variant="solid"
                >
                  Thêm Slot Thi
                </Button>
              </ButtonGroup>
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
                    Mã thi
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Thời gian bắt đầu
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Thời gian kết thúc
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Tổng số giám thị
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Chức năng
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataExamSlot &&
                  dataExamSlot?.map((row, index, arr) => {
                    if (row[1]?.status === true) {
                      return (
                        <Tr Key={index}>
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
                                {row[1].examBatchCode}
                              </Text>
                            </Flex>
                          </Td>
                          {/* startTime */}
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
                                {new Date(row[1].startTime).getHours() +
                                  ":" +
                                  new Date(row[1].startTime).getMinutes() +
                                  " " +
                                  (new Date(row[1].startTime).getDate() + 1) +
                                  "/" +
                                  (new Date(row[1].startTime).getMonth() + 1) +
                                  "/" +
                                  new Date(row[1].startTime).getFullYear()}
                              </Text>
                            </Flex>
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
                            >
                              {new Date(row[1].endTime).getHours() +
                                ":" +
                                new Date(row[1].endTime).getMinutes() +
                                " " +
                                (new Date(row[1].endTime).getDate() + 1) +
                                "/" +
                                (new Date(row[1].endTime).getMonth() + 1) +
                                "/" +
                                new Date(row[1].endTime).getFullYear()}
                            </Text>
                          </Td>
                          {/* quantity */}
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
                              {row[1].quantity}
                            </Text>
                          </Td>
                          {/* Edit */}
                          <Td
                            borderColor={borderColor}
                            borderBottom={index ? "none" : null}
                          >
                            <ButtonGroup>
                              {console.log(row[1].ID)}
                              <Button
                                colorScheme="green"
                                disabled={row[1].quantity > 1}
                                onClick={() => {
                                  openSecondDrawer();
                                  getInfoByExamSlot(row[1].examSlotID);
                                }}
                              >
                                Tạo phòng thi
                              </Button>
                              {console.log(row[1].register)}

                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  deleteExamSlotByExamSlotId(row[1].examSlotID)
                                }
                              >
                                Xóa ca thi
                              </Button>
                            </ButtonGroup>
                          </Td>
                        </Tr>
                      );
                    }
                  })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
        <Drawer
          isOpen={isFirstDrawerOpen}
          placement="right"
          onClose={closeFirstDrawer}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Thêm lịch thi mới
            </DrawerHeader>
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

        <Drawer
          isOpen={isSecondDrawerOpen}
          placement="right"
          onClose={closeSecondDrawer}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Stack>
              <DrawerHeader display="flex" gap="0.5" borderBottomWidth="1px">
                Nhập thông tin phòng thi
              </DrawerHeader>
            </Stack>
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
                <FormControl marginBottom={5} id="dataExamSlotID" isRequired>
                  <FormLabel>Slot vừa tạo</FormLabel>
                  <Input
                    type="text"
                    id="dataExamSlotID"
                    value={
                      (formData.dataExamSlotID =
                        dataExamSlotInfo.dataExamSlotID)
                    }
                    readOnly
                  />
                </FormControl>

                {/* Thông tin mã môn thi */}
                <FormControl marginBottom={5} id="subjectName" isRequired>
                  <FormLabel>Tên môn thi</FormLabel>
                  <Input
                    type="text"
                    id="subjectName"
                    value={dataExamSlotInfo.subjectName}
                    readOnly
                  />
                  <Input
                    type="text"
                    id="subjectID"
                    value={(formData.subjectID = dataExamSlotInfo.subjectID)}
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
    </>
  );
}

export default Billing;
