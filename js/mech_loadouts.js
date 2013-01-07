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

		// Optional chassis specific settings
		this.hasHands = options.hasHands || false;
		this.jumpJets = options.jumpJets || false;
		this.ecm = options.ecm || false;

		this.structure = options.structure || 'standard';
		this.armor = options.armor || 'standard';
		this.heatSinks = options.heatSinks || 'single';
		this.artemis = options.artemis || 'none';

		this.components = components;

		// Modify components with defaults if needed
		
		// head
		if(!components.head){
			components.head = new mechlab_loadouts.componentLayout({ slots: 1});
		}
		if(!components.head.criticalSlots){
			components.head.criticalSlots = 1;
		}

		// CT
		if(!components.centerTorso){
			components.centerTorso = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.centerTorso.criticalSlots){
			components.centerTorso.criticalSlots = 2;
		}

		// RT
		if(!components.rightTorso){
			components.rightTorso = new mechlab_loadouts.componentLayout({ slots: 12});
		}
		if(!components.rightTorso.criticalSlots){
			components.rightTorso.criticalSlots = 12;
		}

		// LT
		if(!components.leftTorso){
			components.leftTorso = new mechlab_loadouts.componentLayout({ slots: 12});
		}
		if(!components.leftTorso.criticalSlots){
			components.leftTorso.criticalSlots = 12;
		}

		// RA
		if(!components.rightArm){
			components.rightArm = new mechlab_loadouts.componentLayout({ slots: 10});
		}
		if(!components.rightArm.criticalSlots){
			components.rightArm.criticalSlots = 10;
		}

		// LA
		if(!components.leftArm){
			components.leftArm = new mechlab_loadouts.componentLayout({ slots: 10});
		}
		if(!components.leftArm.criticalSlots){
			components.leftArm.criticalSlots = 10;
		}

		// RL
		if(!components.rightLeg){
			components.rightLeg = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.rightLeg.criticalSlots){
			components.rightLeg.criticalSlots = 2;
		}

		// LL
		if(!components.leftLeg){
			components.leftLeg = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.leftLeg.criticalSlots){
			components.leftLeg.criticalSlots = 2;
		}
	};

	mechlab_loadouts.componentLayout = function(options){
		if(!options) options = {};
		this.criticalSlots = options.slots || null;		
		this.itemIds = options.items || [];
		this.ams = options.ams === true;
		this.ballisticHardpoints = options.ballistic || 0;
		this.energyHardpoints = options.energy || 0;
		this.missileHardpoints = options.missile || 0;
	};

	// Quick id property bags for having fewer hardcoded ids	
	var weapons = {
		smallLaser: 1003,
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

	var engines = {
		std300: 3258,
		std320: 3262
	};

	// Mech loadouts

	mechlab_loadouts.loadouts['11'] = new mechlab_loadouts.mechLoadout(
		"DRG-1C", 
		60,
		[18, 56, 24, 36, 20, 36, 20, 40, 40, 56, 56],
		engines.std300,
		{
			centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 1}),
			rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac10]}),
			leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, ammo.lrm, ammo.lrm], ams: true, energy: 2 }),
			rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon2], ballistic: 1 }),
			leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 })
		}
	);

	// mechlab_loadouts.loadouts['37'] = new mechlab_loadouts.mechLoadout(
	// 	"CDA-2A", 40,
	// 	[18, 22, 12, 12, 6, 12, 6, 8, 8, 12, 12],
	// 	engines.std320,
	// 	{
	// 		head: new mechlab_loadouts.componentLayout(1, []),
	// 		centerTorso: new mechlab_loadouts.componentLayout(2, [weapons.smallLaser], { energy: 2}),
	// 		rightTorso: new mechlab_loadouts.componentLayout(12, [weapons.mediumLaser], { ams: true, energy: 2 }),
	// 		leftTorso: new mechlab_loadouts.componentLayout(12, [weapons.mediumLaser], { energy: 2 }),
	// 		rightArm: new mechlab_loadouts.componentLayout(10, []),
	// 		leftArm: new mechlab_loadouts.componentLayout(10, []),
	// 		rightLeg: new mechlab_loadouts.componentLayout(2, []),
	// 		leftLeg: new mechlab_loadouts.componentLayout(2, [])
	// 	}
	// ); 

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