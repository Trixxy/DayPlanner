//This view is responsible for the sortable lists, 
//whether that list is a dayList or a parkedActivitiesList
function ListView(parent,model) {
	// Get all the relevant elements of the view (ones that show data
  	// andor ones that responed to interaction)
  	this.parent = parent;
	this.activityList = $("#activity").find("ul");
	
	//Generates activity element with respect to the parameters inserted
	this.generateActivity = function(id,name,length,typeid, minutesOn){
		return "<li id=\""+id+"\" class=\"listElement "+ATC[typeid]+"\">"+
			"<div class=\"label listLabel\">"+length+(minutesOn?" min":"")+"</div>"+
			"<div class=\"listContent\">"+name+"</div>"+
			"<a class=\"btn btn-small editActivityBtn "+ATC[typeid]+"\"><i class=\"icon-edit icon-white\"></i></a>"+
		"</li>";
	}
	
	//Updates the parked acticities list 
	this.updateActivity = function(){
		this.activityList.html("");
		
		for(var i = 0; i < model.parkedActivities.length; i++){
			this.activityList.append(this.generateActivity(model.parkedActivities[i]._id,
						   model.parkedActivities[i]._name,
						   model.parkedActivities[i]._length,
						   model.parkedActivities[i]._typeid, true)
			);
		}
	}
	
	//Updated the list of a day 
	this.updateDay = function(id){
		list = $("#day"+id).find("ul"); //this could be cached
		list.html("");
		
		var localStart = model.days[id]._start;
		
		for(var i = 0; i < model.days[id]._activities.length; i++){
			list.append(this.generateActivity(model.days[id]._activities[i]._id,
						   model.days[id]._activities[i]._name,
						   GC.formatTime(localStart),
						   model.days[id]._activities[i]._typeid, false)
			);
			
			localStart += 1*model.days[id]._activities[i]._length;
		}
	}
	
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		//If we get a parameter
		if(arg != undefined){
			
			//And it contains listUpdate, well then, we update the list!
			if(arg.indexOf("listUpdate")>=0){
				listUpdate = arg.split(":");
				if(listUpdate[1] == listUpdate[2]){
					if(listUpdate[1] == "null")
						this.updateActivity();
					else
						this.updateDay(listUpdate[1]);
				}else{
					for(var i = 1; i < 3; i++){
					if(listUpdate[i] == "null")
						this.updateActivity();
					else
						this.updateDay(listUpdate[i]);
					}
				}
			}
			//Otherwise, if it contains length changed...
			else if(arg.indexOf("lengthChanged") >= 0){					
				var element = GC.getDayID($("#"+arg.split(":")[1]));
				
				//...and it is not inside the parked activities list
				//we update the list, otherwise ignore, the activity can handle this by itself!
				if(element != "activity"){
					this.updateDay(element);
					$("#"+arg.split(":")[1]).effect("bounce");
				}
			//if start time is changed, well, update!
			}else if(arg.indexOf("startChanged") >= 0){
				this.updateDay(arg.split(":")[1]);
			}
		}
		//If we don't get anything, ignore!
	}
}