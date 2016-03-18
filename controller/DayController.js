//This controller is responsible to 
//handle day related actions
function DayController(view, model) {
	//Click handler for the add new day button
	view.addDayBtn.click(function(e){
		model.addDay();
		
		view.parent.width(view.parent.width()+300);
		view.parent.scrollLeft(view.parent.width());
	});
	
	//Change handler for the starting time field
	view.parent.on("change",".startTime",function(e){
		var val = $(this).val().split(":");
		model.days[GC.getDayID($(this))].setStart(val[0]*1, val[1]*1);
	});
}