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
import React from "react";
// You should also import some data for the table
import { tablesTableData_ExamSlot } from "variables/examslot";
import { useDisclosure } from "@chakra-ui/react";

function Billing() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");

  // Custone hook
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              {tablesTableData_ExamSlot.map((row, index, arr) => {
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
                            {row.id}
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
                          {row.subCode}
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
                          {row.subName}
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
                        bg={row.status === "CHƯA BẮT ĐẦU" ? "green.400" : "red"}
                        color={
                          row.status === "CHƯA BẮT ĐẦU" ? "white" : "black"
                        }
                        fontSize="16px"
                        p="3px 10px"
                        borderRadius="8px"
                      >
                        {row.status}
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
            <FormControl marginBottom={5} id="courseid" isRequired>
              <FormLabel>Course</FormLabel>
              <Select placeholder="Lựa chọn Course">
                <option>Course 1</option>
                <option>Course 2</option>
              </Select>
            </FormControl>
            <FormControl marginBottom={5} id="code" isRequired>
              <FormLabel>Mã ca thi</FormLabel>
              <Select placeholder="Lựa chọn mã">
                <option>Code 1</option>
                <option>Code 2</option>
              </Select>
            </FormControl>
            <FormControl marginBottom={5} id="startTime" isRequired>
              <FormLabel>Ngày thi</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl marginBottom={5} id="startTime" isRequired>
              <FormLabel>Thời gian bắt đầu</FormLabel>
              <Input type="time" />
            </FormControl>
            <FormControl marginBottom={5} id="endTime" isRequired>
              <FormLabel>Thời gian kết thúc</FormLabel>
              <Input type="time" />
            </FormControl>
            <Flex mt={5}>
              <Button colorScheme="blue">Tạo mới</Button>
              <Spacer />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Billing;
