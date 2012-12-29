(function($) {
	mechlab = { };

	mechlab.coreVM = function(items) {
		var self = this;

		// Convenience function for conversion.
		// TODO : should probably live elsewhere
		String.prototype.toFloat = function(){
			return parseFloat(this);
		};

		// This prevents things from failing when you're not sure
		// you have a String or a Number
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

		// Default draggable options for re-use
		self.draggableOptions = {
			revert: true, 
			distance: 20, 
			helper: 'clone', 
			revertDuration: 0
		};

		// Load items from separate namespace
		self.items = mechlab_items;
		
		// View model abstracted from core view model
		self.mechViewModel = new mechlab.mechViewModel();

		// Core UI bindings
		self.selectedMech = ko.observable();
		self.mechChosen = ko.observable(false);

		// Callback for selecting mech variant
		self.selectMech = function() {
			// Load the mech (async?)
			//var mech = self.loadMech(self.selectedMech());
			var mech = mechlab_loadouts.load(self.selectedMech().id);

			self.mechChosen(true);

			// Start editing
			self.mechViewModel.loadMech(mech);
		};
	};
})(jQuery);