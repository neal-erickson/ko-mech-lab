(function($){

	mechlab_loadouts = {};
	mechlab_loadouts.loadouts = {};

	// Return mech by index
	mechlab_loadouts.load = function(id){
		if(!mechlab_loadouts.loadouts[id]){
			alert('No mech matches id:' + id);
		}
		return mechlab_loadouts.loadouts[id];
	};

	mechlab_loadouts.componentLayout = function(criticalSlots, ballisticHardpoints, energyHardpoints, missileHardpoints, itemIds, options){
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
			head: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1003]),
			centerTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, []),
			rightTorso: new mechlab_loadouts.componentLayout(12, 0, 3, 2, [1027, 1027, 1001, 1001]),
			leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [], { ams: true }),
			rightArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			leftArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			rightLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, []),
			leftLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [])
		},
		engine_id: 3238
	};

	mechlab_loadouts.loadouts['35'] = {
		name: "RVN-4X",
		tonnage: 35,
		hasHands: false,
		jumpJets: true,
		ecm: false,
		armor: [18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		components: {
			head: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1003]),
			centerTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, []),
			rightTorso: new mechlab_loadouts.componentLayout(12, 0, 3, 2, [1027, 1027, 1001, 1001]),
			leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [], { ams: true }),
			rightArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			leftArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			rightLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, []),
			leftLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [])
		},
		engine_id: 3233
	};

	

})(jQuery);