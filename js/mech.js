(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	// This 'sub' view model controls all the interesting bits
	mechlab.mechViewModel = function() {
		var self = this;

        self.showFixedItems = ko.observable(true); // TODO use

        // TODO : Make everything possible computed from this
        self.mech = ko.observable().extend({ logChange: 'mech'});

        // Core mech stats
        self.name = ko.observable();
		self.maxTonnage = ko.observable(50);
        self.hasHands = ko.observable(true);
        self.canHasJumpJets = ko.observable(false);
        self.ecm = ko.observable(false);

		// Upgrade settings
		self.structure = ko.observable('standard');
        self.structureIsEndoSteel = ko.computed(function() {
            return self.structure() != 'standard';
        });
		self.armor = ko.observable('standard');
        self.armorIsFerroFibrous = ko.computed(function() {
            return self.armor() != 'standard';
        });
		self.heatSinks = ko.observable('single');
        self.heatSinksAreDouble = ko.computed(function() {
            return self.heatSinks() == 'double';
        });
		self.artemis = ko.observable('none');//.extend({logChange: 'artemis'});

		// Engine components
		self.engine = ko.observable();
    	self.engineWeight = ko.computed(function() {
    		if(self.engine()){
    			return self.engine().engineStats.weight.toFloat();	
    		}
    		return 0; // no engine, which is a possibility
    	});

        self.speed = ko.computed(function() {
            if(!self.engine()) { return 0; }
            return self.engine().engineStats.rating.toFloat() * 16.2 / self.maxTonnage(); 
        });

        self.engineHeatSinks = ko.observableArray();
        self.numberOfEngineHeatSinks = ko.computed(function() {
            if(!self.engine()) return 0;
            var rating = self.engine().engineStats.rating.toFloat();
            var totalSinks = Math.round(Math.floor(rating / 25));
            var sinks = Math.max(totalSinks - 10, 0);
            return sinks;
        });//.extend({logChange: 'sinks'});

        self.hasRequiredHeatSinks = ko.computed(function() {
            // If its a rating 250 or above, no external heat sinks required
            if(self.numberOfEngineHeatSinks() >= 10){
                return true;
            }
            // Otherwise, our mech needs 10 sinks to keep from lighting on fire
        });

    	// Constructor for mech 'component' such as left arm, center torso, etc
    	// Includes slot info, hardpoints, other info
    	var Component = function(name, options){
    		var component = this;
            var options = options || {}; // prevent errors

            // Component specifics
            component.name = ko.observable(name);
    		component.criticalSlots = ko.observable(0);//.extend({ logChange: 'criticalSlots'});
    		component.fixedItems = options.fixedItems || ko.observableArray([]);

            // Hardpoint-related members
            component.energyHardpoints = ko.observable(0);
            component.ballisticHardpoints = ko.observable(0);
            component.missileHardpoints = ko.observable(0);
            component.ams = ko.observable(false);

    		// This is actually the most important bit - the weapons, ammo, etc that 
    		// this part of the mech has been assigned
    		component.items = ko.observableArray();//.extend({ logChange: 'items'});

            component.itemIds = ko.computed(function() {
                var ids = [];
                $.each(component.items(), function(index, item) {
                    ids.push(item.id);
                });
                return ids;
            });

    		component.itemsWeight = ko.computed(function() {
    			var weight = 0;
    			$.each(component.items(), function(index, item) {
    				weight += parseFloat(item.tons);
    			});
    			return weight;
    		});

            component.weapons = ko.computed(function() {
                return ko.utils.arrayFilter(component.items(), function(item){
                    if(item.weaponStats) return true;
                });
            });//.extend({logChange: 'weapons'});

            var calculateHardpointsUsed = function(weaponType) {
                var used = 0;
                $.each(component.items(), function(index, item) {
                    if(item.weaponStats && item.weaponStats.type == weaponType) {
                        used++;
                    }
                });
                return used;
            };

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
    				text += component.amsUsed() + '/1 AMS';
    			}

                if(text === ''){
                    return '(None)';
                }
    			return '(' + text + ')';
    		});

            var Slot = function(name, options){
                this.name = name;
                this.data = options.data || {};
                this.empty = options.empty || false;
                this.removeable = options.removeable || false;
                this.first = options.first || false;
                this.last = options.last || false;
            };

            var isRemoveable = function(item){
                // Engine can't be removed normal way
                if(item.cType == "CEngineStats"){
                    return false;
                }
                // Fixed items have no tonnage. Currently. Hopefully.
                return item.tons != 0;
            };

            component.useItemMultipleSlots = ko.observable(true);

    		// Slots is items but taking up the number of slots based on the item's value
    		component.slots = ko.computed(function(){
				var slots = [];
				var allItems = component.fixedItems().concat(component.items());
				// Iterate through the items, adding the slots based on the number each one takes up
				$.each(allItems, function(index, item) {
                    if(component.useItemMultipleSlots()){
    					// Make items occupy x number of slots for display
    					for(var i = 0; i < item.slots; i++){
                            var slot = new Slot(item.name, {
                                data: item,
                                removeable: isRemoveable(item),
                                first: i == 0,
                                last: i == item.slots - 1
                            });
                            //console.log(item, i == 0, item.slots - 1);
                            slots.push(slot);
    					};
                    } else {
                        var slot = new Slot(item.name, {
                            data: item,
                            removeable: isRemoveable(item),
                            first: true,
                            last: true
                        });
                        //debugger;
                        //console.log(item, i == 0, item.slots - 1);
                        slots.push(slot);
                    }
				});
					
				return slots;
			});//.extend({ logChange: 'slots'});

			component.criticalSlotsOpen = ko.computed(function() {
    			return component.criticalSlots() - component.slots().length;
    		}).extend({ logChange: component.name() + ' criticalSlotsOpen'});

    		// This is the computed value that pads out the slots with empty placeholders for visual display. Should not be used for computation.
			component.displaySlots = ko.computed(function() {
				var slots = component.slots();
				var placeholders = [];

				// Pad out empty critical slots
				while(placeholders.length < component.criticalSlotsOpen()){
                    placeholders.push(new Slot('(empty)', {
                        empty: true,
                        first: true,
                        last: true
                    }))
				}
				return slots.concat(placeholders);
			});//.extend({ logChange: 'displaySlots'});

    		var checkSlots = function(item) {
                // TODO : This is a gross hack. Add hardcoded tonnage to ammo types
                if(!item.slots) { item.slots = "1"; }

    			return component.criticalSlotsOpen() >= item.slots;
    		};

            var checkEquipmentType = function(item) {
                switch(item.cType){
                    case 'CJumpJetStats':
                        // TODO : Enforce orrect jump jet class
                        return self.canHasJumpJets();
                    case 'CHeatSinkStats':
                        if(self.heatSinks() === 'single'){
                            return item.name === 'HeatSink_MkI';
                        }
                        return item.name === 'DoubleHeatSink_MkI';
                    case 'CGECMStats':
                        return self.ecm();
                    default:
                        return true; // default pass through
                };
                // TODO : Ecm, Beagle, CASE
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
				return false;
	    	}

            // Drag n drop functions
			component.accept = function(incoming) {
    			var item = ko.dataFor(incoming[0]);

    			// Return '&&'' of slots, hardpoints, etc
    			return checkSlots(item)
                    && checkEquipmentType(item)
    				&& checkWeaponHardpoints(item);
    		};

    		// Simple function for adding the dropped item to the component's items.
    		// It's been checked already by the accept function.
			component.drop = function(event, ui){
				var droppedItem = ko.dataFor(ui.draggable[0]);
	    		component.items.push(droppedItem);
    		}; 

            // This is called by knockout-delegatedEvents by child items
            component.removeItem = function(element, ui){
                // KO's observable array has a 'remove' function thats awesome
                // but unfortunately it removes all of an instance, rather than the first.
                //component.items.remove(element.data);

                // Instead, iterate through the items and remove the one with matching id
                $.each(component.items(), function(index, item) {
                    if(item.id == element.data.id) {
                        component.items.splice(index, 1);
                        return false; // break $.each() since we only want to remove 1
                    }
                });
            };

            // Clears out the core items
            component.clear = function() {
                component.items([]);
            };

            var getItemsByIds = function(ids){
                var items = [];
                $.each(ids, function(index, id) {
                    items.push(mechlab_items.getById(id));
                });
                return items;
            };

            // Convenience function for loading mech specifications
            component.loadSpec = function(componentSpec){
                component.criticalSlots(componentSpec.criticalSlots);
                component.ballisticHardpoints(componentSpec.ballisticHardpoints);
                component.energyHardpoints(componentSpec.energyHardpoints);
                component.missileHardpoints(componentSpec.missileHardpoints);
                component.items(getItemsByIds(componentSpec.itemIds));
                component.ams(componentSpec.ams);
            };

            component.outputComponentConfig = function(){
                return new mechlab_loadouts.componentLayout(
                    component.criticalSlots(), 
                    component.itemIds(), 
                    {
                        ams: component.ams(),
                        ballistic: component.ballisticHardpoints(),
                        energy: component.energyHardpoints(),
                        missile: component.missileHardpoints()
                    });
            };

    	}; // end component xtor

        // This is a hacked component for accepting heat sinks only
        self.engineComponent = new Component('Engine Heat Sinks', {});
        self.engineComponent.useItemMultipleSlots(false);
        self.numberOfEngineHeatSinks.subscribe(function(newValue){
            self.engineComponent.criticalSlots(newValue);
            // TODO : remove existing
        });
        var engineAccept = self.engineComponent.accept;
        self.engineComponent.accept = function(incoming){
            var item = ko.dataFor(incoming[0]);            
            if(item.cType != 'CHeatSinkStats') return; // only heat sinks allowed
            if(self.engineComponent.criticalSlotsOpen() < 1) return false; // Check that there is a slot
            // Check heat sink type
            if(self.heatSinks() === 'single'){
                return item.name === 'HeatSink_MkI';
            }
            return item.name === 'DoubleHeatSink_MkI';
        };

        // Convenience xtor for "fixed" hardpoint items (gyro, etc)
        var fixedItem = function(name, slots) {
            this.name = name;
            this.slots = slots;
            this.tons = 0; // set tonnage
        };

    	// Mech hardpoints
    	self.head = new Component('Head', {});
    	self.rightArm = new Component("Right Arm", {});
        self.leftArm = new Component("Left Arm", {});
        var torsofixedItems = ko.computed(function() {
            if(self.engine() && self.engine().name.indexOf('XL') !== -1){
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
        self.centerTorso = new Component("Center Torso", {});
        self.rightLeg = new Component('Right Leg', {});
        self.leftLeg = new Component('Left Leg', {});

        // Component abstractions
        self.componentsList = [
        	self.head,
            self.centerTorso,
            self.rightTorso,
            self.leftTorso,
        	self.rightArm,
        	self.leftArm,
        	self.rightLeg,
        	self.leftLeg
        ];

        self.componentsListPlusEngineSinks = self.componentsList.concat(self.engineComponent);

        self.remainingCriticalSlots = ko.computed(function(){
            var slots = 0;
            $.each(self.componentsList, function(index, item){
                slots += item.criticalSlotsOpen();
            });
            if(self.structureIsEndoSteel()){
                slots -= 14;
            }
            if(self.armorIsFerroFibrous()){
                slots -= 14;
            }
            return slots;
        });//.extend({logChange: 'rcs'});

        self.heatSinksAreDouble.subscribe(function(newValue){
            // This manual subscription is for clearing out existing heat sinks if the kind are switched
             $.each(self.componentsListPlusEngineSinks, function(index, component){
                var heatSinkId = newValue ? 3000 : 3001;
                var heatSink = mechlab_items.getById(heatSinkId);
                component.items.remove(heatSink);
            });
        });

        // Weapon weights
        self.totalItemsWeight = ko.computed(function() {
        	var weight = 0;
        	$.each(self.componentsListPlusEngineSinks, function(index, item){
        		weight += item.itemsWeight();
        	});
        	return weight;
        });

        self.alphaStrike = ko.computed(function() {
            var alpha = 0;
            $.each(self.componentsList, function(i, component){
                $.each(component.weapons(), function(j, weapon) {
                    var multiplier = weapon.weaponStats.ammoPerShot.toFloat();
                    if(multiplier === 0) multiplier = 1;
                    var damage = multiplier * weapon.weaponStats.damage.toFloat();
                    alpha += damage;
                });
            });
            return alpha;
        });

        self.heatEfficiency = ko.computed(function() {
            return 0;
        });

    	// Anna's contribution to the codebase:
		//1001javascriptinternetexploder.no=pie

    	// Initialize armor values for each location
    	self.armorHead = ko.observable(18);
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

		// This will be a complicated equation:
		self.tonnage = ko.computed(function() {
    		return self.structureWeight() 
                + self.engineWeight()
    			+ self.armorWeight()
    			+ self.totalItemsWeight();
    	});

        self.tonnageDisplay = ko.computed(function() {
            return Math.round(self.tonnage() * 100) / 100;
        });

        self.tonnageValid = ko.computed(function() {
            return self.tonnage() <= self.maxTonnage();
        });

        // This is the function to load a mech
        self.loadMech = function(mech){
            // Save the loadout
            self.mech(mech);

            // Core values
            self.maxTonnage(mech.tonnage);
            self.hasHands(mech.hasHands);
            self.name(mech.name);

            // Chassis specifics
            self.canHasJumpJets(mech.jumpJets);
            self.ecm(mech.ecm);

            // Upgrades etc
            self.structure(mech.structure);
            self.armor(mech.armor);
            self.artemis(mech.artemis);
            self.heatSinks(mech.heatSinks);

            // Copy in base armor values
            self.armorHead(mech.armorValues[0]);
            self.armorCenterTorso(mech.armorValues[1]);
            self.armorCenterTorsoRear(mech.armorValues[2]);
            self.armorRightTorso(mech.armorValues[3]);
            self.armorRightTorsoRear(mech.armorValues[4]);
            self.armorLeftTorso(mech.armorValues[5]);
            self.armorLeftTorsoRear(mech.armorValues[6]);
            self.armorRightArm(mech.armorValues[7]);
            self.armorLeftArm(mech.armorValues[8]);
            self.armorRightLeg(mech.armorValues[9]);
            self.armorLeftLeg(mech.armorValues[10]);

            // Component specifics
            self.head.loadSpec(mech.components.head);
            self.centerTorso.loadSpec(mech.components.centerTorso);
            self.rightTorso.loadSpec(mech.components.rightTorso);
            self.leftTorso.loadSpec(mech.components.leftTorso);
            self.rightArm.loadSpec(mech.components.rightArm);
            self.leftArm.loadSpec(mech.components.leftArm);
            self.rightLeg.loadSpec(mech.components.rightLeg);
            self.leftLeg.loadSpec(mech.components.leftLeg);

            // Load engine
            var engine = mechlab_items.getById(mech.engine_id);
            self.engine(engine);
        };

        // Clear out the current configuration
        self.clearItems = function() {
            $.each(self.componentsList, function(index, item) {
                item.clear();
            });
        };

        // Back to original
        self.resetStock = function() {
            self.loadMech(self.mech());
        };

        var outputCurrentConfiguration = function() {
            var outputMech = {
                name: self.name(),
                tonnage: self.maxTonnage(),
                hasHands: self.hasHands(),
                jumpJets: self.canHasJumpJets(),
                ecm: self.ecm(),
                engine_id: self.engine().id,
                structure: self.structure(),
                artemis: self.artemis(),
                heatSinks: self.heatSinks(),
                armor: self.armor(),
                armorValues: [
                    self.armorHead(),
                    self.armorCenterTorso(),
                    self.armorCenterTorsoRear(),
                    self.armorRightTorso(),
                    self.armorRightTorsoRear(),
                    self.armorLeftTorso(),
                    self.armorLeftTorsoRear(),
                    self.armorRightArm(),
                    self.armorLeftArm(),
                    self.armorRightLeg(),
                    self.armorLeftLeg()
                ],
                components: {
                    head: self.head.outputComponentConfig(),
                    centerTorso: self.centerTorso.outputComponentConfig(),
                    rightTorso: self.rightTorso.outputComponentConfig(),
                    leftTorso: self.leftTorso.outputComponentConfig(),
                    rightArm: self.rightArm.outputComponentConfig(),
                    leftArm: self.leftArm.outputComponentConfig(),
                    rightLeg: self.rightLeg.outputComponentConfig(),
                    leftLeg: self.leftLeg.outputComponentConfig()
                }
            };

            var output = JSON.stringify(outputMech);
            console.log(output);
            return output;
        };

        // Save current configuration to localStorage
        self.saveConfiguration = function() {
            if(!localStorage) {
                alert('Saving is only allowed for browsers with localStorage');
                return;
            }

            // Prompt user for config name
            var configName = window.prompt('Enter mech config name:', self.name());
            if(!configName) return; // cancel case

            // Make sure it's not already there
            // var existing = localStorage.getItem(configName);
            // if(existing){
            //     alert('Mech config ' + configName + ' already exists');
            //     return;
            // }

            // Put it in the storage
            var mechString = outputCurrentConfiguration();
            localStorage.setItem(configName, mechString);
            //alert('Saved ' + configName);

            mechlab.refreshStorageMechs();
        };

	}; // end of core vm xtor
	
})(jQuery);