import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  useToast,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// Import useContext value or any other context/state management
// Assume you have a context or state management setup to provide user data

function PersonalPage() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const toast = useToast();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [examSlots, setExamSlots] = useState([]);

  useEffect(() => {
    // TODO: Fetch the personal info and exam slots data from the API
    // setPersonalInfo(...)
    // setExamSlots(...)
  }, []);

  // Function to handle the personal actions like viewing salary details
  const handleActionClick = (action) => {
    // Perform the action, for example: view salary details
    toast({
      title: `Action: ${action}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Thông Tin Cá Nhân
          </Text>
        </CardHeader>
        <CardBody>
          {/* Display personal information here */}
          <Text color={textColor}>Tên: {personalInfo?.name}</Text>
          <Text color={textColor}>Email: {personalInfo?.email}</Text>
          <Button
            mt={5}
            onClick={() => handleActionClick("Xem Lương")}
            colorScheme="blue"
          >
            Xem Lương
          </Button>
        </CardBody>
      </Card>

      <Card overflowX={{ sm: "scroll", xl: "hidden" }} mt={10}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Các ca thi đã hoàn thành
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr color="gray.400">
                <Th borderColor={borderColor}>Ngày Thi</Th>
                <Th borderColor={borderColor}>Ca Thi</Th>
                <Th borderColor={borderColor}>Địa Điểm</Th>
                <Th borderColor={borderColor}>Trạng Thái</Th>
              </Tr>
            </Thead>
            <Tbody>
              {examSlots.map((slot, index) => (
                <Tr key={index}>
                  <Td borderColor={borderColor}>{slot.date}</Td>
                  <Td borderColor={borderColor}>{slot.session}</Td>
                  <Td borderColor={borderColor}>{slot.location}</Td>
                  <Td borderColor={borderColor}>
                    <Badge
                      colorScheme={slot.status === "Active" ? "green" : "red"}
                    >
                      {slot.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default PersonalPage;
