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

		// Currently, hardcoding implemented mechs
		//self.mechChoices = ko.observableArray(self.items.mechs);
		self.mechChoices = ko.observableArray([
			{
				id: "11",
				name: "DRG-1C"
			},
			{
				id: "37",
				name: "CDA-2A"
			}//,
			// {
			// 	id: "35",
			// 	name: "RVN-4X"
			// }
		]);

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
			var mech = mechlab_loadouts.load(self.selectedMech().id);
			loadIntoView(mech);
		};

		// Load mech from localstorage
		self.loadSaved = function(ui, event) {
			var mechString = localStorage.getItem(self.selectedSavedMech());
			var mech = JSON.parse(mechString);
			loadIntoView(mech);
		};

		self.clearSaved = function() {
			localStorage.clear();
			mechlab.refreshStorageMechs();
		};

	}; // end core vm xtor
	
})(jQuery);