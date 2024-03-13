import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinBody, signupBody } from "@samthedev09/medium-common";

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; secret: string };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupBody.safeParse(body);

  if (!success) {
    c.status(411);
    c.json({ message: "Inputs incorrect" });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name || null,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.secret);

    return c.json({ message: "SignUp Successful !", token: jwt });
  } catch (e) {
    console.log(e);
    return c.json({ message: "An error occured !", error: e });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinBody.safeParse(body);

  if (!success) {
    c.status(411);
    c.json({ message: "Inputs incorrect" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { username: body.username, password: body.password },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid Credentials" });
    }

    return c.json({ message: "SignIn Successful !" });
  } catch (e) {
    console.log(e);
    return c.json({ message: "An error occured !" });
  }
});
