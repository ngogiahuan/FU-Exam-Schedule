// Chakra Icons
import { BellIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom Icons
import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
  ProfileIcon,
} from "components/Icons/Icons";
// Custom Components
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React from "react";
import { useUser } from "../../components/share/UserContext";
import routes from "routes.js";
import { Link } from "react-router-dom/cjs/react-router-dom";
export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;
  const toast = useToast();
  const { user, login, logout, flag, setFlag } = useUser();
  const { colorMode } = useColorMode();
  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {localStorage.getItem("isLogin") === "true" && (
        <Link to="/auth/signin">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="no-effects"
            onClick={() => {
              logout();
              toast({
                status: "success",
                position: "top",
                duration: "5000",
                isClosable: true,
                title: "Đăng xuất",
                description: "Bạn đăng xuất thành công",
              });
              window.location.reload();
            }}
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              ) : (
                ""
              )
            }
          >
            <Text display={{ sm: "none", md: "flex" }}>Đăng xuất</Text>
          </Button>
        </Link>
      )}
      <SidebarResponsive
        hamburgerColor={"white"}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )}
            <Box
              w="1px"
              h="20px"
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )}
          </Stack>
        }
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}
