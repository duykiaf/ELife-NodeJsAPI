var categoryModel = require('../models/category.model');

exports.getCategoriesList = function (req, res) {
    categoryModel.getCategoriesList(function (data) {
        res.json(data);
    })
}

exports.getById = function (req, res) {
    categoryModel.getById(req.params.id, function (data) {
        res.json(data);
    });
}

exports.getByName = function (req, res) {
    categoryModel.getByName(req.params.name, function (data) {
        res.json(data);
    });
}

exports.addCategory = function (req, res) {
    var data = req.body;
    categoryModel.addCategory(data, function (response) {
        res.json(response);
    });
}

exports.updateCategory = function (req, res) {
    var data = req.body;
    categoryModel.updateCategory(data, function (response) {
        res.json(response);
    });
}