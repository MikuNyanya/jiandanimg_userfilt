let filterUsers = null;


function loadFiltUsers(){
	let filterUsersStr;
	chrome.storage.local.get(['jiandanFilterUsers'], function(result) {
		filterUsersStr = result.jiandanFilterUsers;
		//console.log("加载完毕:"+filterUsersStr)
		if(null == filterUsersStr || filterUsersStr == ""){
			return;
		}
		filterUsers = filterUsersStr.split(',');
		
		if(filterUsers == null){
			filterUsers = [];
		}
	});
	
	
}

function filtusers(){
	if(filterUsers == null){
		loadFiltUsers();
	}
		
	if(filterUsers == null || filterUsers.length <= 0){
		return;
	}
	
	let docs = document.getElementsByClassName("author");
	let bClickEvent = 0;
	for (let authorNode of docs) {
		let uName = authorNode.children[0].innerHTML;
		
		for(let filtUname of filterUsers){
			if(filtUname == null || filtUname.length<=0){
				continue;
			}
			if(uName == filtUname && authorNode.getAttribute("rabbit") == null){
				//console.log(uName+"开始执行屏蔽")
				bClickEvent = 1;
				authorNode.setAttribute("rabbit","filt")
				let textNode = authorNode.nextElementSibling;
				console.log(textNode.children[1].className);
				if(textNode.children[1].className == "bad_content"){
					textNode.children[1].remove();
				}
				textNode.children[1].style.display="none";		
				textNode.children[0].insertAdjacentHTML("afterend", "<p class='filt_content' style='color:#FFA500'>已按照插件规则隐藏该内容.  <a href='javascript:;' class='rabbit_view_filt'>[手贱一回]</a></p>")
				
			}
		}
	}
	
	if(bClickEvent == 1){
		let rabbitViewFiltNodes = document.getElementsByClassName("rabbit_view_filt");
		for(let node of rabbitViewFiltNodes){
			node.addEventListener("click", rabbitViewFiltClick)
		}
	}
}
function rabbitViewFiltClick(){
	    let viewFiltNode = event.currentTarget;
		let imgNode = viewFiltNode.parentNode.nextElementSibling;
		if (this.innerHTML == '[手贱一回]' || this.innerHTML == '[再手贱一回]') {
			imgNode.style.display="inline";
			this.innerHTML = '[真不该手贱]';
		} else {
			imgNode.style.display="none";
			this.innerHTML = '[再手贱一回]';
		}		
	
}

setInterval(filtusers,200);
