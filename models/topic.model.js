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
            result(null);
        } else {
            result(topic);
        }
    });
}

Topic.getByName = function (name, result) {
    db.query("SELECT * FROM topic WHERE name =?",
        [name], function (err, topic) {
            if (err) {
                result(null);
            } else {
                result(topic);
            }
        });
};

Topic.getTopicsListByCategoryId = function (categoryId, result) {
    db.query("SELECT * FROM topic WHERE category_id =?",
        [categoryId], function (err, topics) {
            if (err) {
                result(null);
            } else {
                result(topics);
            }
        });
};

Topic.addTopic = function (data, response) {
    db.query("INSERT INTO topic SET ?", [data], function (err, topic) {
        if (err) {
            response(null);
        } else {
            response({ id: topic.insertId, topic: topic });
        }
    });
}

Topic.updateTopic = function (data, response) {
    db.query("UPDATE topic SET name=?, image=?, category_id=?, status=? WHERE id =?",
        [data.name, data.image, data.category_id, data.status, data.id], function (err, topic) {
            if (err) {
                response(null);
            } else {
                response(topic);
            }
        });
}

module.exports = Topic;