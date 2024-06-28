const express = require("express");
const mysql2 = require("mysql2/promise"); // Using promise version for async/await support
const mysql = require("mysql2"); // Using promise version for async/await support
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
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
        pass: '' // replace with your email password
    }
});

// POST endpoint to handle enquiries
app.post("/enquire", async (req, res) => {
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
    const { gold_rate, silver_rate } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    try {
        const [rows] = await pool.query('SELECT * FROM gold_rate WHERE date = ?', [date]);

        if (rows.length > 0) {
            await pool.query('UPDATE gold_rate SET gold_rate = ?, silver_rate = ? WHERE date = ?', [gold_rate, silver_rate, date]);
            res.json({ message: 'Rates updated successfully' });
        } else {
            await pool.query('INSERT INTO gold_rate (date, gold_rate, silver_rate) VALUES (?, ?, ?)', [date, gold_rate, silver_rate]);
            res.json({ message: 'Rates inserted successfully' });
        }
    } catch (error) {
        console.error("Error updating or inserting rates:", error);
        res.status(500).json({ message: 'Failed to update or insert rates' });
    }
});
app.post("/addproduct", async (req, res) => {
    const { productName, productDesc, category, type, price, weight, image1, image2, image3, image4 } = req.body;

    try {
        // Insert product into the database
        await pool.query(
            'INSERT INTO products (name, description, category, type, making_charges, weight, imagelink1, imagelink2, imagelink3, imagelink4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [productName, productDesc, category, type, price, weight, image1, image2, image3, image4]
        );

        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: 'Failed to add product' });
    }
});

app.get("/gr/:date", async (req, res) => {
    const { date } = req.params;

    try {
        const [goldRows] = await pool.query('SELECT gold_rate FROM gold_rate WHERE date <= ? ORDER BY date DESC, id DESC LIMIT 1', [date]);
        const [silverRows] = await pool.query('SELECT silver_rate FROM gold_rate WHERE date <= ? ORDER BY date DESC, id DESC LIMIT 1', [date]);

        if (goldRows.length > 0 && silverRows.length > 0) {
            const gold_rate = goldRows[0].gold_rate;
            const silver_rate = silverRows[0].silver_rate;
            res.status(200).json({ gold_rate, silver_rate });
        } else {
            res.status(404).json({ message: `Gold and silver rates not found for date ${date}` });
        }
    } catch (error) {
        console.error("Error fetching rates:", error);
        res.status(500).json({ message: "Failed to fetch gold and silver rates" });
    }
});

app.get("/getproduct/", (req, res) => {
    pool2.query("select * from products", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

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
