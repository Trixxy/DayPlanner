// Global variables of the possible activity types 
// and their representative classes
ActivityType = ["Presentation","Group Work","Discussion","Break"]
ATC = ["btn-info","btn-danger","btn-success","btn-warning"];


//GeneralController Object constructor
//A global controller available for all the views/controllers to use,
//Here is some of the most used code defined.
function GeneralController(model) {
	//identifiers for the models, managed locally in their respective model.
	this._actID = 0;
	this._dayID = 0;
	
	//initialize the views & controllers
	var modalView = new ModalView($("#modal"),model);
	var modalController = new ModalController(modalView,model);	
	
	var dayView = new DayView($("body"),model);
	var dayController = new DayController(dayView, model);
	
	var activityView = new ActivityView($("body"),model);
	var activityController = new ActivityController(activityView, model);
	
	var listView = new ListView($("body"),model);
	var listController = new ListController(listView, model);
	
	
	//SWITCH FUNCTIONS
	this.showModalView = function(activity){
		modalView.showModal(activity);
	}
	
	//GlobalFunc
	this.notifyObservers = function(arg){
		model.notifyObservers(arg);
	}
	
	//A function that formats the time.
	this.formatTime = function(time){
		var lv1 = ""+(Math.floor(time/60)%24),
			lv2 = ""+(time%60);
			
			for(var i = 0; i < 2; i++){
				if(lv1.length < 2)
					lv1 = "0"+lv1;
				if(lv2.length < 2)
					lv2 = "0"+lv2;
			}
		
		return lv1+":"+lv2;
	}
	
	//This piece of code is repeated all around the project, 
	//hence its defined here for all the views/controllers to use!
	this.getDayID = function(child){
		var id = child.parents(".oneDayContainer").attr("id");
		if(id == "activity")
			return "activity";
		else
			return id.split("day")[1];
	}
}