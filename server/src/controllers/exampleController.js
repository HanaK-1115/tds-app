const { Pool } = require('pg');
const pool = new Pool();

exports.getExamples = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM examples');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createExample = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO examples (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating example', error: err });
    }
};