const prisma = require("../prisma/prismaclient");

const getsellerdetails = async (seller) => {
  const sellerdata = await prisma.all_users_data.findFirstOrThrow({
    where: {
      name: seller,
      role: "Seller",
    },
  });
  return sellerdata;
};

const addOrder = async (sid, pid, uid, quantity) => {
  const order = await prisma.orders.create({
    data: {
      product_id: pid,
      user_id: uid,
      seller_id: sid,
      quantity: quantity,
    },
  });
  return order;
};

const getOrders = async (uid) => {
  const orders = await prisma.orders.findMany({
    where: {
      user_id: uid,
    },
    select: {
      order_id: true,
      status: true,
      quantity: true,
      created_at: true,
      updated_at: true,
      products: {
        select: {
          price: true,
          name: true,
          sizes: true,
          description: true,
          image: true,
        },
      },
      all_users_data_orders_seller_idToall_users_data: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [{ created_at: "desc" }],
  });

  const statusPriority = { Pending: 1, Dispatched: 2, Declined: 3 };

  orders.sort((a, b) => {
    return (statusPriority[a.status] || 4) - (statusPriority[b.status] || 4);
  });

  const processedOrders = orders.flatMap((order) => {
    const products = Array.isArray(order.products)
      ? order.products
      : [order.products];

    return products.map((product) => ({
      order_id: order.order_id,
      status: order.status,
      quantity: order.quantity,
      created_at: order.created_at,
      updated_at: order.updated_at,
      price: product.price,
      name: product.name,
      sizes: product.sizes,
      description: product.description,
      product_image: product.image,
      seller_name:
        order.all_users_data_orders_seller_idToall_users_data?.name ||
        "Unknown",
      total_price: product.price * order.quantity,
    }));
  });

  return processedOrders;
};

const getOrdersofSeller = async (seller_id) => {
  const orders = await prisma.orders.findMany({
    where: {
      seller_id: seller_id,
    },
    select: {
      order_id: true,
      status: true,
      quantity: true,
      created_at: true,
      updated_at: true,
      products: {
        select: {
          price: true,
          name: true,
          sizes: true,
          description: true,
          image: true,
        },
      },
    },
    orderBy: [{ created_at: "desc" }],
  });

  const statusPriority = { Pending: 1, Dispatched: 2, Declined: 3 };

  orders.sort((a, b) => {
    return (statusPriority[a.status] || 4) - (statusPriority[b.status] || 4);
  });

  const processedOrders = orders.flatMap((order) => {
    const products = Array.isArray(order.products)
      ? order.products
      : [order.products];

    return products.map((product) => ({
      order_id: order.order_id,
      status: order.status,
      quantity: order.quantity,
      created_at: order.created_at,
      updated_at: order.updated_at,
      price: product.price,
      name: product.name,
      sizes: product.sizes,
      description: product.description,
      product_image: product.image,
      total_price: product.price * order.quantity,
    }));
  });

  return processedOrders;
};

const deleteOrder = async (id) => {
  const result = await prisma.orders.delete({
    where: {
      order_id: id,
      status: "Pending",
    },
  });
  return result;
};

const editStatus = async (id, status) => {
  const result = await prisma.orders.update({
    where: {
      order_id: id,
    },
    data: {
      status: status,
    },
  });
};
module.exports = {
  getsellerdetails,
  addOrder,
  getOrders,
  getOrdersofSeller,
  deleteOrder,
  editStatus,
};
