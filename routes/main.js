const Router = require('express');
const router = Router();
const db = require('../mysql');
const express = require("express");

/*router.use(function (req, res, next) { // Сохранение в cooki данных 
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
});*/

/* Страницы */
router.get('/', (req, res) => { // Домашняя 
    console.log(req.session);
    res.render('home');
});
router.get('/games', (req, res) => { // Все игры 
    res.render('games');
});
router.get('/top', (req, res) => { // Топ игроков 
    res.render('top');
});
router.get('/virus', (req, res) => { // Единственная игра
    res.render('virus');
});
router.get('/cabinet', (req, res) => { // Личный кабинет игрока 
    res.render('cabinet');
});
router.get('/identification', (req, res) => { // Вход и регистрация
    res.render('identification', {
        layout: false
    });
});

/* Запросы со страницы identification ( !!! Надо по удалять лишнее!!! ) */
router.post('/sign_in', express.json(), (req, res) => {
    db.sign_in(req.body, (err, r) => {
        if (err) {
            res.send({
                error: err
            });
            return;
        } else {
            res.send({
                success: 'success'
            });
        }
    })
});
router.post('/login', express.json(), (req, res) => {
    db.login(req.body, (err, r) => {
        if (err) {
            res.send({
                error: err
            });
        } else {
            res.send({
                success: 'success'
            });
        }

    });
});


module.exports = router;