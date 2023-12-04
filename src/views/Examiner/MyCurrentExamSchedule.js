// Library imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box } from "@chakra-ui/react";

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// You should also import some data for the table
import { useHistory } from "react-router-dom";
// Import useContext value
import { useUser } from "../../components/share/UserContext";
import { VIEW_EXAMROOM_BY_EXAMINERID } from "assets/api";
function TableRegister() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const history = useHistory();
  // Custone hook
  const toast = useToast();
  const { user, login, logout, flag, setFlag, URL } = useUser();
  const [semesterID, setSemesterID] = useState();
  const [month, setMonth] = useState();
  const [week, setWeek] = useState();
  const [dataExamSlot, setDataExamSlot] = useState();
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "navy.800");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMonthSelect = (selected) => {
    setSelectedMonth(selected);
  };

  const filteredData = dataExamSlot?.filter((row) => {
    const examSlotID = row?.examSlotID?.toLowerCase() || "";
    const classRoomCode = row?.classRoomCode?.toLowerCase() || "";
    const month = new Date(row?.startTime).getMonth();

    return (
      (examSlotID.includes(searchTerm) || classRoomCode.includes(searchTerm)) &&
      (selectedMonth === "" || month === months.indexOf(selectedMonth))
    );
  });
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
        const { url, options } = VIEW_EXAMROOM_BY_EXAMINERID(
          localStorage.getItem("examinerID"), semesterID, month, week
        );
        const response = await fetch(url, options);
        const json = await response.json();
        if (json && json.ok) {
          const dataDesc = json.result.sort((a, b) => {
            const startTimeA = new Date(a.startTime);
            const startTimeB = new Date(b.startTime);
            return startTimeB - startTimeA;
          });
          setDataExamSlot(dataDesc);
        }
      } catch (error) {}
    };
    getAllExamSlot();
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }, [flag]);
  
  const currentDate = new Date();
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card className="p-4" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            {/* ... (other code) */}
            <Input
              type="text"
              variant="search"
              fontSize="xs"
              bg={inputBg}
              placeholder="Tìm kiếm..."
              onChange={handleInputChange}
            />
            <Select
              style={{ width: "40%", marginLeft: "60%" }}
              ml="2"
              placeholder="Chọn tháng"
              onChange={(e) => handleMonthSelect(e.target.value)}
            >
              <option value="">Tất cả</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </Select>
          </Flex>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
            {filteredData &&
              filteredData.map((row, index) => {
                const isDisabled =
                  new Date(row?.startTime).getTime() - currentDate.getTime() <
                  1;

                let bgColor, textColor, statusTooltip;
                switch (row?.attendanceStatus) {
                  case "present":
                    bgColor = "green";
                    textColor = "white";
                    statusTooltip = "Đã có mặt";
                    break;
                  case "absent":
                    bgColor = "red";
                    textColor = "black";
                    statusTooltip = "Vắng mặt";
                    break;
                  default:
                    bgColor = "inherit";
                    textColor = "inherit";
                    statusTooltip = "Chưa điểm danh";
                }
                return (
                  <Box
                    key={index}
                    p="4"
                    borderWidth="1px"
                    borderRadius="md"
                    opacity={isDisabled ? 0.5 : 1} // Set opacity based on the condition
                    bgColor={bgColor}
                    color={textColor}
                    title={statusTooltip} // Tooltip for status explanation
                  >
                    <Text fontSize="md" fontWeight="bold" pb=".5rem">
                      {row?.examSlotID}
                    </Text>
                    <Text
                      className="flex flex-row justify-content-between"
                      fontSize="sm"
                    >
                      <p>Phòng thi</p>
                      {row?.classRoomCode}
                    </Text>
                    <Text
                      className="flex flex-row justify-content-between"
                      fontSize="sm"
                    >
                      <p>Thời gian</p>
                      {String(new Date(row?.startTime).getHours() - 7).padStart(
                        2,
                        "0"
                      ) +
                        ":" +
                        String(new Date(row?.startTime).getMinutes()).padStart(
                          2,
                          "0"
                        ) +
                        " - " +
                        String(new Date(row?.endTime).getHours() - 7).padStart(
                          2,
                          "0"
                        ) +
                        ":" +
                        String(new Date(row?.endTime).getMinutes()).padStart(
                          2,
                          "0"
                        )}
                    </Text>
                    <Text
                      className="flex flex-row justify-content-between"
                      fontSize="sm"
                    >
                      <p>Ngày thi</p>
                      {String(new Date(row?.startTime).getDate()).padStart(
                        2,
                        "0"
                      ) +
                        "/" +
                        String(
                          new Date(row?.startTime).getMonth() + 1
                        ).padStart(2, "0") +
                        "/" +
                        String(new Date(row?.startTime).getFullYear())}
                    </Text>
                    <Text
                      className="flex flex-row justify-content-between"
                      fontSize="sm"
                    >
                      <p>Trạng thái</p>
                      {statusTooltip}
                    </Text>
                  </Box>
                );
              })}
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default TableRegister;
