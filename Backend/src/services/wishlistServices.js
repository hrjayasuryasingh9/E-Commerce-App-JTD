const prisma = require("../prisma/prismaclient");

const addProduct = async (pid, uid) => {
  const result = await prisma.wishlist.create({
    data: {
      pid: pid,
      uid: uid,
    },
  });
  return result;
};

const getWishlistItems = async (userID) => {
  const wishlistItems = await prisma.wishlist.findMany({
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

  return wishlistItems.map((item) => ({
    wishlist_id: item.id,
    uid: item.uid,
    pid: item.pid,
    created_at: item.created_at,
    ...item.product,
    seller: item.product.all_users_data.name,
  }));
};

const deleteWishlistItem = async (cid) => {
  return prisma.wishlist.delete({ where: { id: cid } });
};
module.exports = { addProduct, getWishlistItems, deleteWishlistItem };
