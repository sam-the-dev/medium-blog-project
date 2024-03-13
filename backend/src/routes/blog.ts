import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@samthedev09/medium-common";

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; secret: string };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.secret);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not logged in" });
    }
    next();
  } catch (err) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    c.json({ message: "Inputs incorrect" });
    return;
  }

  const authorId = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body?.title,
        content: body?.content,
        authorId: Number(authorId),
        thumbnail: body?.thumbnail || "",
      },
    });

    return c.json({ id: blog.id });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Failed to post blog", error: e });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    c.json({ message: "Inputs incorrect" });
    return;
  }

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: { title: body.title, content: body.content },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Failed to update blog", error: e });
  }
});

blogRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = await c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog post !", error: e });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = prisma.blog.findMany();

    return c.json({ blogs });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Failed to fetch posts", error: e });
  }
});
