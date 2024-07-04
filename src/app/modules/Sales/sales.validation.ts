import { z } from 'zod';

const createSalesValidationSchema = z.object({
  body: z.object({
    buyerName: z.string(),
    price: z.number().optional(),
    productQuantity: z.number().min(1),
    saleDate: z.string().optional(),
    productId: z.string(),
    soldBy: z.string().optional(),
  }),
});

export const SalesValidations = {
  createSalesValidationSchema,
};
