var fs = require('fs'),
	util = require('util'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser({
	explicitArray: false,
	mergeAttrs: true
});

fs.readFile('mwoxml/ItemStats.xml', 'utf-8', function(err, data) {
    parser.parseString(data, function (err, result) {
    	console.log(util.inspect(result, false, null));

        console.log(result);
        console.log(err);
        console.log('Done');

        //var json = JSON.stringify(result);
        //console.log(json);
    });
});