(function($) {
	mechlab = { };

	var hunchbackTest = {
		armorValue : 13,
		tonnage: 50
	};

	mechlab.coreVM = function() {
		var self = this;

		self.mechChassis = ko.observableArray([
			"Hunchback",
			"Centurion"
		]);

		self.mechVariants = ko.observableArray([
			"HBK-4P",
			"CN9-A"
		]);

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');

		// Calculated values
		self.finalArmor = ko.computed(function() {

		});


		self.selectMech = function() {
			console.log('select');
		};
	};
})(jQuery);