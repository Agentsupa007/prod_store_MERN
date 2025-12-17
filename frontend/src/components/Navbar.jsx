import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { FiPlusSquare } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
        fontSize={{ base: "22px", sm: "28px" }}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        >
        <Link to="/">Product Store 🛒</Link>
        </Text>



        <HStack spacing={2}>
          <Button as={Link} to="/create">
            <FiPlusSquare />
          </Button>

          <Button onClick={toggleColorMode}>
            {theme === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
