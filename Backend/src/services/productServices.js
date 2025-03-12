const prisma = require("../prisma/prismaclient");

const addProduct = async (
  seller_id,
  name,
  description,
  category,
  price,
  stock,
  sizesAvailable,
  image
) => {
  price = Number(price);
  stock = Number(stock);
  const result = await prisma.products.create({
    data: {
      seller_id,
      name,
      description,
      category,
      price,
      stock,
      sizes: sizesAvailable,
      image,
    },
  });
  return result.id;
};

const getallProducts = async () => {
  return prisma.products.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      price: true,
      stock: true,
      sizes: true,
      image: true,
      all_users_data: {
        select: {
          name: true, // Seller's name
        },
      },
    },
  });
};

const getSellerProducts = async (seller_id) => {
  return await prisma.products.findMany({
    where: { seller_id: seller_id },
  });
};
const editproduct = async (id, data) => {
  return await prisma.products.update({
    where: { id },
    data: data,
  });
};

const deleteProduct = async (productID) => {
  return await prisma.products.delete({
    where: {
      id: productID,
    },
  });
};

module.exports = {
  addProduct,
  getallProducts,
  getSellerProducts,
  editproduct,
  deleteProduct,
};
