import { z } from "zod";

export const UserValidation = z.object({
    body: z.object({
        name: z.string({required_error: 'name is required'}),
        email: z.string({ required_error: 'email is required'}).email(),
        password: z.string({ required_error: 'password is required'})
    })
})