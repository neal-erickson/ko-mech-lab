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
        // Remove unnecessary things

        // mechlab_items.engines = ko.utils.arrayFilter(mechlab_items.modules, function(item) {
        //     return item.cType === 'CEngineStats';
        // });

        // mechlab_items.equipment = ko.utils.arrayFilter(mechlab_items.modules, function(item) {
        //     return item.cType !== 'CEngineStats' && item.cType !== 'CPilotModule';
        // });

        items.engines = [];
        items.equipment = [];

        // items.weapons.sort(function(a, b) {
        //     console.log(a.weaponStats.type - b.weaponStats.type);
        //     return a.weaponStats.type - b.weaponStats.type;
        // });
        items.mechs.sort(function(a, b){
            console.log('msort', a, b);
            return 0;
        })

        // Iterate and move some things
        debugger;
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