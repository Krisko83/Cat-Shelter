import fs from 'fs/promises'; 

export async function readHtmlFile(path) {
    const htmlFile = await fs.readFile(path, 'utf-8');

    return htmlFile;
};

export function writeHtmlResponse(res, htmlFile) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(htmlFile);

    return res.end();
};

export async function readCssFile(path) {
    const cssFile = await fs.readFile(path, 'utf-8');
    return cssFile;
};

export function writeCssResponce(res, cssFile) {
    res.writeHead(200, { 'Content-type': 'text/css' });
    res.write(cssFile);

    return res.end();
};

export function readFormData(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', async () => {
            const formData = new URLSearchParams(body);
            resolve(formData)
        })
    });
};

export async function renderNotFound() {
    return await readHtmlFile('./views/notFound.html');

};

