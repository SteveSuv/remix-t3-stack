import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, Controller } from "react-hook-form";
import { z } from "zod";

export const useZodForm: <T extends z.ZodRawShape>(
  schema: T,
) => {
  form: UseFormReturn<z.TypeOf<z.ZodObject<T>>>;
} = (schema) => {
  const FormSchema = z.object(schema);
  type FormType = z.infer<typeof FormSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  return { form };
};

export { Controller };
