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
	mechlab_loadouts.initializeLoadouts = function(){
		var weapons = mechlab_enums.weapons;
		var ammo = mechlab_enums.ammo;
		var modules = mechlab_enums.modules;
		var engines = mechlab_enums.engines;

		// Commando //////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['26'] = new mechlab_loadouts.mechLoadout(
			"COM-1B",
			25,
			[12, 16, 8, 12, 6, 12, 6, 12, 12, 16, 16],
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm2], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm, modules.heatSink, modules.heatSink]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.largeLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1 }),
			}
		);

		mechlab_loadouts.loadouts['27'] = new mechlab_loadouts.mechLoadout(
			"COM-1D",
			25,
			[12, 12, 4, 10, 4, 10, 4, 8, 8, 12, 12],
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.largeLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8 }),
			}
		);

		mechlab_loadouts.loadouts['5'] = new mechlab_loadouts.mechLoadout(
			"COM-2D",
			25,
			[12, 16, 8, 12, 6, 12, 6, 12, 12, 16, 16], 
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.srm4], missile: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items:[weapons.mediumLaser], energy: 1 }),
			}
		);

		mechlab_loadouts.loadouts['6'] = new mechlab_loadouts.mechLoadout(
			"COM-3A",
			25,
			[8, 12, 8, 8, 6, 8, 6, 8, 8, 12, 12], 
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.flamer, weapons.srm6], missile: 1, energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items:[weapons.mediumLaser], energy: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		// Raven //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['34'] = new mechlab_loadouts.mechLoadout(
			"RVN-2X",
			35,
			[18, 28, 10, 20, 8, 20, 8, 20, 20, 28, 28],
			engines.std175,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.largeLaser, ammo.srm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
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

		mechlab_loadouts.loadouts['33'] = new mechlab_loadouts.mechLoadout(
			"RVN-3L",
			35,
			[12,22,8,22,6,22,6,16,16,16,16],
			engines.xl210,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6, weapons.tag], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm, ammo.narc, ammo.narc, modules.case], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({items: [weapons.narc], missile: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink]})
			},
			{
				armor: 'ferroFibrous'
			}
		);

		// Jenner ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['3'] = new mechlab_loadouts.mechLoadout(
			"JR7-D",
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

		mechlab_loadouts.loadouts['4'] = new mechlab_loadouts.mechLoadout(
			"JR7-F",
			35,
			[14,30,12,22,10,22,10,22,22,30,30],
			engines.std245,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV]}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 3}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 3})
			},
			{
				jumpJets: true
			}
		);

		mechlab_loadouts.loadouts['20'] = new mechlab_loadouts.mechLoadout(
			"JR7-K",
			35,
			[14,18,6,16,8,16,8,8,8,12,12],
			engines.std245,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm4, modules.jumpJetV], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV, modules.case, ammo.srm]}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2})
			},
			{
				jumpJets: true,
				armor: 'ferroFibrous'
			}
		);

		// Cicada /////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

		// Hunchback /////////////////////////////////////////////////////////////////////////////////////////////////

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

		// Dragon //////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['11'] = new mechlab_loadouts.mechLoadout(
			"DRG-1C", 
			60,
			[18, 56, 24, 36, 20, 36, 20, 40, 40, 56, 56],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac2], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, ammo.lrm, ammo.lrm], energy: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon2], ballistic: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 })
			}
		);

		mechlab_loadouts.loadouts['10'] = new mechlab_loadouts.mechLoadout(
			"DRG-1N", 
			60,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac5, ammo.ac5], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, ammo.lrm, ammo.lrm], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon5], ballistic: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 1 })
			}
		);

		mechlab_loadouts.loadouts['23'] = new mechlab_loadouts.mechLoadout(
			"DRG-5N", 
			60,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 1 }),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[modules.case, ammo.uac5], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[modules.case, ammo.lrm, ammo.lrm] }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.ultraAc5], ballistic: 3 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 })
			}
		);

		// AWESOME ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		

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

	}; // end loadout initialization

})(jQuery);