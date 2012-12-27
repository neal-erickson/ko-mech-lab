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

    	var checkOpenSlots = function(component, item){
    		var openSlots = component.criticalSlots;
    		$.each(component.items(), function(index, item) {
				openSlots -= item.slots;
			});
			if(openSlots < item.slots){
				return false;
			}
			return true;
    	};

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

    		component.criticalSlots = ko.observable(0);

    		component.energyHardpoints = ko.observable(0);
    		component.ballisticHardpoints = ko.observable(0);
    		component.missileHardpoints = ko.observable(0);

    		component.items = ko.observableArray();

    		component.ballisticSlotsOpen = ko.computed(function() {
    			return 1;
    		});

    		

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

				// Pad out empty critical slots
				while(slots.length < component.criticalSlots()){
					slots.push('-- empty --');
				}
					
				return slots;
			});

    		component.criticalSlotsOpen = ko.computed(function() {
    			return component.criticalSlots() - component.slots().length;
    		});

    		// TODO : This is not working right now
    		var checkSlots = function(item) {
    			return component.criticalSlotsOpen() > item.slots;
    		};

			component.accept = function(incoming) {
    			var item = ko.dataFor(incoming[0]);

    			// Check tonnage - TODO : Display invalid state or prevent?

    			// Return '&&'' of slots, hardpoints, etc 
    			return checkOpenSlots(component, item) 
    				&& checkWeaponHardpoints(component, item);
    		};

			component.drop = function(event, ui){
				var droppedItem = ko.dataFor(ui.draggable[0]);
	    		component.items.push(droppedItem);
    		};    		
    	};

    	// Mech hardpoints
    	self.leftArm = new Component();

    	self.leftArm.criticalSlots(8); // testing
    	self.leftArm.ballisticHardpoints(1); // testing

    	// Anna's contribution to the codebase
		//1001javascriptinternetexploder.no=pie



    	self.centerTorso = new Component();

    	// This represents the internal calculation of items per component
		//self.leftArmItems = ko.observableArray();//.extend({ logChange: 'leftArmItems' });

		// This function calculates the slots to display based on the items
		// and the specific components (hardpoints)
		// var calculateComponentSlotDisplay = function(component, items){
		// 	var slots = [];
			
		// 	// Iterate through the items, adding the slots based on the number
		// 	// each one takes up
		// 	$.each(items, function(index, item) {
		// 		// Make items occupy x number of slots for display
		// 		for(var i = 0; i < item.slots; i++){
		// 			// if(i === 0){
		// 			// 	slots.push(item.name);
		// 			// } else {
		// 			// 	slots.push('(' + item.name + ')');
		// 			// }
		// 			slots.push('[' + item.name + ']');
		// 		};
		// 	});

		// 	// Pad out empty critical slots
		// 	while(slots.length < component.criticalSlots){
		// 		slots.push('-- empty --');
		// 	}
			
		// 	return slots;
		// };

		// Mech slots


		// This represents the internal calculation of items per component
		//self.leftArmItems = ko.observableArray();//.extend({ logChange: 'leftArmItems' });

		// This is the 'display' value
		//self.leftArmSlots = ko.computed(function() {
		//	return calculateComponentSlotDisplay(self.leftArm, self.leftArmItems());
		//});//.extend({ logChange: 'leftArmSlots'});

		// self.leftArmBallisticSlotsUsed = ko.computed(function() {
		// 	var used = 0;
		// 	$.each(self.leftArmItems(), function(index, item) {
		// 		if(item.weaponStats && item.weaponStats.type == 0){
		// 			used++;
		// 		}
		// 	});
		// 	return used;
		// });

		// self.centerTorsoItemsInternal = ko.observableArray();
		// self.centerTorsoItems = ko.computed(function() {
		// 	return [{
		// 		name: 'Gyro', 
		// 		slots: "2",
		// 		tons: "0"
		// 	}].concat(self.centerTorsoItemsInternal());
		// });
		
		// self.centerTorsoSlots = ko.computed(function() {
		// 	return calculateComponentSlotDisplay(self.centerTorso, self.centerTorsoItems());
		// });

  //   	self.criticalSlots = ko.observable(20); // ???
  //   	self.criticalSlotsOpen = ko.computed(function() {
  //   		return self.criticalSlots(); // todo
  //   	});

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

    	

    	//self.leftArmAccept = createDropAccept(self.leftArmNew, self.leftArmItems);
		//self.leftArmTarget = createDropTarget(self.leftArmNew, self.leftArmItems);

    	//self.centerTorsoAccept = createDropAccept(self.centerTorso, self.centerTorsoItems);
    	//self.centerTorsoTarget = createDropTarget(self.centerTorso, self.centerTorsoItemsInternal);

    	// var createOpenHardpoints = function(component, hardpoint) {

    	// };

    	// New organization for template usage
    	// self.leftArmNew = {
    	// 	slots: self.leftArmSlots,
    	// 	hardpoints: self.leftArm,
    	// 	items: self.leftArmItems,
    	// 	ballisticSlotsOpen: self.leftArmBallisticSlotsUsed
    	// };

    	// self.leftArmNew.accept = createDropAccept(self.leftArmNew, self.leftArmItems);
    	// self.leftArmNew.drop = createDropTarget(self.leftArmNew, self.leftArmItems);

	}; // end of core vm xtor
	
})(jQuery);