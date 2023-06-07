const db = require('../common/connection');

const Audio = function (audio) {
    this.id = audio.id;
    this.title = audio.title;
    this.audio_file = audio.audio_file;
    this.file_name = audio.file_name;
    this.lyrics = audio.lyrics;
    this.topic_id = audio.topic_id;
    this.status = audio.status;
}

Audio.getAudiosList = function (result) {
    db.query('SELECT * FROM audio', (err, rows) => {
        if (err) {
            result(null);
        } else {
            result(rows);
        }
    });
}

Audio.getAudioById = function (id, result) {
    db.query('SELECT audio.*, topic.name AS topic_name FROM audio JOIN topic ON audio.topic_id = topic.id WHERE id =?',
        [id], (err, rows) => {
            if (err) {
                result(null);
            } else {
                result(rows);
            }
        });
}

Audio.getAudioByTitle = function (title, result) {
    db.query("SELECT * FROM audio WHERE title =?", [title], (err, rows) => {
        if (err) {
            result(null);
        } else {
            result(rows);
        }
    })
}

Audio.getActiveAudiosByTopicId = function (topicId, result) {
    db.query('SELECT * FROM audio WHERE status = 1 AND topic_id =?',
        [topicId], (err, rows) => {
            if (err) {
                result(null);
            } else {
                result(rows);
            }
        });
}

Audio.addAudio = function (data, result) {
    db.query('INSERT INTO audio SET?', data, (err, row) => {
        if (err) {
            result(null);
        } else {
            result({ id: row.insertId, row: row });
        }
    });
}

Audio.updateAudio = function (data, result) {
    db.query('UPDATE audio SET title=?, audio_file=?, file_name=?, lyrics=?, topic_id=?, status=? WHERE id=?',
        [data.title, data.audio_file, data.file_name, data.lyrics, data.topic_id, data.status, data.id], (err, row) => {
            if (err) {
                result(null);
            } else {
                result(row);
            }
        });
}

module.exports = Audio;