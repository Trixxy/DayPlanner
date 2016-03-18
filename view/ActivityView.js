//The view handles single activity updates
//It is responsible for all the activities, 
//and is not associated with a particular activity
function ActivityView(parent,model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
  	this.parent = parent;
	this.addActivityBtn = $("#addActivityBtn");
	
	//Updates the name of the activity, given the element representing 
	//the activity and the activity itself
	this.updateName = function(activity, element){
		element.children(".listContent").html(activity._name);
		element.effect("bounce");
	}
	
	//Updates the length of the activity, given the element representing 
	//the activity and the activity itself
	this.updateLength = function(activity, element){
		if(GC.getDayID(element) == "activity"){
			element.children(".listLabel").html(activity._length+" min");
			element.effect("bounce");
		}
	}
	
	//Updates type of the activity, given the element representing 
	//the activity and the activity itself
	this.updateType = function(activity, element){
		var classes = "";
		$.each(ATC, function(index, value){
			classes += ATC[index]+" ";
		});
		
		//removes the associated classes and applies new ones.
		element.removeClass(classes).addClass(ATC[activity._typeid]);
		element.children("a").removeClass(classes).addClass(ATC[activity._typeid]);
		
		element.effect("bounce");
	}
	
	//Gets the activity by tracing its parent (wether its a day or parkedactivitieslist)
	this.getActivity = function(getThis){
		var id = GC.getDayID(getThis);
		if(id == "activity")
			return model.parkedActivities[getThis.parents("li").index()];
		else
			return model.days[id]._activities[getThis.parents("li").index()];
	}
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		
		//If we get an argument, and it is a state change in the model
		if(arg != undefined && arg.indexOf("Changed")>=0){
			
			//Slice out the id & get the activity and its element
			var slicedArg = arg.split(":");
			var element = $("#"+slicedArg[1]);
			var activity = this.getActivity($("#"+slicedArg[1]).children());

			//Now, update the view with respect to the parameter changed.
			if(arg.indexOf("nameChanged") >= 0){
				this.updateName(activity, element);
			}else if(arg.indexOf("lengthChanged") >= 0){
				this.updateLength(activity, element);
			}else if(arg.indexOf("typeChanged") >= 0){
				this.updateType(activity, element);
			}else if(arg.indexOf("descrChanged") >= 0){
				element.effect("bounce");
			}
		}
	}
}