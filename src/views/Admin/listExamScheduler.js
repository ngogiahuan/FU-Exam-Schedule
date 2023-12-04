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
  Button,
  Spacer,
  useToast,
  ButtonGroup,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
} from "@chakra-ui/react";
/*
Import PrimeReact
*/
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Paginator } from "primereact/paginator";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import UpdateExamSlotDrawer from "./updateExamSlotDrawer.js";
// You should also import some data for the table
import { useHistory } from "react-router-dom";
// Import useContext value
import {
  DELETE_SLOT,
  GET_FULL_SLOT_INFO,
  DELETE_EXAMSLOT_BY_ID,
} from "assets/api";
import { useUser } from "../../components/share/UserContext";
import { NavLink } from "react-router-dom";
import { useCourse } from "../../components/share/CourseContext";
import { useClassRoom } from "../../components/share/ClassRoomContext";
import { addMinutes, format } from "date-fns";

function ListExamSchedulerComponent() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const { course, loadingCourse } = useCourse();
  const { classRoom, loadingClassRoom } = useClassRoom();
  const { user, flag, setFlag, URL } = useUser();
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const [isSecondDrawerOpen, setIsSecondDrawerOpen] = useState(false);
  const [isThirdDrawerOpen, setIsThirdDrawerOpen] = useState(false);
  const [isFourthDrawerOpen, setIsFourthDrawerOpen] = useState(false);

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
    const fetchDataExamSlotFullInfo = async () => {
      const { url, options } = GET_FULL_SLOT_INFO();
      const response = await fetch(url, options);
      const json = await response.json();
      if (json && json.ok) {
        const dataDesc = json.result.sort((a, b) => {
          const startTimeA = new Date(a.startTime);
          const startTimeB = new Date(b.startTime);
          return startTimeB - startTimeA;
        });
        setData(dataDesc);
      }
    };
    fetchDataExamSlotFullInfo();
  }, [flag]);
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

  const openThirdDrawer = () => {
    setIsThirdDrawerOpen(true);
  };

  const closeThirdDrawer = () => {
    setIsThirdDrawerOpen(false);
  };

  const openFourthDrawer = () => {
    setIsFourthDrawerOpen(true);
  };

  const closeFourthDrawer = () => {
    setIsFourthDrawerOpen(false);
  };

  // Bật/Tắt đổi giám thị
  const [visibleUpdateExaminer, setVisibleUpdateExamine] = useState(false);

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const history = useHistory();
  // Custone hook
  const toast = useToast();
  const [formData, setFormData] = useState({
    courseID: "",
    code: "",
    date: "",
    startTime: "7:30",
    endTime: "9:00", // Thời gian kết thúc mặc định
  });
  const [dataExamSlotInfo, setExamSlotInfo] = useState({
    dataExamSlotID: "",
    subjectID: "",
    subjectName: "",
    dataExaminer: [],
  });
  const [dataAddExaminer, setDataAddExaminer] = useState({
    examSlotID: "",
    examinerID: "",
    examRoomID: "",
  });
  const [dataBackupListExaminer, setDataBackupListExaminer] = useState([]);
  /*
  FUNCTION XỬ LÝ CRUD
  */
  // Call api create Slot thi
  const handleCreateExamSlot = async (e) => {
    e.preventDefault();
    const { courseID, code, date, startTime, endTime } = formData;
    // Combine date and time strings
    const startDateTimeString = `${date}T${startTime.padStart(2, "0")}:00.000Z`;
    const endDateTimeString = `${date}T${endTime.padStart(2, "0")}:00.000Z`;
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
        setFlag(!flag);
        closeFirstDrawer();
        setSubjectID(response.data.result.subjectID);
        setSubjectName(response.data.result.subjectName);
        setExamSlotID(response.data.result.dataExamSlotID);
      } else {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Ca thi",
          description: "Bạn vừa không tạo thành công ca thi",
        });
      }
    } catch (error) {
      console.error("POST request error:", error);
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

  // Call api lấy thông tin ExamSlot (ca thi)
  function getInfoByExamSlot(id) {
    const fetchData = async (id) => {
      try {
        getInfoByExamSlot;
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
          onOpen();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData(id);
  }
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
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng Thi",
          description: "Bạn vừa tạo thành công phòng thi",
        });
        setFlag(!flag);
        closeSecondDrawer();
      } else {
        toast({
          status: "errro",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng Thi",
          description: "Bạn vừa không tạo thành công phòng thi",
        });
      }
    } catch (error) {
      console.error("POST request error:", error);
    }
  };
  // Call API để đăng kí && cập nhật giám thị
  const handleAddExaminer = async (e) => {
    e.preventDefault();
    const { examSlotID, examinerID, examRoomID } = dataAddExaminer;
    try {
      const response = await axios.put(`${URL}/examRoom`, {
        examSlotID: examSlotID,
        examinerID: examinerID,
        examRoomID: examRoomID,
      });
      if (response.status === 200) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng Thi",
          description: "Bạn thêm thành công giám thị vào phòng thi",
        });
        setFlag(!flag);
        setDataAddExaminer({
          examSlotID: "",
          examinerID: "",
          examRoomID: "",
        });
        closeThirdDrawer();
      } else {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng Thi",
          description: "Bạn vừa thêm không thành công giám thị vào phòng thi",
        });
      }
    } catch (error) {
      console.error("POST request error:", error);
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Phòng Thi",
        description: "Bạn vừa thêm không thành công giám thị vào phòng thi",
      });
    }
  };
  /*
  FUNCTION XỬ LÝ CRUD
  */
  /*
    Custome Display Dialog
  */
  const displayButtonAddExaminer = (product) => {
    return product.name ? (
      <Button isDisabled bgColor="green.400" as={Button}>
        Thêm giám thị
      </Button>
    ) : (
      <Button
        onClick={() => {
          openThirdDrawer();
          setDataBackupListExaminer(product.ExaminerBackupList);
          setDataAddExaminer({
            ...dataAddExaminer,
            examRoomID: product.examRoomID,
          });
        }}
        bgColor="green.400"
        as={Button}
      >
        Thêm giám thị
      </Button>
    );
  };
  const displayButtonEdit = (product) => {
    return product.name ? (
      <ButtonGroup>
        <Button
          onClick={() => {
            console.log(product);
            setDataAddExaminer({
              examSlotID: "",
              examinerID: "",
              examRoomID: "",
            });
            setVisibleUpdateExamine(true);
          }}
          bgColor="green.400"
          as={Button}
        >
          Đổi giám thị
        </Button>
        <NavLink to={`/admin/detaiExamRoom/${product.examRoomID.trim()}`}>
          <Button bgColor="orange.400" as={Button}>
            Xem chi tiết
          </Button>
        </NavLink>
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <Button isDisabled bgColor="green.400" as={Button}>
          Chỉnh sửa
        </Button>
        <NavLink to={`/admin/detaiExamRoom/${product.examRoomID.trim()}`}>
          <Button bgColor="orange.400" as={Button}>
            Xem chi tiết
          </Button>
        </NavLink>
      </ButtonGroup>
    );
  };
  const footer = `Có tất cả ${products ? products.length : 0} phòng thi.`;
  // Function handle
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    if (id === "startTime") {
      // Tính toán thời gian kết thúc dựa trên thời gian bắt đầu và thời lượng (90 phút)
      const endTime = addMinutes(new Date(`2000-01-01T${value}`), 90);
      setFormData((prevData) => ({
        ...prevData,
        endTime: format(endTime, "HH:mm"), // Định dạng lại thời gian kết thúc
      }));
    }
  };
  /*
    Custome Paginator Prime React
  */
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  // Filter out rows where status is false
  const filteredData = data ? data.filter((i) => i?.status !== false) : [];

  // Slice the filtered data for current page display
  const currentPageData = filteredData.slice(first, first + rows);
  // Function to calculate STT
  const calculateSTT = (index) => {
    let count = 0;
    for (let j = 0; j <= index; j++) {
      if (currentPageData[j]?.status !== false) {
        count++;
      }
    }
    return first + count;
  };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Danh sách ca thi
            </Text>
            <Spacer />
            <Button
              onClick={openFirstDrawer}
              colorScheme="orange"
              variant="solid"
              textColor="black"
            >
              Thêm Slot Thi
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  STT
                </Th>
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Mã ca thi
                </Th>
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Kỳ thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Ngày
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Thời gian
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Số lượng giám thị tối đa
                </Th>

                <Th borderColor={borderColor} color="gray.400">
                  Tạo phòng
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Chức năng
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPageData &&
                currentPageData?.map((i, index) => {
                  return (
                    i?.status === true && (
                      <Tr
                        onClick={() => {
                          setVisible(true);
                          setProducts(i?.ExamRoomList);
                          setDataAddExaminer({
                            ...dataAddExaminer,
                            examSlotID: i?.examSlotID,
                          });
                        }}
                        key={index}
                        cursor="pointer"
                      >
                        <Td pl="0px" borderColor={borderColor}>
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
                                {calculateSTT(index)} {/* Calculated STT */}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td pl="0px" borderColor={borderColor}>
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
                                {i?.examSlotID}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td pl="0px" borderColor={borderColor}>
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
                                {i?.code}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        {/* subCode */}
                        <Td borderColor={borderColor}>
                          <Flex direction="column">
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="bold"
                            >
                              {new Date(i?.startTime).getDate() +
                                "/" +
                                (new Date(i?.startTime).getMonth() + 1) +
                                "/" +
                                new Date(i?.startTime).getFullYear()}
                            </Text>
                          </Flex>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Flex direction="column">
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="bold"
                            >
                              {String(
                                new Date(i?.startTime).getHours()
                              ).padStart(2, "0") +
                                ":" +
                                String(
                                  new Date(i?.startTime).getMinutes()
                                ).padStart(2, "0") +
                                " - " +
                                String(
                                  new Date(i?.endTime).getHours()
                                ).padStart(2, "0") +
                                ":" +
                                String(
                                  new Date(i?.endTime).getMinutes()
                                ).padStart(2, "0")}
                            </Text>
                          </Flex>
                        </Td>
                        <Td borderColor={borderColor}>
                          <Flex direction="column">
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="bold"
                            >
                              {i?.quantity}
                            </Text>
                          </Flex>
                        </Td>
                        {/* Status */}
                        <Td
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện click từ Td lan toả lên Tr
                          }}
                          cursor="pointer"
                          borderColor={borderColor}
                        >
                          <Button
                            onClick={() => {
                              openSecondDrawer();
                              getInfoByExamSlot(i?.examSlotID);
                            }}
                            bgColor="green.400"
                            as={Button}
                          >
                            Tạo phòng ngay
                          </Button>
                        </Td>
                        {/* Edit */}
                        <Td borderColor={borderColor}>
                          <ButtonGroup>
                            {/* <Button bgColor="green.400" as={Button}>
                              Chỉnh sửa
                            </Button>{" "} */}
                            <Button
                              onClick={(e) => {
                                e.stopPropagation(); // Ngăn sự kiện click từ Td lan toả lên Tr
                                deleteExamSlotByExamSlotId(i?.examSlotID);
                              }}
                              bgColor="red.400"
                              as={Button}
                            >
                              Xóa ca thi
                            </Button>
                            <div onClick={(e) => e.stopPropagation()}>
                              <UpdateExamSlotDrawer examSlotID={i?.examSlotID}/>
                            </div>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    )
                  );
                })}
            </Tbody>
          </Table>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={data?.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
          />
        </CardBody>
      </Card>
      <Dialog
        header="Danh sách phòng thi"
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => setVisible(false)}
      >
        <DataTable
          value={products}
          // header={header}
          footer={footer}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column field="examRoomID" header="ID Phòng thi"></Column>
          <Column field="classRoomCode" header="Phòng Thi"></Column>
          <Column field="subjectName" header="Môn"></Column>
          <Column field="name" header="Giám thị"></Column>
          <Column
            header="Thêm giám thị"
            body={displayButtonAddExaminer}
          ></Column>
          <Column header="Chức năng" body={displayButtonEdit}></Column>
        </DataTable>
      </Dialog>
      {/* First Drawer */}
      <Drawer
        isOpen={isFirstDrawerOpen}
        placement="right"
        onClose={closeFirstDrawer}
      >
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
                        {item.subjectID}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl marginBottom={5} id="code" isRequired>
                <FormLabel>Kỳ Thi</FormLabel>
                <Select
                  placeholder="Lựa chọn kỳ thi"
                  id="code"
                  value={formData.code}
                  onChange={handleInputChange}
                >
                  <option value="PE">PE</option>
                  <option value="FE">FE</option>
                  <option value="RE">RETAKE</option>
                </Select>
                {/* <Input
                  type="text"
                  placeholder="Ví dụ: JS1701"
                  id="code"
                  value={formData.code}
                  onChange={handleInputChange}
                /> */}
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
                <Select
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                >
                  <option value="07:30">7:30</option>
                  <option value="09:30">9:30</option>
                  <option value="11:30">11:30</option>
                </Select>
                {/* <Input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                /> */}
              </FormControl>
              <FormControl marginBottom={5} id="endTime" isRequired>
                <FormLabel>Thời gian kết thúc</FormLabel>
                <Select
                  isDisabled
                  id="endTime"
                  value={formData.endTime}
                  readOnly
                >
                  <option value={formData.endTime}>{formData.endTime}</option>
                </Select>
                {/* <Input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                /> */}
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
      {/* Second Drawer */}
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
                <FormLabel>Phòng thi</FormLabel>
                <Select
                  placeholder="Lựa chọn phòng thi"
                  id="classRoomID"
                  value={formData.classRoomID}
                  onChange={handleInputChange}
                >
                  {!loadingClassRoom &&
                    classRoom.map(
                      (item) =>
                        item?.status === true && (
                          <option key={item.ID} value={item.ID}>
                            {item.ID}
                          </option>
                        )
                    )}
                </Select>
              </FormControl>

              {/* Chọn thông giám thị coi thi */}

              {/* Thông tin slot thi vừa tạo */}
              <FormControl marginBottom={5} id="dataExamSlotID" isRequired>
                <FormLabel>Slot thi</FormLabel>
                <Input
                  type="text"
                  id="dataExamSlotID"
                  value={
                    (formData.dataExamSlotID = dataExamSlotInfo.dataExamSlotID)
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
      {/* Third Drawer */}
      <Drawer
        isOpen={isThirdDrawerOpen}
        placement="right"
        onClose={closeThirdDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Stack>
            <DrawerHeader display="flex" gap="0.5" borderBottomWidth="1px">
              Đăng kí giám thị
            </DrawerHeader>
          </Stack>
          <DrawerBody>
            {/* Chọn thông giám thị coi thi */}
            <FormControl marginBottom={5} id="examinerID" isRequired>
              <FormLabel>Giám thị</FormLabel>
              <Select
                placeholder="Lựa chọn giám thị"
                id="examinerID"
                value={dataAddExaminer.examinerID}
                onChange={(e) => {
                  setDataAddExaminer({
                    ...dataAddExaminer,
                    examinerID: e.target.value,
                  });

                  console.log(dataAddExaminer);
                }}
              >
                {console.log(dataBackupListExaminer)}
                {dataBackupListExaminer &&
                  dataBackupListExaminer?.map((item) => (
                    <option key={item.examinerID} value={item.examinerID}>
                      {item.examinerName}
                    </option>
                  ))}
              </Select>
            </FormControl>
            {/* Thông tin slot thi vừa tạo */}
            <FormControl marginBottom={5} id="dataExamSlotID" isRequired>
              <FormLabel>ID slot thi</FormLabel>
              <Input
                type="text"
                id="dataExamSlotID"
                value={dataAddExaminer.examSlotID}
              />
            </FormControl>

            {/* Thông tin mã môn thi */}
            <FormControl marginBottom={5} id="subjectName" isRequired>
              <FormLabel>ID phòng thi</FormLabel>
              <Input
                isDisabled
                type="text"
                id="subjectName"
                value={dataAddExaminer.examRoomID}
              />
            </FormControl>
            <Flex mt={5}>
              <Button
                onClick={(e) => handleAddExaminer(e)}
                colorScheme="blue"
                type="submit"
              >
                Thêm giám thị
              </Button>
              <Spacer />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Dialog Update Examiner */}
      <Dialog
        header="Header"
        visible={visibleUpdateExaminer}
        style={{ width: "50vw" }}
        onHide={() => setVisibleUpdateExamine(false)}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </Flex>
  );
}
export default ListExamSchedulerComponent;
