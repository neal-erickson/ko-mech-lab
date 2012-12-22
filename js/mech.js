(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	

	// This 'sub' view model controls all the interesting bits
	mechlab.mechViewModel = function(mech) {
		var self = this;

		// Basic mech information
		self.name = ko.observable(mech.name.toUpperCase());
		self.maxTonnage = ko.observable(50);

		// Upgrade settings
		self.structure = ko.observable('standard');
		self.armor = ko.observable('standard');
		self.heatSinks = ko.observable('single');
		self.artemis = ko.observable('none');

		// Core components
		self.engine = ko.observable();
    	
    	self.engineWeight = ko.computed(function() {
    		if(self.engine()){
    			return self.engine().engineStats.weight.toFloat();	
    		}
    		return 0; // no engine, which is a possibility
    	});

    	// Mech hardpoints
    	self.leftArmHardpoints = {
    		energy: 1,
    		ballistic: 1,
    		missile: 0,
    		criticalSlots: 6
    	};

    	// Mech slots

    	// This represents the internal calculation of items per component
		self.leftArmItems = ko.observableArray([
			{
				name: 'LargeLaser',
				slots: 3,
				tons: 5
			}
		]).extend({ logChange: 'leftArmItems' });

		// This is the 'display' value
		self.leftArmSlots = ko.computed(function() {
			var slots = [];
			
			// Iterate through the items, adding the slots based on the number
			// each one takes up
			$.each(self.leftArmItems(), function(index, item) {
				console.log(item);
				// TODO : Re-enable multi slot thing

				// for(var i = 0; i < item.slots; i++){
				// 	if(i === 0){
				// 		slots.push(item.name);
				// 	} else{
				// 		slots.push('(occupied)');
				// 	}
				// };
				slots.push(item.name);
			});

			// Pad out empty critical slots
			while(slots.length < self.leftArmHardpoints.criticalSlots){
				slots.push('(empty)');
			}
			
			return slots;
		}).extend({ logChange: 'leftArmSlots'});

    	self.criticalSlots = ko.observable(20); // ???
    	self.criticalSlotsOpen = ko.computed(function() {
    		return 0; // todo
    	});

    	// Armor values for each location
    	self.armorHead = ko.observable(10);//.extend({ logChange: 'armorHead' });
    	self.armorCenterTorso = ko.observable(10);
    	self.armorRightArm = ko.observable(10);
    	self.armorLeftArm = ko.observable(10);
    	self.armorRightTorso = ko.observable(10);
    	self.armorLeftTorso = ko.observable(10);
    	self.armorRightLeg = ko.observable(10);
    	self.armorLeftLeg = ko.observable(10);

		// Calculated values
		self.overallArmorValue = ko.computed(function() {
			return self.armorHead().toFloat() +
				self.armorCenterTorso().toFloat() + 
				self.armorRightArm().toFloat() +
				self.armorLeftArm().toFloat() +
				self.armorRightTorso().toFloat() +
				self.armorLeftTorso().toFloat() +
				self.armorRightLeg().toFloat() + 
				self.armorLeftLeg().toFloat();
		});//.extend({ logChange: 'oav'});

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

    	// testing

    	self.testAccept = function(incoming) {
    		//console.log('testAccept', incoming);
    		var droppedItem = ko.dataFor(incoming[0]);
    		return true; // for now
    	};

    	self.testDrop = function(event, ui) {
    		var droppedItem = ko.dataFor(ui.draggable[0]);
    		//console.log(droppedItem);
    		self.leftArmItems.push(droppedItem);
    	};
	};
})(jQuery);