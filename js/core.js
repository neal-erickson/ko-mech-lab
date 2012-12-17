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

		self.activeMech = {
			name: 'Hunchback HBK-4P',
			tonnage: 50,
			engine: { },
			slots: [
				rightArm: {
					energyHardpoints: 1,
					ballisticHardpoints: 0,
					missileHardpoints: 0,
					criticalSlots: 10
				}
			]
		};

		self.weapons = ko.observableArray([
			{
				name: 'Medium Laser',
				weight: 1,
				heat: 8,
				criticals: 1,
				type: 'energy' 
			},
			{ 
				name: 'Large Laser',
				weight: 5,
				heat: 10,
				criticals: 2,
				type: 'energy'
			}
		]);

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');
		self.artemis = ko.observable('none');

		// Calculated values
		self.finalArmor = ko.computed(function() {

		});


		self.selectMech = function() {
			console.log('select');
		};
	};
})(jQuery);