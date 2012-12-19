(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	mechlab.mechViewModel = function() {
		var self = this;

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');
		self.artemis = ko.observable('none');

		// Mech slots
		self.leftArmSlots = ko.observableArray();
		//self.engine = 

		// Calculated values
		self.finalArmor = ko.computed(function() {
			return 0; // TODO, obviously.
		});
	};
})(jQuery);