(function($) {
	mechlab = { };

	mechlab.coreVM = function() {
		var self = this;

		// Convenience function for conversion.
		// TODO : should probably live elsewhere
		String.prototype.toFloat = function(){
			return parseFloat(this);
		};

		Number.prototype.toFloat = function() {
			return this;
		};

		// TODO : Move this
		ko.extenders.logChange = function(target, option) {
		    target.subscribe(function(newValue) {
		       console.log(option + ": " + newValue);
		    });
		    return target;
		};

		// Load items from separate namespace
		self.items = mechlab_items;
		
		// Core UI bindings
		self.selectedMech = ko.observable();

		// The actual mech
		self.activeMech = ko.observable();

		self.loadMech = function(mech){
			// TODO
			return new mechlab.mechViewModel(mech);
		};

		// Callback for selecting mech variant
		self.selectMech = function() {
			// Load the mech (async?)
			var mech = self.loadMech(self.selectedMech());

			// Start editing
			self.activeMech(mech);
		};
	};
})(jQuery);