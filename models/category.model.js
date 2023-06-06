const db = require('../common/connection');

const Category = function (category) {
    this.id = category.id;
    this.name = category.name;
    this.status = category.status;
}

Category.getCategoriesList = function (result) {
    db.query("SELECT * FROM category", function (err, rows) {
        if (err) {
            result(null);
        } else {
            result(rows);
        }
    });
}

Category.getActiveCategoriesList = function (result) {
    db.query("SELECT * FROM category WHERE status =?", [1], function (err, rows) {
        if (err) {
            result(null);
        } else {
            result(rows);
        }
    });
};

Category.getByName = function(name, result) {
    db.query("SELECT * FROM category WHERE name = ?", [name], function(err, rows) {
        if (err) {
            result(null);
        } else {
            result(rows);
        }
    });
}

Category.addCategory = function (data, response) {
    db.query("INSERT INTO category SET ?", data, function (err, newCategory) {
        if (err) {
            response(null);
        } else {
            response({ id: newCategory.insertId, category: newCategory });
        }
    });
}

Category.updateCategory = function (data, response) {
    db.query("UPDATE category SET name=?, status=? WHERE id =?",
        [data.name, data.status, data.id], function (err, updatedCategory) {
            if (err) {
                response(null);
            } else {
                response(updatedCategory);
            }
        });
}

module.exports = Category;