import http from 'http';
import fs from 'fs/promises';
 

const server = http.createServer(async (req, res) => {
    const homePage = await fs.readFile('./views/home/index.html', 'utf-8');
    
    if(req.url === '')

    
    res.writeHead(200, { 'content-type': 'text/html'})
    res.write(homePage)
 
    res.end();
})


 
server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));