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
// You should also import some data for the table
import { tablesTableData_ExamSlot } from "variables/examslot";
import { useDisclosure } from "@chakra-ui/react";

// Import useContext value
import { useClassRoom } from '../../components/share/ClassRoomContext';
import { useExaminer } from '../../components/share/ExaminerContext';
import { useExamSlot } from '../../components/share/ExamSlotContext';
import { useExamRoom } from '../../components/share/ExamRoomContext';
import { useUser } from '../../components/share/UserContext';

function Billing() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");

  // Custone hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { examSlot, loadingExamSlot } = useExamSlot();
  const { classRoom, loadingClassRoom } = useClassRoom();
  const { examiner, loadingExaminer } = useExaminer();
  const { user, flag, setFlag } = useUser();
  const [examSlotInfo, setExamSlotInfo] = useState({
    examSlotID: "",
    subjectID: "",
    subjectName: ""
  });
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
      const response = await axios.post(
        "https://swp3191.onrender.com/exam-room",
        {
          classRoomID: classRoomID,
          examSlotID: examSlotID,
          subjectID: subjectID,
          examinerID: examinerID,
        }
      );
      if (response.status === 200) {
        alert('Tạo phòng thi thành công')
        setFlag(!flag)
      }
    } catch (error) {
      console.error("POST request error:", error);
      alert('Tạo phòng thi thất bại')
    }
  };

  function getInfoByExamSlot(id){
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`https://swp3191.onrender.com/examSlot/info/${id}`, {
          withCredentials: true, 
        });
        if (response.data){
          let item = {
            examSlotID: response?.data?.result[0].examSlotID,
            subjectID: response?.data?.result[0].subjectID,
            subjectName: response?.data?.result[0].subjectName
          }
          setExamSlotInfo(item);
          setLoadingExamSlotInfo(false);
          onOpen()
        }
      } catch (error) {
        console.error('Error:', error);
        setLoadingExamSlotInfo(false);
        alert('Ca thi không có thông tin để thực hiện tạo phòng thi')
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

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Danh sách phòng thi
            </Text>
            <Spacer />
            <Button disabled={examSlotInfo.subjectID == ""} onClick={onOpen} colorScheme="blue" variant="solid">
              Nhập thông tin phòng thi cho slot vừa tạo
            </Button>
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
              {!loadingExamSlot && examSlot.map((row, index, arr) => {
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
                        <Text fontSize="md" color={textColor} fontWeight="bold">
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
                        <Text fontSize="md" color={textColor} fontWeight="bold">
                          {row.startTime}
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
                        pb=".5rem"
                      >
                        {row.endTime}
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
                      <Button disabled={row.quantity > 1 } onClick={() => getInfoByExamSlot(row.ID)} p="0px" bg="transparent" variant="no-effects">
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
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Nhập thông tin phòng thi</DrawerHeader>
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
                  {!loadingClassRoom && classRoom.map((item) => (
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
                  {!loadingExaminer && examiner.map((item) => (
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
                  defaultValue={examSlotInfo.examSlotID}
                  readOnly
                />
              </FormControl>

              {/* Thông tin mã môn thi */}
              <FormControl marginBottom={5} id="subjectName" isRequired>
                <FormLabel>Tên môn thi</FormLabel>
                <Input
                  type="text"
                  id="subjectName"
                  defaultValue={examSlotInfo.subjectName}
                  readOnly
                />
                <Input
                  type="text"
                  id="subjectID"
                  defaultValue={examSlotInfo.subjectID}
                  style={{ display: 'none' }}
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

export default Billing;
