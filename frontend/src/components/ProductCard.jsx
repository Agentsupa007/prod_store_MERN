import { Box, Image, Heading, Text,Input ,VStack, HStack, IconButton } from "@chakra-ui/react";
import { useProductStore } from "@/store/Product";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toaster } from "./ui/toaster";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
    PopoverFooter,
    Button,
} from "@chakra-ui/react";

import { useState } from "react";


export const ProductCard = ({ product }) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {deleteProduct, updateProduct} = useProductStore();

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    const handleUpdateProduct = async (productId, updatedData) => {
        const {success,message} = await updateProduct(productId, updatedData);
       
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
        }

        onClose();
    };

    const handleDeleteProduct = async () => {
        const { success, message } = await deleteProduct(product._id);
        
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
        }
    };

    return (
        
        <Box
                shadow='lg'
                rounded='lg'
                overflow='hidden'
                transition='all 0.3s'
                _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            >
                <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

                <Box p={4}>
                    <Heading as='h3' size='md' mb={2}>
                        {product.name}
                    </Heading>

                    <Text fontWeight='bold' fontSize='xl'  mb={4}>
                        ${product.price}
                    </Text>

                    <HStack spacing={2}>
                        <PopoverRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                            <PopoverTrigger asChild>
                                <IconButton aria-label="Edit product">
                                <FaEdit size={18} />
                                </IconButton>
                            </PopoverTrigger>

                            <PopoverContent>
                                <PopoverBody>
                                <VStack spacing={4}>
                                    <Input
                                    placeholder="Product Name"
                                    value={updatedProduct.name}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                        ...updatedProduct,
                                        name: e.target.value,
                                        })
                                    }
                                    />
                                    <Input
                                    placeholder="Price"
                                    type="number"
                                    value={updatedProduct.price}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                        ...updatedProduct,
                                        price: e.target.value,
                                        })
                                    }
                                    />
                                    <Input
                                    placeholder="Image URL"
                                    value={updatedProduct.image}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                        ...updatedProduct,
                                        image: e.target.value,
                                        })
                                    }
                                    />
                                </VStack>
                                </PopoverBody>

                                <PopoverFooter display="flex" gap={2} justifyContent="flex-end">
                                <Button
                                    colorPalette="blue"
                                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                >
                                    Update
                                </Button>
                                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </PopoverRoot>

                        <IconButton
                            aria-label="Delete product"
                            colorPalette="red"
                            onClick={handleDeleteProduct}
                        >
                            <FaTrash size={18} />
                        </IconButton>
                    </HStack>

                </Box>
        </Box>    
    );
};