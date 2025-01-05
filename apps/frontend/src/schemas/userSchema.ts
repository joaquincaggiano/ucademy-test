import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  lastName: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
  username: z.string().min(5, { message: 'El nombre de usuario debe tener al menos 5 caracteres' }),
  email: z.string().email({ message: 'El email no es válido' }),
  phone: z.string().min(5, { message: 'El teléfono debe tener al menos 5 caracteres' }),
});