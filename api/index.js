const express = require("express");
const bodyParser = require('body-parser');
const mysql2 = require("mysql2/promise"); // Using promise version for async/await support
const mysql = require("mysql2"); // Using promise version for async/await support
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

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
//otp verifications

function generateOtp() {
    // Generate a random number between 0 and 999999
    const randomNum = Math.floor(Math.random() * 1000000);

    // Pad the number with leading zeros if necessary to ensure it is 6 digits long
    const otp = String(randomNum).padStart(6, '0');

    return otp;
}

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        await pool.query('INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)', [email, otp, expiresAt]);

        const mailOptions = {
            from: 'jewwltest@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'OTP sent to email' });
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Failed to signup' });
    }
});

// Verify OTP route
app.post('/verify-otp', async (req, res) => {
    const { email, otp, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW()', [email, otp]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, password, verified,favourites) VALUES (?, ?, ?,?)', [email, hashedPassword, true,"[]"]);
        res.status(200).json({ success: true, message: 'User verified and created successfully' });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
});

// Resend OTP route
app.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await pool.query('INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)', [email, otp, expiresAt]);

        const mailOptions = {
            from: 'jewwltest@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'OTP resent to email' });
        });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Failed to resend OTP' });
    }
});

// Add to Favourites
// Add to Favourites
app.post('/add-favourite', async (req, res) => {
    const { email, productId } = req.body;
    
    try {
        await pool.query('UPDATE users SET favourites = JSON_ARRAY_APPEND(favourites, "$", ?) WHERE email = ?', [productId, email]);
        res.status(200).json({ message: 'Added to favourites' });
    } catch (error) {
        console.error("Error adding to favourites:", error);
        res.status(500).json({ message: 'Failed to add to favourites' });
    }
});

// Remove from Favourites
app.post('/remove-favourite', async (req, res) => {
    const { email, productId } = req.body;
    
    try {
        await pool.query('UPDATE users SET favourites = JSON_REMOVE(favourites, JSON_UNQUOTE(JSON_SEARCH(favourites, "one", ?))) WHERE email = ?', [productId, email]);
        res.status(200).json({ message: 'Removed from favourites' });
    } catch (error) {
        console.error("Error removing from favourites:", error);
        res.status(500).json({ message: 'Failed to remove from favourites' });
    }
});

// Fetch user details (including favourites)
app.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(users[0]);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
});


// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(users)
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ success: true, token, email: user.email });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
});


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
app.post("/penquire", async (req, res) => {
    console.log(req.body)
    const { product_id, customer_name, customer_email, customer_number, description, metal } = req.body;

    try {
        // Insert enquiry into the database
        await pool.query(
            'INSERT INTO enquiries (product_id, customer_name, customer_email, customer_number, description) VALUES (?, ?, ?, ?, ?)',
            [product_id, customer_name, customer_email, customer_number, description]
        );

        // Send email notification
        const mailOptions = {
            from: 'jewwltest@gmail.com', // replace with your email
            to: 'mohamedfawazshahulameed@gmail.com',
            subject: 'New Enquiry Received',
            text: `Product ID: ${product_id} on Metal: ${metal}\nCustomer Name: ${customer_name}\nCustomer Email: ${customer_email}\nDescription: ${description}`
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

// POST endpoint to handle Chitfund
app.post("/chitenquire", async (req, res) => {
    console.log(req.body)
    const { customer_number, customer_name, customer_email, description } = req.body;

    try {
        // Insert enquiry into the database
        await pool.query(
            'INSERT INTO chitenquiries (customer_name, customer_email, customer_number, description) VALUES (?, ?, ?, ?)',
            [customer_name, customer_email, customer_number, description]
        );

        // Send email notification
        const mailOptions = {
            from: 'jewwltest@gmail.com', // replace with your email
            to: 'mohamedfawazshahulameed@gmail.com',
            subject: 'New Chitfund Enquiry Received',
            text: `Customer Name: ${customer_name}\nCustomer Number: ${customer_number}\nCustomer Email: ${customer_email}\nDescription: ${description}`
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
        // Check if a record for the date already exists for gold
        if (gold_rate !== undefined) {
            const [goldRows] = await pool.query('SELECT * FROM gold_rate WHERE date = ? AND metal = ?', [date, 'gold']);
            if (goldRows.length > 0) {
                await pool.query('UPDATE gold_rate SET rates = ? WHERE date = ? AND metal = ?', [gold_rate, date, 'gold']);
            } else {
                await pool.query('INSERT INTO gold_rate (date, metal, rates) VALUES (?, ?, ?)', [date, 'gold', gold_rate]);
            }
        }

        // Check if a record for the date already exists for silver
        if (silver_rate !== undefined) {
            const [silverRows] = await pool.query('SELECT * FROM gold_rate WHERE date = ? AND metal = ?', [date, 'silver']);
            if (silverRows.length > 0) {
                await pool.query('UPDATE gold_rate SET rates = ? WHERE date = ? AND metal = ?', [silver_rate, date, 'silver']);
            } else {
                await pool.query('INSERT INTO gold_rate (date, metal, rates) VALUES (?, ?, ?)', [date, 'silver', silver_rate]);
            }
        }

        res.json({ message: 'Rate updated or inserted successfully' });
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
// app.get("/gf/:metal",(req,res)=>{
//     const {metal}=req.params
//     console.log(metal)
//     pool.query("select name from products where metal = ?",[metal],(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.json(result)
//         }
//     })
// })
app.get("/gf/:metal", (req, res) => {
    const { metal } = req.params;
    console.log(`Received request for metal: ${metal}`);

    pool2.query("SELECT type,category FROM products WHERE metal = ?", [metal], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(result);
        }
    });
}); 
app.get("/search",async (req,res)=>{
    try{
const response= await pool.query("select distinct name, id, metal from products");
res.json(response[0])
    }
    catch(err){
        res.send(err)
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
