// Library imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

/*
Import PrimeReact
*/
import { Chip } from "primereact/chip";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// You should also import some data for the table
import { useHistory } from "react-router-dom";
import { GET_ALL_STUDENT_BY_EXAM_ROOM_ID } from "assets/api";
import { useUser } from "../../components/share/UserContext";

// Component hiển thị Menu điểm danh giám thị
const AttendanceComponent = ({ data }) => {
  const { user, flag, setFlag, URL } = useUser();
  const [attendanceTextDisplay, setAttendanceTextDisplay] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(
    data?.attendanceStatus
  );
  const toast = useToast();

  // Function xử lý điểm danh
  const handleAttendance = async (text) => {
    setAttendanceStatus(text);
    try {
      const response = await fetch(
        `${URL}/examRoom/attendance/${data?.examRoomID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendanceStatus: text }),
        }
      );

      if (response.ok) {
        toast({
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
          title: "Điểm danh",
          description: "Bạn đã thêm điểm danh thành công",
        });
      } else {
        console.error("ERROR: ", response);
        throw new Error("Điểm danh không thành công");
      }
    } catch (error) {
      console.error("ERROR: ", error);
      toast({
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
        title: "Điểm danh",
        description: "Bạn điểm danh không thành công",
      });
    }
  };

  // Function xử lý hiển thị text display
  useEffect(() => {
    switch (attendanceStatus) {
      case "not_yet":
        setAttendanceTextDisplay("Chưa bắt đầu");
        break;
      case "present":
        setAttendanceTextDisplay("Có mặt");
        break;
      case "absent":
        setAttendanceTextDisplay("Vắng mặt");
        break;
      default:
        setAttendanceTextDisplay("Chưa bắt đầu");
        break;
    }
  }, [attendanceStatus]);

  return (
    <Menu>
      <MenuButton
        ml="2%"
        bgColor="orange.400"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {attendanceTextDisplay ? attendanceTextDisplay : "Loading..."}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            handleAttendance("not_yet");
            setAttendanceTextDisplay("Chưa bắt đầu");
          }}
        >
          Chưa bắt đầu
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAttendance("present");
            setAttendanceTextDisplay("Có mặt");
          }}
        >
          Có mặt
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAttendance("absent");
            setAttendanceTextDisplay("Vắng mặt");
          }}
        >
          Vắng mặt
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

/*
  Prime React 
*/
function DetailExamRoomComponent() {
  const classExamRoomId = useParams();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadForm, setDataLoadform] = useState(true);
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const { user, flag, setFlag, URL } = useUser();
  const openFirstDrawer = () => {
    setIsFirstDrawerOpen(true);
  };
  const closeFirstDrawer = () => {
    setIsFirstDrawerOpen(false);
  };
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
    const fetchDataDetailExamRoomByClassRoomID = async () => {
      const { url, options } = GET_ALL_STUDENT_BY_EXAM_ROOM_ID(
        classExamRoomId.id
      );
      const response = await fetch(url, options);
      const json = await response.json();
      if (json && json.ok) {
        setData(json.result);
        console.log(data);
      }
    };
    fetchDataDetailExamRoomByClassRoomID();
  }, [loadForm]);
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const history = useHistory();
  // Custone hook
  const toast = useToast();

  /*
  Custom Modal 
  */
  const [dataTemp, setDataTemp] = useState({
    examSlotID: "",
    examRoomID: "",
  });
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("examSlotID", dataTemp?.examSlotID);
    formData.append("examRoomID", dataTemp?.examRoomID);
    try {
      const response = await fetch(`${URL}/exam-room/import-excel`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng thi",
          description: "Bạn đã thêm sinh viên thành công",
        });
      } else {
        // Handle error, e.g., show an error message
        console.error(response);
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phòng thi",
          description: "Thêm sinh viên không thành công",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("ERROR: ", response);
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Phòng thi",
        description: "Thêm sinh viên không thành công",
      });
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <>
        <Card mb="2%">
          <CardHeader
            overflowX={{ sm: "scroll", xl: "hidden" }}
            mb="2%"
            pb="0px"
          >
            <Flex>
              <Text fontSize="xl" color={textColor}>
                Thông tin chi tiết phòng thi
              </Text>
              <Spacer />
            </Flex>
          </CardHeader>
          <CardBody>
            {/* Row1 */}
            <div class="grid">
              <div class="col-3">
                <div class="p-3 border-round-sm bg-secondary font-bold">
                  <Text color={textColor} fontWeight="bold">
                    Ca Thi {"  "}{" "}
                    <Chip label={data && data[0][0]?.examSlotID} />
                  </Text>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 border-round-sm bg-secondary font-bold ">
                  <Text color={textColor} fontWeight="bold">
                    Lọai thi {"  "} <Chip label={data && data[0][0]?.code} />
                  </Text>
                </div>
              </div>
              <div class="col">
                <div class="p-3 border-round-sm bg-secondary font-bold ">
                  <Button
                    width="15rem"
                    onClick={() => {}}
                    bgColor="orange.400"
                    as={Button}
                  >
                    <a
                      href={`https://swp3191.onrender.com/examRoom/download/${classExamRoomId.id}`}
                    >
                      Export Thông tin phòng thi
                    </a>
                  </Button>
                  {data && <AttendanceComponent data={data[0][0]} />}
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div class="grid">
              <div class="col-3">
                <div class="p-3 border-round-sm bg-secondary font-bold">
                  <Text color={textColor} fontWeight="bold">
                    Phòng Thi {"  "}
                    <Chip label={data && data[0][0]?.classRoomCode} />
                  </Text>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 border-round-sm bg-secondary font-bold">
                  Ngày thi{" "}
                  <Chip
                    label={
                      data &&
                      new Date(data[0][0]?.startTime).getHours() +
                        ":" +
                        new Date(data[0][0]?.startTime).getMinutes() +
                        " - " +
                        new Date(data[0][0]?.endTime).getHours() +
                        ":" +
                        new Date(data[0][0]?.endTime).getMinutes() +
                        " " +
                        (new Date(data[0][0]?.startTime).getDate() + 1) +
                        "/" +
                        (new Date(data[0][0]?.startTime).getMonth() + 1) +
                        "/" +
                        new Date(data[0][0]?.startTime).getFullYear()
                    }
                  />
                </div>
              </div>
              <div class="col">
                <div class="flex p-3 border-round-sm bg-secondary font-bold ">
                  <Button
                    width="15rem"
                    onClick={() => {
                      openFirstDrawer();
                      setDataTemp({
                        ...dataTemp,
                        examSlotID: data[0][0]?.examSlotID,
                        examRoomID: data[0][0]?.examRoomID,
                      });
                    }}
                    bgColor="orange.400"
                    as={Button}
                  >
                    Thêm sinh viên (Excel)
                  </Button>
                  <Button
                    onClick={() => {}}
                    ml="2%"
                    bgColor="orange.400"
                    as={Button}
                  >
                    Thêm thủ công
                  </Button>
                </div>
              </div>
            </div>
            {/* Row3 */}
            <div class="grid">
              <div class="col-3">
                <div class="p-3 border-round-sm bg-secondary font-bold">
                  <Text color={textColor} fontWeight="bold">
                    Giám thị {"  "}
                    <Chip label={data && data[0][0]?.examinerName} />
                  </Text>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px" flexWrap>
            <Flex>
              <Text fontSize="xl" color={textColor}>
                Danh sách sinh viên
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
                  <Th pl="0px" borderColor={borderColor} color="gray.400">
                    Họ và tên
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    MSSV
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Ngày sinh
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Chuyên ngành
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Email
                  </Th>
                  <Th borderColor={borderColor} color="gray.400">
                    Năm nhập học
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data[1]?.map((i, index) => (
                    <Tr key={index}>
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
                              {index + 1}
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
                      {/* studentName */}
                      <Td pl="0px" borderColor={borderColor}>
                        <Text
                          fontSize="md"
                          color={titleColor}
                          fontWeight="bold"
                          minWidth="100%"
                        >
                          {i?.studentName}
                        </Text>
                      </Td>
                      {/* studentID */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {i?.studentID}
                          </Text>
                        </Flex>
                      </Td>
                      {/* dateOfBirth */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {new Date(i?.dateOfBirth).getDate() +
                              1 +
                              "/" +
                              (new Date(i?.dateOfBirth).getMonth() + 1) +
                              "/" +
                              new Date(i?.dateOfBirth).getFullYear()}
                          </Text>
                        </Flex>
                      </Td>
                      {/* major */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {i?.major}
                          </Text>
                        </Flex>
                      </Td>
                      {/* email */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {i?.email}
                          </Text>
                        </Flex>
                      </Td>
                      {/* yearOfStudy */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {i?.yearOfStudy}
                          </Text>
                        </Flex>
                      </Td>
                      {/* Status */}
                      {/* <Td borderColor={borderColor}>
                      {i?.status === true ? (
                        <Button bgColor="green.400" as={Button}>
                          Đang hoạt động
                        </Button>
                      ) : (
                        <Button bgColor="red.400" as={Button}>
                          Tạm dừng
                        </Button>
                      )}
                    </Td> */}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isFirstDrawerOpen}
        onClose={closeFirstDrawer}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mời bạn chọn File Excel cần nhập</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Mã phòng thi</FormLabel>
                <Input ref={initialRef} value={dataTemp?.examRoomID} readOnly />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Mã ca thi</FormLabel>
                <Input value={dataTemp?.examSlotID} readOnly />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tải lên File Excel</FormLabel>
                <Input
                  type="file"
                  name="excelFile"
                  id="excelFile"
                  accept=".xls, .xlsx"
                  required
                />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Thêm
              </Button>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
}
export default DetailExamRoomComponent;
