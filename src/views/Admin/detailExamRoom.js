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
} from "@chakra-ui/react";
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
import ExcelModal from "components/Modal/ExcelModal.js";
import StudentModal from "components/Modal/StudentModal";
import { useUser } from "../../components/share/UserContext";
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
  }, [flag]);
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
  const handleSubmit = (e) => {
    console.log(dataTemp?.examSlotID);
    console.log(dataTemp?.examRoomID);
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("examSlotID", dataTemp?.examSlotID);
    formData.append("examRoomID", dataTemp?.examRoomID);
    console.log(formData);
    fetch(`${URL}/exam-room/import-excel`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
        setLoadForm(!loadForm);
        setFlag(!flag);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                    <Chip label={data && data[0][0]?.examRoomID} />
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
                  {/* <a
                    href={`${URL}/examRoom/download/${classExamRoomId.id}`}
                    width="15rem"
                    bgColor="orange.400"
                  >
                    Export Thông tin phòng thi
                  </a> */}
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
                      String(
                        new Date(data[0][0].startTime).getHours() - 7
                      ).padStart(2, "0") +
                        ":" +
                        String(
                          new Date(data[0][0].startTime).getMinutes()
                        ).padStart(2, "0") +
                        " - " +
                        String(
                          new Date(data[0][0].endTime).getHours() - 7
                        ).padStart(2, "0") +
                        ":" +
                        String(
                          new Date(data[0][0].endTime).getMinutes()
                        ).padStart(2, "0") +
                        " - " +
                        new Date(data[0][0].startTime).getDate() +
                        "/" +
                        (new Date(data[0][0].startTime).getMonth() + 1) +
                        "/" +
                        new Date(data[0][0].startTime).getFullYear()
                    }
                  />
                </div>
              </div>
              <div class="col">
                <div class="flex p-3 border-round-sm bg-secondary font-bold ">
                  {/* <ExcelModal
                    examSlotID={data && data[0][0]?.examSlotID}
                    examRoomID={data && data[0][0]?.examRoomID}
                  /> */}
                  <StudentModal
                    examSlotID={data && data[0][0]?.examSlotID}
                    examRoomID={data && data[0][0]?.examRoomID}
                  />
                  {/* <Button
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
                    Thêm sinh sinh (Excel)
                  </Button> */}
                  {/* <Button
                    onClick={() => {}}
                    ml="2%"
                    bgColor="orange.400"
                    as={Button}
                  >
                    Thêm thủ công
                  </Button> */}
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
      {/* <Modal
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
      </Modal> */}
    </Flex>
  );
}
export default DetailExamRoomComponent;
