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
        getDamage: function(){
            var multiplier = this.weaponStats.numFiring.toFloat();
            return multiplier * this.weaponStats.damage.toFloat();
        },
        getHps: function() {
            if(this.weaponStats.heat.toFloat() === 0) return 0; // machine gun pass through
            var hps = this.weaponStats.heat.toFloat() / (this.weaponStats.cooldown.toFloat());
            console.log('hps', this.name, hps);
            return hps;
        },
        getDps: function(){
            var divisor = this.weaponStats.cooldown.toFloat() || 1;
            //console.log('dps', this.name, this.getDamage() / divisor);
            return this.getDamage() / divisor;
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