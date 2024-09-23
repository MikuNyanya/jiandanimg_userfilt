window.onload = function(){
	document.getElementById("addButton_btn").addEventListener("click",addFilter);
	document.getElementById("removeButton_btn").addEventListener("click",removeFilter);
	
	loadFilter();
}

function loadFilter(){
	let filterUsersStr;
	chrome.storage.local.get(['jiandanFilterUsers'], function(result) {
	  filterUsersStr = result.jiandanFilterUsers;
	  console.log("load:"+result.jiandanFilterUsers);
	  console.log("load1:"+filterUsersStr);
	  
	  if(null == filterUsersStr){
		return;
		}
		let filterUsers = filterUsersStr.split(',');
		for(let index in filterUsers){
			let temp = filterUsers[index];
			if(temp != null && temp.length>0){
				addOpen(temp);	
			}
		}
	});
}

function addFilter(){
	let newFilter = document.getElementById("newFilter").value;
	if(newFilter == null) return;
	newFilter = newFilter.trim();
	if(newFilter.length <=0) return;
	
	addOpen(newFilter);
	
	
	let filterUsersStr;
	chrome.storage.local.get(['jiandanFilterUsers'], function(result) {
	  filterUsersStr = result.jiandanFilterUsers;
	  
	  if(null == filterUsersStr){
		filterUsersStr = "";
		}
		filterUsersStr += newFilter;
		filterUsersStr += ",";
		
		chrome.storage.local.set({ 'jiandanFilterUsers': filterUsersStr})
		
		document.getElementById("newFilter").value = "";
	});
	
	
}


function removeFilter(){
	let userFiltersBox = document.getElementById("userFiltersBox");
	if(userFiltersBox.selectedIndex > -1){
		let filterStr = "";
		
		for(var i=0;i<userFiltersBox.options.length;i++){
			if(userFiltersBox.options[i].selected)
			{
				userFiltersBox.remove(i);
				i-=1;
			}else{
				filterStr += userFiltersBox.options[i].value;
				filterStr += ",";
			}
		}
		
		chrome.storage.local.set({ 'jiandanFilterUsers': filterStr})
	}
}

function addOpen(item){
	console.log("addOpen:"+item);
	
	let newOption = document.createElement("option");
	newOption.text = item;
	newOption.value = item;
	let userFiltersBox = document.getElementById("userFiltersBox");
	userFiltersBox.appendChild(newOption);
}