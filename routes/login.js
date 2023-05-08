const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/users")
const bcrypt = require("bcrypt");

router.use(bodyParser.json())

router.post("/register", body('email').isEmail(), body('name').isAlpha(),
    body('password').isLength({ min: 6, max: 16 }), async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { name, email, password } = req.body;

            let user = await User.findOne({ email });

            if (user) {
                return res.status(404).json({
                    status: "Failed",
                    message: "Email already exists"
                });
            }

            // Hash the password before saving to the database
            bcrypt.hash(password, 10, async function (err, hash) {

                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: err.message
                    });
                }
                // console.log(err, hash );

                const user = await User.create({
                    name,
                    email,
                    password: hash
                })
                return res.json({
                    status: "Success",
                    user
                })
            })
        } catch (e) {
            res.status(500).json({
                status: "Failed",
                message: e.message
            })
        }

        // user = await User.create(req.body);

        // res.json({
        //     "status": "Success",
        //     user
        // });
        //
    })

//Login the users.

router.post("/login", body('email').isEmail(), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User doesnt exist"
            });
        }

        // Compare the password with hash password.
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                });
            }
            if (result) {
                res.status(200).json({
                    status: "Success",
                    message: "Login Successfully"
                });
            } else {
                 res.status(401).json({
                    status: "Failed",
                    message: "Invalid Credentials !! Please provide correct email and password"
                });
            }
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

    // user = await User.create(req.body);

    // res.json({
    //     "status": "Success",
    //     user
    // });
    //
})

router.get("/register", (req, res) => {
    res.send("OK")
})

module.exports = router;