const db = require('../common/connection');

const Audio = function (audio) {
    this.id = audio.id;
    this.title = audio.title;
    this.audio_file = audio.audio_file;
    this.lyrics = audio.lyrics;
    this.topic_id = audio.topic_id;
    this.status = audio.status;
}

Audio.getAudiosList = function (result) {
    db.query('SELECT * FROM audio', (err, rows) => {
        if (err) {
            result({ err: "Error getting audios list" });
        } else {
            result(rows);
        }
    });
}

Audio.getAudioById = function (id, result) {
    db.query('SELECT audio.*, topic.name AS topic_name FROM audio JOIN topic ON audio.topic_id = topic.id WHERE id =?',
        [id], (err, rows) => {
            if (err) {
                result({ err: "Error getting audio by id" });
            } else {
                result(rows[0]);
            }
        });
}

Audio.getActiveAudiosByTopicId = function (topicId, result) {
    db.query('SELECT * FROM audio WHERE status = 1 AND topic_id =?',
        [topicId], (err, rows) => {
            if (err) {
                result({ err: "Error getting active audios by topic id" });
            } else {
                result(rows);
            }
        });
}

Audio.addAudio = function (data, result) {
    db.query('INSERT INTO audio SET?', data, (err, row) => {
        if (err) {
            result({ err: "Error adding audio" });
        } else {
            result({ id: row.insertId, row: row });
        }
    });
}

Audio.updateAudio = function (data, result) {
    db.query('UPDATE audio SET title=?, audio_file=?, lyrics=?, topic_id=?, status=? WHERE id=?',
        [data.title, data.audio_file, data.lyrics, data.topic_id, data.status, data.id], (err, row) => {
            if (err) {
                result({ err: "Error updating audio" });
            } else {
                result(row);
            }
        });
}

module.exports = Audio;