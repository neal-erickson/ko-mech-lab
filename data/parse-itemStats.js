var fs = require('fs'),
	util = require('util'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser({
	explicitArray: false,
	mergeAttrs: true
});

//var fileName = 'transformed_item_stats.xml';
var fileName = 'mwoxml/itemstats.xml';

fs.readFile(fileName, 'utf-8', function(err, data) {
    parser.parseString(data, function (err, result) {
        // TODO: file output
    	
        delete result.ItemStats.ArmorTypeList;
        delete result.ItemStats.UpgradeTypeList;
        delete result.ItemStats.CamoList;
        delete result.ItemStats.DecalList;
        delete result.ItemStats.BoosterList;

        if(err) {
            console.log(err);
        }

        console.log(result);
        //console.log(util.inspect(result, false, null));

        //var json = JSON.stringify(result);
        //console.log(json);
    });
});