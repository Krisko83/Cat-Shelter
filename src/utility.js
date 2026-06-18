import fs from 'fs/promises';

export async function readHtmlFile(path) {
    const htmlFile = await fs.readFile(path, 'utf-8');
    return htmlFile;
};

export function writeHtmlResponse(res, htmlFile) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(htmlFile);

    return res.end();
}

export async function writeCssResponce(res, cssFile) {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(cssFile);

    return res.end();
}