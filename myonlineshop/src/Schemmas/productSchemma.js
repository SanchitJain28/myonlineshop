import { z } from "zod";

export const productSchemma = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    category :z.string().min(1, "Category is required"),
    price:z.number().min(1, "Price is required"),
});
