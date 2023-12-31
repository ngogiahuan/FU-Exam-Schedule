// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import React, { useEffect } from "react";
// Variables
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";
import { pageVisits, socialTraffic } from "variables/general";
import { useHistory } from "react-router-dom";
import { DownloadIcon } from "@chakra-ui/icons";
import { EXPORT_FILE_EXCEL } from "assets/api";
export default function Dashboard() {
  let history = useHistory();
  const toast = useToast();
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
  }, []);
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

  // CALL API FUNCTION EXPORT FILE EXCEL
  const exportFileExcel = async () => {
    try {
      const { url, options } = EXPORT_FILE_EXCEL();
      const response = await fetch(url, options);
      const json = await response.json();
      if (json) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Xuất File Excel",
          description: "Bạn đã tải thành công",
        });
      } else {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Xuất File Excel",
          description: "Bạn tải file xuống không thành công",
        });
      }
    } catch (error) {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Xuất File Excel",
        description: "Bạn tải file xuống không thành công, mời bạn thử lại",
      });
    }
  };
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px" mb="20px">
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  SL giám thị đăng kí
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    16 LƯỢT
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                {/* <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} /> */}
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +4%{" "}
              </Text>
              So với hôm qua
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  SL Lịch thi hôm nay
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    20 SLOT
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                {/* <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} /> */}
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                +5.2%{" "}
              </Text>
              So với hôm qua
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Tiền lương giám thị
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    35.600.000đ
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="red.500" fontWeight="bold">
                -2.82%{" "}
              </Text>
              So với kỳ trước
            </Text>
          </Flex>
        </Card>
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
            >
              <Stat me="auto">
                <StatLabel
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Xuất lương giám thị
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    <Button
                      // onClick={() => exportFileExcel()}
                      colorScheme="green"
                    >
                      <a href="https://swp3191.onrender.com/api/excel/depart-examiner/download">
                        Tải xuống ngay
                      </a>
                    </Button>
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <DownloadIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </Flex>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <Card
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p="0px"
          maxW={{ sm: "320px", md: "100%" }}
        >
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            <Text color="#fff" fontSize="lg" fontWeight="bold" mb="6px">
              Lượt đăng kí
            </Text>
            <Text color="#fff" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                (+16) giám thị đăng kí{" "}
              </Text>
              trong hôm nay
            </Text>
          </Flex>
          <Box minH="300px">
            <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          </Box>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column" mb="40px" p="28px 0px 0px 22px">
            <Text
              color="gray.400"
              fontSize="sm"
              fontWeight="bold"
              mb="6px"
            ></Text>
            <Text color={textColor} fontSize="lg" fontWeight="bold">
              TỔNG LƯƠNG GIÁM THỊ QUA CÁC KỲ
            </Text>
          </Flex>
          <Box minH="300px">
            <BarChart chartData={barChartData} chartOptions={barChartOptions} />
          </Box>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
            <Flex align="center" justify="space-between" p="22px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                CHI TIẾT LƯỢT ĐĂNG KÍ CỦA GIÁM THỊ
              </Text>
              <Button variant="primary" maxH="30px">
                XEM TẤT CẢ
              </Button>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color="gray.400" borderColor={borderColor}>
                      ID
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      HỌ VÀ TÊN
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}>
                      PHÒNG THI
                    </Th>
                    <Th color="gray.400" borderColor={borderColor}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pageVisits.map((el, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                          borderColor={borderColor}
                          border={index === arr.length - 1 ? "none" : null}
                        >
                          {el.pageName}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {el.visitors}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {el.uniqueUsers}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}
                        >
                          {el.bounceRate}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}
