const express = require('express');
const bodyParser = require('body-parser');
const db = require('../models/db');

const router = express.Router();
router.use(bodyParser.json());

// GET /dosen
router.get('/', (req, res) => {
    db.query('SELECT * FROM dosen', (error, results) => {
        if (error) {
            console.error('Error fetching dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

// GET /dosen/:nid
router.get('/:nid', (req, res) => {
    const dosenNid = req.params.nid;
    db.query('SELECT * FROM dosen WHERE NID = ?', [dosenNid], (error, results) => {
        if (error) {
            console.error('Error fetching dosen', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Dosen not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// POST /dosen
router.post('/', (req, res) => {
    const { NID, Nama, Gender, Bidang, Alamat } = req.body;
    db.query('INSERT INTO dosen (NID, Nama, Gender, Bidang, Alamat) VALUES (?, ?, ?, ?, ?)',
        [NID, Nama, Gender, Bidang, Alamat], (error) => {
            if (error) {
                console.error('Error creating dosen', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Dosen created successfully' });
            }
        }
    );
});

// PUT /dosen/:nid
router.put('/:nid', (req, res) => {
    const dosenNid = req.params.nid;
    const { Nama, Gender, Bidang, Alamat } = req.body;
    db.query('UPDATE dosen SET Nama = ?, Gender = ?, Bidang = ?, Alamat = ? WHERE NID = ?',
        [Nama, Gender, Bidang, Alamat, dosenNid], (error) => {
            if (error) {
                console.error('Error updating dosen', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Updating dosen successfully' });
            }
        });
});

// DELETE /dosen/:nid
router.delete('/:nid', (req, res) => {
    const dosenNid = req.params.nid;
    db.query('DELETE FROM dosen WHERE NID = ?', [dosenNid], (error, results) => {
        if (error) {
            console.error('Error deleting dosen', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Dosen not found' });
        } else {
            res.json({ message: 'Dosen deleted successfully' });
        }
    });
});

module.exports = router;