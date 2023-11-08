import { prismaClient } from "../app/database.js";
/** semua method di sini mereturnkan sebuah data ke dalam controller
 * 
// disini sebuah api yang akan mereturn kan data yang akan di simpan ke controller blog-controller.js
 * @param {request body && request file} request 
 * @returns {data json}
 * @author sayyid salim <mohsalim951@gmail.com>
 */
export const post = async (request) => {
  const { title, content, categori, username } = request.body;
  const { filename } = request.file;
  if (request.body && request.file) {
    return await prismaClient.blog.create({
      data: {
        title,
        content,
        image: filename,
        categoriId: categori,
        authorName: username,
      },
      select: {
        title: true,
        categori: true,
        createdAt: true,
      },
    });
  }
};

/**
 * 
 //  * sebuah data yang akan di kirimkan ke dalam contorller 
 * @param {request body && request file} request 
 * @returns {data json}
 * @author sayyid salim <mohsalim951@gmail.com>
 */
export const update = async (request) => {
  const { id } = request.params;
  const { title, content, categori } = request.body;
  const { filename } = request.file;

  if (id) {
    if (request.body && request.file) {
      return await prismaClient.blog.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          content,
          categoriId: categori,
          image: filename,
          updatedAt: new Date(),
        },
        select: {
          title: true,
          categori: true,
          updatedAt: true,
        },
      });
    }
  }
};

/**
 *
 * @param {request param} request
 * @returns {data json}
 */
export const deleting = async (request) => {
  const { id } = request.params;
  if (id) {
    return await prismaClient.blog.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
};

/**
 *
 * @returns {data json}
 * data yang mereturnkan semya data
 */
export const getAll = async () => {
  return await prismaClient.blog.findMany({
    include: {
      categori: {
        select: {
          categori: true,
        },
      },
    },
  });
};

/**
 *
 * @param {request params} request
 * @returns {data json}
 * data yang mereturnkan sebuah data sesuai id data
 */
export const getById = async (request) => {
  const { id } = request.params;
  if (!id) {
    return;
  } else {
    return await prismaClient.blog.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        categori: {
          select: {
            categori: true,
          },
        },
      },
    });
  }
};
/**
 * @param {request param}
 * @returns {data json}
 * data yang mereturnkan sebuah data sesuai category data
 */
export const getByCategori = async (request) => {
  const { category } = request.params;
  if (!category) return;
  return await prismaClient.categori.findFirst({
    where: {
      categori: category,
    },
    include: {
      blog: true,
    },
  });
};

/**
 *
 * @param {request param} request
 * @returns {data json}
 * data yang mereturnkan sebuah data yang sesuai author
 */
export const getByUsername = async (request) => {
  const { username } = request.params;
  if (!username) return;
  return await prismaClient.user.findFirst({
    where: {
      name: username,
    },
    select: {
      name: true,
      blog: {
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          categori: {
            select: {
              categori: true,
            },
          },
        },
      },
    },
  });
};

export const getByLatestPost = async () => {
  return await prismaClient.blog.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
};
