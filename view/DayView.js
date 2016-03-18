//The view handles single day status updates
//It is responsible for all the days, 
//and is not associated with a particular day
function DayView(parent,model) {	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.parent = parent;
	this.addDayBtn = $("#addDayBtn");
		
		
	//This is a list containing cached element values associated with the days 
	//where the index of the element in the list is the id of the day
	//this list contains instances of the DayLinks class defined below, in this very same file!
	this.dayLink = [];

	//Adds the last day added to the model to the view!
	this.addNewDay = function(){
		var id = "day"+(model.days.length-1);
		
		this.addDayBtn.before(this.getDayTemplate(id));
		
		var qID = $("#"+id);
		qID.effect("highlight");
		
		//Sync with the other lists
		this.syncSortables();
	
		//generate and cache values for the day!
		this.dayLink.push(new DayLinks(qID));
	}
	
	//Syncs the day with the other days, 
	//to allow the drag & drop
	this.syncSortables = function(){
		$( "ul").sortable({
			connectWith: "ul"
		});
		
		$( "ul" ).disableSelection();
		
		$(document).ready(function(){
			$(".listContainer").droppable ({
				hoverClass : "alert-success"
			});
		});
		
		$('.startTime').timepicker();
	}
	
	//Updates the chart for the given day (id)!
	this.updateChart = function(id){
		var day = model.days[id];
		var chart = [];
		
		for(var i = 0; i < 4; i++)
			chart.push(day.getLengthByType(i)/day.getTotalLength());
		
		this.dayLink[id].updateChart(chart);
	}
	
	//Update end time.
	this.updateEndTime = function(id){
		this.dayLink[id].setEndTime(model.days[id].getEnd());
	}
	
	//Update total length.
	this.updateTotalLength = function(id){
		this.dayLink[id].setTotalLength(model.days[id].getTotalLength());
	}
	
	this.updateStartTime = function(id){
		this.dayLink[id].setStartTime(model.days[id].getStart())
	}
	
	//Stores a template of how a day looks like, if it is dark or rainy!
	this.getDayTemplate = function(id){
		return ""+
		"<div class=\"oneDayContainer\" id=\""+id+"\">"+
			"<div class=\"dayInfoContainer\">"+
				
				"<div class=\"dayInfo\">"+
					"<div><span class=\"startTimeLabel\">Starting time:</span><input class=\"startTime\" value=\"08:00\" type=\"text\" maxlength=\"5\" ></input></div>"+
					"<div class=\"marginDown10\"><span class=\"paddingRight5\">End time:</span><span class=\"endTime\">08:00</span></div>"+
					"<div>"+
						"<span class=\"paddingRight5\">Total length:</span>"+
						"<span class=\"totalLength\">0</span>"+
						"<span> min</span>"+
					"</div>"+
				"</div>"+
				
				"<div class=\"chartContainer\">"+
					"<div class=\"progress chart\">"+
						"<div class=\"bar bar-info chart0\"></div>"+
						"<div class=\"bar bar-success chart2\"></div>"+
						"<div class=\"bar bar-danger chart1\"></div>"+
						"<div class=\"bar bar-warning chart3\"></div>"+
					"</div>"+
					"<div class=\"progress progress-striped active chartRedLine\">"+
						"<div class=\"bar bar-danger\" style=\"width: 100%;\"></div>"+
					"</div>"+
				"</div>"+
				
			"</div>"+
			
			"<div class=\"well listContainer dayList\"><ul></ul></div>"+
		"</div>";
	}
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		//We only account for addressed notifications!
		
		//If it's newDayAdded notification, well, add a new day...
		if(arg == "newDayAdded"){
			this.addNewDay();
		}
		//Else if the argument is set...
		else if(arg != undefined){
			//...and is listUpdate, well then parse the id and update the list...
			if(arg.indexOf("listUpdate")>=0){
				var ids = arg.split(":"); //slice ids, the ids will be at index 1 and 2
				if(ids[1] == ids[2] && ids[1] != "null"){
					this.updateChart(ids[1]);
					this.updateStartTime(ids[1]);
					this.updateEndTime(ids[1]);
					this.updateTotalLength(ids[1]);
				}else{
					for(var i = 1; i < 3; i++){
						if(ids[i] != "null"){
							this.updateChart(ids[i]);
							this.updateStartTime(ids[i]);
							this.updateEndTime(ids[i]);
							this.updateTotalLength(ids[i]);
						}
					}
				}
			}
			//If the start time is changed, well do what you have to do!
			else if(arg.indexOf("startChanged") >= 0){
				var id = arg.split(":")[1];
				this.updateStartTime(id);
				this.updateEndTime(id);
			}
			//Otherwise if the notification is none of the above
			//It have to be a state change noteification...
			else{
				var id = GC.getDayID($("#"+arg.split(":")[1]));
				
				if(id != "activity"){					
					if(arg.indexOf("lengthChanged") >= 0){
						this.updateChart(id);
						this.updateEndTime(id);
						this.updateTotalLength(id);
					}else if(arg.indexOf("typeChanged") >= 0){
						this.updateChart(id);
					}
				}
			}
		}
	}
}

//This is a help class used to cache the elements,
//it also have a couple of getters and setters to directly
//set/get the values from the html page! 
function DayLinks(parent){
	this.startTime = parent.find(".startTime");
	this.endTime = parent.find(".endTime");
	this.totalLength = parent.find(".totalLength");
	this.chart = parent.find(".chart");
	
	//Updates the (repaints) the chart
	this.updateChart = function(values){
		this.chart.html("<div class=\"bar bar-info\" style=\"width: "+values[0]*100+"%;\"></div>"+
        		   		"<div class=\"bar bar-success\" style=\"width: "+values[2]*100+"%;\"></div>"+
						"<div class=\"bar bar-danger\" style=\"width: "+values[1]*100+"%;\"></div>"+
						"<div class=\"bar bar-warning\" style=\"width: "+values[3]*100+"%;\"></div>");
	}
	
	//Sets the start time
	this.setStartTime = function(st){
		this.startTime.val(st);
	}
	
	//Is not really used, because the time picker triggers an event with the value, 
	//hence we'll never have to check for this field manually!
	this.getStartTime = function(){
		return this.startTime;
	}
	
	//Sets the end time
	this.setEndTime = function(et){
		this.endTime.html("");
		this.endTime.html(et);
	}
	
	//Sets the total length
	this.setTotalLength = function(tl){
		this.totalLength.html(tl);
	}
}