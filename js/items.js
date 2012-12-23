(function($){
	//mechlab_items = {};

    $.getJSON('data/item-stats.json', function(data) {
        //debugger;
        mechlab_items = data;
    });

    // Additional processing for convenience
    // mechlab_items.engines = ko.utils.arrayFilter(mechlab_items.modules, function(item) {
    //     return item.cType === 'CEngineStats';
    // });

    // mechlab_items.equipment = ko.utils.arrayFilter(mechlab_items.modules, function(item) {
    //     return item.cType !== 'CEngineStats' && item.cType !== 'CPilotModule';
    // });

})(jQuery);