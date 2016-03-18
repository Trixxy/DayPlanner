//This controller is responsible to 
//handle activity related actions
function ActivityController(view, model) {
	//Click handler for the add activity button
	view.addActivityBtn.click(function(e){
		GC.showModalView();
	});
	
	//Click handler for the edit activity button
	view.parent.on("click", ".editActivityBtn", function(e){
		GC.showModalView(view.getActivity($(this)));
	});
}