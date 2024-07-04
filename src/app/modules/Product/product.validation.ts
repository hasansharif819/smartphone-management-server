import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    brand: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    screenSize: z.number(),
    storageCapacity: z.string(),
    releaseDate: z.string(),
    img: z.string().optional(),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    brand: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    screenSize: z.number().optional(),
    storageCapacity: z.string(),
    releaseDate: z.date().optional(),
    img: z.string().optional(),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
