(function($){

	// Enum class for allowing better handling of constant values
	var Enum = function (constantsList) {
		var self = this;
		$.each(constantsList, function (index, constant) {
			self[constant] = index;
		});
		self.values = constantsList; // keep track for later

		self.getName = function (value) {
			var name = null;
			$.each(self.values, function (index, item) {
				if (self[item] == value) {
					name = item;
					return false; // this is 'break' for $.each()
				}
			});
			return name; // might be null bee tee dubs
		};
		// Freeze it, if possible (no new properties)
		if (Object.freeze) { Object.freeze(self); }
	};

	Enum.prototype.values = function() {
	    return this.allValues;
	};

	mechlab_enums = {};

	mechlab_enums.componentLocations = new Enum([
		"head",
		"centerTorso",
		"centerTorsoRear",
		"rightTorso",
		"rightTorsoRear",
		"leftTorso",
		"leftTorsoRear",
		"rightArm",
		"leftArm",
		"rightLeg",
		"leftLeg",
		"engine"
	]);

	mechlab_enums.betterWeaponTypes = new Enum([
		"ballistic",
		"energy",
		"missile"
	]);

	// Current "real" enum
	mechlab_enums.weaponTypes = {
		ballistic: 0,
		energy: 1,
		missile: 2,
		ams: 4
	};

	mechlab_enums.getWeaponType = function(value){
		mechlab_enums.weaponTypes.forEach(function(weaponType){
			if(mechlab_enums.weaponTypes[weaponType] === value){
				return weaponType;
			}
		})
		return null; // failure default
	};

	// Adding a lookup for tonnage vs structure values
	var structureEntry = function(centerTorso, sideTorso, arms, legs, max) {
		this.head = 3; // always
		this.centerTorso = centerTorso;
		this.sideTorso = sideTorso;
		this.arms = arms;
		this.legs = legs;
		this.max = max;
	};

	mechlab_enums.structureTable = {};
	mechlab_enums.structureTable['20'] = new structureEntry(6, 5, 3, 4, 69);
	mechlab_enums.structureTable['25'] = new structureEntry(8, 6, 4, 6, 89);
	mechlab_enums.structureTable['30'] = new structureEntry(10, 7, 5, 7, 105);
	mechlab_enums.structureTable['35'] = new structureEntry(11, 8, 6, 8, 119);
	mechlab_enums.structureTable['40'] = new structureEntry(12, 10, 6, 10, 137);
	mechlab_enums.structureTable['45'] = new structureEntry(14, 11, 7, 11, 153);
	mechlab_enums.structureTable['50'] = new structureEntry(16, 12, 8, 12, 169);
	mechlab_enums.structureTable['55'] = new structureEntry(18, 13, 9, 13, 185);
	mechlab_enums.structureTable['60'] = new structureEntry(20, 14, 10, 14, 201);
	mechlab_enums.structureTable['65'] = new structureEntry(21, 15, 10, 15, 211);
	mechlab_enums.structureTable['70'] = new structureEntry(22, 15, 11, 15, 217);
	mechlab_enums.structureTable['75'] = new structureEntry(23, 16, 12, 16, 231);
	mechlab_enums.structureTable['80'] = new structureEntry(25, 17, 13, 17, 247);
	mechlab_enums.structureTable['85'] = new structureEntry(27, 18, 14, 18, 263);
	mechlab_enums.structureTable['90'] = new structureEntry(29, 19, 15, 19, 279);
	mechlab_enums.structureTable['95'] = new structureEntry(30, 20, 16, 20, 293);
	mechlab_enums.structureTable['100'] = new structureEntry(31, 21, 17, 21, 307);

	mechlab_enums.getStructure = function(tons){
		return mechlab_enums.structureTable[tons];
	};

	mechlab_enums.weapons = {
		smallLaser: 1003,
		mediumLaser: 1001,
		largeLaser: 1008,
		erLargeLaser: 1005,
		smallPulseLaser: 1012,
		mediumPulseLaser: 1011,
		largePulseLaser: 1010,
		ppc: 1009,
		erPpc: 1006,
		autocannon2: 1018,
		autocannon5: 1019,
		autocannon10: 1020,
		autocannon20: 1000,
		ultraAc5: 1025,
		lb10x: 1023,
		gauss: 1021,
		machineGun: 1024,
		streakSrm2: 1032,
		srm2: 1030,
		srm4: 1004,
		srm6: 1031,
		lrm5: 1026,
		lrm10: 1027,
		lrm15: 1028,
		lrm20: 1002,
		narc: 1029,
		tag: 1037,
		flamer: 1007,
		ams: 1014
	};

	mechlab_enums.ammo = {
		machineGun: 2011,
		ac2: 2005,
		ac5: 2006,
		ac10: 2007,
		ac20: 2000,
		uac5: 2012,
		lb10x: 2010,
		gauss: 2008,
		streakSrm: 2029,
		srm: 2028,
		lrm: 2027,
		narc: 2017,
		ams: 2001
	};

	mechlab_enums.modules = {
		heatSink: 3000,
		doubleHeatSink: 3001,
		'case': 9003, 
		jumpJet3: 1502,
		jumpJetV: 1504
	};

	mechlab_enums.engines = {
		std150: 3228,
		std175: 3233,
		std200: 3238,
		std210: 3240,
		std215: 3241,
		std240: 3246,
		std245: 3247,
		std255: 3249,
		std260: 3250,
		std280: 3254,
		std300: 3258,
		std320: 3262,
		xl210: 3340,
		xl255: 3349,
		xl280: 3354,
		xl300: 3358,
		xl320: 3362
	};

})(jQuery);