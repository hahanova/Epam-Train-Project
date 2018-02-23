resizeHeader();
window.onresize = resizeHeader;

//Click on size/color -> changes it (border)
if( document.getElementById('parameters') ){ 
 	document.getElementById('parameters').addEventListener('click', function(e){
 		if (e.target.parentNode.className == 'param') {
 			let p = e.target;
 			let div = e.target.parentNode.parentNode;
 			for(let i=1; i<div.children.length; i++){
 				div.children[i].style.borderColor = 'rgb(255, 255, 255)';
 			}
 			e.target.parentNode.style.borderColor = 'rgb(229, 229, 229)';
 		}
 		else event.stopPropagation();
 	});
 }
 // switching photos in thimbnail
if( document.getElementById('smallPhotos') ){ 
 	document.getElementById('smallPhotos').addEventListener('click', function(e){
 		let img = e.target;
 		for(let i=0; i<3; i++) img.parentNode.parentNode.children[i].className = null;
 		img.parentNode.className = 'chosenPhoto';
 		let imgHTML = e.target.parentNode.innerHTML;
 		openedPhoto.innerHTML = imgHTML;
 	});
 }

 // takes link -> recognize the code it it -> show item by code
if(window.location.toString().match(/=.+$/)){
	let id = window.location.toString().match(/=.+$/).toString().slice(1);
	let i = findIndexById(id);
	// substitute all fields in item.html with necessary data
	document.getElementsByClassName('title')[0].innerText = catalog[i].title;
	document.getElementsByClassName('price')[0].innerText = '£' + catalog[i].discountedPrice;
	document.getElementsByClassName('description')[0].innerText = catalog[i].description;
	document.getElementById('openedPhoto').firstChild.src = catalog[i].thumbnail[0];
	document.getElementById('photo1').firstChild.src = catalog[i].thumbnail[0];
	document.getElementById('photo2').firstChild.src = catalog[i].thumbnail[1];
	document.getElementById('photo3').firstChild.src = catalog[i].thumbnail[2];
	insert('size', i);
	insert('color', i);
	// press the button ADD TO BAG
	if( document.getElementById('addToBag') ){ 
 	document.getElementById('addToBag').addEventListener('click', function(e) {
 		// create item obj, which will be store in bag(array) and local storage
 		let item = {};
 		item.id = id;
 		item.price = document.getElementsByClassName('price')[0].innerText.slice(1);
 		let params = document.getElementsByClassName('param');
 		let arSizeColor = [];

 		for (let i=0; i< params.length; i++){
			if (params[i].style.borderColor == 'rgb(229, 229, 229)') arSizeColor.push(params[i].innerText);
		}
		if(!arSizeColor[1]) alert('Select all fields');
		else {
			item.size = arSizeColor[0].trim();
 			item.color = arSizeColor[1].trim();
 			item.quantity = 1;
			
			let code = item.id + '=' + item.color + item.size;
			item.code = code;

			bag.push(item);
			checkBag();
			updateBag();

			bag.forEach(function(val){
		 		if (val.code==code){
		 			localStorage.removeItem(code);
		 			item = val;
		 		}
		 	})

	 		addToLocalStorage(item, code);
	 		alert('Item was succesfully added to Bag');
		}
 	});
 }
}
//get the index in catalog of item
function findIndexById(id){
	for (let i = 0; i < catalog.length; i++) {
		if (catalog[i].id == id) return i;
	}
	//return i = catalog.findIndex(function(e){if (e.id == id) return e;});
}
// insert size or color depends on param to item.html
function insert(param, i){
	let outhtml ='', catalogParam;
	if (param=='size'){
		document.getElementById('parameters').removeChild(document.getElementById('parameters').children[0]);
		outhtml = '<div class="titleParam" id="size"><p>Size</p></div>';
		catalogParam = catalog[i].sizes;
	}
	else {
		document.getElementById('parameters').removeChild(document.getElementById('parameters').children[1]);
		outhtml = '<div class="titleParam"><p>Color</p></div>';
		catalogParam = catalog[i].colors;
	}
	let div = document.createElement('div');
	div.className = 'params';
	
	for (let j=0; j<catalogParam.length; j++) outhtml += '<div class="param"><p>' + catalogParam[j] + '</p></div>';
	div.innerHTML = outhtml;
	if (param=='size') parameters.insertBefore(div, parameters.firstChild);
	else parameters.insertBefore(div, parameters.lastChild);
}
