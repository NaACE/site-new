const { Router } = require('express');
const router = Router();
//const db = require('../db');
const ObjecId = require('mongodb').ObjectId;
const express = require("express");

// router.use(function (req, res, next) {
//     if (!req.session.user) {
//         console.log("Init session");
//         req.session.user = {}
//     }

//     next();
// });

router.use(function (req, res, next) {
    if (req.cookies['user']) {
        // 1. Пользователя в сесси нет - стучимся в бд и вытягиваем пользователя, добавляем в сессию
        // 2. Пользователь в сессии - ничего не делаем
        if (!req.session.user) {
            db.findById(req.cookies['user'], (err, user) => {
                if (err) {
                    console.error("user not found");
                    return;
                }
                console.log('user saved into session');
                req.session.user = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    console.log(req.session);

    //res.render('home', {
    //    name: req.session.user ? .username
    //});

    res.render('home');
});

router.get('/games', (req, res) => {
    res.render('games');
});

router.get('/top', (req, res) => {
    res.render('top');
});

router.get('/identification', (req, res) => {
    res.render('identification', {
        layout: false
    });
});

router.get('/virus', (req, res) => {
    res.render('virus');
});


router.post('/registration', express.json(), (req, res) => {
    db.registration(req.body, (err, r) => {
        if (err) {
            res.send({
                error: err
            });
            return;
        }
        res.send({
            success: 'success'
        });
    });
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.user = undefined;
    }
    if (req.cookies['user']) {
        res.cookie("user", req.cookies['user'], {
            maxAge: -1000
        });
    }
    res.redirect('/');
});

router.post('/login', express.json(), (req, res) => {
    console.log('login')
    db.login(req.body, (err, r) => {
        if (err) {
            res.send({
                error: err
            });
            return;
        }
        console.log('user found');
        console.dir(r);
        const id = r._id.toString();
        res.cookie("user", id, {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 4
        });
        res.send({
            success: 'success'
        });
    });
});


module.exports = router;