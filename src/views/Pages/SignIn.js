// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Switch,
  Text,
  useColorModeValue,
  Center,
  useToast,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";

// Assets
import BgSignUp from "assets/img/BgFPT.jpg";
import React from "react";
import { useUser } from "../../components/share/UserContext";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// FORM LOGIN GG
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { LOGIN_API } from "assets/api";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();
  const toast = useToast();
  const { user, login, logout, flag, setFlag, URL } = useUser();
  const [name, setName] = useState("");
  const [popupLogin, setPopupLogin] = useState(false);
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "12926705277-3el15gd4knio1ebid2hqhm5apj0or5c1.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
    };
  }, [loginData]);

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const decoded = jwtDecode(response.credential);
    sendLoginToServer(decoded.email);
  };

  const sendLoginToServer = async (e) => {
    var email = "";
    if (e?.target?.name?.value) {
      e.preventDefault();
      email = e.target.name.value;
    } else {
      email = e;
    }
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the response as needed
        login(responseData.userInfo[0]);
        setFlag(!flag);
        handleRedirect(responseData.userInfo[0]);
        toast({
          status: "success",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Đăng nhập",
          description: "Bạn nhập thành công",
        });
        history.push("/admin");
      } else {
        console.error("POST request failed:", response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error("POST request error:", error);
      // Handle any network or fetch errors
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Đăng nhập",
        description: "Bạn nhập không thành công",
      });
    }
  };
  // Xử lý phân trang cho từng role
  function handleRedirect(user) {
    switch (user.Role.trim()) {
      case "Admin":
        history.push("/admin");
        break;
      case "Testing Admin":
        history.push("/admin");
        break;
      case "Testing Staff":
        history.push("/");
        break;
      case "Lecturer":
        history.push("/admin/registerExamSlot");
        break;
      case "Student":
        history.push("/");
        break;
      default:
        history.push("/auth");
        break;
    }
  }
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(80vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="100vh" bg="orange.500" opacity="0.5"></Box>
      </Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          FU - Exam Schedule
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          Tất cả thông tin về kế hoạch thi, dễ dàng tra cứu và quản lý lịch thi
          của bạn.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
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
            Đăng nhập
          </Text>

          <form onSubmit={(e) => sendLoginToServer(e)}>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Tên tài khoản
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Mời bạn nhập tên tài khoản"
                mb="24px"
                size="lg"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Mật khẩu
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Mời bạn nhập mật khẩu"
                mb="24px"
                size="lg"
              />
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch id="remember-login" colorScheme="blue" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                  Ghi nhớ mật khẩu
                </FormLabel>
              </FormControl>
              <Button
                fontSize="13px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                type="submit"
              >
                ĐĂNG NHẬP
              </Button>
              <Button
                id="buttonDiv"
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                marginBottom="5%"
                // onClick={() => LoginGoogle()}
              >
                <Center>
                  <Text>Đăng nhập với Google</Text>
                </Center>
              </Button>
            </FormControl>
          </form>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Bạn chưa có tài khoản?{" "}
              <NavLink to="/auth/signup">
                <Text color={titleColor} as="span" fontWeight="bold">
                  Đăng kí ngay
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
