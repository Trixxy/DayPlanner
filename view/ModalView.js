//ExampleView Object constructor
function ModalView(parent,model) {
	// Get all the relevant elements of the view (ones that show data
	// and/or ones that responed to interaction)  
  	this.view = parent;
	
	this.myModalLabel = $("#myModalLabel");
	this.modalName = $("#modalName");
	this.modalLength = $("#modalLength");
	this.modalType = $("#modalType");
	this.modalDescr = $("#modalDescr");
	this.saveModalBtn = $("#saveModalBtn");
	this.cancelModalBtn = $("#cancelModalBtn");
	
	this.isNew = true;
	this.act;
	
	
	//Shows the modal with activity data when given an activity
	//If not, the form will be reset.
	this.showModal = function(act){
		this.act = act;
		
		this.myModalLabel.html(((act==undefined)?"Add a new activity":"Modify activity"));
		
		this.isNew = ((act==undefined)?true:false);
		this.modalName.val(((act==undefined)?"":act._name));
		this.modalLength.val(((act==undefined)?"":act._length));
		this.resetTypes(((act==undefined)?act:act._typeid));
		this.modalDescr.val(((act==undefined)?"":act._description));
		
		this.view.modal('show');
	}
	
	//Reset the dropdown list, or set the value selected
	this.resetTypes = function(selected){
		this.modalType.html("");
		
		var modalType = this.modalType;
		$.each(ActivityType,function(index,type){
			modalType.append("<option value=\""+index+"\""+(index==selected?" selected":"")+">"+ActivityType[index]+"</option>");
		});
	}
	
	//Hides the current view (the modal)
	this.hideMe = function(){
		this.view.modal('hide');
	}
	
	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	model.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){}
}