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

	mechlab_loadouts.mechLoadout = function(name, tonnage, armorValues, engine_id, components, options){
		if(!options) options = {};

		// TODO : Should be observables?
		this.name = name;
		this.tonnage = tonnage;
		this.armorValues = armorValues;
		this.engine_id = engine_id;
		this.components = components;

		// Optional chassis specific settings
		this.hasHands = options.hasHands || false;
		this.jumpJets = options.jumpJets || false;
		this.ecm = options.ecm || false;
		this.structure = options.structure || 'standard';
		this.armor = options.armor || 'standard';
		this.heatSinks = options.heatSinks || 'single';
		this.artemis = options.artemis || 'artemis';
	};

	mechlab_loadouts.componentLayout = function(criticalSlots, ballisticHardpoints, energyHardpoints, missileHardpoints, itemIds, options){
		if(!options) options = {};

		this.criticalSlots = criticalSlots;
		this.ballisticHardpoints = ballisticHardpoints;
		this.energyHardpoints = energyHardpoints;
		this.missileHardpoints = missileHardpoints;
		this.itemIds = itemIds;

		this.ams = options.ams === true;
	};

	// Mech information
	mechlab_loadouts.loadouts['21'] = new mechlab_loadouts.mechLoadout(
		"HBK-4J",
		50,
		[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		3238,
		{
			head: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1003]),
			centerTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, []),
			rightTorso: new mechlab_loadouts.componentLayout(12, 0, 3, 2, [1027, 1027, 1001, 1001]),
			leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [], { ams: true }),
			rightArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			leftArm: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [1001]),
			rightLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, []),
			leftLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [])
		},
		{
			hasHands: true
		}
	); 

	mechlab_loadouts.loadouts['35'] = new mechlab_loadouts.mechLoadout(
		"RVN-4X",
		35,
		[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		3233,
		{
			head: new mechlab_loadouts.componentLayout(6, 0, 0, 0, []),
			centerTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, []),
			rightTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 1, [1031]),
			leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [], { ams: true }),
			rightArm: new mechlab_loadouts.componentLayout(6, 0, 2, 0, [1001, 1001]),
			leftArm: new mechlab_loadouts.componentLayout(6, 2, 0, 0, [1024, 1024]),
			rightLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, []),
			leftLeg: new mechlab_loadouts.componentLayout(6, 0, 1, 0, [])
		},
		{
			jumpJets: true
		}
	);

})(jQuery);