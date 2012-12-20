(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	mechlab.mechViewModel = function(mech) {
		var self = this;

		self.name = ko.observable(mech.name.toUpperCase());

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');
		self.artemis = ko.observable('none');

		// Mech slots
		self.leftArmSlots = ko.observableArray();


		// Core components
		// (hardcoded right now)
		self.engine = 
		{
             "id": "3238",
             "name": "Engine_Std_200",
             "cType": "CEngineStats",
             "moduleStats": {
                "slots": [],
                "tons": [],
                "health": []
             },
             "engineStats": {
                "slots": "6",
                "rating": "200",
                "weight": "11.5",
                "type": "0",
                "heatsinks": "8",
                "health": "15"
             }
          };

    	// Armor
    	self.armorHead = ko.observable(10);
    	self.armorCenterTorso = ko.observable(10);
    	self.armorRightArm = ko.observable(10);
    	self.armorLeftArm = ko.observable(10);
    	self.armorRightTorso = ko.observable(10);
    	self.armorLeftTorso = ko.observable(10);
    	self.armorRightLeg = ko.observable(10);
    	self.armorLeftLeg = ko.observable(10);

		// Calculated values
		self.overallArmorValue = ko.computed(function() {
			return 
				self.armorHead() +
				self.armorCenterTorso() + 
				self.armorRightArm() +
				self.armorLeftArm() +
				self.armorRightTorso() +
				self.armorLeftTorso() +
				self.armorRightLeg() + 
				self.armorLeftLeg();
		});
	};
})(jQuery);