(function($){

    // Need to get some array hash action
     var makeHash = function(array) {
        var hashed = {};
        for(var i in array){
            var item = array[i];
            hashed[item.id] = item;
        }
        //console.log('hashed', hashed);
        return hashed;
    };

    loadMechlabItems = function(callback){
        $.getJSON('data/item-stats.json', function(data) {
            var cleaned = cleanupItems(data);
            callback(cleaned);
        });
    };

    var cleanupItems = function(items) {
        items.engines = [];
        items.equipment = [];

        items.weapons.sort(function(a, b) {
            var diff = a.weaponStats.type - b.weaponStats.type;
            if(diff === 0) {
                return a.weaponStats.tons - b.weaponStats.tons;
            }
            return diff;
        });
        makeHash(items.weapons);
        items.mechs.sort(function(a, b){
            return a.name < b.name ? -1 : 1;
        })

        // Iterate and move some things
        $.each(items.modules, function(index, item){
            switch(item.cType){
                case 'CEngineStats':
                    //debugger;
                    item.tons = item.engineStats.weight; // weird exception to data schema
                    item.slots = "6"; // I handle XL engines is a different way
                    items.engines.push(item);
                    break;
                case 'CBAPStats':
                case 'CJumpJetStats':
                case 'CHeatSinkStats':
                case 'CCASEStats':
                case 'CGECMStats':
                    items.equipment.push(item);
                    break;
            }
        });

        // TESTING
        // crazy old mega hash thing
        var allItems = items.weapons.concat(items.ammoTypes).concat(items.engines).concat(items.equipment);
        items.idHash = makeHash(allItems);

        items.getById = function(id) {
            return items.idHash[id];
        }

        return items;
    };

})(jQuery);