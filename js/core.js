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