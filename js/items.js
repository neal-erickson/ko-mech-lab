(function($){

    loadMechlabItems = function(callback){
        $.getJSON('data/item-stats.json', function(data) {
            //debugger;
            //mechlab_items = data;
            var cleaned= cleanupItems(data);
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
        return items;
    };

})(jQuery);