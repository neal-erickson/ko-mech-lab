(function($){
	if(mechlab_items !== undefined) return;

	mechlab_items = {};

	mechlab_items.weapons = ko.observableArray([
			{
				name: 'Medium Laser',
				weight: 1,
				heat: 8,
				criticals: 1,
				type: 'energy' 
			},
			{ 
				name: 'Large Laser',
				weight: 5,
				heat: 10,
				criticals: 2,
				type: 'energy'
			}
		]);
})(jQuery);