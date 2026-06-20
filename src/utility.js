import fs from 'fs/promises';
import breeds from './breeds.js';
import {v4} from 'uuid';

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

export function addBreed(breed) {
    const newBreed = {
        id: v4(),
        breed
    }
    breeds.push(newBreed);
};

export function readBreed() {
    return breeds;
}