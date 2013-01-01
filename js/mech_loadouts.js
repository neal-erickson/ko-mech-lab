(function($){

	mechlab_loadouts = {};
	mechlab_loadouts.loadouts = {};

	var componentLayout = function(criticalSlots, ballisticHardpoints, energyHardpoints, missileHardpoints, itemIds, options){
		this.criticalSlots = criticalSlots;
		this.ballisticHardpoints = ballisticHardpoints;
		this.energyHardpoints = energyHardpoints;
		this.missileHardpoints = missileHardpoints;
		this.itemIds = itemIds;

		if(!options) { options = {}; }

		this.ams = options.ams === true;
	};

	// Mech information
	mechlab_loadouts.loadouts['21'] = {
		name: "HBK-4J",
		tonnage: 50,
		hasHands: true,
		jumpJets: false,
		ecm: false,
		armor: [18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		components: {
			head: new componentLayout(6, 0, 1, 0, [1003]),
			centerTorso: new componentLayout(12, 0, 0, 0, []),
			rightTorso: new componentLayout(12, 0, 3, 2, []),
			leftTorso: new componentLayout(12, 0, 0, 0, [], { ams: true }),
			rightArm: new componentLayout(6, 0, 1, 0, [1003]),
			leftArm: new componentLayout(6, 0, 1, 0, [1003]),
			rightLeg: new componentLayout(6, 0, 1, 0, []),
			leftLeg: new componentLayout(6, 0, 1, 0, []),
		},
		engine_id: 3238
	};

	// Return mech by index
	mechlab_loadouts.load = function(id){
		if(!mechlab_loadouts.loadouts[id]){
			alert('No mech matches id:' + id);
		}
		return mechlab_loadouts.loadouts[id];
	};

})(jQuery);