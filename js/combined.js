(function($){

    // Need to get some array hash action
     var makeHash = function(array) {
        var hashed = {};
        for(var i in array){
            var item = array[i];
            hashed[item.id] = item;
        }
        //console.log('hashed', hashed);
        return hashed;
    };

    loadMechlabItems = function(callback){
        $.getJSON('data/item-stats.json', function(data) {
            var cleaned = cleanupItems(data);
            callback(cleaned);
        });
    };

    // These methods are $.extended onto the item objects so that code can be shared
    var itemSharedMethods = {
        isWeapon: function(){
            return !!this.weaponStats;
        },
        isAmmo: function(){
            return !!this.ammoTypeStats;
        },
        isHeatSink: function() {
            return this.cType === 'CHeatSinkStats';
        },
        isEngine: function(){
            return this.cType === 'CEngineStats';
        },
        isJumpJets: function(){
            return this.cType === 'CJumpJetStats';
        },
        isModule: function(){
            return !this.isEngine() && !this.isWeapon() && !this.isAmmo();
        }
    };

    var weaponMethods = {
        getCooldownWithDuration: function() {
            return this.weaponStats.cooldown.toFloat() + this.weaponStats.duration.toFloat();
        },
        getDamage: function(){
            if(this.id == 1014) { // AMS pass
                return 0; 
            }
            var multiplier = this.weaponStats.numFiring.toFloat();
            return multiplier * this.weaponStats.damage.toFloat();
        },
        getHps: function() {
            if(this.weaponStats.heat.toFloat() === 0) return 0; // machine gun pass through
            var hps = this.weaponStats.heat.toFloat() / (this.getCooldownWithDuration() || 1);
            return hps;
        },
        getDps: function(){
            if(this.id == 1014) { // AMS pass
                return 0; 
            }
            var divisor = this.getCooldownWithDuration() || 1;
            return this.getDamage() / divisor;
        },
        artemisRequired: function(){
            //debugger;
            var nameStart = this.name.slice(0, 3).toLowerCase();
            return nameStart == 'srm' || nameStart == 'lrm';
        }
    };
    var moduleMethods = {
        getModuleType: function(){
            switch(this.cType){
                case 'CHeatSinkStats':
                    return 'heatSink';
                case 'CJumpJetStats':
                    return 'jumpJets';
                case 'CGECMStats':
                    return 'ecm';
                case 'CDummyHeadStats':
                    return 'commandConsole';
                case 'CCASEStats':
                    return 'case';
                case 'CBAPStats':
                    return 'beagle';
                case 'CArtemisIVStats':
                    return 'artemis';
                default:
                    return '';
            }
        }
    };

    // This function is to modify the created items object
    // with better methods, ordering, etc.
    var cleanupItems = function(items) {
        // Custom arrays (are classified as modules)
        items.engines = [];
        items.equipment = [];

        // Sort weapons by type, then tonnage
        items.weapons.sort(function(a, b) {
            var diff = a.weaponStats.type - b.weaponStats.type;
            if(diff === 0) {
                return a.weaponStats.tons - b.weaponStats.tons;
            }
            return diff;
        });
        
        // Sort mechs by name
        items.mechs.sort(function(a, b){
            return a.name < b.name ? -1 : 1;
        })

        // Ammo has no slots or tons by default, always 1 for both
        $.each(items.ammoTypes, function(index, item){
            item.slots = "1";
            item.tons = "1";
        });

        // Iterate and move some things
        $.each(items.modules, function(index, item){
            switch(item.cType){
                case 'CEngineStats':
                    //debugger;
                    item.tons = item.engineStats.weight; // weird exception to data schema
                    item.slots = "6"; // I handle XL engines is a different way
                    items.engines.push(item);
                    break;
                case 'CBAPStats':
                case 'CJumpJetStats':
                case 'CHeatSinkStats':
                case 'CCASEStats':
                case 'CDummyHeadStats':
                case 'CGECMStats':
                    $.extend(item, moduleMethods);
                    items.equipment.push(item);
                    break;
            }
        });

        // Create a hash for quickly loading all items by id
        var allItems = items.weapons.concat(items.ammoTypes).concat(items.engines).concat(items.equipment);
        items.idHash = makeHash(allItems);

        // Hash accessor (in case implementation changes)
        items.getById = function(id) {
            return items.idHash[id];
        }

        // Add custom item methods
        $.each(allItems, function(index, item){
            $.extend(item, itemSharedMethods);
            //console.log(item.name, item.isWeapon(), item.isEngine(), item.isAmmo(), item.isHeatSink());
        });

        items.weapons.forEach(function(weapon){
            $.extend(weapon, weaponMethods);
        });

        return items; // give it back bro
    };

})(jQuery);

(function($) {
	mechlab = { };

	mechlab.coreVM = function() {
		var self = this;

		// Convenience function for conversion.
		// TODO : should probably live elsewhere
		String.prototype.toFloat = function(){
			return parseFloat(this);
		};

		// This prevents things from failing when you're not sure
		// you have a String or a Number
		Number.prototype.toFloat = function() {
			return this;
		};

		Number.prototype.withDigits = function(digits){
			var divisor = Math.pow(10, digits);
			return (this * divisor) / divisor;
		};

		ko.bindingHandlers.booleanValue = {
		    init: function(element, valueAccessor, allBindingsAccessor) {
		        var observable = valueAccessor(),
		            interceptor = ko.computed({
		                read: function() {
		                    return observable().toString();
		                },
		                write: function(newValue) {
		                    observable(newValue === "true");
		                }
		            });

		        ko.applyBindingsToNode(element, { value: interceptor });
		    }
		};

		ko.extenders.logChange = function(target, option) {
		    target.subscribe(function(newValue) {
		       console.log(option + ": " + newValue);
		    });
		    return target;
		};

		// Default draggable options for re-use
		self.draggableOptions = {
			revert: true, 
			distance: 20, 
			helper: 'clone', 
			revertDuration: 0
		};

		// Load items from separate namespace
		self.items = mechlab_items;

		// Create double drop down for mech chassis + variant
		self.mechChoices = ko.observableArray(self.items.mechs);

		// var Chassis = function(name, prefix){
		// 	this.name = name;
		// 	this.prefix = prefix;
		// };

		// This is bound to the dropdown with <optgroup> elements, so it has to be handled delicately
		self.selectedChassis = ko.observable();
		
		self.selectedVariant = ko.observable();
		self.variantOptions = ko.computed(function() {
			if(!self.selectedChassis()) {
				return [];
			}
			return self.mechChoices().filter(function(mech){
				// This is a hack to avoid those annoying '-FOUNDER' entries
				if(mech.name.toLowerCase().slice(-7) == 'founder') {
					return false;
				}
				return mech.name.toLowerCase().substring(0, 3) == self.selectedChassis().toLowerCase();
			});
		});//.extend({logChange: 'vo'});

		var getSavedMechs = function() {
			var saved = [];
			var length = localStorage.length;
			for(var i  = 0; i < length; i++){
				saved.push(localStorage.key(i));
			}
			return saved;
		};

		// Load saved mechs from storage
		self.savedMechs = ko.observableArray();

		mechlab.refreshStorageMechs = function() {
			self.savedMechs(getSavedMechs());
		};

		self.selectedSavedMech = ko.observable();

		mechlab.refreshStorageMechs();

		// View model abstracted from core view model
		self.mechViewModel = new mechlab.mechViewModel();

		// Core UI bindings
		self.selectedMech = ko.observable();
		self.mechChosen = ko.observable(false);

		var loadIntoView = function(mech){
			if(!mech) return;

			self.mechChosen(true);
			self.mechViewModel.loadMech(mech);
		};

		// Callback for selecting mech variant
		self.selectMech = function() {
			var mech = mechlab_loadouts.load(self.selectedVariant().id);
			loadIntoView(mech);
		};

		// Load mech from localstorage
		self.loadSaved = function(ui, event) {
			var mechString = localStorage.getItem(self.selectedSavedMech());
			var mech = JSON.parse(mechString);
			loadIntoView(mech);
		};

		self.deleteSaved = function(){
			var selected = self.selectedSavedMech();
			if(!selected) return; // can't delete things that aren't real.

			if(confirm('Delete saved loadout "' + self.selectedSavedMech() + '"?')){
				// Remove key/value from IS
				localStorage.removeItem(self.selectedSavedMech());
				mechlab.refreshStorageMechs();
			}
		};

		self.clearSaved = function() {
			if(confirm("Delete all saved loadouts?")){
				localStorage.clear();
				mechlab.refreshStorageMechs();
			}
		};

	}; // end core vm xtor
	
})(jQuery);

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
        self.nickname = ko.observable();

		self.maxTonnage = ko.observable(20); // this is intentionally not zero to avoid a bunch of awkward checks later
        self.hasHands = ko.observable(true);
        self.canHasJumpJets = ko.observable(false);
        self.ecm = ko.observable(false);

		// Upgrade settings
        self.endoSteelStructure = ko.observable(false);//.extend({ logChange: 'hasEndoSteel'});
		self.ferroFibrousArmor = ko.observable(false);
		self.doubleHeatSinks = ko.observable(false);
        self.artemisEquipped = ko.observable(false);

        self.featuresList = ko.computed(function(){
            var features = [];
            if(self.canHasJumpJets()){
                features.push('Jump Jets');
            }
            if(self.ecm()){
                features.push('ECM')
            }
            return features;
        });

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
    	var Component = function(location, name, options){
    		var component = this;
            var options = options || {}; // prevent errors

            // Component specifics
            component.name = ko.observable(name);
            component.location = ko.observable(location);

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
                    placeholders.push(new Slot(' ', {
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
                debugger;
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
                        if(component.location() == mechlab_enums.componentLocations.rightTorso
                            || component.location() == mechlab_enums.componentLocations.leftTorso){
                            return true;
                        }
                        return false;
                    case 'commandConsole':
                        return component.location() == mechlab_enums.componentLocations.head;
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
        self.engineComponent = new Component(mechlab_enums.componentLocations.engine, 'Engine Heat Sinks', {});
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
    	self.head = new Component(mechlab_enums.componentLocations.head, 'Head', {});
    	self.rightArm = new Component(mechlab_enums.componentLocations.rightArm, "Right Arm", {});
        self.leftArm = new Component(mechlab_enums.componentLocations.leftArm, "Left Arm", {});
        var torsofixedItems = ko.computed(function() {
            if(self.engine() && self.engine().name.indexOf('XL') !== -1){
                return [new fixedItem("XL Engine", "3", "0")];
            }
            return [];
        });
        self.rightTorso = new Component(mechlab_enums.componentLocations.rightTorso, "Right Torso", {
           fixedItems: torsofixedItems 
        });
		self.leftTorso = new Component(mechlab_enums.componentLocations.leftTorso, "Left Torso", {
            fixedItems: torsofixedItems
        });
        self.centerTorso = new Component(mechlab_enums.componentLocations.centerTorso, "Center Torso", {});
        self.rightLeg = new Component(mechlab_enums.componentLocations.rightLeg, 'Right Leg', {});
        self.leftLeg = new Component(mechlab_enums.componentLocations.leftLeg, 'Left Leg', {});

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
            self.nickname(mech.nickname);

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

        var outputCurrentConfiguration = function(nickname) {
            var outputMech = {
                name: self.name(),
                nickname: nickname,
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
            var mechString = outputCurrentConfiguration(configName);
            localStorage.setItem(configName, mechString);
            //alert('Saved ' + configName);

            mechlab.refreshStorageMechs();
        };

	}; // end of core vm xtor
	
})(jQuery);

(function($){

	mechlab_loadouts = {};
	mechlab_loadouts.loadouts = {};

	// Return mech by index
	mechlab_loadouts.load = function(id){
		if(!mechlab_loadouts.loadouts[id]){
			alert('No mech matches id:' + id);
		}
		return mechlab_loadouts.loadouts[id];
	};

	mechlab_loadouts.mechLoadout = function(name, tonnage, moduleSlots, armorValues, engine_id, components, options){
		if(!options) options = {};

		// TODO : Should be observables?
		this.name = name;
		this.tonnage = tonnage;
		this.moduleSlots = moduleSlots;
		this.armorValues = armorValues;
		this.engine_id = engine_id;

		// Optional chassis specific settings
		this.hasHands = options.hasHands || false;
		this.jumpJets = options.jumpJets || false;
		this.ecm = options.ecm || false;

		this.endoSteel = options.endoSteel || false;
		this.ferroFibrous = options.ferroFibrous || false;
		this.doubleHeatSinks = options.doubleHeatSinks || false;
		this.artemis = options.artemis || false;

		this.components = components;

		// Modify components with defaults if needed
		
		// head
		if(!components.head){
			components.head = new mechlab_loadouts.componentLayout({ slots: 1});
		}
		if(!components.head.criticalSlots){
			components.head.criticalSlots = 1;
		}

		// CT
		if(!components.centerTorso){
			components.centerTorso = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.centerTorso.criticalSlots){
			components.centerTorso.criticalSlots = 2;
		}

		// RT
		if(!components.rightTorso){
			components.rightTorso = new mechlab_loadouts.componentLayout({ slots: 12});
		}
		if(!components.rightTorso.criticalSlots){
			components.rightTorso.criticalSlots = 12;
		}

		// LT
		if(!components.leftTorso){
			components.leftTorso = new mechlab_loadouts.componentLayout({ slots: 12});
		}
		if(!components.leftTorso.criticalSlots){
			components.leftTorso.criticalSlots = 12;
		}

		// RA
		if(!components.rightArm){
			components.rightArm = new mechlab_loadouts.componentLayout({ slots: 10});
		}
		if(!components.rightArm.criticalSlots){
			components.rightArm.criticalSlots = 10;
		}

		// LA
		if(!components.leftArm){
			components.leftArm = new mechlab_loadouts.componentLayout({ slots: 10});
		}
		if(!components.leftArm.criticalSlots){
			components.leftArm.criticalSlots = 10;
		}

		// RL
		if(!components.rightLeg){
			components.rightLeg = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.rightLeg.criticalSlots){
			components.rightLeg.criticalSlots = 2;
		}

		// LL
		if(!components.leftLeg){
			components.leftLeg = new mechlab_loadouts.componentLayout({ slots: 2});
		}
		if(!components.leftLeg.criticalSlots){
			components.leftLeg.criticalSlots = 2;
		}

		// Engine heat sinks
		if(!components.engine){
			components.engine = new mechlab_loadouts.componentLayout({ slots: 0 });
		}
	};

	mechlab_loadouts.componentLayout = function(options){
		if(!options) options = {};
		this.criticalSlots = options.slots || null;		
		this.itemIds = options.items || [];
		this.ams = options.ams === true;
		this.ballisticHardpoints = options.ballistic || 0;
		this.energyHardpoints = options.energy || 0;
		this.missileHardpoints = options.missile || 0;
	};

	// Quick id property bags for having fewer hardcoded ids	
	mechlab_loadouts.initializeLoadouts = function(){
		var weapons = mechlab_enums.weapons;
		var ammo = mechlab_enums.ammo;
		var modules = mechlab_enums.modules;
		var engines = mechlab_enums.engines;

		// Commando //////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['26'] = new mechlab_loadouts.mechLoadout(
			"COM-1B", 25, 2,
			[12, 16, 8, 12, 6, 12, 6, 12, 12, 16, 16],
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm2], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm, modules.heatSink, modules.heatSink]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.largeLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1 }),
			}
		);

		mechlab_loadouts.loadouts['27'] = new mechlab_loadouts.mechLoadout(
			"COM-1D", 25, 2,
			[12, 12, 4, 10, 4, 10, 4, 8, 8, 12, 12],
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.largeLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8 }),
			}
		);

		mechlab_loadouts.loadouts['5'] = new mechlab_loadouts.mechLoadout(
			"COM-2D", 25, 2,
			[12, 16, 8, 12, 6, 12, 6, 12, 12, 16, 16], 
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.srm]}),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.srm4], missile: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items:[weapons.mediumLaser], energy: 1 }),
			},
			{
				ecm: true
			}
		);

		mechlab_loadouts.loadouts['6'] = new mechlab_loadouts.mechLoadout(
			"COM-3A", 25, 2,
			[8, 12, 8, 8, 6, 8, 6, 8, 8, 12, 12], 
			engines.std150,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.flamer, weapons.srm6], missile: 1, energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items:[weapons.mediumLaser], energy: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		// Raven //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['34'] = new mechlab_loadouts.mechLoadout(
			"RVN-2X", 35, 2,
			[18, 28, 10, 20, 8, 20, 8, 20, 20, 28, 28],
			engines.std175,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.largeLaser, ammo.srm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['35'] = new mechlab_loadouts.mechLoadout(
			"RVN-4X", 35, 2,
			[18, 32, 10, 22, 8, 22, 8, 22, 22, 30, 30],
			engines.std175,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6, modules.jumpJetV, modules.jumpJetV], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV, ammo.srm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({items: [weapons.machineGun, weapons.machineGun, ammo.machineGun], ballistic: 2}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			},
			{
				jumpJets: true
			}
		);

		mechlab_loadouts.loadouts['33'] = new mechlab_loadouts.mechLoadout(
			"RVN-3L", 35, 3,
			[12,22,8,22,6,22,6,16,16,16,16],
			engines.xl210,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6, weapons.tag], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [ammo.srm, ammo.narc, ammo.narc, modules.case], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({items: [weapons.narc], missile: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink]})
			},
			{
				ferroFibrous: true,
				ecm: true
			}
		);

		// Jenner ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['3'] = new mechlab_loadouts.mechLoadout(
			"JR7-D", 35, 2,
			[14, 20, 6, 16, 8, 16, 8, 8, 8, 12, 12],
			engines.std245,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm4, modules.jumpJetV], missile: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV, ammo.srm]}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2})
			},
			{
				jumpJets: true
			}
		);

		mechlab_loadouts.loadouts['4'] = new mechlab_loadouts.mechLoadout(
			"JR7-F", 35, 1,
			[14,30,12,22,10,22,10,22,22,30,30],
			engines.std245,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV]}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 3}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 3})
			},
			{
				jumpJets: true
			}
		);

		mechlab_loadouts.loadouts['20'] = new mechlab_loadouts.mechLoadout(
			"JR7-K", 35, 3,
			[14,18,6,16,8,16,8,8,8,12,12],
			engines.std245,
			{
				head: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm4, modules.jumpJetV], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJetV, modules.jumpJetV, modules.case, ammo.srm]}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJetV, modules.jumpJetV], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2})
			},
			{
				jumpJets: true,
				ferroFibrous: true
			}
		);

		// Cicada /////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['37'] = new mechlab_loadouts.mechLoadout(
			"CDA-2A", 40, 1,
			[18, 22, 12, 12, 6, 12, 6, 8, 8, 12, 12],
			engines.std320,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], ams: true, energy: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], energy: 2 })
			}
		); 

		mechlab_loadouts.loadouts['38'] = new mechlab_loadouts.mechLoadout(
			"CDA-2B", 40, 2,
			[16, 20, 12, 12, 4, 12, 4, 6, 6, 10, 10], 
			engines.std320,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.flamer], energy: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], ams: true, energy: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], energy: 2 })
			}
		);

		mechlab_loadouts.loadouts['39'] = new mechlab_loadouts.mechLoadout(
			"CDA-3C", 40, 2,
			[18, 22, 12, 12, 6, 12, 6, 8, 8, 12, 12], 
			engines.std280,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [ammo.machineGun]}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.machineGun, weapons.ppc], ams: true, energy: 1, ballistic: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.machineGun], ballistic: 2 }),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['36'] = new mechlab_loadouts.mechLoadout(
			"CDA-3M", 40, 2,
			[18, 22, 12, 12, 6, 12, 6, 8, 8, 12, 12],  
			engines.xl320,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.smallPulseLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, ammo.uac5, modules.case], ams: true, energy: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.ultraAc5], energy: 1, ballistic: 1 })
			},
			{
				ecm: true,
				doubleHeatSinks: true
			}
		);

		// Hunchback /////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['1'] = new mechlab_loadouts.mechLoadout(
			"HBK-4G", 50, 2,
			[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
			engines.std200,
			{
				head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.autocannon20], ballistic: 3}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [ammo.ac20, ammo.ac20], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['9'] = new mechlab_loadouts.mechLoadout(
			"HBK-4H", 50, 2,
			[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
			engines.std200,
			{
				head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.autocannon10, weapons.mediumLaser, weapons.mediumLaser], ballistic: 1, energy: 2}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, ammo.ac10, ammo.ac10], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1})
			}
		); 

		mechlab_loadouts.loadouts['2'] = new mechlab_loadouts.mechLoadout(
			"HBK-4P", 50, 1,
			[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
			engines.std200,
			{
				head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser, modules.heatSink, modules.heatSink], energy: 6}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['21'] = new mechlab_loadouts.mechLoadout(
			"HBK-4J", 50, 2,
			[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
			engines.std200,
			{
				head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.lrm10, weapons.lrm10, weapons.mediumLaser, weapons.mediumLaser, weapons.mediumLaser], energy: 3, missile: 2}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.lrm, ammo.lrm], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['22'] = new mechlab_loadouts.mechLoadout(
			"HBK-SP", 50, 2,
			[18, 52, 10, 40, 8, 40, 8, 32, 32, 40, 40],
			engines.std200,
			{
				head: new mechlab_loadouts.componentLayout({items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [ammo.srm, ammo.srm]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.srm6, modules.heatSink, modules.heatSink, modules.heatSink], missile: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.srm6, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], missile: 1, ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		// Centurion //////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['7'] = new mechlab_loadouts.mechLoadout(
			"CN9-A", 50, 2,
			[18, 36, 14, 26, 12, 26, 12, 32, 32, 32, 32], 
			engines.std200,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.heatSink, ammo.ac10, ammo.ac10], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.lrm10, ammo.lrm, ammo.lrm, modules.heatSink], missile: 3 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.autocannon10], ballistic: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 9})
			}
		);

		mechlab_loadouts.loadouts['28'] = new mechlab_loadouts.mechLoadout(
			"CN9-AL", 50, 2,
			[18, 46, 18, 34, 14, 34, 14, 32, 32, 48, 48], 
			engines.std200,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.lrm10, ammo.lrm, ammo.lrm], missile: 3 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.largeLaser, weapons.smallLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 9}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['29'] = new mechlab_loadouts.mechLoadout(
			"CN9-D", 50, 1,
			[18, 36, 14, 26, 12, 26, 12, 32, 32, 32, 32], 
			engines.xl300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.case, ammo.lrm, ammo.lrm, ammo.lb10x, ammo.lb10x], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.lrm10], missile: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.lb10x], ballistic: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8})
			},
			{
				endoSteel: true,
				artemis: true
			}
		);

		mechlab_loadouts.loadouts['45'] = new mechlab_loadouts.mechLoadout(
			"CN9-YLW", 50, 3,
			[18, 50, 14, 36, 12, 36, 12, 32, 32, 47, 47], 
			engines.std215,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.heatSink, ammo.ac20, ammo.ac20, ammo.ac20], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink] }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.autocannon20], ballistic: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8})
			}
		);

		// Dragon //////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['11'] = new mechlab_loadouts.mechLoadout(
			"DRG-1C", 60, 2,
			[18, 56, 24, 36, 20, 36, 20, 40, 40, 56, 56],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac2], ams: true }),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, ammo.lrm, ammo.lrm], energy: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon2], ballistic: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 })
			}
		);

		mechlab_loadouts.loadouts['10'] = new mechlab_loadouts.mechLoadout(
			"DRG-1N", 60, 2,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac5, ammo.ac5], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, ammo.lrm, ammo.lrm], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon5], ballistic: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 1 })
			}
		);

		mechlab_loadouts.loadouts['23'] = new mechlab_loadouts.mechLoadout(
			"DRG-5N", 60, 2,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10], missile: 1 }),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[modules.case, ammo.uac5], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[modules.case, ammo.lrm, ammo.lrm] }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.ultraAc5], ballistic: 3 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 })
			}
		);

		mechlab_loadouts.loadouts['55'] = new mechlab_loadouts.mechLoadout(
			"DRG-FANG", 60, 2,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.srm6], missile: 1 }),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[ammo.ac10, ammo.ac10, ammo.ac10], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[ammo.srm], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.autocannon10], ballistic: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink] })
			},
			{
				endoSteel: true
			}
		);

		mechlab_loadouts.loadouts['56'] = new mechlab_loadouts.mechLoadout(
			"DRG-FLAME", 60, 2,
			[18, 54, 24, 32, 16, 32, 16, 28, 28, 36, 36],
			engines.std300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.lrm5, ammo.lrm], missile: 1 }),
				rightTorso: new mechlab_loadouts.componentLayout({ ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.autocannon2, ammo.ac2], ballistic: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.erLargeLaser], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.mediumLaser], energy: 2 }),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink] })
			},
			{
				endoSteel: true
			}
		);

		// Catapult //////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['13'] = new mechlab_loadouts.mechLoadout(
			"CPLT-A1", 65, 2,
			[18, 48, 22, 42, 18, 42, 18, 40, 40, 48, 48],
			engines.std260,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJet3, modules.jumpJet3, ammo.lrm, ammo.lrm], ams: true}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJet3, modules.jumpJet3, ammo.lrm, ammo.lrm] }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm15], missile: 3}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm15], missile: 3}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['12'] = new mechlab_loadouts.mechLoadout(
			"CPLT-C1", 65, 2,
			[18, 48, 22, 38, 16, 38, 16, 26, 26, 36, 36], 
			engines.std260,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJet3, modules.jumpJet3, ammo.lrm, weapons.mediumLaser], ams: true, energy: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJet3, modules.jumpJet3, ammo.lrm, weapons.mediumLaser], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm15], missile: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm15], missile: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['24'] = new mechlab_loadouts.mechLoadout(
			"CPLT-C4", 65, 2,
			[18, 48, 22, 38, 16, 38, 16, 26, 26, 36, 36], 
			engines.std260,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.smallLaser, weapons.smallLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.jumpJet3, modules.jumpJet3, ammo.lrm, ammo.lrm], ams: true, energy: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.jumpJet3, modules.jumpJet3, ammo.lrm, ammo.lrm], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm20], missile: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.lrm20], missile: 2})
			}
		); 

		mechlab_loadouts.loadouts['19'] = new mechlab_loadouts.mechLoadout(
			"CPLT-K2", 65, 1,
			[18, 48, 22, 40, 16, 40, 16, 36, 36, 40, 40], 
			engines.std260,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, ammo.machineGun]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, weapons.machineGun, modules.heatSink, modules.heatSink, modules.heatSink], ams: true, energy: 1, ballistic: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, weapons.machineGun, modules.heatSink, modules.heatSink], energy: 1, ballistic: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.ppc], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 10, items: [weapons.ppc], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		// Cataphract /////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['41'] = new mechlab_loadouts.mechLoadout(
			"CTF-1X", 70, 2,
			[18, 52, 18, 32, 12, 32, 12, 44, 44, 44, 44], 
			engines.std280,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, weapons.autocannon10, ammo.ac10], energy: 1, ballistic: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser], energy: 1, ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.ppc, weapons.mediumLaser], energy: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['42'] = new mechlab_loadouts.mechLoadout(
			"CTF-2X", 70, 2,
			[18, 60, 26, 40, 20, 40, 20, 44, 44, 52, 52], 
			engines.std280,
			{
				centerTorso: new mechlab_loadouts.componentLayout({}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, weapons.autocannon10], energy: 1, ballistic: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, ammo.ac10, ammo.ac10, ammo.srm], energy: 1, ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.largeLaser], energy: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.srm4], missile: 2}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['44'] = new mechlab_loadouts.mechLoadout(
			"CTF-4X", 70, 2,
			[18, 62, 26, 40, 20, 40, 20, 44, 44, 60, 60], 
			engines.std210,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.lrm5], missile: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [weapons.largeLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[modules.heatSink, modules.heatSink, ammo.ac5, ammo.ac5, ammo.lrm] }),
				leftTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink, ammo.ac5, ammo.ac5], ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.autocannon5], ballistic: 2}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.autocannon5], ballistic: 2}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		); 

		mechlab_loadouts.loadouts['40'] = new mechlab_loadouts.mechLoadout(
			"CTF-3D", 70, 2,
			[18, 52, 18, 32, 18, 32, 18, 44, 44, 38, 38], 
			engines.xl280,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.lb10x, weapons.mediumLaser, modules.case, ammo.uac5], energy: 1, ballistic: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, modules.case, ammo.lb10x, ammo.lb10x, modules.heatSink, modules.heatSink], energy: 1, ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.mediumLaser, weapons.ultraAc5], energy: 1, ballistic: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.mediumLaser], energy: 1}),
				rightLeg: new mechlab_loadouts.componentLayout({items: [modules.jumpJet3, modules.jumpJet3]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.jumpJet3, modules.jumpJet3]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]})
			},
			{
				jumpJets: true
			}
		); 

		mechlab_loadouts.loadouts['54'] = new mechlab_loadouts.mechLoadout(
			"CTF-HERO01", 70, 2,
			[18, 62, 26, 40, 20, 40, 20, 44, 44, 59, 59], 
			engines.std240,
			{
				centerTorso: new mechlab_loadouts.componentLayout({items: [ammo.ac5]}),
				rightTorso: new mechlab_loadouts.componentLayout({items:[weapons.mediumLaser, weapons.autocannon10, ammo.ac10, ammo.ac10], energy: 1, ballistic: 1}),
				leftTorso: new mechlab_loadouts.componentLayout({items: [weapons.mediumLaser, modules.doubleHeatSink], energy: 1, ams: true }),
				rightArm: new mechlab_loadouts.componentLayout({slots: 9, items: [weapons.smallLaser, weapons.autocannon5, ammo.ac5], energy: 1, ballistic: 1}),
				leftArm: new mechlab_loadouts.componentLayout({slots: 8, items: [weapons.autocannon5, ammo.ac5], ballistic: 1})
			},
			{
				doubleHeatSinks: true,
				endoSteel: true
			}
		); 

		// AWESOME ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		

		mechlab_loadouts.loadouts['14'] = new mechlab_loadouts.mechLoadout(
			"AWS-8Q", 80, 2,
			[18, 60, 38, 48, 20, 48, 20, 48, 48, 66, 66], 
			engines.std240,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.ppc, modules.heatSink, modules.heatSink, modules.heatSink], ams: true, energy: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.ppc, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], energy: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.ppc, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['15'] = new mechlab_loadouts.mechLoadout(
			"AWS-8R", 80, 1,
			[18, 60, 38, 48, 20, 48, 20, 48, 48, 66, 66], 
			engines.std240,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [ammo.lrm, ammo.lrm]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, weapons.lrm15], ams: true, missile: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, weapons.lrm15], missile: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.largeLaser, modules.heatSink], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [modules.heatSink, modules.heatSink]}),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['30'] = new mechlab_loadouts.mechLoadout(
			"AWS-8T", 80, 2,
			[18, 60, 38, 48, 20, 48, 20, 48, 48, 66, 66], 
			engines.std240,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [ammo.lrm, ammo.lrm]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, weapons.lrm15], ams: true, missile: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, weapons.lrm15], missile: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.largeLaser, modules.heatSink], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.largeLaser], energy: 2}),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['31'] = new mechlab_loadouts.mechLoadout(
			"AWS-8V", 80, 2,
			[18, 60, 38, 48, 20, 48, 20, 48, 48, 66, 66], 
			engines.std240,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.smallLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [ammo.lrm, ammo.lrm]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.lrm15, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], ams: true, missile: 3 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items: [weapons.largeLaser, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], energy: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.ppc], energy: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [modules.heatSink, modules.heatSink]}),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['32'] = new mechlab_loadouts.mechLoadout(
			"AWS-9M", 80, 2,
			[18, 60, 40, 48, 20, 48, 20, 52, 52, 68, 68],
			engines.xl320,
			{
				head: new mechlab_loadouts.componentLayout({ items: [weapons.smallPulseLaser], energy: 1}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumPulseLaser, weapons.streakSrm2], missile: 2, energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], ams: true, energy: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({items:[weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 9, items: [weapons.erPpc, modules.doubleHeatSink, modules.doubleHeatSink], energy: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.streakSrm2, modules.doubleHeatSink, modules.doubleHeatSink], missile: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [ammo.streakSrm]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.doubleHeatSink, modules.doubleHeatSink]})
			},
			{
				doubleHeatSinks: true
			}
		);

		// Stalker ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['47'] = new mechlab_loadouts.mechLoadout(
			"STK-3F", 85, 1,
			[18, 72, 22, 50, 14, 50, 14, 46, 46, 50, 50], 
			engines.std255,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largeLaser, weapons.srm6, ammo.srm, modules.heatSink], ams: true, missile: 1, energy: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largeLaser, weapons.srm6, ammo.srm, modules.heatSink], missile: 1, energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10, weapons.mediumLaser, weapons.mediumLaser, ammo.lrm, modules.heatSink], energy: 2, missile: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ items: [weapons.lrm10, weapons.mediumLaser, weapons.mediumLaser, ammo.lrm, modules.heatSink], energy: 2, missile: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['48'] = new mechlab_loadouts.mechLoadout(
			"STK-3H", 85, 1,
			[18, 72, 22, 50, 14, 50, 14, 46, 46, 50, 50], 
			engines.std255,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.srm6, ammo.srm, modules.heatSink], ams: true, missile: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.srm6, ammo.srm, modules.heatSink], missile: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ items: [weapons.lrm20, weapons.mediumLaser, weapons.mediumLaser, ammo.lrm, modules.heatSink], energy: 2, missile: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ items: [weapons.lrm20, weapons.mediumLaser, weapons.mediumLaser, ammo.lrm, modules.heatSink], energy: 2, missile: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['49'] = new mechlab_loadouts.mechLoadout(
			"STK-4N", 85, 1,
			[18, 72, 22, 50, 14, 50, 14, 46, 46, 50, 50], 
			engines.std255,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largeLaser, weapons.srm6, modules.heatSink, ammo.srm, modules.heatSink, modules.heatSink, modules.heatSink], ams: true, missile: 1, energy: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largeLaser, weapons.srm6, modules.heatSink, ammo.srm, modules.heatSink, modules.heatSink, modules.heatSink, modules.heatSink], missile: 1, energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser, weapons.lrm10, ammo.lrm], energy: 2, missile: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['50'] = new mechlab_loadouts.mechLoadout(
			"STK-5S", 85, 1,
			[18, 72, 22, 50, 14, 50, 14, 46, 46, 50, 50], 
			engines.xl255,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largePulseLaser, weapons.srm6, ammo.srm, modules.case, modules.heatSink, modules.heatSink, modules.heatSink], ams: true, missile: 1, energy: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.largePulseLaser, weapons.srm6, weapons.ams, modules.heatSink, modules.case, ammo.srm, ammo.ams], ams: true, missile: 1, energy: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser, weapons.lrm10, ammo.lrm], energy: 2, missile: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser, weapons.lrm10, ammo.lrm], energy: 2, missile: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['46'] = new mechlab_loadouts.mechLoadout(
			"STK-5M", 85, 1,
			[18, 72, 22, 54, 18, 54, 18, 50, 50, 54, 54], 
			engines.std255,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.erLargeLaser], energy: 1}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.srm6, modules.doubleHeatSink, modules.doubleHeatSink, modules.doubleHeatSink, ammo.srm], ams: true, missile: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.srm6, weapons.narc, modules.doubleHeatSink, modules.doubleHeatSink, ammo.srm], ams: true, missile: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser, weapons.lrm10, ammo.lrm, ammo.lrm, modules.doubleHeatSink], energy: 2, missile: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser, weapons.lrm10, ammo.lrm, ammo.lrm, modules.doubleHeatSink], energy: 2, missile: 1 }),
				rightLeg: new mechlab_loadouts.componentLayout({ }),
				leftLeg: new mechlab_loadouts.componentLayout({items: [ammo.narc, ammo.narc]})
			},
			{
				doubleHeatSinks: true
			}
		);

		// Atlas /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		mechlab_loadouts.loadouts['16'] = new mechlab_loadouts.mechLoadout(
			"AS7-D", 100, 2,
			[18, 94, 28, 64, 20, 64, 20, 68, 68, 82, 82], 
			engines.std300,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumLaser, weapons.mediumLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.autocannon20, ammo.ac20, ammo.ac20], ballistic: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.lrm20, weapons.srm6, ammo.lrm, ammo.lrm, ammo.srm, modules.heatSink], missile: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.mediumLaser, modules.heatSink], energy: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.mediumLaser, modules.heatSink], energy: 1, ams: true }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['17'] = new mechlab_loadouts.mechLoadout(
			"AS7-D-DC", 100, 3,
			[18, 94, 28, 64, 20, 64, 20, 68, 68, 82, 82], 
			engines.std300,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.autocannon20, ammo.ac20, ammo.ac20], ballistic: 2 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.lrm20, modules.heatSink, weapons.srm6, ammo.lrm, ammo.srm], missile: 3 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.mediumLaser, modules.heatSink], energy: 1 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.mediumLaser, modules.heatSink], energy: 1, ams: true }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]})
			},
			{
				ecm: true
			}
		);

		mechlab_loadouts.loadouts['25'] = new mechlab_loadouts.mechLoadout(
			"AS7-K", 100, 2,
			[18, 94, 28, 64, 20, 64, 20, 68, 68, 82, 82], 
			engines.xl300,
			{
				centerTorso: new mechlab_loadouts.componentLayout({ items: [weapons.mediumPulseLaser, weapons.mediumPulseLaser], energy: 2}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.gauss, modules.case], ballistic: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.lrm20, ammo.lrm, ammo.lrm, ammo.ams, modules.case], missile: 1 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.erLargeLaser, modules.heatSink, modules.heatSink, ammo.gauss, ammo.gauss], energy: 1, ams: true }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.erLargeLaser, modules.heatSink, modules.heatSink, weapons.ams], energy: 1, ams: true }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]})
			}
		);

		mechlab_loadouts.loadouts['18'] = new mechlab_loadouts.mechLoadout(
			"AS7-RS", 100, 2,
			[18, 94, 28, 64, 20, 64, 20, 68, 68, 82, 82], 
			engines.std300,
			{
				head: new mechlab_loadouts.componentLayout({ items: [modules.heatSink]}),
				rightTorso: new mechlab_loadouts.componentLayout({ items:[weapons.autocannon10, ammo.ac10, ammo.ac10], ballistic: 1 }),
				leftTorso: new mechlab_loadouts.componentLayout({ items:[weapons.lrm15, weapons.srm4, ammo.lrm, ammo.lrm, ammo.srm, modules.heatSink], missile: 2 }),
				rightArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.largeLaser, modules.heatSink], energy: 2 }),
				leftArm: new mechlab_loadouts.componentLayout({ slots: 8, items: [weapons.largeLaser, modules.heatSink], energy: 2, ams: true }),
				rightLeg: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]}),
				leftLeg: new mechlab_loadouts.componentLayout({items: [modules.heatSink, modules.heatSink]}),
				engine: new mechlab_loadouts.componentLayout({ items: [modules.heatSink, modules.heatSink]})
			}
		);

	}; // end loadout initialization

})(jQuery);

(function($){

	// Enum class for allowing better handling of constant values
	var Enum = function (constantsList) {
		var self = this;
		$.each(constantsList, function (index, constant) {
			self[constant] = index;
		});
		self.values = constantsList; // keep track for later

		self.getName = function (value) {
			var name = null;
			$.each(self.values, function (index, item) {
				if (self[item] == value) {
					name = item;
					return false; // this is 'break' for $.each()
				}
			});
			return name; // might be null bee tee dubs
		};
		// Freeze it, if possible (no new properties)
		if (Object.freeze) { Object.freeze(self); }
	};

	Enum.prototype.values = function() {
	    return this.allValues;
	};

	mechlab_enums = {};

	mechlab_enums.componentLocations = new Enum([
		"head",
		"centerTorso",
		"rightTorso",
		"leftTorso",
		"rightArm",
		"leftArm",
		"rightLeg",
		"leftLeg",
		"engine"
	]);

	mechlab_enums.betterWeaponTypes = new Enum([
		"ballistic",
		"energy",
		"missile"
	]);

	// Current "real" enum
	mechlab_enums.weaponTypes = {
		ballistic: 0,
		energy: 1,
		missile: 2,
		ams: 4
	};

	mechlab_enums.getWeaponType = function(value){
		mechlab_enums.weaponTypes.forEach(function(weaponType){
			if(mechlab_enums.weaponTypes[weaponType] === value){
				return weaponType;
			}
		})
		return null; // failure default
	};

	// Adding a lookup for tonnage vs structure values
	var structureEntry = function(centerTorso, sideTorso, arms, legs, max) {
		this.head = 3; // always
		this.centerTorso = centerTorso;
		this.sideTorso = sideTorso;
		this.arms = arms;
		this.legs = legs;
		this.max = max;
	};

	mechlab_enums.structureTable = {};
	mechlab_enums.structureTable['20'] = new structureEntry(6, 5, 3, 4, 69);
	mechlab_enums.structureTable['25'] = new structureEntry(8, 6, 4, 6, 89);
	mechlab_enums.structureTable['30'] = new structureEntry(10, 7, 5, 7, 105);
	mechlab_enums.structureTable['35'] = new structureEntry(11, 8, 6, 8, 119);
	mechlab_enums.structureTable['40'] = new structureEntry(12, 10, 6, 10, 137);
	mechlab_enums.structureTable['45'] = new structureEntry(14, 11, 7, 11, 153);
	mechlab_enums.structureTable['50'] = new structureEntry(16, 12, 8, 12, 169);
	mechlab_enums.structureTable['55'] = new structureEntry(18, 13, 9, 13, 185);
	mechlab_enums.structureTable['60'] = new structureEntry(20, 14, 10, 14, 201);
	mechlab_enums.structureTable['65'] = new structureEntry(21, 15, 10, 15, 211);
	mechlab_enums.structureTable['70'] = new structureEntry(22, 15, 11, 15, 217);
	mechlab_enums.structureTable['75'] = new structureEntry(23, 16, 12, 16, 231);
	mechlab_enums.structureTable['80'] = new structureEntry(25, 17, 13, 17, 247);
	mechlab_enums.structureTable['85'] = new structureEntry(27, 18, 14, 18, 263);
	mechlab_enums.structureTable['90'] = new structureEntry(29, 19, 15, 19, 279);
	mechlab_enums.structureTable['95'] = new structureEntry(30, 20, 16, 20, 293);
	mechlab_enums.structureTable['100'] = new structureEntry(31, 21, 17, 21, 307);

	mechlab_enums.getStructure = function(tons){
		return mechlab_enums.structureTable[tons];
	};

	mechlab_enums.weapons = {
		smallLaser: 1003,
		mediumLaser: 1001,
		largeLaser: 1008,
		erLargeLaser: 1005,
		smallPulseLaser: 1012,
		mediumPulseLaser: 1011,
		largePulseLaser: 1010,
		ppc: 1009,
		erPpc: 1006,
		autocannon2: 1018,
		autocannon5: 1019,
		autocannon10: 1020,
		autocannon20: 1000,
		ultraAc5: 1025,
		lb10x: 1023,
		gauss: 1021,
		machineGun: 1024,
		streakSrm2: 1032,
		srm2: 1030,
		srm4: 1004,
		srm6: 1031,
		lrm5: 1026,
		lrm10: 1027,
		lrm15: 1028,
		lrm20: 1002,
		narc: 1029,
		tag: 1037,
		flamer: 1007,
		ams: 1014
	};

	mechlab_enums.ammo = {
		machineGun: 2011,
		ac2: 2005,
		ac5: 2006,
		ac10: 2007,
		ac20: 2000,
		uac5: 2012,
		lb10x: 2010,
		gauss: 2008,
		streakSrm: 2029,
		srm: 2028,
		lrm: 2027,
		narc: 2017,
		ams: 2001
	};

	mechlab_enums.modules = {
		heatSink: 3000,
		doubleHeatSink: 3001,
		'case': 9003, 
		jumpJet3: 1502,
		jumpJetV: 1504
	};

	mechlab_enums.engines = {
		std150: 3228,
		std175: 3233,
		std200: 3238,
		std210: 3240,
		std215: 3241,
		std240: 3246,
		std245: 3247,
		std255: 3249,
		std260: 3250,
		std280: 3254,
		std300: 3258,
		std320: 3262,
		xl210: 3340,
		xl255: 3349,
		xl280: 3354,
		xl300: 3358,
		xl320: 3362
	};

})(jQuery);