const express = require("express");
const mysql2 = require("mysql2/promise"); // Using promise version for async/await support
const mysql = require("mysql2"); // Using promise version for async/await support
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const pool2=mysql.createPool("mysql://root:afMCsepeggWTmNtgFdMoWqdccCNjPcxr@monorail.proxy.rlwy.net:36670/railway")
const pool = mysql2.createPool({
    connectionLimit: 10,
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'afMCsepeggWTmNtgFdMoWqdccCNjPcxr',
    port: 36670,
    database: 'railway'
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jewwltest@gmail.com', // replace with your email
        pass: 'vtgzjrypgmxoqseo' // replace with your email password
    }
});
// Configure multer for file uploads

// Database connection


// POST endpoint to handle enquiries
app.post("/enquire", upload.single('file'), async (req, res) => {
    const { fullName, number, email, description } = req.body;
    const file = req.file;

    try {
        // Insert enquiry into the database
        await pool.query(
            'INSERT INTO cenquiries (customer_name, customer_email, description) VALUES (?, ?, ?)',
            [fullName, email, description]
        );

        // Email options for admin
        const mailOptionsAdmin = {
            from: 'jewwltest@gmail.com',
            to: 'mohamedfawazshahulameed@gmail.com',
            subject: 'New Enquiry Received',
            text: `Full Name: ${fullName}\nNumber: ${number}\nEmail: ${email}\nDescription: ${description}`,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path
                }
            ]
        };

        // Email options for user
        const mailOptionsUser = {
            from: 'jewwltest@gmail.com',
            to: email,
            subject: 'Enquiry Received',
            text: `Dear ${fullName},\n\nWe have received your enquiry. We will get back to you soon.\n\nBest regards,\nJewwl Team`,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path
                }
            ]
        };

        // Send email to admin
        transporter.sendMail(mailOptionsAdmin, (error, info) => {
            if (error) {
                console.error("Error sending email to admin:", error);
                return res.status(500).json({ message: "Failed to send email to admin" });
            }
            console.log('Admin Email sent: ' + info.response);

            // Send email to user
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    console.error("Error sending email to user:", error);
                    return res.status(500).json({ message: "Failed to send email to user" });
                }
                console.log('User Email sent: ' + info.response);

                // Delete the file after sending emails
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Error deleting the file:", err);
                        return res.status(500).json({ message: "Failed to delete the file" });
                    }
                    console.log('File deleted successfully');
                    res.status(200).json({ message: 'Enquiry submitted successfully' });
                });
            });
        });
    } catch (error) {
        console.error("Error handling enquiry:", error);
        res.status(500).json({ message: 'Failed to handle enquiry' });
    }
});

// POST endpoint to handle enquiries
app.post("/enquire", async (req, res) => {
    console.log(req.body)
    const { product_id, customer_name, customer_email, description } = req.body;

    try {
        // Insert enquiry into the database
        await pool.query(
            'INSERT INTO enquiries (product_id, customer_name, customer_email, description) VALUES (?, ?, ?, ?)',
            [product_id, customer_name, customer_email, description]
        );

        // Send email notification
        const mailOptions = {
            from: 'jewwltest@gmail.com', // replace with your email
            to: 'mohamedfawazshahulameed@gmail.com',
            subject: 'New Enquiry Received',
            text: `Product ID: ${product_id}\nCustomer Name: ${customer_name}\nCustomer Email: ${customer_email}\nDescription: ${description}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Failed to send email" });
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(200).json({ message: 'Enquiry submitted successfully' });
    } catch (error) {
        console.error("Error handling enquiry:", error);
        res.status(500).json({ message: 'Failed to handle enquiry' });
    }
});

// Existing endpoints
app.post("/gr", async (req, res) => {
    const { metal, rate } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    try {
        const [rows] = await pool.query('SELECT * FROM gold_rate WHERE date = ? AND metal = ?', [date, metal]);

        if (rows.length > 0) {
            await pool.query('UPDATE gold_rate SET rates = ? WHERE date = ? AND metal = ?', [rate, date, metal]);
            res.json({ message: 'Rate updated successfully' });
        } else {
            await pool.query('INSERT INTO gold_rate (date, metal, rates) VALUES (?, ?, ?)', [date, metal, rate]);
            res.json({ message: 'Rate inserted successfully' });
        }
    } catch (error) {
        console.error("Error updating or inserting rate:", error);
        res.status(500).json({ message: 'Failed to update or insert rate' });
    }
});

app.post("/addproduct", async (req, res) => {
    const { productName, productDesc, category, type, price, weight, image1, image2, image3, image4, carat, metal } = req.body;

    try {
        // Insert product into the database
        await pool.query(
            'INSERT INTO products (name, description, category, type, carat, metal, making_charges, weight, imagelink1, imagelink2, imagelink3, imagelink4) VALUES (?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?)',
            [productName, productDesc, category, type, carat ,metal,price, weight, image1, image2, image3, image4]
        );

        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: 'Failed to add product' });
    }
});

app.get("/gr/:date/:metal", async (req, res) => {
    const { date, metal } = req.params;
console.log(metal)
    try {
        const [rows] = await pool.query(
            'SELECT rates FROM gold_rate WHERE date <= ? AND metal = ? ORDER BY date DESC, id DESC LIMIT 1',
            [date, metal]
        );

        if (rows.length > 0) {
            const rates = rows[0].rates;
            res.status(200).json({ rates });
        } else {
            res.status(404).json({ message: `Rates not found for date ${date} and metal ${metal}` });
        }
    } catch (error) {
        console.error("Error fetching rates:", error);
        res.status(500).json({ message: "Failed to fetch rates" });
    }
});


app.get("/getproduct/:metal", (req, res) => {
    const metal = req.params.metal;

    pool2.query("SELECT * FROM products WHERE metal = ?", [metal], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving products");
        } else {
            res.json(result);
            console.log(result);
        }
    });
});


app.get("/gp/:id", (req, res) => {
    const { id } = req.params
    pool2.query("select * from products where id=?", [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
