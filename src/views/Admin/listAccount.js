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
  Toast,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useState, useEffect } from "react";
import { useAccount } from "../../components/share/AccountContext";
import { Tag } from "primereact/tag";
import { useUser } from "components/share/UserContext";
function ListAccountComponent() {
  const { user, flag, setFlag, URL } = useUser();
  const [selectedRole, setSelectedRole] = useState(""); // Thêm state mới để lưu trạng thái đã chọn
  const [dataUser, setDataUser] = useState({
    ID: "",
    Role: "",
    userName: "",
  });
  const [loadForm, setLoadForm] = useState(true);
  useEffect(() => {
    setDataUser({
      ...dataUser,
      Role: selectedRole,
    });
  }, [selectedRole]);
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const { account, loadingAccount } = useAccount();
  const [isFirstDrawerOpen, setIsFirstDrawerOpen] = useState(false);
  const openFirstDrawer = () => {
    setIsFirstDrawerOpen(true);
  };
  const closeFirstDrawer = () => {
    setIsFirstDrawerOpen(false);
  };
  /*
  Chức năng phân quyền user
  */
  console.log(dataUser);
  const setRole = async () => {
    const { ID, Role } = dataUser;
    try {
      const response = await fetch(`${URL}/auth/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: ID,
          Role: Role,
        }),
      });
      if (response && response.ok) {
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phân quyền",
          description: "Bạn đã phân quyền cho người dùng thành công.",
        });
        setFlag(!flag);
        setSelectedRole("");
      } else {
        toast({
          status: "error",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Phân quyền",
          description: "Bạn đã phân quyền cho người dùng không thành công.",
        });
      }
    } catch (error) {
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Hệ thống",
        description: "Hệ thống đang gặp lỗi, mời bạn thử lại sau",
      });
    }
  };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" flexWrap>
          <Flex>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Danh sách tài khoản người dùng
            </Text>
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
                  Họ tên
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Email
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Vai trò
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
              {account &&
                account?.map((i, index) => {
                  return (
                    i?.status === true && (
                      <Tr key={index} cursor="pointer">
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
                                {index + 1} {/* Calculated STT */}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
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
                                {i?.userName}
                              </Text>
                            </Flex>
                          </Flex>
                        </Td>
                        {/* subCode */}
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
                        <Td borderColor={borderColor}>
                          <Flex direction="column">
                            <Text
                              fontSize="md"
                              color={textColor}
                              fontWeight="bold"
                            >
                              {i?.Role}
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
                              {i?.status ? (
                                <Tag
                                  className="text-gray-900"
                                  severity="success"
                                  value="Hoạt động"
                                ></Tag>
                              ) : (
                                <Tag
                                  className="text-gray-900"
                                  severity="danger"
                                  value="Khóa"
                                ></Tag>
                              )}
                            </Text>
                          </Flex>
                        </Td>
                        {/* Status */}
                        <Td
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện click từ Td lan toả lên Tr
                          }}
                          cursor="pointer"
                          borderColor={borderColor}
                        >
                          {(i?.Role.trim() === "Admin" || i?.Role.trim() === "Lecturer") ? (
                            <Button
                              isDisabled
                              onClick={() => {
                                openFirstDrawer();
                                setDataUser({
                                  ...dataUser,
                                  ID: i?.ID,
                                  userName: i?.userName,
                                });
                                console.log(dataUser);
                              }}
                              bgColor="green.400"
                              as={Button}
                            >
                              Phân quyền
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                openFirstDrawer();
                                setDataUser({
                                  ...dataUser,
                                  ID: i?.ID,
                                  userName: i?.userName,
                                });
                                console.log(dataUser);
                              }}
                              bgColor="green.400"
                              as={Button}
                            >
                              Phân quyền
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    )
                  );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {/* First Drawer */}
      <Drawer
        isOpen={isFirstDrawerOpen}
        placement="right"
        onClose={closeFirstDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Phân quyền tài khoản{" "}
          </DrawerHeader>
          <DrawerBody>
            <FormControl marginBottom={5} id="courseID" isRequired>
              <FormLabel>Tài khoản</FormLabel>
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {dataUser?.userName}
              </Text>
            </FormControl>

            <FormControl marginBottom={5} id="code" isRequired>
              <FormLabel>Chọn vai trò mới</FormLabel>
              <Select
                placeholder="Lựa chọn kỳ thi"
                id="code"
                value={selectedRole} // Sử dụng selectedRole thay vì dataUser.Role
                onChange={(e) => {
                  setSelectedRole(e.target.value); // Cập nhật selectedRole khi người dùng thay đổi
                }}
              >
                <option value="Student">Student</option>
                <option value="Testing Admin">Testing Admin</option>
                <option value="Testing Staff">Testing Staff</option>
                <option value="Lecturer">Lecturer</option>
              </Select>
            </FormControl>
            <Flex mt={5}>
              <Button
                onClick={() => setRole()}
                colorScheme="blue"
                type="submit"
              >
                Xác nhận phân quyền
              </Button>
              <Spacer />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
export default ListAccountComponent;
