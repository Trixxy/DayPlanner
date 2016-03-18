// This is an activity constractor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name,length,typeid,description){
	this._id = GC._actID++;
	
	this._name = name;
	this._length = length;
	this._typeid = typeid;
	this._description = description;
	
	// sets the name of the avtivity
	this.setName = function(name) {
		if(name != this._name){
			this._name = name;
			GC.notifyObservers("nameChanged:"+this._id);
		}
	}
	
	// sets the length of the avtivity
	this.setLength = function(length) {
		if(length != this._length && !isNaN(length)){
			this._length = length;
			GC.notifyObservers("lengthChanged:"+this._id);
		}
	}
	
	// sets the typeid of the avtivity
	this.setTypeId = function(typeid) {
		if(typeid != this._typeid){
			this._typeid = typeid;
			GC.notifyObservers("typeChanged:"+this._id);
		}
	}
	
	// sets the description of the avtivity
	this.setDescription = function(description) {
		if(description != this._description){
			this._description = description;
			GC.notifyObservers("descrChanged:"+this._id);
		}
	}
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return ActivityType[this._typeid];
	};
}