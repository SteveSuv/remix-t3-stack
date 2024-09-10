import { z } from "zod";

// loginForm schema
const usernameSchema = z
  .string()
  .min(3, "username length cannot be less than 3 characters")
  .max(20, "username length cannot be more than 20 characters");
const passwordSchema = z
  .string()
  .min(3, "password length cannot be less than 3 characters")
  .max(20, "password length cannot be more than 20 characters");

const loginFormFields = { username: usernameSchema, password: passwordSchema };

export const loginFormSchema = z.object(loginFormFields);

// registerForm schema
const password2Schema = passwordSchema;

const registerFormFields = {
  ...loginFormFields,
  password2: password2Schema,
};

export const registerFormSchema = z
  .object(registerFormFields)
  .refine((data) => data.password === data.password2, {
    message: "The two passwords you entered do not match",
    path: ["password2"],
  });

// taskForm schema
const contentSchema = z
  .string()
  .min(1, "content length cannot be less than 1 characters")
  .max(100, "content length cannot be more than 100 characters");

export const addTaskFormSchema = z.object({ content: contentSchema });
