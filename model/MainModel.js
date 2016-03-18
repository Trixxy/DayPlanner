// this is our main module that contians days and praked activites
function Model(){
	this.days = [];
	this.parkedActivities = [];
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
		this.days.push(day);
		this.notifyObservers("newDayAdded");
		return day;
	};
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
			this.notifyObservers("listUpdate:null:"+day);
		} else {
			this.parkedActivities.push(activity);
			this.notifyObservers("listUpdate:null:null");
		}
	}
	
	// add an activity to parked activities
	this.addParkedActivity = function(activity){
		this.parkedActivities.push(activity);
		this.notifyObservers("listUpdate:null:null");
	};
	
	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
		var dElm = this.parkedActivities.splice(position,1)[0];
		this.notifyObservers("listUpdate:null:null");
		return dElm;
	};
	
	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		} else if(oldday === null && oldday == newday){
			this.parkedActivities.splice(newposition, 0, this.parkedActivities.splice(oldposition, 1)[0]);
		} else if(oldday === null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		} else if(newday === null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}
		
		this.notifyObservers("listUpdate:"+oldday+":"+newday);
	};
	
	//*** OBSERVABLE PATTERN ***
	this._listeners = [];
	
	this.notifyObservers = function (args) {
		for (var i = 0; i < this._listeners.length; i++){
			this._listeners[i].update(args);
		}
	};
	
	this.addObserver = function (listener) {
		this._listeners.push(listener);
	};
	//*** END OBSERVABLE PATTERN ***
}