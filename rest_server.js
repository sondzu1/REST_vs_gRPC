const express = require('express');
const app = express();

app.get('/users/1', (req, res) => {
    res.json({ id: '1', name: 'User 1', email: 'user1@example.com' });
});

app.listen(3000, '127.0.0.1', () => {
    console.log("REST Server (1 User) đang chạy tại http://127.0.0.1:3000");
});