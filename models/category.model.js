const db = require('../common/connection');

const Category = function (category) {
    this.id = category.id;
    this.name = category.name;
    this.status = category.status;
}

Category.getCategoriesList = function (result) {
    db.query("SELECT * FROM category", function (err, rows) {
        if (err) {
            result({ err: "Error getting categories list" });
        } else {
            result(rows);
        }
    });
}

Category.getById = function (id, result) {
    db.query("SELECT * FROM category WHERE id =?", [id], function (err, rows) {
        if (err || rows.length === 0) {
            result({ err: "Error getting category by id" });
        } else {
            result(rows[0]);
        }
    });
};

Category.addCategory = function (data, response) {
    db.query("INSERT INTO category SET ?", data, function (err, newCategory) {
        if (err) {
            response({ err: "Error inserting category" });
        } else {
            response({ id: newCategory.insertId, category: newCategory });
        }
    });
}

Category.updateCategory = function (data, response) {
    db.query("UPDATE category SET name=?, status=? WHERE id =?",
        [data.name, data.status, data.id], function (err, updatedCategory) {
            if (err) {
                response({ err: "Error updating category" });
            } else {
                response(updatedCategory);
            }
        });
}