const http = require('http');
const fs = require('fs');
const path  = require('path');

http.createServer((req, res) =>{
    
    if(req.method == 'GET'){
        
            if(req.url == '/'){
        fs.readFile('./index.html', 'UTF-8', (err, html) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }else if(req.url.match(/.css$/)){
        const reqPath = path.join(__dirname, req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if(req.url.match(/.js$/)){
        const reqPath = path.join(__dirname, req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/js'});
        fileStream.pipe(res);
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }
        
        
        
        
        
    }else if(req.method == 'POST'){
        
        let body = '';
        
        req.on('data', chunk =>{body+= chunk;});
        req.on('end', () =>{
                
               res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name"viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Formulario</title>
    </head>
    <body>
        <h1>Tarea actual</h1>
<p>${body}</p>  
    </body>
</html>`);
               
               });
        
    }
    
}).listen(3000);

console.log('Servidor inciiado');