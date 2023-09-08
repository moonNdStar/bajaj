const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample user data
const userData = {
    user_id: 'monisha_nagpal_25122002',
    email: 'mn5864@srmist.edu.in',
    roll_number: 'RA2011030010046',
};

function isNumber(str) {
    return !isNaN(str);
}

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Extract numbers and alphabets
    const numbers = data.filter(item => isNumber(item));
    const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && !isNumber(item));

    // Find the highest alphabet
    const highest_alphabet = alphabets.sort((a, b) => b.localeCompare(a))[0];

    // Prepare response
    const response = {
        is_success: true,
        user_id: userData.user_id,
        email: userData.email,
        roll_number: userData.roll_number,
        numbers,
        alphabets,
        highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    };

    res.json(response);
});

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
    // GET request doesn't require any user input
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});