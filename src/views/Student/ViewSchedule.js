// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import { tablesTableData } from "variables/general";
import { useAccount } from "../../components/share/AccountContext";
import { useUser } from "../../components/share/UserContext";
import { useEffect } from "react";
import { VIEW_ALL_EXAMROOM } from "assets/api";
import { useState } from "react";

function ViewSchedule() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { account, loadingAccount } = useAccount();
  const { user, flag, setFlag } = useUser();
  const [dataExamRoom, setDataExamRoom] = useState();
  useEffect(() => {
    const getAllExamRoom = async () => {
      try {
        const { url, options } = VIEW_ALL_EXAMROOM();
        const response = await fetch(url, options);
        const json = await response.json();
        setDataExamRoom(json.result);
      } catch (error) {}
    };
    getAllExamRoom();
  }, [flag]);
  console.log(dataExamRoom);
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Danh sách lịch thi
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" color="gray.400">
                {/* STT */}
                <Th borderColor={borderColor} color="gray.400">
                  STT
                </Th>
                {/* Phòng thi */}
                <Th borderColor={borderColor} color="gray.400">
                  Phòng thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Môn Thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Kỳ thi
                </Th>
                {/* <Th borderColor={borderColor} color="gray.400">
                  Giám thị gác thi
                </Th> */}
                {/*  Thời gian */}
                <Th borderColor={borderColor} color="gray.400">
                  Thời gian
                </Th>
                {/*  Ngày thi */}
                <Th borderColor={borderColor} color="gray.400">
                  Ngày thi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataExamRoom &&
                dataExamRoom?.map((row, index, arr) => {
                  return (
                    <Tr>
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                        fontSize="md"
                        color="#000"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Td>
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                        fontSize="md"
                        color="#000"
                        fontWeight="bold"
                      >
                        {row?.classRoom}
                      </Td>
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                        fontSize="md"
                        color="#000"
                        fontWeight="bold"
                      >
                        {row?.subjectCode}
                      </Td>
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                        fontSize="md"
                        color="#000"
                        fontWeight="bold"
                      >
                        {row?.examBatch}
                      </Td>
                      {/* <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {" "}
                        {row?.["Examiner name"]}
                      </Td> */}
                      <Td borderColor={borderColor}>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                          >
                            {String(
                              new Date(row.startTime).getHours()
                            ).padStart(2, "0") +
                              ":" +
                              String(
                                new Date(row.startTime).getMinutes()
                              ).padStart(2, "0") +
                              " - " +
                              String(new Date(row.endTime).getHours()).padStart(
                                2,
                                "0"
                              ) +
                              ":" +
                              String(
                                new Date(row.endTime).getMinutes()
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
                            {new Date(row?.startTime).getDate() +
                              "/" +
                              (new Date(row?.startTime).getMonth() + 1) +
                              "/" +
                              new Date(row?.startTime).getFullYear()}
                          </Text>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ViewSchedule;
