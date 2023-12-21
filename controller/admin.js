
require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const encrypt2 = require("../helpers/encrypt")
const User = require('../model/user')
const Admin = require('../model/admin')
const Book = require('../model/book')
const Book_req = require('../model/book_req');
const book_req = require("../model/book_req");



exports.admin_login = async (req, res) => {

    try {
        const { email, password, pattern } = req.body;

        if (!(email && password)) {
            res.json({ status: false, messag: "All input is required" });
        }

        encryptedPassword = encrypt2.aesEncrypt(password)
        const admin = await Admin.findOne({ admin_email: email, password: encryptedPassword, pattern: pattern });
        if (admin) {

            const token = jwt.sign(
                { admin_id: admin._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            res.json({ status: true, message: "Login successfull!", data: token })
        }
        res.json({ status: false, message: "Invalid Credentials" })
    } catch (err) {
        console.log(err);
    }
}


exports.create_book = async (req, res) => {
    try {

        let reqData = req.body
        let obj = {
            book_name: (reqData.book_name).toLowerCase(),
            tittle: reqData.tittle,
            status: reqData.status
        }

        let checkBookExist = await Book.find({ book_name: (reqData.book_name).toLowerCase() })


        if (checkBookExist.length > 0) {
            return res.json({ status: false, message: "Book already exist" })
        } else {

            let createBook = await Book.create(obj)

            if (createBook) {
                return res.json({ status: true, message: "Book created successfully!!!" })
            } else {
                return res.json({ status: false, message: "Something went wrong" })
            }
        }
    } catch (e) {
        console.log(e)
    }
}

exports.view_books = async (req, res) => {

    try {

        let reqData = req.body
        let page = reqData.page
        let pageSize = reqData.pageSize


        const books = await Book.aggregate([
            {
                $project: {
                    book_name: 1,
                    tittle: 1,
                    status: 1,
                    created_at: 1
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $facet: {
                    pagination: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }]
                }
            },
            {
                $project: { data: 1, pagination: { $arrayElemAt: ["$pagination", 0] } }
            }
        ])

        res.json({ status: true, data: books })

    } catch (e) {

        console.log(e)
    }
}

exports.update_books = async (req, res) => {
    try {

        let reqData = req.body
        let checkBookExist = await Book.find({ book_name: (reqData.book_name).toLowerCase(), _id: { $eq: req.body_id } })

        if (checkBookExist.length > 0) {
            return res.json({ status: false, message: "Book already exist" })
        } else {
            let obj = {
                book_name: (reqData.book_name).toLowerCase(),
                tittle: reqData.tittle,
                status: reqData.status
            }

            let update_book = await Book.updateOne({ _id: req.body._id }, { $set: obj })
            if (update_book) {
                return res.json({ status: true, message: "Book details updated successfully!!!" })
            } else {
                return res.json({ status: false, message: "Something went wrong" })
            }
        }

    } catch (e) {

    }
}

exports.delete_book = async (req, res) => {
    try {

        let deleteBook = await Book.deleteOne({ _id: req.body._id })
        if (deleteBook) {
            return res.json({ status: true, message: "Book deleted successfully!!!" })
        } else {
            return res.json({ status: false, message: "Something went wrong" })
        }
    } catch (e) {
        console.log(e)
    }
}

exports.admin_list_book_req = async (req, res) => {

    try {

        let reqData = req.body
        let page = reqData.page
        let pageSize = reqData.pageSize


        const book_requests = await Book_req.aggregate([
            {
                $project: {
                    book_name: 1,
                    tittle: 1,
                    status: 1,
                    username: 1,
                    email: 1,
                    created_at: 1
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $facet: {
                    pagination: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }]
                }
            },
            {
                $project: { data: 1, pagination: { $arrayElemAt: ["$pagination", 0] } }
            }
        ])

        res.json({ status: true, data: book_requests })

    } catch (e) {

        console.log(e)
    }


}


exports.admin_approve_book_req = async (req, res) => {
    try {

        let reqData = req.body
        let findRequest = await Book.findOne({ _id: req.body.book_id }, { status: 1, book_name: 1 })

        if (findRequest.status == false) {
            res.json({ status: false, message: "Currently this book is not available!!!" })
        } else {

            let approve_request = await book_req.updateOne({ _id: req.body._id }, {
                $set: { status: reqData.status }
            })

            if (approve_request) {
                let message
                if (reqData.status == 1) {
                    message = findRequest.book_name + " approved to the user successfully!!!"
                } else {
                    message = findRequest.book_name + " cancelled to the user successfully!!!"

                }

                res.json({ status: true, message: message })
            } else {
                res.json({ status: false, message: "Something went wrong" })

            }
        }
    } catch (e) {
        console.log(e)
    }
}

