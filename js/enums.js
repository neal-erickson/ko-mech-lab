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
})(jQuery);