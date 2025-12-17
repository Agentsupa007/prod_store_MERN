import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

import { Toaster, toaster } from "@/components/ui/toaster"

import { useTheme } from "next-themes";

import { useProductStore } from "@/store/Product";

const CreatePage = () => {
  const { theme } = useTheme();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

    const createProduct = useProductStore((state) => state.createProduct);


    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if(!success) {
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else{
            toaster.create({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNewProduct({ name: "", price: "", image: "" });
        }
    };


  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={theme === "light" ? "white" : "gray.800"}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" w="full" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
