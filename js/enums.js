(function($){

	function Enum(constantsList) {
	    for (var i in constantsList) {
	        this[constantsList[i]] = i;
	    }
	    this.allValues = constantsList;
	}

	Enum.prototype.values = function() {
	    return this.allValues;
	};

	mechlab_enums = {};

	mechlab_enums.betterWeaponTypes = new Enum([
		"ballistic",
		"energy",
		"missile"
	]);

	// Current "real" enum
	mechlab_enums.weaponTypes = {
		ballistic: 0,
		energy: 1,
		missile: 2
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

})(jQuery);