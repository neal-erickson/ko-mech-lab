(function($){

	mechlab_loadouts = {};
	mechlab_loadouts.loadouts = {};

	var componentLayout = function(criticalSlots, ballisticHardpoints, energyHardpoints, missileHardpoints){
		this.criticalSlots = criticalSlots;
		this.ballisticHardpoints = ballisticHardpoints;
		this.energyHardpoints = energyHardpoints;
		this.missileHardpoints = missileHardpoints;
	};

	// Mech information
	mechlab_loadouts.loadouts['21'] = {
		name: "HBK-4J",
		tonnage: 50,
		hasHands: true,
		armor: [18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		components: {
			head: new componentLayout(12, 0, 1, 0)
		}
	};

	// Return mech by index
	mechlab_loadouts.load = function(id){
		if(!mechlab_loadouts.loadouts[id]){
			alert('No mech matches id:' + id);
		}
		return mechlab_loadouts.loadouts[id];
	};

})(jQuery);