(function($) {
	mechlab = { };

	mechlab.coreVM = function() {
		var self = this;

		// Load items from separate namespace
		self.items = mechlab_items;
		
		// Core UI bindings
		self.selectedMech = ko.observable();

		// The actual mech
		self.activeMech = ko.observable();

		self.selectMech = function() {
			console.log('building mech:', self.selectedMech());

			self.activeMech(self.selectedMech());

		};
	};
})(jQuery);