import http from 'http';
import fs from 'fs/promises';

const server = http.createServer((req, res) => {
    // const homePage = fs.readFile('./views/home/index.html')
    res.write('hello')
 
    res.end();
})


 
server.listen(5001, () => console.log('Server is running on http://localhost:5000/'));