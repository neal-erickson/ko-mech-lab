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

    	// Drag + drop ////////////////////////////////////////////////////////////

    	var checkWeaponHardpoints = function(component, item){
    		if(!item.weaponStats){ return true; } // pass-through
			
    		// Grab weapon type enum
    		var weaponType = item.weaponStats.type;
			
			// Return a check expression
			switch(weaponType){
				case '0': 
					return component.ballisticHardpoints > component.ballisticSlotsOpen();
			}

			return true; // testing
    	}

   //  	var checkOpenSlots = function(component, item){
   //  		var openSlots = component.criticalSlots;
   //  		$.each(component.items(), function(index, item) {
			// 	openSlots -= item.slots;
			// });
			// if(openSlots < item.slots){
			// 	return false;
			// }
			// return true;
   //  	};

    	// Factory functions for bindings sharing
    	// TODO : Component possesses its own items
    	// var createDropAccept = function(component, items) {
    		
    	// };
    	// var createDropTarget = function(component, items) {
    		
    	// };

    	// Constructor for mech 'component' such as left arm, center torso, etc
    	// slot info, hardpoints, other info
    	// 
    	// Corresponds to a template binding as well
    	var Component = function(){
    		var component = this;

    		component.criticalSlots = ko.observable(0);//.extend({ logChange: 'criticalSlots'});

    		component.energyHardpoints = ko.observable(0);
    		component.ballisticHardpoints = ko.observable(0);
    		component.missileHardpoints = ko.observable(0);

    		// This is actually the most important bit - the weapons, ammo, etc that 
    		// this part of the mech has been assigned
    		component.items = ko.observableArray();//.extend({ logChange: 'items'});

    		var calculateHardpointsUsed = function(weaponType) {
    			var used = 0;
    			$.each(component.items(), function(index, item) {
    				if(item.weaponStats && item.weaponStats.type == weaponType) {
    					used++;
    				}
    			});
    			return used;
    		};

    		component.ballisticSlotsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(0);
    		});
    		component.ballisticSlotsOpen = ko.computed(function() {
    			return component.ballisticHardpoints() - component.ballisticSlotsUsed();
    		});//.extend({ logChange: 'ballisticSlotsOpen'});
    		component.energySlotsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(1);
    		});
    		component.energySlotsOpen = ko.computed(function() {
    			return component.energyHardpoints() - component.energySlotsUsed();
    		});//.extend({ logChange: 'energySlotsOpen'});
    		component.missileSlotsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(2);
    		});
    		component.missileSlotsOpen = ko.computed(function() {
    			return component.missileHardpoints() - component.missileSlotsUsed();
    		});//.extend({ logChange: 'missileSlotsOpen'});

    		component.hardpointDisplayText = ko.computed(function() {
    			if(component.ballisticHardpoints() + component.energyHardpoints() + component.missileHardpoints() === 0){
    				return '--'; // no text
    			}
    			var text = component.ballisticSlotsUsed() + '/' + component.ballisticHardpoints() + 'B '
    				+ component.energySlotsUsed() + '/' + component.energyHardpoints() + 'E ' 
    				+ component.missileSlotsUsed() + '/' + component.missileHardpoints() + 'M';
    				// TODO : Improved formatting?
    			return text;
    		});

    		// Slots is items but taking up the number of slots based on the item's value
    		component.slots = ko.computed(function(){
				var slots = [];
				
				// Iterate through the items, adding the slots based on the number
				// each one takes up
				$.each(component.items(), function(index, item) {
					// Make items occupy x number of slots for display
					for(var i = 0; i < item.slots; i++){
						slots.push('[' + item.name + ']');
					};
				});
					
				return slots;
			});//.extend({ logChange: 'slots'});

			component.criticalSlotsOpen = ko.computed(function() {
    			//console.log('---> criticalSlotsOpen calc', component.criticalSlots(), component.slots().length, component.slots());
    			return component.criticalSlots() - component.slots().length;
    		});//.extend({ logChange: 'criticalSlotsOpen'});

    		// This is the computed value that pads out the slots with empty placeholders for visual display. Should not be used for computation.
			component.displaySlots = ko.computed(function() {
				var slots = component.slots();
				var placeholders = [];

				// Pad out empty critical slots
				while(placeholders.length < component.criticalSlotsOpen()){
					placeholders.push('-- empty --');
				}
				return slots.concat(placeholders);
			});//.extend({ logChange: 'displaySlots'});

    		var checkSlots = function(item) {
    			return component.criticalSlotsOpen() >= item.slots;
    		};

			var checkWeaponHardpoints = function(item){
	    		if(!item.weaponStats){ return true; } // pass-through
				
	    		// Grab weapon type enum
	    		var weaponType = item.weaponStats.type;
				
				// Return a check expression
				switch(weaponType){
					case '0': 
						return component.ballisticSlotsOpen() >= 1;
					case '1':
						return component.energySlotsOpen() >= 1;
					case '2':
						return component.missileSlotsOpen() >= 1;
				}

				return false; // testing default?
	    	}

			component.accept = function(incoming) {
    			var item = ko.dataFor(incoming[0]);

    			// Check tonnage - TODO : Display invalid state or prevent?

    			// Return '&&'' of slots, hardpoints, etc 
    			return checkSlots(item)
    				&& checkWeaponHardpoints(item);
    		};

    		// Simple function for adding the dropped item to the component's items.
    		// It's been checked already by the accept function.
			component.drop = function(event, ui){
				var droppedItem = ko.dataFor(ui.draggable[0]);
	    		component.items.push(droppedItem);
    		};    		
    	};

    	// Mech hardpoints
    	self.leftArm = new Component();

    	self.leftArm.criticalSlots(8); // testing
    	self.leftArm.ballisticHardpoints(1); // testing
    	self.leftArm.energyHardpoints(2); // testing

    	// Anna's contribution to the codebase
		//1001javascriptinternetexploder.no=pie

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

	}; // end of core vm xtor
	
})(jQuery);