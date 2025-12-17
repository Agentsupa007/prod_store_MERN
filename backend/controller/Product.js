import express from 'express';
import mongoose from 'mongoose';
import Product from '../model/Product.js';

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({success:"true",data:newProduct});
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:"true",data:products});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product: updatedProduct , message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};