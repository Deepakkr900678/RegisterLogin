const express = require("express")
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const User = require("../models/users")

//READ OPERATION for all the users.
router.get("/users", async (req, res) => {
    try {
        //write the code to fetch all the users
        const users = await User.find();
        res.status(200).json({
            status: "Success",
            data: users
        })

    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        });
    }
})

//READ OPERATION for specific users.
router.get("/users/:id", async (req, res) => {
    try {
        const users = await User.find({ _id: req.params.id });

        res.status(200).json({
            status: "Success",
            data: users
        })

    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        });
    }
})

//CREATE OPERATIONS for all the users
router.post("/users", async (req, res) => {
    try {
        // console.log(req.body)
        // const users = await User.create({
        //     name:req.body.name,
        //     email:req.body.email,
        //     age:req.body.age,
        // });

        const users = await User.create(req.body);
        res.status(200).json({
            status: "Success",
            users
        })

    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        });
    }
})

//UPDATE OPERATIONS---Update the exesting data
router.put("/users/:id", async (req, res) => {
    try {
        //Code to update the document.
        const users = await User.updateOne({ _id: req.params.id }, req.body);

        res.status(200).json({
            status: "Success",
            users
        })

    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        });
    }
})

//DELETE OPERATIONS---Delete the specific users.
router.delete("/users/:id", async (req, res) => {
    try {
        //Code to delete the document.
        const users = await User.deleteOne({ _id: req.params.id });

        res.status(200).json({
            status: "Success",
            users
        })

    } catch (e) {
        res.status(404).json({
            status: "Failed",
            message: e.message
        });
    }
})

router.get("*", (req, res) => {
    res.status(404).json({
        status: "Failed",
        message: "Invalid Request"
    });
})

module.exports = router;