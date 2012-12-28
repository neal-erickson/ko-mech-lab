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

    	// Constructor for mech 'component' such as left arm, center torso, etc
    	// slot info, hardpoints, other info
    	// 
    	// Corresponds to a template binding as well
    	var Component = function(name, options){
    		var component = this;
            var options = options || {}; // prevent errors

            component.name = ko.observable(name);
    		component.criticalSlots = ko.observable(0);//.extend({ logChange: 'criticalSlots'});

    		component.fixedItems = options.fixedItems || ko.observableArray([]);

    		// This is actually the most important bit - the weapons, ammo, etc that 
    		// this part of the mech has been assigned
    		component.items = ko.observableArray();//.extend({ logChange: 'items'});

    		component.itemsWeight = ko.computed(function() {
    			var weight = 0;
    			$.each(component.items(), function(index, item) {
    				weight += parseFloat(item.tons);
    			});
    			return weight;
    		});

    		var calculateHardpointsUsed = function(weaponType) {
    			var used = 0;
    			$.each(component.items(), function(index, item) {
    				if(item.weaponStats && item.weaponStats.type == weaponType) {
    					used++;
    				}
    			});
    			return used;
    		};

            // Hardpoint-related members
            component.energyHardpoints = ko.observable(0);
            component.ballisticHardpoints = ko.observable(0);
            component.missileHardpoints = ko.observable(0);
            component.ams = ko.observable(false);

            component.amsUsed = ko.computed(function() {
                return calculateHardpointsUsed(4);
            });

    		component.ballisticHardpointsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(0);
    		});
    		component.ballisticHardpointsOpen = ko.computed(function() {
    			return component.ballisticHardpoints() - component.ballisticHardpointsUsed();
    		});//.extend({ logChange: 'ballisticSlotsOpen'});
    		component.energyHardpointsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(1);
    		});
    		component.energyHardpointsOpen = ko.computed(function() {
    			return component.energyHardpoints() - component.energyHardpointsUsed();
    		});//.extend({ logChange: 'energySlotsOpen'});
    		component.missileHardpointsUsed = ko.computed(function() {
    			return calculateHardpointsUsed(2);
    		});
    		component.missileHardpointsOpen = ko.computed(function() {
    			return component.missileHardpoints() - component.missileHardpointsUsed();
    		});//.extend({ logChange: 'missileSlotsOpen'});

    		component.hardpointDisplayText = ko.computed(function() {
    			// if(component.ballisticHardpoints() + component.energyHardpoints() + component.missileHardpoints() === 0){
    			// 	return '--'; // no text
    			// }
    			var text = '';
    			if(component.ballisticHardpoints() > 0) {
    				text += component.ballisticHardpointsUsed() + '/' + component.ballisticHardpoints() + 'B ';
    			}
    			if(component.energyHardpoints() > 0) {
    				text += + component.energyHardpointsUsed() + '/' + component.energyHardpoints() + 'E ';
    			}
    			if(component.missileHardpoints() > 0) {
    				text += component.missileHardpointsUsed() + '/' + component.missileHardpoints() + 'M ' ;
    			}
    			if(component.ams()) {
    				text += 'AMS'; // TODO
    			}
    			
    			return text;
    		});

    		// Slots is items but taking up the number of slots based on the item's value
    		component.slots = ko.computed(function(){
				var slots = [];
				var allItems = component.fixedItems().concat(component.items());
				// Iterate through the items, adding the slots based on the number each one takes up
				$.each(allItems, function(index, item) {
					// Make items occupy x number of slots for display
					for(var i = 0; i < item.slots; i++){
						slots.push('[' + item.name + ']');
					};
				});
					
				return slots;
			});//.extend({ logChange: 'slots'});

			component.criticalSlotsOpen = ko.computed(function() {
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
                // TODO : This is a gross hack. Add hardcoded tonnage to ammo types
                if(!item.slots) { item.slots = "1"; }

    			return component.criticalSlotsOpen() >= item.slots;
    		};

			var checkWeaponHardpoints = function(item){
	    		if(!item.weaponStats){ return true; } // pass-through
				
	    		// Grab weapon type enum
	    		var weaponType = item.weaponStats.type;

				// Return a check expression
				switch(weaponType){
					case '0': 
						return component.ballisticHardpointsOpen() >= 1;
					case '1':
						return component.energyHardpointsOpen() >= 1;
					case '2':
						return component.missileHardpointsOpen() >= 1;
					case '4': // 4 is AMS
						return component.ams() && component.amsUsed() < 1; // TODO
				}

				return false; // testing default?
	    	}

			component.accept = function(incoming) {
    			var item = ko.dataFor(incoming[0]);
                //console.log('echckslots', item);
    			// Check tonnage - TODO : Display invalid state or prevent?

    			// Return '&&'' of slots, hardpoints, etc 
    			//debugger;
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

        // Convenience xtor for "fixed" hardpoint items (gyro, etc)
        var fixedItem = function(name, slots) {
            this.name = name;
            this.slots = slots;
            this.tons = 0;
        };

    	// Mech hardpoints
    	self.head = new Component('Head', {
    		fixedItems: ko.observableArray([
    			new fixedItem('Life Support', '2', '0'),
    			new fixedItem('Sensors', '2', '0'),
    			new fixedItem('Cockpit', '1', '0')
    		])
    	});

    	var fixedArmItems = ko.observableArray([
            new fixedItem('Shoulder', "1", "0"),
            new fixedItem('Upper Arm Actuator', "1", "0"),
            new fixedItem('Lower Arm Actuator', "1", "0"),
            new fixedItem('Hand Actuator', "1", "0")
        ]);
    	self.rightArm = new Component("Right Arm", {
            fixedItems: fixedArmItems
        });
        self.leftArm = new Component("Left Arm", {
            fixedItems: fixedArmItems
        });

        var torsofixedItems = ko.computed(function() {
            if(self.engine() && self.engine().name.indexOf('XL') !== -1){
                debugger;
                return [new fixedItem("XL Engine", "3", "0")];
            }
            return [];
        });
        self.rightTorso = new Component("Right Torso", {
           fixedItems: torsofixedItems 
        });
		self.leftTorso = new Component("Left Torso", {
            fixedItems: torsofixedItems
        });
        self.centerTorso = new Component("Center Torso", {
            fixedItems: ko.computed(function() {
                var items = [new fixedItem('Gyro', "4", "0")];
                if(self.engine()) {
                    items.push(self.engine());
                }
                return items;
            })
        });

        var fixedLegItems = ko.observableArray([
        	new fixedItem('Hip', "1", "0"),
            new fixedItem('Upper Leg Actuator', "1", "0"),
            new fixedItem('Lower Leg Actuator', "1", "0"),
            new fixedItem('Foot Actuator', "1", "0")
        ]);
        self.rightLeg = new Component('Right Leg', {
        	fixedItems: fixedLegItems
        });
        self.leftLeg = new Component('Left Leg', {
        	fixedItems: fixedLegItems
        });

        // Component abstractions
        var componentsList = [
        	self.head,
        	self.rightArm,
        	self.leftArm,
        	self.rightTorso,
        	self.centerTorso,
        	self.leftTorso,
        	self.rightLeg,
        	self.leftLeg
        ];

        // Weapon weights
        self.totalItemsWeight = ko.computed(function() {
        	var weight = 0;
        	
        	$.each(componentsList, function(index, item){
        		console.log(item.itemsWeight());
        		weight += item.itemsWeight();
        	});
        	return weight;
        	// return self.head.itemsWeight()
        	// 	+ self.rightArm.itemsWeight()
        	// 	+ self.leftArm.itemsWeight()
        	// 	+ self.rightTorso.itemsWeight()
        	// 	+ self.leftTorso.itemsWeight()
        	// 	+ self.centerTorso.itemsWeight()
        	// 	+ self.rightLeg.itemsWeight()
        	// 	+ self.leftLeg.itemsWeight();
        });

        // These are testing values for HBK-4J
        self.rightArm.criticalSlots(12);
        self.leftArm.criticalSlots(12);
        self.rightTorso.criticalSlots(12);
    	self.leftTorso.criticalSlots(12);
        self.centerTorso.criticalSlots(12);
        self.head.criticalSlots(6);
        self.rightLeg.criticalSlots(6);
        self.leftLeg.criticalSlots(6);


		self.leftArm.energyHardpoints(1);
        self.rightTorso.missileHardpoints(2);
        self.rightTorso.energyHardpoints(2);
        self.head.energyHardpoints(1);
        self.rightArm.energyHardpoints(1);
        self.leftTorso.ams(true);

    	// Anna's contribution to the codebase
		//1001javascriptinternetexploder.no=pie

    	// Armor values for each location
    	self.armorHead = ko.observable(18);//.extend({ logChange: 'armorHead' });
    	self.armorCenterTorso = ko.observable(52);
        self.armorCenterTorsoRear = ko.observable(10);
        self.armorRightTorso = ko.observable(40);
        self.armorRightTorsoRear = ko.observable(8);
        self.armorLeftTorso = ko.observable(40);
        self.armorLeftTorsoRear = ko.observable(8);
    	self.armorRightArm = ko.observable(32);
    	self.armorLeftArm = ko.observable(32);
    	self.armorRightLeg = ko.observable(40);
    	self.armorLeftLeg = ko.observable(40);

		// Calculated values
		self.overallArmorValue = ko.computed(function() {
			return self.armorHead().toFloat() +
				self.armorCenterTorso().toFloat() + 
                self.armorCenterTorsoRear().toFloat() +
				self.armorRightArm().toFloat() +
				self.armorLeftArm().toFloat() +
				self.armorRightTorso().toFloat() +
                self.armorRightTorsoRear().toFloat() +
				self.armorLeftTorso().toFloat() +
                self.armorLeftTorsoRear().toFloat() +
				self.armorRightLeg().toFloat() + 
				self.armorLeftLeg().toFloat();
		});//.extend({ logChange: 'oav'});

		self.armorWeight = ko.computed(function() {
			var armorPerTon = self.armor() === 'standard' ? 32.0 : 34.85; // TODO : Double check value
			return self.overallArmorValue() / armorPerTon;
		});

        self.structureWeight = ko.computed(function() {
            var multiplier = self.structure() === 'standard' ? 0.1 : 0.05;
            return self.maxTonnage() * multiplier;
        });

		// This will be a complicated equation.
		//
		// weight of all armor (armor points sum * armor type modifier)
		// +
		// weight of all weapons 
		// +;
		// weight of all ammunition
		// + 
		// weight of all equipment
		// -
		// endo steel structure if applicable
		// +
		// engine weight
		self.tonnage = ko.computed(function() {
    		return self.structureWeight() 
                + self.engineWeight() 
    			+ self.armorWeight()
    			+ self.totalItemsWeight();
    	});

	}; // end of core vm xtor
	
})(jQuery);