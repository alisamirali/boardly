import { signInFormSchema, signUpFormSchema } from "@/features/auth/schemas";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono()
  .post("/login", zValidator("json", signInFormSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    return c.json({ email, password });
  })
  .post("/signup", zValidator("json", signUpFormSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    return c.json({ name, email, password });
  });

export default app;
