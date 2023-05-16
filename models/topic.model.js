const db = require('../common/connection');

const Topic = function (topic) {
    this.id = topic.id;
    this.name = topic.name;
    this.image = topic.image;
    this.category_id = topic.category_id;
    this.status = topic.status;
}

Topic.getTopicsList = function (result) {
    db.query('SELECT * FROM topic', function (err, topic) {
        if (err) {
            result({ err: "Error getting topics list" });
        } else {
            result(topic);
        }
    });
}

Topic.getById = function (id, result) {
    db.query("SELECT topic.*, category.name AS category_name FROM topic JOIN category ON topic.category_id = category.id WHERE topic.id =?",
        [id], function (err, topic) {
            if (err || topic.length === 0) {
                result({ err: "Error getting topic by id" });
            } else {
                result(topic[0]);
            }
        });
};

Topic.addTopic = function (data, response) {
    db.query("INSERT INTO topic SET ?", data, function (err, topic) {
        if (err) {
            response({ err: "Error inserting topic" });
        } else {
            response({ id: topic.insertId, topic: topic });
        }
    });
}

Topic.updateTopic = function (data, response) {
    db.query("UPDATE topic SET name=?, image=?, category_id=?, status=? WHERE id =?",
        [data.name, data.image, data.category_id, data.status, data.id], function (err, topic) {
            if (err) {
                response({ err: "Error updating topic" });
            } else {
                response(topic);
            }
        });
}

module.exports = Topic;