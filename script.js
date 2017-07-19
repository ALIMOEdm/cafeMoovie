const https = require('https');
const md5 = require('md5');

global.serverLog = "";
process.stdout.write = (function(write) {
    return function(string, encoding, fileDescriptor) {
        global.serverLog = string;
        write.apply(process.stdout, arguments);
    };
})(process.stdout.write);

const options = {
    hostname: 'cafemovie.me',
    port: 443,
    path: '/movie/dead-south-qnrYWqw7/watch',
    method: 'GET',
    headers: {
        'Upgrade-Insecure-Requests': 1
    }
};

var req1 = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    var cookieStr = res.headers['set-cookie'][0].split('; ')[0];

    var response = '';

    res.on('data', (d) => {
        response += d.toString('utf8');
        if (response.match(/\/html/)) {
            console.log('finish');
            finish();
        }
    });

    function finish() {
        cf = {};
        var delta = parseFloat(response.match(/delta[ ]*\=[ ]*([0-9.]*);/)[1]);
        cf.k = response.match(/cf.k[ ]*\=[ ]*([^;]*);/)[1];
        var csdiff = new Date().getTime()/1000 - parseFloat(response.match(/csdiff[ ]*\=[ ]*[^/]*[^-]*\-([^;]*);/)[1]);

        var data_target_i = response.match(/data-target-i[ ]*\=[ ]*\"([^"]*)\"/)[1];
        var data_target_e = response.match(/data-target-e[ ]*\=[ ]*\"([^"]*)\"/)[1];
        var _0x5e19x5 = data_target_i,//_0x5e19x3[_0x9123[61]](_0x9123[529]), = data-target-i
            _0x5e19x6 = data_target_e,//_0x5e19x3[_0x9123[61]](_0x9123[530]), = data-target-e
            _0x5e19x7 = (new Date).getTime() / 1000,
            _0x5e19x8 = Math.floor(_0x5e19x7 - csdiff);

        var _0x5e19xc = md5(cf.k + _0x5e19x6 + _0x5e19x5 + _0x5e19x8);

        cookieStr += '; timestamp='+_0x5e19x8+'; token='+_0x5e19xc;

        const options2 = {
            hostname: 'cafemovie.me',
            port: 443,
            path: '/api/get_episode/'+data_target_i+'/'+data_target_e,
            method: 'GET',
            headers: {
                'Cookie': cookieStr,
                'X-Requested-With': "XMLHttpRequest",
                'Referer': 'https://cafemovie.me/movie/dead-south-qnrYWqw7/watch'
            }
        };

        var req2 = https.request(options2, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            response = '';
            res.on('data', (d) => {
                response += d.toString('utf8');
                console.log(response);
            });

        })
        req2.end();
    };


})
.on('error', (e) => {
    console.error(e);
});
req1.end();
