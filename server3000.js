const http = require('http');
const url = require('url');
const server = new http.Server(function(req, res){
    console.log ( req.headers );

    const urlParsed = url.parse(req.url, true);
    console.log(urlParsed);

    let userMess = [];

    function getForm() {
        let form = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Book</title>
            </head>
            <body>
                <h1>Guest Book</h1>
                <div id='posts'></div>
                <p>Hello, </p>`

        let mess = userMess.join('<br>');

        let form2 = `
                <form action='/get' method='get'>
                    <input type="text" name="username" placeholder="Name"/><br>
                    <input type="submit"/>
                </form>
            </body>
            </html>
            `
        return form+mess+form2;
    }



    if(urlParsed.pathname === '/echo' && urlParsed.query.message){
        res.setHeader('Cache-control', 'no-cache');
        res.setHeader("Set-Cookie", "login=ok");
        res.end(urlParsed.query.message);
    } else if(urlParsed.pathname === '/form') {
        res.end(getForm());
    } else if (urlParsed.pathname === '/get') {
        userMess.push(urlParsed.query.username);
        res.end(getForm());
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});


server.listen(3000, '127.0.0.1');
