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
    method: 'GET'
};

https.get('https://cafemovie.me/movie/dead-south-qnrYWqw7/watch', (res) => {
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
        // console.log(matches, cf.k, csdiff);


        var data_target_i = response.match(/data-target-i[ ]*\=[ ]*\"([^"]*)\"/)[1];
        var data_target_e = response.match(/data-target-e[ ]*\=[ ]*\"([^"]*)\"/)[1];
        // console.log(data_target_e);
        var _0x5e19x5 = data_target_i,//_0x5e19x3[_0x9123[61]](_0x9123[529]), = data-target-i
            _0x5e19x6 = data_target_e,//_0x5e19x3[_0x9123[61]](_0x9123[530]), = data-target-e
            _0x5e19x7 = (new Date).getTime() / 1000,
            _0x5e19x8 = Math.floor(_0x5e19x7 - csdiff);

        var _0x5e19xc = md5(cf.k + _0x5e19x6 + _0x5e19x5 + _0x5e19x8);

        cookieStr += '; timestamp='+_0x5e19x8+'; token='+_0x5e19xc;

        const options2 = {
            hostname: 'cafemovie.me',
            port: 443,
            path: '/api/get_episode/AwqoElv7/dxnRXDor',
            method: 'GET',
            headers: {
                'Cookie': cookieStr
            }
        };

        https.request(options2, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            response = '';
            res.on('data', (d) => {
                response += d.toString('utf8');
                console.log(response);
            });
        })
    };

})
.on('error', (e) => {
    console.error(e);
});
