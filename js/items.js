(function($){

    loadMechlabItems = function(callback){
        $.getJSON('data/item-stats.json', function(data) {
            //debugger;
            //mechlab_items = data;
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
        items.mechs.sort(function(a, b){
            return a.name < b.name ? -1 : 1;
        })

        // Iterate and move some things
        $.each(items.modules, function(index, item){
            switch(item.cType){
                case 'CEngineStats':
                    //debugger;
                    item.tons = item.engineStats.weight; // weird exception to data schema
                    item.slots = item.engineStats.slots;
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

        return items;
    };

})(jQuery);