const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { Pool } = require("pg");
const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_da0-TlwbiZCc7KDfBpB",
  host: "pg-10045fdf-hrjayasuryasingh-40eb.l.aivencloud.com",
  port: 27090,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUcAIZD6ofTePubz6b0+UpUXgzOu4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTM3YmE3Y2YtZmE1ZS00NWUzLWIwYmItZWZlNTk2MDhk
N2I1IFByb2plY3QgQ0EwHhcNMjUwMTIwMTAxNjQ4WhcNMzUwMTE4MTAxNjQ4WjA6
MTgwNgYDVQQDDC9lMzdiYTdjZi1mYTVlLTQ1ZTMtYjBiYi1lZmU1OTYwOGQ3YjUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKMn5Twn
g+4kzOSM5MaBf8/1f+YOs861uXKswJjIfrzVnquI9oW87nsxtSWC7hhYjYX80Fbw
qNixj91DPfJ0I/80yDlVRk31P6JlNq7he2YJSTI3jeKg32e4ViTTbWApUmfGm2JB
zQlxvnT0Y62Or/pfjkz12+feS6xtCSHj3YYjCADk/T+go24n6vp9CSZiEjzzrwb/
iEd5/4ic+WSVaZd6zxIlM1Xm6QHsF+3zCcR9IhIBHvhQTMcV0lqcsHXpC766HY/j
rrij1g36UE54Xn34pjRjY/fZA2Ql302B45GlP/7GPM4pTGBe59S7+WMPufvWUXku
uLo04ns+mA+MJpuBOVwNBSOCSaD+O6lYjPuI/7ef6FWZQ6jZzCOxoylIa+sNppe1
0CZ+UOxke8eaikNEJxFB/0l/DD3IVKQ523wYhm+2b4GfGX7sodaeWZ9yKgqHgmEc
WIJ25kABmu+Vu9i8T643CAeQb9fbFegxFQUxgOpkBGNQK4BQWcZhFQiEEQIDAQAB
oz8wPTAdBgNVHQ4EFgQU+nwZP828LpBNZityU5456BTA3GcwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABxBrnvJU3T1H2Ho
DubRQEoiNwPmTqKphMfV2ZmWz3pxlK8UgFh7ofu+uPPps53fXr7UixjrIJXZCeZM
xg+40TuXcI0ZJyGZZ6Z0Fex/lnolaWf7AiD5g7FrK2I+ClHad5Qq8u6Dbc0lGGzW
4g7p7PKGzOUgQ9336FWbqtR40dxbgTB0SOaNI9IJ351QHpZzxNAU8U5MbpUNdHJm
PO18J/KpNK2TZo3ZWVy3/MEYJeByG+OWk8Aw1IIrcNWyfo2qSrt6qyyevMKYFeAk
85BtTpJJ60e3/vLvZOuNNo0Gz02si11HAKr5KApLCHflaZO8lvSUCrgFni/CunS/
R1KNCASU4Lp0nm/vA2T/Cvi7qk/XGFP6UrDgDR54BHa3KuWHhDV1a+O1bdjnG6JQ
nu+2HiedxlX+e8qrhBUklto/HksfR9vdSa15JNkzvIR1SWVet/OuDzjk4fkxBHDD
JmTO3E9wFCYthJsCGpKrnv6q7uCgd5Opcs43cznK3KbCai1vJQ==
-----END CERTIFICATE-----`,
  },
});

const app = express();
const PORT = 3005;
const JWT_SECRET = "iamsuryasinghamernstackdevelopersince2023andilovetodocode";
app.use(express.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hrjayasuryasingh@gmail.com",
    pass: "ayxo chqw eehi zdvo", // Your App Password
  },
});

app.post("/registration", async (req, res) => {
  let { name, email, password, role } = req.body;
  const is_verified = false; // Set default verification status to false

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database (not verified yet)
    const result = await pool.query(
      "INSERT INTO all_users_data(name, email, password_hash, role, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, email, hashedPassword, role, is_verified]
    );

    const userId = result.rows[0].id;

    // Generate a verification link (you can pass user ID or email)
    const verificationLink = `https://e-commerce-app-jtd.onrender.com/verify?email=${encodeURIComponent(
      email
    )}`;

    // Send verification email
    const mailOptions = {
      from: '"Your App" <hrjayasuryasingh@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Registration successful. Check your email for verification.",
      userId,
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
app.get("/verify", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Invalid verification link" });
  }

  try {
    // Update the user's verification status in the database
    await pool.query(
      "UPDATE all_users_data SET is_verified = true WHERE email = $1",
      [email]
    );

    res.send("<h2>Email verified successfully! You can now log in.</h2>");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
});
app.post("/Seller/product/add", async (req, res) => {
  const { seller_id, name, description, category, price, stock, sizes, image } =
    req.body;
  if (
    !seller_id ||
    !name ||
    !description ||
    !category ||
    !price ||
    !stock ||
    !sizes ||
    !image
  ) {
    return res
      .status(400)
      .json({ message: "Please enter the details for all the fields" });
  }
  try {
    const sizesAvailable = JSON.stringify(["S", "M", "L", "XL"]);
    const result = await pool.query(
      "insert into products (seller_id,name,description,category ,price,stock,sizes,image) values($1,$2,$3,$4,$5,$6,$7,$8) returning *",
      [
        seller_id,
        name,
        description,
        category,
        price,
        stock,
        sizesAvailable,
        image,
      ]
    );
    res
      .status(200)
      .json({ message: "product added successfully", id: result.rows[0].id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.get("/user/getproducts/", async (req, res) => {
  // const offset = req.params.offset;
  try {
    const result = await pool.query(
      `SELECT p.id,u.name AS Seller, p.name as Name , p.description as Description, p.category as Category, p.price as Price, p.stock as Stock, p.sizes as Sizes, p.image as Image FROM products p JOIN all_users_data u ON p.seller_id = u.id`
    );
    const formattedRows = result.rows.map((row) => ({
      Product_id: row.id,
      Seller: row.seller,
      Name: row.name,
      Description: row.description,
      Category: row.category,
      Price: Number(row.price),
      Stock: row.stock,
      Sizes: row.sizes,
      Image: row.image,
    }));
    res.status(200).json({ Data: formattedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.get("/seller/getproducts/:seller_id/", async (req, res) => {
  const seller_id = req.params.seller_id;
  try {
    const result = await pool.query(
      `SELECT p.id as product_id,p.name as Name , p.description as Description, p.category as Category, p.price as Price, p.stock as Stock, p.sizes as Sizes, p.image as Image FROM products p WHERE p.seller_id = $1`,
      [seller_id]
    );
    const formattedRows = result.rows.map((row) => ({
      Product_id: row.product_id,
      Name: row.name,
      Description: row.description,
      Category: row.category,
      Price: Number(row.price),
      Stock: row.stock,
      Sizes: row.sizes,
      Image: row.image,
    }));
    res.status(200).json({ message: "this are the product", formattedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});
app.patch("/seller/editproduct/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: "Please enter a field to update" });
  }

  const normalizedUpdates = {};
  Object.keys(updates).forEach((key) => {
    normalizedUpdates[key.toLowerCase()] = updates[key];
  });

  if (normalizedUpdates["sizes"]) {
    normalizedUpdates["sizes"] = JSON.stringify(normalizedUpdates["sizes"]);
  }

  try {
    let Uquery = "UPDATE products SET ";
    const values = [];
    let index = 1;

    Object.keys(normalizedUpdates).forEach((key, i) => {
      Uquery += `${key} = $${index}`;
      values.push(normalizedUpdates[key]);
      if (i < Object.keys(normalizedUpdates).length - 1) {
        Uquery += ", ";
      }
      index++;
    });

    Uquery += ` WHERE id = $${index} RETURNING *;`;
    values.push(id);

    console.log("Executing Query:", Uquery, "Values:", values);
    const { rows } = await pool.query(Uquery, values);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or no changes made." });
    }

    const updatedProduct = rows[0];
    const formattedProduct = {
      Product_id: updatedProduct.id,
      Name: updatedProduct.name,
      Description: updatedProduct.description,
      Category: updatedProduct.category,
      Price: Number(updatedProduct.price),
      Stock: updatedProduct.stock,
      Sizes: updatedProduct.sizes,
      Image: updatedProduct.image,
    };

    res.status(200).json({ Updated_Data: formattedProduct });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/seller/deleteproduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("DELETE FROM products where id=$1", [id]);
    res
      .status(200)
      .json({ message: "the product is has be deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.post("/user/addorder/:sellername/:productid/:userid", async (req, res) => {
  const sellername = req.params.sellername;
  const pid = Number(req.params.productid);
  const uid = Number(req.params.userid);

  try {
    const r = await pool.query(
      "select id from all_users_data where name=$1 and role=$2",
      [sellername, "Seller"]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const sid = r.rows[0].id;
    const result = await pool.query(
      "INSERT into orders (product_id,user_id,seller_id) VALUES($1,$2,$3) RETURNING *",
      [pid, uid, sid]
    );
    res.status(200).json({
      message: "The Query Has Executed Successfully",
      Data: result.rows[0],
      // sellername: sellername,
      // sid: sid,
      // pid: pid,
      // uid: uid,
      // quantity: quantity,
      // price: price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.delete("/user/deleteorder/:orderid", async (req, res) => {
  const orderid = Number(req.params.orderid);
  try {
    const r = await pool.query("select status from orders where order_id=$1", [
      orderid,
    ]);
    if (r.rows[0].status != "Pending") {
      res.status(200).json({ message: "You cant delete the order " });
    } else {
      const result = await pool.query(
        "delete from orders where order_id=$1 returning *",
        [orderid]
      );
      res.status(200).json({
        message: "The order has been deleted successfully",
        DeletedData: result.rows[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/user/getorders/:userid", async (req, res) => {
  const user_id = Number(req.params.userid);

  try {
    const result = await pool.query(
      "SELECT o.*,p.price, p.name AS name,p.sizes,p.description ,p.image AS product_image, u.name AS seller FROM orders o JOIN products p ON o.product_id = p.id JOIN all_users_data u ON o.seller_id = u.id WHERE o.user_id = $1 ORDER BY CASE WHEN o.status = 'Pending' THEN 1 WHEN o.status = 'Dispatched' THEN 2 WHEN o.status = 'Declined' THEN 3 ELSE 4 END",
      [user_id]
    );
    res.status(200).json({
      message: "The data has been successfully retrived",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/seller/getorders/:sellerid", async (req, res) => {
  const seller_id = Number(req.params.sellerid);

  try {
    const result = await pool.query(
      "SELECT o.*, p.name AS name, p.image AS product_image, p.description, p.sizes, p.price FROM orders o JOIN products p ON o.product_id = p.id WHERE o.seller_id = $1 ORDER BY CASE WHEN o.status = 'Pending' THEN 1 WHEN o.status = 'Dispatched' THEN 2 WHEN o.status = 'Declined' THEN 3 ELSE 4 END",

      [seller_id]
    );
    if (result.rows.length == 0) {
      res.status(500).json({ message: "No orders found" });
    }
    res.status(200).json({
      message: "The data has been successfully retrived",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.patch("/seller/editproductstatus/:orderid", async (req, res) => {
  const orderid = Number(req.params.orderid);
  const { status } = req.body;

  try {
    const result = await pool.query(
      "update orders set status=$1 where order_id=$2 returning *",
      [status, orderid]
    );
    res.status(200).json({
      message: "the order has been updated",
      Updateddat: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.post("/user/addtocart/:pid/:uid", async (req, res) => {
  const uid = Number(req.params.uid);
  const pid = Number(req.params.pid);

  try {
    const result = await pool.query(
      "insert into cart (pid,uid) values($1,$2) returning *",
      [pid, uid]
    );
    res.status(200).json({
      message: "The Data Has Been added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/getcartproducts/:uid", async (req, res) => {
  const uid = Number(req.params.uid);

  try {
    const result = await pool.query(
      `SELECT cart.id as cid, cart.uid, cart.pid, products.*, all_users_data.name AS seller
   FROM cart 
   JOIN products ON cart.pid = products.id 
   JOIN all_users_data ON products.seller_id = all_users_data.id 
   WHERE cart.uid = $1 ORDER BY cart.created_at DESC`,
      [uid]
    );

    res
      .status(200)
      .json({ message: "Data has retrived Successfully", data: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/user/removecartitem/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      "delete from cart where id=$1 returning *",
      [id]
    );
    res
      .status(200)
      .json({ message: "the product has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
});
app.post("/user/addtowishlist/:pid/:uid", async (req, res) => {
  const uid = Number(req.params.uid);
  const pid = Number(req.params.pid);

  try {
    const result = await pool.query(
      "insert into wishlist (pid,uid) values($1,$2) returning *",
      [pid, uid]
    );
    res.status(200).json({
      message: "The Data Has Been added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/getwishlistproducts/:uid", async (req, res) => {
  const uid = Number(req.params.uid);

  try {
    const result = await pool.query(
      `SELECT wishlist.id as wishlist_id, wishlist.uid, wishlist.pid, products.*, all_users_data.name AS seller
   FROM wishlist 
   JOIN products ON wishlist.pid = products.id 
   JOIN all_users_data ON products.seller_id = all_users_data.id 
   WHERE wishlist.uid = $1 ORDER BY wishlist.created_at DESC `,
      [uid]
    );

    res
      .status(200)
      .json({ message: "Data has retrived Successfully", data: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/user/removewishlistitem/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(
      "delete from wishlist where id=$1 returning *",
      [id]
    );
    res
      .status(200)
      .json({ message: "the product has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM all_users_data WHERE email = $1 AND role = $2",
      [email, role]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or role mismatch" });
    }

    const user = result.rows[0];
    if (!user.is_verified) {
      return res.status(403).json({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      role: role,
      token: token,
      userId: user.id,
      username: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Insufficient permissions" });
    }
    next();
  };
};

app.get("/Seller", authenticateToken, authorizeRole("Seller"), (req, res) => {
  res.json({ message: "Welcome to the admin panel!" });
});

app.get("/User", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, user with ID: ${req.user.userId}` });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
