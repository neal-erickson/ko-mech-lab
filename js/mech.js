(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	String.prototype.toFloat = function(){
		return parseFloat(this);
	};

	mechlab.mechViewModel = function(mech) {
		var self = this;

		self.name = ko.observable(mech.name.toUpperCase());

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');
		self.artemis = ko.observable('none');

		// Core components
		// (hardcoded right now)
		self.engine = ko.observable();

    	self.maxTonnage = ko.observable(50);
    	
    	self.engineWeight = ko.computed(function() {
    		if(self.engine()){
    			return self.engine().engineStats.weight.toFloat();	
    		}
    		return 0; // no engine
    	});

    	// Mech slots
		self.leftArmItems = ko.observableArray();
		self.leftArmSlots = ko.observableArray();

    	self.criticalSlots = ko.observable(20); // ???
    	self.criticalSlotsOpen = ko.computed(function() {
    		return 0; // todo
    	});

    	// Armor values for each location
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
			return self.armorHead() +
				self.armorCenterTorso() + 
				self.armorRightArm() +
				self.armorLeftArm() +
				self.armorRightTorso() +
				self.armorLeftTorso() +
				self.armorRightLeg() + 
				self.armorLeftLeg();
		});

		self.armorWeight = ko.computed(function() {
			var armorPerTon = self.armor() === 'standard' ? 32.0 : 34.85; // TODO : Double check value
			return self.overallArmorValue() / armorPerTon;
		});


		// This will be a complicated equation.
		//
		// weight of all armor (armor points sum * armor type modifier)
		// +
		// weight of all weapons 
		// +
		// weight of all ammunition
		// + 
		// weight of all equipment
		// -
		// endo steel structure if applicable
		// +
		// engine weight
		self.tonnage = ko.computed(function() {
    		return self.engineWeight() 
    			+ self.armorWeight();
    	});
	};
})(jQuery);