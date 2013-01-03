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
		this.artemis = options.artemis || 'none';
	};

	mechlab_loadouts.componentLayout = function(criticalSlots, itemIds, options){
		if(!options) options = {};

		this.criticalSlots = criticalSlots;
		// this.ballisticHardpoints = ballisticHardpoints;
		// this.energyHardpoints = energyHardpoints;
		// this.missileHardpoints = missileHardpoints;
		
		this.itemIds = itemIds;

		this.ams = options.ams === true;
		this.ballisticHardpoints = options.ballistic || 0;
		this.energyHardpoints = options.energy || 0;
		this.missileHardpoints = options.missile || 0;
	};


	// Quick id property bags for having fewer hardcoded ids	

	var weapons = {
		mediumLaser: 1001,
		autocannon2: 1018,
		lrm10: 1027
	};

	var ammo = {
		ac10: 2005,
		lrm: 2027
	};

	var modules = {
		heatSink: 3000,
		doubleHeatSink: 3001
	};

	// Mech loadouts

	mechlab_loadouts.loadouts['11'] = new mechlab_loadouts.mechLoadout(
		"DRG-1C",
		60,
		[18, 56, 24, 36, 20, 36, 20, 40, 40, 56, 56],
		3258,
		{
			head: new mechlab_loadouts.componentLayout(1, []),
			centerTorso: new mechlab_loadouts.componentLayout(2, [weapons.lrm10], { missile: 1}),
			rightTorso: new mechlab_loadouts.componentLayout(12, [ammo.ac10]),
			leftTorso: new mechlab_loadouts.componentLayout(12, [weapons.mediumLaser, ammo.lrm, ammo.lrm], { ams: true, energy: 2 }),
			rightArm: new mechlab_loadouts.componentLayout(9, [weapons.autocannon2], { ballistic: 1 }),
			leftArm: new mechlab_loadouts.componentLayout(9, [weapons.mediumLaser], { energy: 2 }),
			rightLeg: new mechlab_loadouts.componentLayout(2, []),
			leftLeg: new mechlab_loadouts.componentLayout(2, [])
		}
	); 

	// mechlab_loadouts.loadouts['21'] = new mechlab_loadouts.mechLoadout(
	// 	"HBK-4J",
	// 	50,
	// 	[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
	// 	3238,
	// 	{
	// 		head: new mechlab_loadouts.componentLayout(1, 0, 1, 0, [1003]),
	// 		centerTorso: new mechlab_loadouts.componentLayout(2, 0, 0, 0, []),
	// 		rightTorso: new mechlab_loadouts.componentLayout(12, 0, 3, 2, [1027, 1027, 1001, 1001]),
	// 		leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [], { ams: true }),
	// 		rightArm: new mechlab_loadouts.componentLayout(8, 0, 1, 0, [1001]),
	// 		leftArm: new mechlab_loadouts.componentLayout(8, 0, 1, 0, [1001]),
	// 		rightLeg: new mechlab_loadouts.componentLayout(2, 0, 0, 0, []),
	// 		leftLeg: new mechlab_loadouts.componentLayout(2, 0, 0, 0, [])
	// 	}
	// ); 

	// mechlab_loadouts.loadouts['35'] = new mechlab_loadouts.mechLoadout(
	// 	"RVN-4X",
	// 	35,
	// 	[18, 32, 10, 22, 8, 22, 8, 22, 22, 30, 30],
	// 	3233,
	// 	{
	// 		head: new mechlab_loadouts.componentLayout(1, 0, 0, 0, [3000]),
	// 		centerTorso: new mechlab_loadouts.componentLayout(2, 0, 0, 0, [1504]),
	// 		rightTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 1, [1031, 1504, 1504]),
	// 		leftTorso: new mechlab_loadouts.componentLayout(12, 0, 0, 0, [1504, 1504, 2028], { ams: true }),
	// 		rightArm: new mechlab_loadouts.componentLayout(10, 0, 2, 0, [1001, 1001]),
	// 		leftArm: new mechlab_loadouts.componentLayout(10, 2, 0, 0, [1024, 1024, 2011]),
	// 		rightLeg: new mechlab_loadouts.componentLayout(6, 0, 0, 0, [3000, 3000]),
	// 		leftLeg: new mechlab_loadouts.componentLayout(6, 0, 0, 0, [3000, 3000])
	// 	},
	// 	{
	// 		jumpJets: true
	// 	}
	// );

})(jQuery);