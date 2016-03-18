//This controller is responsible for handling event 
//triggered by the modal view
function ModalController(view, model) {
	
	//Click handler for the save activity button
	view.saveModalBtn.click(function(e){
		
		//If new activity, set default values instead of empty spaces & save
		if(view.isNew){
			var activity = new Activity(view.modalName.val()==""?ActivityType[view.modalType.val()]:view.modalName.val(),
										isNaN(view.modalLength.val())||view.modalLength.val()==""?15:view.modalLength.val()*1,
										view.modalType.val(),
										view.modalDescr.val())
			
			model.addParkedActivity(activity);
			
			$("#"+activity._id).effect("shake");
		}
		//Otherwise, if not new, just update the values.
		else{
			view.act.setName(view.modalName.val());
			view.act.setLength(view.modalLength.val()*1);
			view.act.setTypeId(view.modalType.val());
			view.act.setDescription(view.modalDescr.val());
		}
		
		view.hideMe();
	});
	
	view.cancelModalBtn.click(function(e){
		view.hideMe();
	});
}