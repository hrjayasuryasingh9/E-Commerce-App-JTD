const prisma = require("../prisma/prismaclient");

const addProduct = async (pid, uid) => {
  const result = await prisma.cart.create({
    data: {
      pid: pid,
      uid: uid,
    },
  });
  return result;
};

const getCartItems = async (userID) => {
  const cartItems = await prisma.cart.findMany({
    where: { uid: userID },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      uid: true,
      pid: true,
      created_at: true,
      product: {
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          price: true,
          stock: true,
          sizes: true,
          image: true,
          created_at: true,
          seller_id: true,
          all_users_data: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return cartItems.map((item) => ({
    cid: item.id,
    uid: item.uid,
    pid: item.pid,
    created_at: item.created_at,
    ...item.product,
    seller: item.product.all_users_data.name,
  }));
};

const deleteCartItem = async (cid) => {
  return prisma.cart.delete({ where: { id: cid } });
};
module.exports = { addProduct, getCartItems, deleteCartItem };
