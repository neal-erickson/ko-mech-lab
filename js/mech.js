(function($) {
	if(!mechlab) {
		mechlab = { };
	}

	// This 'sub' view model controls all the interesting bits
	mechlab.mechViewModel = function() {
		var self = this;

        self.showFixedItems = ko.observable(true); // TODO use

        // TODO : Make everything possible computed from this?
        self.mech = ko.observable();//.extend({ logChange: 'mech'});

        // Core mech stats
        self.name = ko.observable();
		self.maxTonnage = ko.observable(20); // this is intentionally not zero to avoid a bunch of awkward checks later
        self.hasHands = ko.observable(true);
        self.canHasJumpJets = ko.observable(false);
        self.ecm = ko.observable(false);

		// Upgrade settings
        self.endoSteelStructure = ko.observable(false);//.extend({ logChange: 'hasEndoSteel'});
		self.ferroFibrousArmor = ko.observable(false);
		self.doubleHeatSinks = ko.observable(false);
        self.artemisEquipped = ko.observable(false);

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
        
        self.theoreticalEngineHeatSinks = ko.computed(function(){
            if(!self.engine()) return 0;
            var rating = self.engine().engineStats.rating.toFloat();
            return Math.round(Math.floor(rating / 25));
        });

        self.numberOfEngineHeatSinks = ko.computed(function(){
            return Math.min(self.theoreticalEngineHeatSinks(), 10);
        }).extend({logChange: 'engine heat sinks'});

        self.numberOfEngineHeatSinkSlots = ko.computed(function() {
            var sinks = Math.max(self.theoreticalEngineHeatSinks() - 10, 0);
            return sinks;
        }).extend({logChange: 'engine heat sink slots'});

        // Component Xtor //////////////////////////////////////////////////////////////////////////////////////////////////////////

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

            // The item ids - used for saving/loading
            component.itemIds = ko.computed(function(){
                return component.items().map(function(item){ return item.id; });
            });//.extend({logChange: 'itemids'});

            // Weight of item within this component
    		component.itemsWeight = ko.computed(function() {
                return component.items().reduce(function(previousItem, currentItem, index, array){
                    var weight = currentItem.tons.toFloat();
                    if(self.artemisEquipped() && currentItem.isWeapon() && currentItem.artemisRequired()){
                        weight++;
                    }
                    return previousItem + weight;
                }, 0);
    		});

            component.weapons = ko.computed(function() {
                return component.items().filter(function(item, index){
                    return item.isWeapon();
                });
            });//.extend({logChange: 'weapons'});

            component.heatSinkCount = ko.computed(function(){
                return component.items().filter(function(item){
                    return item.isHeatSink();
                }).length;
            });

            // component.heatDissipatedPerSecond = ko.computed(function(){
            //     var heatSinks = component.heatSinkCount();
            //     var multiplier = 0.10;
            //     if(self.doubleHeatSinks()){
            //         multiplier = component.name() == 'Engine Heat Sinks' ? 0.2 : 0.14;
            //     }
            //     return heatSinks.length * multiplier;
            // }).extend({logChange: component.name() + '-hdps'});

            component.alpha = ko.computed(function(){
                return component.weapons().reduce(function(previous, current){
                    return previous + current.getDamage();
                }, 0);
            });

            component.dps = ko.computed(function(){
                return component.weapons().reduce(function(previous, current, index, array){
                    return previous + current.getDps();
                }, 0);
            });

            // TODO
            // component.heatEfficiency = ko.computed(function(){
            //     // return component.weapons().reduce(function(previous, current){
            //     //     return previous + (current.weaponStats.heat.toFloat() )
            //     // }, 0);
            //     return 0;
            // });

            component.hps = ko.computed(function(){
                return component.weapons().reduce(function(previous, current){
                    return previous + current.getHps();
                }, 0);
            });

            var calculateHardpointsUsed = function(weaponType) {
                var used = 0;
                $.each(component.weapons(), function(index, item) {
                    if(item.weaponStats.type == weaponType) {
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

            var createHardpointDisplayText = function(used, total, type){
                return used + '/' + total + ' ' + type;
            }
            component.ballisticHardpointDisplayText = ko.computed(function() {
                return createHardpointDisplayText(component.ballisticHardpointsUsed(), component.ballisticHardpoints(), 'B');
            });
            component.energyHardpointDisplayText = ko.computed(function() {
                return createHardpointDisplayText(component.energyHardpointsUsed(), component.energyHardpoints(), 'E');
            });
            component.missileHardpointDisplayText = ko.computed(function() {
                return createHardpointDisplayText(component.missileHardpointsUsed(), component.missileHardpoints(), 'M');
            });

            var Slot = function(name, options){
                this.name = name;

                this.data = options.data || {};
                this.empty = options.empty || false;
                this.removeable = options.removeable || false;
                this.first = options.first || false;
                this.last = options.last || false;

                this.energy = options.energy || false;
                this.missile = options.missile || false;
                this.ballistic = options.ballistic || false;
            };

            var isRemoveable = function(item){
                return item.tons != 0; // Fixed items have no tonnage. Currently. Hopefully.
            };

            // This is a hack, used only in the case of engine heat sinks component
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
                                last: i == item.slots - 1,
                                ballistic: item.isWeapon() && item.weaponStats.type == 0,
                                energy: item.isWeapon() && item.weaponStats.type == 1,
                                missile: item.isWeapon() && item.weaponStats.type == 2,
                            });
                            slots.push(slot);
    					};
                        // If this was an SRM or LRM, and Artemis IV is equipped, we need to add an extra crit slot
                        if(self.artemisEquipped() && item.isWeapon() && item.artemisRequired()){
                            slots.push(new Slot('+ Artemis', {
                                removeable: false,
                                missile: true,
                                first: true,
                                last: true
                            }));
                        }
                    } else { // this is only used by engine heat sinks component
                        var slot = new Slot(item.name, {
                            data: item,
                            removeable: isRemoveable(item),
                            first: true,
                            last: true
                        });
                        slots.push(slot);
                    }
				});
				return slots;
			});//.extend({ logChange: 'slots'});

			component.criticalSlotsOpen = ko.computed(function() {
    			return component.criticalSlots() - component.slots().length;
    		});//.extend({ logChange: component.name() + ' criticalSlotsOpen'});

            component.criticalSlotsInvalid = ko.computed(function(){
                return component.criticalSlotsOpen() < 0;
            });//.extend({ logChange: component.name() + ' criticalSlotsInvalid'});

    		// This is the computed value that pads out the slots with empty placeholders for visual display. 
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
                if(!item.isModule()) return true;

                switch(item.getModuleType()){
                    case 'jumpJets':
                        return self.canHasJumpJets(); // TODO : Enforce orrect jump jet class
                    case 'heatSink':
                        if(self.doubleHeatSinks()){
                            return item.name === 'DoubleHeatSink_MkI';
                        }
                        return item.name === 'HeatSink_MkI';
                    case 'ecm':
                        return self.ecm();
                    case 'beagle':
                        return true; // TODO
                    case 'case':
                        return true; // TODO
                }
                return true; // default pass through
            };

			var checkWeaponHardpoints = function(item){
	    		if(!item.isWeapon()) return true; // pass-through for non weapons

				// Return a check expression
				switch(item.weaponStats.type){
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
	    	};

            // Drag n drop functions
			component.accept = function(incoming) {
    			var item = ko.dataFor(incoming[0]);

    			// Return '&&' of slots, hardpoints, etc
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
                return ids.map(function(id){
                    var item = mechlab_items.getById(id);
                    if(item == null) throw ('Could not find item id:' + id);
                    return item;
                });
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
                return new mechlab_loadouts.componentLayout({
                    slots: component.criticalSlots(), 
                    items: component.itemIds(), 
                    ams: component.ams(),
                    ballistic: component.ballisticHardpoints(),
                    energy: component.energyHardpoints(),
                    missile: component.missileHardpoints()
                });
            };

    	}; // end component xtor

        // Component Declaration/////////////////////////////////////////////////////////////////////////////////////////////

        // This is a hacked component for accepting heat sinks only
        self.engineComponent = new Component('Engine Heat Sinks', {});
        self.engineComponent.useItemMultipleSlots(false);

        // This manual subscription keeps the engine components critical slots synced
        self.numberOfEngineHeatSinkSlots.subscribe(function(newValue){
            self.engineComponent.criticalSlots(newValue);
        });

        var engineAccept = self.engineComponent.accept;
        self.engineComponent.accept = function(incoming){
            var item = ko.dataFor(incoming[0]);            
            if(item.cType != 'CHeatSinkStats') return; // only heat sinks allowed
            if(self.engineComponent.criticalSlotsOpen() < 1) return false; // Check that there is a slot
            // Check heat sink type
            if(self.doubleHeatSinks()){
                return item.name === 'DoubleHeatSink_MkI';
            }
            return item.name === 'HeatSink_MkI';
        };

        // Convenience xtor for "fixed" hardpoint items (gyro, etc)
        var fixedItem = function(name, slots) {
            this.name = name;
            this.slots = slots;
            this.tons = 0; // set tonnage
            this.isWeapon = function() {
                return false;
            };
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

        // Calculated Values ////////////////////////////////////////////////////////////////////////////////////////////////////

        self.remainingCriticalSlots = ko.computed(function(){
            var slots = 0;
            $.each(self.componentsList, function(index, item){
                slots += item.criticalSlotsOpen();
            });
            if(self.endoSteelStructure()){
                slots -= 14;
            }
            if(self.ferroFibrousArmor()){
                slots -= 14;
            }
            return slots;
        });//.extend({logChange: 'rcs'});

        self.doubleHeatSinks.subscribe(function(newValue){
            // This manual subscription is for clearing out existing heat sinks if the kind are switched
             $.each(self.componentsListPlusEngineSinks, function(index, component){
                var heatSinkId = newValue ? 3000 : 3001;
                var heatSink = mechlab_items.getById(heatSinkId);
                component.items.remove(heatSink);
            });
        });

        // Weapon weights
        self.totalItemsWeight = ko.computed(function() {
            return self.componentsListPlusEngineSinks.reduce(function(previousValue, currentValue){
                return previousValue + currentValue.itemsWeight(); 
            }, 0);
        });

        self.alphaStrike = ko.computed(function(){
            return self.componentsList.reduce(function(previous, current){
                return previous + current.alpha();
            }, 0);
        });

        self.dps = ko.computed(function(){
            return self.componentsList.reduce(function(previous, current){
                return previous + current.dps();
            }, 0);
        });

        // self.heatEfficiency = ko.computed(function(){
        //     return self.componentsList.reduce(function(previous, current){
        //         return previous + current.heatEfficiency();
        //     }, 0);
        // });

        self.hps = ko.computed(function(){
            return self.componentsList.reduce(function(previous, current){
                return previous + current.hps();
            }, 0);
        });

        self.totalComponentHeatSinks = ko.computed(function(){
            return self.componentsList.reduce(function(previous, current){
                return previous + current.heatSinkCount();
            }, 0);
        }).extend({logChange: 'tchs'});

        self.totalEngineHeatSinks = ko.computed(function(){
            // Return the engine heat sinks + the number of engine component heat sinks (only thing allowed in that component)
            return self.numberOfEngineHeatSinks() + self.engineComponent.items().length;
        }).extend({logChange: 'tehs'});

        self.totalHeatSinks = ko.computed(function(){
            return self.totalComponentHeatSinks() + self.totalEngineHeatSinks();
        });

       self.hasRequiredHeatSinks = ko.computed(function() {
            // If its a rating 250 or above, no external heat sinks required
            if(self.numberOfEngineHeatSinks() >= 10){
                return true;
            }
            // Otherwise, our mech needs a minimum of 10 sinks to keep from lighting on fire
            return (self.totalHeatSinks()) >= 10;
        });

       self.effectiveHeatSinks = ko.computed(function(){
            var componentHeatSinks = self.totalComponentHeatSinks();
            var engineHeatSinks = self.totalEngineHeatSinks();
        
            // For doubles, in engine work double, outside work 1.4
            if(self.doubleHeatSinks()){
                return (componentHeatSinks * 1.4) + (engineHeatSinks * 2);
            }
            // single heat sinks are way easier
            return (componentHeatSinks + engineHeatSinks);
       });

        self.heatDissipatedPerSecond = ko.computed(function(){
            return self.effectiveHeatSinks() / 10;
        });

        self.heatRatio = ko.computed(function() {
            return self.hps() / self.heatDissipatedPerSecond();
        });

        // TODO : This formula sucks.
        self.mwoHeat = ko.computed(function(){
            // First try
            //return 0.7 * Math.sqrt(10 / self.heatRatio());
            // MechSpecs version LaznAzn
            //return 0.7021 * Math.sqrt(Math.pow(self.heatDissipatedPerSecond() * 10 * self.hps(), 0.5026));
            return 0.61 * Math.sqrt((self.effectiveHeatSinks()) / self.hps());
        });

    	// Anna's contribution to the codebase:
		//1001javascriptinternetexploder.no=pie

    	// Initialize armor values for each location
        var armorLocation = function(maximum){
            var al = this;
            al.maximum = maximum;
            al.value = ko.observable(0);
            al.value.subscribe(function(newValue){
                if(newValue < 0){
                    al.value(0);
                }
                else if(newValue > al.maximum()){
                    al.value(al.maximum());
                }
            });
        };

        self.centerTorsoMaximumArmor = ko.computed(function() {
            return mechlab_enums.getStructure(self.maxTonnage()).centerTorso * 4;
        });
        self.sideTorsoMaximumArmor = ko.computed(function() {
            return mechlab_enums.getStructure(self.maxTonnage()).sideTorso * 4;
        });
        self.armMaximumArmor = ko.computed(function() {
            return mechlab_enums.getStructure(self.maxTonnage()).arms * 4;
        });
        self.legMaximumArmor = ko.computed(function() {
            return mechlab_enums.getStructure(self.maxTonnage()).legs * 4;
        });

        // TODO : all of the things. armor things.
        self.armorHead = new armorLocation(ko.observable(18)); // head maximum is always 18

        // Torsos depend on each other, which is awkward.
        self.armorCenterTorso = new armorLocation(ko.observable(0));
        self.armorCenterTorsoRear = new armorLocation(ko.observable(0));
        self.armorCenterTorso.maximum = ko.computed(function() {
            return self.centerTorsoMaximumArmor() - self.armorCenterTorsoRear.value();
        });
        self.armorCenterTorsoRear.maximum = ko.computed(function() {
            return self.centerTorsoMaximumArmor() - self.armorCenterTorso.value();
        });
        
        self.armorRightTorso = new armorLocation(ko.observable(0));
        self.armorRightTorsoRear = new armorLocation(ko.observable(0));
        self.armorRightTorso.maximum = ko.computed(function() {
            return self.sideTorsoMaximumArmor() - self.armorRightTorsoRear.value();
        });
        self.armorRightTorsoRear.maximum = ko.computed(function() {
            return self.sideTorsoMaximumArmor() - self.armorRightTorso.value();
        });

        self.armorLeftTorso = new armorLocation(ko.observable(0));
        self.armorLeftTorsoRear = new armorLocation(ko.observable(0));
        self.armorLeftTorso.maximum = ko.computed(function() {
            return self.sideTorsoMaximumArmor() - self.armorLeftTorsoRear.value();
        });
        self.armorLeftTorsoRear.maximum = ko.computed(function() {
            return self.sideTorsoMaximumArmor() - self.armorLeftTorso.value();
        });

        self.armorRightArm = new armorLocation(ko.computed(function() {
            return self.armMaximumArmor();
        }));
        self.armorLeftArm = new armorLocation(ko.computed(function() {
            return self.armMaximumArmor();
        }));
        self.armorRightLeg = new armorLocation(ko.computed(function() {
            return self.legMaximumArmor();
        }));
        self.armorLeftLeg = new armorLocation(ko.computed(function() {
            return self.legMaximumArmor();
        }));

        // Convenience array + iterator
        self.armorLocations = [
            self.armorHead,
            self.armorCenterTorso,
            self.armorCenterTorsoRear,
            self.armorRightTorso,
            self.armorRightTorsoRear,
            self.armorLeftTorso,
            self.armorLeftTorsoRear,
            self.armorRightArm,
            self.armorLeftArm,
            self.armorRightLeg,
            self.armorLeftLeg
        ];

        self.overallArmorValue = ko.computed(function() {
            return self.armorLocations.reduce(function(previous, current){
                return previous + current.value().toFloat();
            }, 0);
        });

		self.armorWeight = ko.computed(function() {
			var armorPerTon = self.ferroFibrousArmor() ? 35.84 : 32.0;
			return self.overallArmorValue() / armorPerTon;
		});

        self.structureWeight = ko.computed(function() {
            //var multiplier = self.structure() === 'standard' ? 0.1 : 0.05;
            var multiplier = self.endoSteelStructure() ? 0.05 : 0.1;
            return self.maxTonnage() * multiplier;
        });

		// This will be a complicated equation:
		self.tonnage = ko.computed(function() {
    		return self.structureWeight() 
                + self.engineWeight()
    			+ self.armorWeight()
    			+ self.totalItemsWeight();
    	});
        self.tonnageValid = ko.computed(function() {
            return self.tonnage() <= self.maxTonnage();
        });

        // Loading / Saving ///////////////////////////////////////////////////////////////////////////////////////////////////////

        // Used to prevent weird problems when loading armor values due to maximum calculations
        self.resetArmorLocations = function(){
            self.armorLocations.forEach(function(location){
                location.value(0);
            });
        };

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
            self.endoSteelStructure(mech.endoSteel);
            self.ferroFibrousArmor(mech.ferroFibrous);
            self.artemisEquipped(mech.artemis);
            self.doubleHeatSinks(mech.doubleHeatSinks);

            // Copy in base armor values
            self.resetArmorLocations();
            self.armorHead.value(mech.armorValues[0]);
            self.armorCenterTorso.value(mech.armorValues[1]);
            self.armorCenterTorsoRear.value(mech.armorValues[2]);
            self.armorRightTorso.value(mech.armorValues[3]);
            self.armorRightTorsoRear.value(mech.armorValues[4]);
            self.armorLeftTorso.value(mech.armorValues[5]);
            self.armorLeftTorsoRear.value(mech.armorValues[6]);
            self.armorRightArm.value(mech.armorValues[7]);
            self.armorLeftArm.value(mech.armorValues[8]);
            self.armorRightLeg.value(mech.armorValues[9]);
            self.armorLeftLeg.value(mech.armorValues[10]);

            // Component specific loading
            self.head.loadSpec(mech.components.head);
            self.centerTorso.loadSpec(mech.components.centerTorso);
            self.rightTorso.loadSpec(mech.components.rightTorso);
            self.leftTorso.loadSpec(mech.components.leftTorso);
            self.rightArm.loadSpec(mech.components.rightArm);
            self.leftArm.loadSpec(mech.components.leftArm);
            self.rightLeg.loadSpec(mech.components.rightLeg);
            self.leftLeg.loadSpec(mech.components.leftLeg);
            self.engineComponent.loadSpec(mech.components.engine);

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
                endoSteel: self.endoSteelStructure(),
                artemis: self.artemisEquipped(),
                doubleHeatSinks: self.doubleHeatSinks(),
                ferroFibrous: self.ferroFibrousArmor(),
                armorValues: [
                    self.armorHead.value(),
                    self.armorCenterTorso.value(),
                    self.armorCenterTorsoRear.value(),
                    self.armorRightTorso.value(),
                    self.armorRightTorsoRear.value(),
                    self.armorLeftTorso.value(),
                    self.armorLeftTorsoRear.value(),
                    self.armorRightArm.value(),
                    self.armorLeftArm.value(),
                    self.armorRightLeg.value(),
                    self.armorLeftLeg.value()
                ],
                components: {
                    head: self.head.outputComponentConfig(),
                    centerTorso: self.centerTorso.outputComponentConfig(),
                    rightTorso: self.rightTorso.outputComponentConfig(),
                    leftTorso: self.leftTorso.outputComponentConfig(),
                    rightArm: self.rightArm.outputComponentConfig(),
                    leftArm: self.leftArm.outputComponentConfig(),
                    rightLeg: self.rightLeg.outputComponentConfig(),
                    leftLeg: self.leftLeg.outputComponentConfig(),
                    engine: self.engineComponent.outputComponentConfig()
                }
            };

            var output = JSON.stringify(outputMech);
            //console.log(output);
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