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
    if (localStorage.getItem("Student")) {
      return history.push("/student/viewSchedule");
    }

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
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Môn Thi
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Kì Thi
                </Th>
                {/* <Th borderColor={borderColor} color="gray.400">
                  Giám thị gác thi
                </Th> */}
                <Th borderColor={borderColor} color="gray.400">
                  Thời gian bắt đầu
                </Th>{" "}
                <Th borderColor={borderColor} color="gray.400">
                  Thời gian kết thúc
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataExamRoom &&
                dataExamRoom?.map((row, index, arr) => {
                  return (
                    <Tr my=".8rem" pl="0px" color="gray.400">
                      <Td
                        pl="0px"
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {row?.code?.[0]}
                      </Td>
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {row?.code?.[1]}
                      </Td>
                      {/* <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {" "}
                        {row?.["Examiner name"]}
                      </Td> */}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {new Date(row.startTime).getHours() +
                          ":" +
                          new Date(row.startTime).getMinutes() +
                          " " +
                          (new Date(row.startTime).getDate() + 1) +
                          "/" +
                          (new Date(row.startTime).getMonth() + 1) +
                          "/" +
                          new Date(row.startTime).getFullYear()}
                      </Td>{" "}
                      <Td
                        borderColor={borderColor}
                        borderBottom={index ? "none" : null}
                      >
                        {new Date(row.endTime).getHours() +
                          ":" +
                          new Date(row.endTime).getMinutes() +
                          " " +
                          (new Date(row.endTime).getDate() + 1) +
                          "/" +
                          (new Date(row.endTime).getMonth() + 1) +
                          "/" +
                          new Date(row.endTime).getFullYear()}
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
