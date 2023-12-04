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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
// You should also import some data for the table
import { useHistory } from "react-router-dom";
// Import useContext value
import { GET_FULL_SLOT_INFO_BY_ID } from "assets/api";
import { useUser } from "../../components/share/UserContext";
import { NavLink } from "react-router-dom";
import { useCourse } from "../../components/share/CourseContext";
import { useClassRoom } from "../../components/share/ClassRoomContext";
import { addMinutes, format } from "date-fns";

const UpdateExamSlotDrawer = ({ examSlotID }) => {
  // Global variables
  const { user, flag, setFlag, URL } = useUser();
  
  // Data display
  const [data, setData] = useState();
  const [isFourthDrawerOpen, setIsFourthDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    examSlotID: "",
    code: "",
    date: "",
    startTime: "7:30",
    endTime: "9:00",
  });

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  // Custone hook
  const toast = useToast();

  const fetchDataExamSlotFullInfoById = async (id) => {
    const { url, options } = GET_FULL_SLOT_INFO_BY_ID(id);
    const response = await fetch(url, options);
    const json = await response.json();
    if (json && json.ok) {
      setData(json.result[0]);
      
      // Xử lý convert type Date Time thành type hiển thị trên UI
      const dateTime = new Date(json.result[0].startTime);
      const endTime = new Date(json.result[0].endTime);
      const formattedStartTime = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
      const formattedEndTime = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
      // Ngày lúc đầu get từ api lên
      const formattedoriginStartTime = `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
      
      setFormData({
        examSlotID: json.result[0].examSlotID,
        code: json.result[0].code,
        date: convertToDateString(json.result[0].startTime),
        quantity: json.result[0].quantity,
        currentExaminer: json.result[0].currentExaminer,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        originStartTime: formattedoriginStartTime
      })
    }
  };

  const openFourthDrawer = () => {
    setIsFourthDrawerOpen(true);
  };

  const closeFourthDrawer = () => {
    setIsFourthDrawerOpen(false);
  };

  /*
  FUNCTION XỬ LÝ CRUD
  */

  // Call API cập nhật thông tin ExamSlot (ca thi)
  const updateExamSlotByExamSlotId = async (e) => {
    e.preventDefault();
    const { examSlotID, code, date, quantity, startTime, endTime } = formData;

    // Combine date and time strings
    const startDateTimeString = `${date}T${startTime.padStart(2, "0")}:00.000Z`;
    const endDateTimeString = `${date}T${endTime.padStart(2, "0")}:00.000Z`;
    // Convert to Date objects
    const startDate = new Date(startDateTimeString);
    const endDate = new Date(endDateTimeString);
    
      try {
        const response = await fetch(`${URL}/examSlot/${examSlotID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: examSlotID,
            code: code,
            quantity: quantity,
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
          }),
        });
        console.log(response);
        if (response.ok) {
          toast({
            status: "success",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Ca thi",
            description: "Cập nhật thông tin ca thi thành công",
          });
          setFlag(!flag);
        } else {
          toast({
            status: "error",
            position: "top",
            duration: "5000",
            isClosable: true,
            title: "Ca thi",
            description: "Cập nhật thông tin ca thi thất bại",
          });
        }
      } catch (error) {
        console.log(error)
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Ca thi",
          description: "Cập nhật thông tin ca thi thất bại",
        });
      }
  };

  // XỬ LÝ CONVERT START_TIME VÀ END_TIME
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
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

  // Convert type date thành type hiển thị trên calendar
  const convertToDateString = (dateTimeString) => {
    if (!dateTimeString) {
      return ''; // or handle the case where the date-time is not available
    }

    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  console.log(formData);
  return (
    <>
      <Button
        onClick={() => {
          openFourthDrawer();
          fetchDataExamSlotFullInfoById(examSlotID);
        }}
        bgColor="green.400"
        as={Button}
      >
        Chỉnh sửa ca thi
      </Button>

      {/* Fourth Drawer */}
      <Drawer
        isOpen={isFourthDrawerOpen}
        placement="right"
        onClose={closeFourthDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Cập nhật thông tin ca thi
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={(e) => updateExamSlotByExamSlotId(e)}>
              <FormControl marginBottom={5} id="courseID" isRequired>
                <FormLabel>Ca thi</FormLabel>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  {formData ? formData?.examSlotID : "Loading..."}
                </Text>
              </FormControl>

              <FormControl marginBottom={5} id="code" isRequired>
                <FormLabel>Kỳ Thi</FormLabel>
                <Select
                  id="code"
                  defaultValue={formData?.code}
                  value={formData?.code}
                  onChange={handleInputChange}
                >
                  <option value="PE">PE</option>
                  <option value="FE">FE</option>
                  <option value="RE">RETAKE</option>
                </Select>
              </FormControl>

              <FormControl marginBottom={5} id="code" isRequired>
                <FormLabel>Tổng số giám thị cần</FormLabel>
                <NumberInput
                  value={formData?.quantity}
                  onChange={(valueString) =>
                    setFormData({
                      ...formData,
                      quantity: parseFloat(valueString)
                    })
                  }
                  min={formData?.quantity}
                >
                  <NumberInputField readOnly />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl marginBottom={5} id="code" isRequired>
                <FormLabel>Tổng số giám thị hiện tại</FormLabel>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                  {formData ? formData?.currentExaminer : "Loading..."}
                </Text>
              </FormControl>

              <FormControl marginBottom={5} id="startTime" isRequired>
                <FormLabel>Ngày thi</FormLabel>
                <Input
                  type="date"
                  id="date"
                  value={formData?.date}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl marginBottom={5} id="endTime" isRequired>
                <FormLabel>Thời gian bắt đầu</FormLabel>
                <Select
                  id="startTime"
                  value={formData?.startTime}
                  onChange={handleInputChange}
                >
                  <option value={formData?.originStartTime} Default>
                    {formData?.originStartTime}
                  </option>
                  {"07:30" != formData?.originStartTime ? (
                    <option value="07:30">07:30</option>
                  ) : (
                    <></>
                  )}
                  {"09:30" != formData?.originStartTime ? (
                    <option value="09:30">09:30</option>
                  ) : (
                    <></>
                  )}
                  {"11:30" != formData?.originStartTime ? (
                    <option value="11:30">11:30</option>
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>

              <FormControl marginBottom={5} id="endTime" isRequired>
                <FormLabel>Thời gian kết thúc</FormLabel>
                <Select
                  isDisabled
                  id="endTime"
                  value={formData?.endTime}
                  readOnly
                >
                  <option value={formData?.endTime}>{formData?.endTime}</option>
                </Select>
              </FormControl>

              <Flex mt={5}>
                <Button colorScheme="blue" type="submit">
                  Cập nhật
                </Button>
                <Spacer />
              </Flex>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default UpdateExamSlotDrawer;
