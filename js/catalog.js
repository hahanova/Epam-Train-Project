// show catalog on the screen
filterByDate();

//get link, there type of filtering is encoded
//then call the function of filtering by type
if(window.location.toString().match(/\?.+$/)){
	let type = window.location.toString().match(/\?.+$/).toString().slice(1);
	switch(type){
		case 'men': filterBySex('men'); 
		document.getElementById('menu').children[0].children[1].className = 'page-title';
		break;
		case 'women': filterBySex('women'); 
		document.getElementById('menu').children[0].children[0].className = 'page-title';
		break;
		case 'sale': filterBySale(); 
		document.getElementById('menu').children[0].children[4].className = 'page-title';
		break;
		case 'new': filterByNew(); 
		document.getElementById('menu').children[0].children[5].className = 'page-title';
		break;
 	}
}
window.onresize = function(){
	resizeHeader();
	updateCatalogBanner();
	resizeFilterLI();
	showUsingFilters();
	hideFilters();
}
window.onload = function(){
	resizeHeader();
	//all not selected will be black color
	let lis = document.querySelectorAll('.filter_list li:first-child');
	for(let i=0; i<lis.length;i++) lis[i].style.color = 'rgb(0, 0, 0)';

	showUsingFilters();
	resizeFilterLI();
	updateCatalogBanner();
}

// -------------------------------creating items-----------------------------

function createItemById(id){
	let i = catalog.findIndex(function(e){if (e.id == id) return e;});
	createItem(i);
}
function createTextBanner(){ 
	let div = document.createElement('div');
	div.id = 'catalogBanner';
	div.innerHTML = '<p class="bannerText_title">Last weekend <span class="highlight">extra 50%</span> off on all reduced boots and shoulder bags</p><p class="bannerText_status">This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer ends at 11:59 GMT on March 1st 2015</p>';
	document.getElementById('wrapItems').insertBefore(div, document.getElementById('wrapItems').children[2]);
}

// ------------------------ update data -------------------------

//this text banner inserts in the second line every time
function updateCatalogBanner(){
	let bannerText = document.getElementById('catalogBanner');
	document.getElementById('wrapItems').removeChild(document.getElementById('catalogBanner'));
	let div = document.getElementById('wrapItems');
	if (mqMax767.matches) div.insertBefore(bannerText, div.children[2]);
	if (mqMin768.matches && mqMax1023.matches) div.insertBefore(bannerText, div.children[3]);
	if (mqMin1024.matches) div.insertBefore(bannerText, div.children[4]);
}
//in menu drop down list's width = title's width
function resizeFilterLI(){
	if(mqMin1024.matches){ 
		let blocks = document.getElementsByClassName('filterBlock');
		for (let i=0; i<blocks.length;i++) blocks[i].children[2].style.width = blocks[i].clientWidth + 'px';
	}
}
function hideFilters(){
	let filters = document.getElementById('filter');
	let ico_close = document.getElementById('icoFilterClose');
 	let ico_open = document.getElementById('icoFilterOpenFilter');
	if (mqMin1024.matches) {
		filters.style.display = 'block';
		ico_open.style.display = 'none';
	}
	else{
		filters.style.display = 'none';
		ico_close.style.display = 'none';
		ico_open.style.display = 'block';
	} 
}
function showByFilter(ctlogBy){
	document.getElementById('wrapItems').innerHTML = null;
	for(let i=0; i<ctlogBy.length; i++) createItem(i, ctlogBy);
	createTextBanner();
	updateCatalogBanner();
}
function showAllItems(){
	let bannerText = document.getElementById('catalogBanner');
	document.getElementById('wrapItems').innerHTML = null;
	for(let i=0; i<catalog.length; i++) createItem(i); 

	let div = document.getElementById('wrapItems');
	if (mqMax767.matches) div.insertBefore(bannerText, div.children[2]);
	if (mqMin768.matches && mqMax1023.matches) div.insertBefore(bannerText, div.children[3]);
	if (mqMin1024.matches) div.insertBefore(bannerText, div.children[4]);
}
// --------------------------- data filtering  ---------------------
function filterByDate(){
	let catalogByDate = catalog.sort(function(a, b){ 
			let dateA = new Date(a.dateAdded); 
			let dateB = new Date(b.dateAdded); 
			return dateB - dateA ;
		});
	showByFilter(catalogByDate);
}
function filterBySex(sex){
	let catalogBySex = [];
	catalog.forEach(function(elem){if (elem.category == sex) catalogBySex.push(elem)});
	showByFilter(catalogBySex);
}
function filterBySale(){
	let catalogBySale = [];
	catalog.forEach(function(elem){if (elem.discountedPrice!=elem.price) catalogBySale.push(elem)});
	showByFilter(catalogBySale);
}
function filterByFashion(type){
  	if (type.trim().toLowerCase() == 'not selected') showAllItems();
  	else{ 
		let catalogByType = [];
		catalog.forEach(function(elem){
			if (elem.fashion.toLowerCase()==type.trim().toLowerCase()) catalogByType.push(elem);
		});
		showByFilter(catalogByType);
	}
}
function filterByPrice(price){
	priceRange = price.match(/\d+/);
	if (price.trim().toLowerCase() == 'not selected') showAllItems();
  	else{ 
		let catalogByType = [];
		catalog.forEach(function(elem){
			if (elem.discountedPrice && priceRange==99 && elem.discountedPrice < 100) catalogByType.push(elem);
			else if (elem.discountedPrice && priceRange==100 && elem.discountedPrice > 100 && elem.discountedPrice < 300) catalogByType.push(elem);
			else if (elem.discountedPrice && priceRange==300 && elem.discountedPrice > 300) catalogByType.push(elem);
		});
		showByFilter(catalogByType);
	}
}
function filterByColor(color){
	if (color.trim().toLowerCase() == 'not selected') showAllItems();
  	else{ 
		let catalogByType = [];
		catalog.forEach(function(elem){
			for (let i in elem.colors){
				if (elem.colors[i] && elem.colors[i].toLowerCase()==color.toLowerCase()){ catalogByType.push(elem);
				}
			}
		});
		showByFilter(catalogByType);
	}
}
function filterBySize(size){
	if (size.trim().toLowerCase() == 'not selected') showAllItems();
  	else{ 
		let catalogByType = [];
		catalog.forEach(function(elem){
			for (let i in elem.sizes){
				if (elem.sizes[i] && elem.sizes[i].toLowerCase()==size.toLowerCase()){ catalogByType.push(elem);
				}
			}
		});
		showByFilter(catalogByType);
	}
}
function filterByNew(){
	let catalogByNew = [];
	catalog.forEach(function(elem){if (elem.hasNew) catalogByNew.push(elem)});
	showByFilter(catalogByNew);
}

// show current filters
function showUsingFilters(){ 
	let blocks = document.getElementsByClassName('filterBlock');
	let filters = [];

	for (let i=0; i<blocks.length; i++) {
		let uls = blocks[i].children[2];
		let lis = uls.children;

		// for showing chosen filters in filter's bar
		if (lis[0].style.color == 'rgb(0, 0, 0)') {
			//takes a title of the filter
			filters.push('<span class="unselectedFilter">'+blocks[i].children[1].innerText+'</span>'); 
			blocks[i].className = 'filterBlock';
		}
		else{ 
			for(let k=0; k<lis.length; k++){
				if (lis[k].style.color != 'rgb(168, 168, 168)') {
					filters.push('<span class="chosenFilter">'+lis[k].innerText+'</span>');
					blocks[i].className = 'filterBlock notempty';
				}
			}
		}
	}

	let output = '';
	filters.forEach(function(e) {output+= e + ', '});
	let p = document.createElement('p');
	p.innerHTML = output.slice(0, -2); //delete last symbols ', '
	p.id="currentFilters";

	// if filter's bar wasn't empty, delete it and show again
	if (document.getElementById('currentFilters')) usingFilterMobile.removeChild(document.getElementById('currentFilters'));
	usingFilterMobile.appendChild(p);

	// we create P-element with chosen filter (desktop)
	if(mqMin1024.matches){
		for (let i=0;i<filters.length; i++){
			let p = document.createElement('p');
			p.innerHTML = filters[i];
			let id = 'filter' + (i+1);
			if(document.getElementById(id).children.length>3){ 
				document.getElementById(id).removeChild(document.getElementById(id).children[3]);
			}
			document.getElementById(blocks[i].id).appendChild(p);
		}
		
	}
	// we delete P-element with chosen filter (mobile and tablet), because there it must be highlighted
	if(mqMax1023.matches){
		for (let i=0;i<filters.length; i++){
			let id = 'filter' + (i+1);
			if(document.getElementById(id).children.length>3){ 
				document.getElementById(id).removeChild(document.getElementById(id).children[3]);
			}
		}
	}
}

// ----------------------------- event handlers -------------------------

//Click on filter changes color
if( document.getElementById('filter') ){ 
 	document.getElementById('filter').addEventListener('click', function(e){
 		if (e.target.tagName == 'LI') {

 			// filter catalog by filter if this filter is developed
 			let param = e.target.parentElement.parentElement.children[1].innerText;
 			switch(param){
 				case 'Fashion': filterByFashion(e.target.innerText); break;
 				case 'Price Range': filterByPrice(e.target.innerText); break;
 				case 'Color': filterByColor(e.target.innerText); break;
 				case 'Size': filterBySize(e.target.innerText); break;
 			}

 			let li = e.target;
 			let lis = li.parentElement.children;
 			// all LIs are grey
 			for(let i=0; i<lis.length;i++){lis[i].style.color = "#a8a8a8";}
 			// if it is first - it will be black, else highlighted by red
 			if (li!=lis[0]) li.style.color = "#f14a58";
 			else li.style.color = "#000";

 			showUsingFilters();
 			hideFilters();
 		}
 		else e.stopPropagation();
 	});
 }
// click the filter bar and it shows/hides (tablet and mobile)
if( document.getElementById('usingFilterMobile') ){ 
 	document.getElementById('usingFilterMobile').addEventListener('click', function(e){
 		let filters = document.getElementById('filter');
 		let ico_close = document.getElementById('icoFilterClose');
 		let ico_open = document.getElementById('icoFilterOpenFilter');
 		filters.style.display = (filters.style.display == 'block') ? 'none' : 'block';
 		ico_close.style.display = (ico_close.style.display == 'block') ? 'none' : 'block';
 		ico_open.style.display = (ico_open.style.display == 'none') ? 'block' : 'none';
 	});
 }
// click the item and it will go to its item.html
if( document.getElementById('wrapItems') ){ 
 	document.getElementById('wrapItems').addEventListener('click', function(e){
 		let elem = e.target;
 		let id;
 		if(e.target.tagName == 'IMG' || (e.target.tagName == 'P' && e.target.className == ('itemTitle'|| 'price') ) || (e.target.tagName == 'SPAN' && e.target.className == 'view') ){ 
 			(function findParent(){
 				elem = elem.parentElement;
 				if (!elem.id) findParent();
 				else id = elem.id;
 			})();
 			document.location.href = "item.html?id=" +id;
	 	} else e.stopPropagation();

 	});
 }
if(document.getElementById('wrapItems')){
 	if(document.getElementById('wrapItems').lastChild.nodeType == Node.TEXT_NODE) wrapItems.removeChild(wrapItems.lastChild);
}
//IE - appears 'null' in the end of catalog -> function to fix it:
isthereNull();