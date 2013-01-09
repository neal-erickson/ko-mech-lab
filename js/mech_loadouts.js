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

		// Engine heat sinks
		if(!components.engine){
			components.engine = new mechlab_loadouts.componentLayout({ slots: 0 });
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
		smallPulseLaser: 1012,
		mediumPulseLaser: 1011,
		erPpc: 1006,
		autocannon2: 1018,
		machineGun: 1024,
		streakSrm2: 1032,
		srm4: 1004,
		srm6: 1031,
		lrm10: 1027
	};

	var ammo = {
		machineGun: 2011,
		ac10: 2005,
		streakSrm: 2029,
		srm: 2028,
		lrm: 2027
	};

	var modules = {
		heatSink: 3000,
		doubleHeatSink: 3001,
		jumpJetV: 1504
	};

	var engines = {
		std175: 3233,
		std200: 3238,
		std245: 3247,
		std300: 3258,
		std320: 3262,
		xl320: 3362
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

	mechlab_loadouts.loadouts['37'] = new mechlab_loadouts.mechLoadout(
		"CDA-2A", 40,
		[18, 22, 12, 12, 6, 12, 6, 8, 8, 12, 12],
		engines.std320,
		{
			centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 2}),
			rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], ams: true, energy: 2 }),
			leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], energy: 2 })
		}
	); 

	mechlab_loadouts.loadouts['32'] = new mechlab_loadouts.mechLoadout(
		"AWS-9M", 
		80,
		[18, 60, 40, 48, 20, 48, 20, 52, 52, 68, 68],
		engines.xl320,
		{
			head: new mechlab_loadouts.componentLayout({ items: [weapons.smallPulseLaser], energy: 1}),
			centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumPulseLaser, weapons.streakSrm2], missile: 2, energy: 2}),
			rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], ams: true, energy: 1 }),
			leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], energy: 1 }),
			rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], energy: 1 }),
			leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.streakSrm2, modules.doubleHeatSink, modules.doubleHeatSink], missile: 1 }),
			rightLeg: new mechlab_loadouts.componentLayout({ items: [ammo.streakSrm]}),
			engine: new mechlab_loadouts.componentLayout({ items: [modules.doubleHeatSink, modules.doubleHeatSink]})
		},
		{
			heatSinks: 'double'
		}
	);

	mechlab_loadouts.loadouts['35'] = new mechlab_loadouts.mechLoadout(
		"RVN-4X",
		35,
		[18, 32, 10, 22, 8, 22, 8, 22, 22, 30, 30],
		engines.std175,
		{
			head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
			centerTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV]}),
			rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6, modules.jumpJetV, modules.jumpJetV], missile: 1}),
			leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV, ammo.srm], ams: true }),
			rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
			leftArm: new mechlab_loadouts.componentLayout({items: [weapons.machineGun, weapons.machineGun, ammo.machineGun], ballistic: 2}),
			rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
			leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
		},
		{
			jumpJets: true
		}
	);

	mechlab_loadouts.loadouts['21'] = new mechlab_loadouts.mechLoadout(
		"HBK-4J",
		50,
		[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
		engines.std200,
		{
			head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
			rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.lrm10, weapons.lrm10, weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser], energy: 3, missile: 2}),
			leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.lrm, ammo.lrm], ams: true }),
			rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
			leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
			rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
			leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
		}
	); 

	mechlab_loadouts.loadouts['3'] = new mechlab_loadouts.mechLoadout(
		"JR-7D",
		35,
		[14, 20, 6, 16, 8, 16, 8, 8, 8, 12, 12],
		engines.std245,
		{
			head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
			centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm4, modules.jumpJetV], missile: 2}),
			rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV, ammo.srm]}),
			leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
			rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
			leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2})
		},
		{
			jumpJets: true
		}
	); 

})(jQuery);