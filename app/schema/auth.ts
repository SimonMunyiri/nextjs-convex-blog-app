import z from "zod"

// Validation schema for user sign-up
export const signUpSchema = z.object({
    name: z.string().min(3).max(30), // Name must be between 3 and 30 characters
    email: z.string().email(), // Email must be a valid email address
    password: z.string().min(8).max(30), // Password must be between 8 and 30 characters
})