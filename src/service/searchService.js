import { prismaClient } from "../app/database.js";
export const search = async (keyword) => {
  const data = await prismaClient.blog.findMany({
    where: {
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          categori: {
            categori: {
              contains: keyword,
            },
          },
        },
        {
          content: {
            contains: keyword,
          },
        },
        {
          authorName: {
            contains: keyword,
          },
        },
      ],
    },
    include: {
      categori: {
        select: {
          categori: true,
        },
      },
    },
  });
  return data;
};
