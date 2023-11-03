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
import { useExamSchedule } from '../../components/share/ExamScheduleContext';
import { useCourse } from '../../components/share/CourseContext';

function Billing() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");

  // Custone hook
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { examSchedule, loading } = useExamSchedule();
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

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Lịch Thi
            </Text>
            <Spacer />
            <Button onClick={onOpen} colorScheme="blue" variant="solid">
              Thêm Slot Thi
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
              {!loading && examSchedule.map((row, index, arr) => {
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
                        <Text fontSize="md" color={textColor} fontWeight="bold">
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
                        <Text fontSize="md" color={textColor} fontWeight="bold">
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
                        {row.startTime}
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
                        {row.endTime}
                      </Text>
                    </Td>
                    {/* Status */}
                    <Td
                      borderColor={borderColor}
                      borderBottom={index ? "none" : null}
                    >
                      <Badge
                        bg={"CHƯA BẮT ĐẦU" === "CHƯA BẮT ĐẦU" ? "green.400" : "red"}
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
                      <Button p="0px" bg="transparent" variant="no-effects">
                        <Text
                          fontSize="md"
                          color="blue.400"
                          fontWeight="bold"
                          cursor="pointer"
                        >
                          Chỉnh sửa
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
                  {!loadingCourse && course.map((item) => (
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

export default Billing;
