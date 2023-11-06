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

function Billing() {
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
  // Custone hook
  const { examSlot, loadingExamSlot } = useExamSlot();
  const { classRoom, loadingClassRoom } = useClassRoom();
  const { examiner, loadingExaminer } = useExaminer();
  const [examSlotInfo, setExamSlotInfo] = useState({
    examSlotID: "",
    subjectID: "",
    subjectName: "",
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
        if (response.data) {
          let item = {
            examSlotID: response?.data?.result[0].examSlotID,
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
        setExamSlotID(response.data.result.examSlotID);
        setFlag(!flag);
        // history.push("/admin/examRoom");
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert("Tạo ca thi thất bại");
    }
  };

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px" flexWrap>
            <Flex>
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Danh sách phòng thi
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
                {!loadingExamSlot &&
                  examSlot.map((row, index, arr) => {
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
                        {/* examBatchID */}
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
                              {row.examBatchID}
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
                            {row.quantity}
                          </Text>
                        </Td>
                        {/* Edit */}
                        <Td
                          borderColor={borderColor}
                          borderBottom={index ? "none" : null}
                        >
                          <Button
                            disabled={row.quantity > 1}
                            onClick={() => {
                              openSecondDrawer();
                              getInfoByExamSlot(row.ID);
                            }}
                            p="0px"
                            bg="transparent"
                            variant="no-effects"
                          >
                            <Text
                              fontSize="md"
                              color="blue.400"
                              fontWeight="bold"
                              cursor="pointer"
                            >
                              Tạo phòng thi
                            </Text>
                          </Button>
                        </Td>
                      </Tr>
                    );
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
                <FormControl marginBottom={5} id="examSlotID" isRequired>
                  <FormLabel>Slot vừa tạo</FormLabel>
                  <Input
                    type="text"
                    id="examSlotID"
                    value={(formData.examSlotID = examSlotInfo.examSlotID)}
                    readOnly
                  />
                </FormControl>

                {/* Thông tin mã môn thi */}
                <FormControl marginBottom={5} id="subjectName" isRequired>
                  <FormLabel>Tên môn thi</FormLabel>
                  <Input
                    type="text"
                    id="subjectName"
                    value={examSlotInfo.subjectName}
                    readOnly
                  />
                  <Input
                    type="text"
                    id="subjectID"
                    value={(formData.subjectID = examSlotInfo.subjectID)}
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