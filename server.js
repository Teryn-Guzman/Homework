import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
app.use(express.static(path.join(process.cwd(), 'public')));
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
