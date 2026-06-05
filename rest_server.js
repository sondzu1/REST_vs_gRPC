const express = require('express');
const app = express();
const port = 3000;

// Endpoint lấy thông tin User
app.get('/users/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    name: 'Sinh vien INT4425',
    email: 'sinhvien@ptit.edu.vn'
  });
});

app.listen(port, () => {
  console.log(`[REST] Server đang chạy tại http://localhost:${port}`);
});