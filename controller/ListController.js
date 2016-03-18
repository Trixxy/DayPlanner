//This controller is responsible for handlig the events 
//triggered within the lists, e.g. drag & drop
function ListController(view, model) {
	
	//Drag (start) handler for the list items
	view.parent.on("sortstart", "ul", function(event, ui) {
		//append the dragged item with location.
		ui.item.startPos = ui.item.index();
	});

	//Drag (stop) handler for the list items
	view.parent.on( "sortstop", "ul",function(event, ui) {			
	
		//Get all the parameters necessary for the move
		var startPos = ui.item.startPos;
		var startCon = GC.getDayID($(this));
		
		var endPos = ui.item.index();
		var endCon = GC.getDayID(ui.item);
		
		
		//If the drag & drop positions is not the same!
		if(!(startPos == endPos && startCon == endCon)){
			
			if(startCon == "activity"){
				startCon = null;
			}
			
			if(endCon == "activity"){
				endCon = null;
			}
			
			model.moveActivity(startCon, startPos, endCon, endPos);
		}
	} );
}