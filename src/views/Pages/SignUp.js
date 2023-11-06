import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Radio,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/370564239_632562499010395_4148232596381870373_n.jpg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  return (
    <Flex position="relative" height={"100vh"}>
      <Flex
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="60px"
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Đăng kí tài khoản
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Tên tài khoản
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Nhập tên tài khoản"
                mb="20px"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Mật khẩu
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                mb="20px"
                size="lg"
              />
              {/* Nhập lại mật khẩu */}
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Nhập lại mật khẩu
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Nhập lại mật khẩu của bạn"
                mb="20px"
                size="lg"
              />
              {/* Nhập lại mật khẩu */}
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch
                  required
                  id="remember-login"
                  colorScheme="blue"
                  me="10px"
                />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Xác nhận đăng kí tài khoản
                </FormLabel>
              </FormControl>
              <Button
                fontSize="13px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
              >
                ĐĂNG KÍ
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Bạn đã có tài khoản?{" "}
                <NavLink to="/auth/signin">
                  <Text color={titleColor} as="span" href="#" fontWeight="bold">
                    Đăng nhập ngay
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          id="1"
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgSize={"cover"}
          bgImage={signInImage}
        ></Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
