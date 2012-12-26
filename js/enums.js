(function($){

	function Enum(constantsList) {
	    for (var i in constantsList) {
	        this[constantsList[i]] = i;
	    }
	}

	Enum.prototype.values = function() {
	    return this.allValues;
	    /* for the above to work, you'd need to do this.allValues = constantsList at the constructor */
	};

	mechlab_enums = {};

	mechlab_enums.weaponTypes = {
		ballistic: 0,
		energy: 1,
		missile: 2
	};
})(jQuery);