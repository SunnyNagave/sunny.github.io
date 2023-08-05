let tasklist = {};
let uncompletedtasklist= {};
let completedtasklist = {};
let rendertype = "all";
let forminput = document.getElementById("inputfield");

// Function to Toggle The Completion Status of Tasks
function togglestatus(taskid){
	keylist = Object.keys(completedtasklist);
	if(keylist.includes(String(taskid))){
		uncompletedtasklist[taskid] = tasklist[taskid];
		delete completedtasklist[taskid];
		return;
	}else{
		completedtasklist[taskid] = tasklist[taskid];
		delete uncompletedtasklist[taskid];
		return;
	}
}

// Function to Remove All Tasks Which Are Marked as Complete
function clearcompleted(){
	keylist = Object.keys(completedtasklist)
	for(i in keylist){
		mainkey = keylist[i];
		delete tasklist[mainkey];
	}
	completedtasklist = {}
	return;
}

// Function to Delete a Single Task
function deletetask(taskid){
	delete tasklist[taskid];
	delete uncompletedtasklist[taskid];
	delete completedtasklist[taskid];
	return;
}

// Function to Make a Particular List and Add it to HTML
function render(listname){
	mainlist = document.getElementById("finallist");
	mainlist.innerHTML = "";
	counter = document.getElementById("counter");
	counter.innerHTML = Object.keys(uncompletedtasklist).length;
	keylist = Object.keys(listname)
	for(i in keylist){
		mainkey = keylist[i];
		const item = document.createElement("li");
		item.classList.add("listitem");
		if(mainkey in completedtasklist){
			item.innerHTML = `<input type="checkbox" id=${mainkey} class="checkb" checked> <div class="completedtask">&nbsp;${listname[mainkey]} </div> <i id="delbtn" class="fa-solid fa-square-xmark ${mainkey}"></i>`
		}else{
			item.innerHTML = `<input type="checkbox" id=${mainkey} class="checkb"> <div class="uncompletedtask">&nbsp;${listname[mainkey]} </div> <i id="delbtn" class="fa-solid fa-square-xmark ${mainkey}"></i>`
		}
		mainlist.append(item);
	}
	return;
}

// Function to Select Which List to Render
function renderlist(){
	if(rendertype ==="all"){
		render(tasklist);
		return;
	}else if(rendertype ==="com"){
		render(completedtasklist);
		return;
	}else if(rendertype ==="unc"){
		render(uncompletedtasklist);
		return;
	}
}

// Function to Handle Clicks
function inputhandler(e){	
	if(e.target.id==="addbutton"){
		let inputvalue = document.getElementById("inputfield").value;
		if(inputvalue===""){
			// If Any One Presses Add Button Without Writing Anything in Inputbox, It Will Show an Alert.
			alert("Please Write Something");
			return;
		}else{
			//Adding the Given Task in To Do List
			let newid = new Date().getTime();
			tasklist[newid] = inputvalue;
			uncompletedtasklist[newid] = inputvalue;
			renderlist();
			document.getElementById("inputfield").value = "";
			return;
		}
		
	}else if(e.target.id === "delbtn"){
		// If Clicked on Delete Icon, It Will Delete That Task From To Do List
        deletetask(e.target.classList[2]);
		renderlist();
		return;
	}else if(e.target.id==="alltasks"){
		// If Clicked on the "All", It Will Show All Tasks
		if(rendertype !== "all"){
			rendertype = "all";
			renderlist();
		}
		return;
	}else if(e.target.id==="comtasks"){
		// If Clicked on the "Completed", It Will Show Tasks Which Are Marked As Complete
		if(rendertype !== "com"){
			rendertype = "com";
			renderlist();
		}
		return;
	}else if(e.target.id==="unctasks"){
		// If Clicked on the "Uncompleted", It Will Show Tasks Which Are Marked As uncomplete
		if(rendertype !== "unc"){
			rendertype = "unc";
			renderlist();
		}
		return;
	}else if(e.target.id==="markall"){
		// If Clicked on the "Mark All As Completed", It Will Mark All Tasks As Complete
		Object.assign(completedtasklist, uncompletedtasklist);
		uncompletedtasklist = {}
		renderlist(); 
		return;
	}else if(e.target.id ==="clearcom"){
		// If Clicked on the "Clear Completed", Clear All Task Marked As Completed
		clearcompleted();
		renderlist();
		return;
	}else if(e.target.className ==="checkb"){
		// If Clicked on the Checkbox, Toggle Status of Task Next to Checkbox
		togglestatus(e.target.id);
		renderlist();
		return;
	}else if(e.target.id === "pagetitle"){
		// Case for Little Easter Egg - Click on "To Do List" on the Page
		let ti = document.getElementById("pagetitle");
		if(ti.matches(".strikethrough")){
			ti.classList.remove("strikethrough");
			ti.classList.add("nostyle");
		}else if(ti.matches(".nostyle")){
			ti.classList.remove("nostyle");
			ti.classList.add("strikethrough");
		}else{
			ti.classList.add("strikethrough");
		}
		return;
	}
					
}

// Function to Handle "Enter" Press in Input Field
function enterhandler(e){
	if(e.key === "Enter"){
		let inputvalue = document.getElementById("inputfield").value;
		if(inputvalue===""){
			alert("Please Write Something");
			return;
		}else{
			let newid = new Date().getTime();
			tasklist[newid] = inputvalue;
			uncompletedtasklist[newid] = inputvalue;
			renderlist();
			document.getElementById("inputfield").value = "";
			return;
		}
	}
}

// Event Handler Caller for Keyboard Event in Form Input
forminput.addEventListener("keypress", enterhandler);

// Event Handler Caller for Click Anywhere
document.addEventListener("click", inputhandler);