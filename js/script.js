"use strict";

const mqMax767 = window.matchMedia( "(max-width: 767px)" );
const mqMin768 = window.matchMedia( "(min-width: 768px)" );
const mqMax1023 = window.matchMedia( "(max-width: 1023px)" );
const mqMin1024 = window.matchMedia( "(min-width: 1024px)" );

// ------------------------------------------------ MENU / HEADER ----------------------------------------
// toggle menu burger (mobile version)
if( document.getElementById('wrapIconMenu') ){ 
 	document.getElementById('wrapIconMenu').addEventListener('click', function() {
 		let wrapIconMenu = document.getElementById('wrapIconMenu');
 		let icoMenu = document.getElementById('icoMenu');
 		let icoMenuClose = document.getElementById('icoMenuClose');
 		let menu = document.getElementById('menu');

 		icoMenu.style.display = (icoMenu.style.display == 'none') ? 'block' : 'none';
 		icoMenuClose.style.display = (icoMenuClose.style.display == 'block') ? 'none' : 'block';
 		menu.style.display = (menu.style.display == 'block') ? 'none' : 'block';
 		wrapIconMenu.style.borderLeftColor = (wrapIconMenu.style.borderLeftColor == 'rgb(255, 255, 255)') ? '#e5e5e5' : 'rgb(255, 255, 255)';
  });
}
// search hiding (tablet version)
function toggleSearchInput() {
	let searchInput = document.getElementById('search');
	//let wrapSearch = document.getElementById('wrapSearch');
	let wrapIcoSearch = document.getElementById('wrapIcoSearch');
	searchInput.style.display = (searchInput.style.display == 'inline-block') ? 'none' : 'inline-block';
	wrapIcoSearch.style.borderBottomColor = (searchInput.style.display == 'none') ? 'rgb(255, 255, 255)' : '#e5e5e5';
 }
function resizeHeader(){
	let menu = document.getElementById('menu');
	//menu li will appear after 768px and mobile menu li will dissapear properly
	if (mqMin768.matches) menu.style.display = 'block';
	else menu.style.display = 'none';
	document.getElementById('icoMenu').style.display = 'block';
 	document.getElementById('icoMenuClose').style.display = 'none';
 	document.getElementById('wrapIconMenu').style.borderLeftColor = '#e5e5e5';

	//search icon will be clickable and search input will appear when they need
	if(mqMax767.matches || mqMin1024.matches){
		document.getElementById('icoSearch').removeEventListener('click', toggleSearchInput, false);
		document.getElementById('search').style.display = 'inline-block';
	}
	else{
		document.getElementById('icoSearch').addEventListener('click', toggleSearchInput,false);
		document.getElementById('search').style.display = 'none';
	}
}
// ------------------------------------------- BAG / SHOPPING BAG ------------------------------------

let bag = []; //array of items that are in shopping bag
bag = parseLocalStorage();
let totalPrice = 0;
checkBag();
updateBag();

function calcTotalpPrice(){
  let price = 0;
  for (let i=0; i<bag.length; i++) price += bag[i].price * bag[i].quantity;
  return Math.ceil(price);
}
// check in bag(array) some identical items -> merge them;
function checkBag(){
	for(let i=0; i<bag.length; i++){
		for(let j=0; j<bag.length; j++){
			if (bag[i].code == bag[j].code && i!=j){
				bag.splice(j, 1);
				j--;
				bag[i].quantity++;
			}
		}
	}
}
function refillLocalStorage(){
	if (localStorage.length!=bag.lengh){ 
		for(let i=localStorage.length; i<bag.length; i++) addToLocalStorage(bag[i], bag[i].code);
	}
}
function addToLocalStorage (val, key){
  let serial = JSON.stringify(val); 
  localStorage.setItem(key, serial);
}
function parseLocalStorage (){
  let data = []; 
  for (let i=0; i<localStorage.length; i++){
    if (localStorage.getItem(Object.keys(localStorage)[i])) {
      data.push( JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])) );
    }
  }
  return data;
}
function updateBag(){
	totalPrice = calcTotalpPrice();
	if (totalPrice==0) document.getElementById('bagInsert').innerText = '(' + bag.length + ')';
	else document.getElementById('bagInsert').innerText = '£' + totalPrice + ' (' + bag.length + ')';

	if(document.getElementById('totalPrice')) document.getElementById('totalPrice').innerText = '£' + totalPrice;
}
// -------------------------------------------------------------- CATALOG / START

// find the nearest id (in shopping bag page it means unique code)
function findParent(elem){
	elem = elem.parentElement;
	if (!elem.id) return findParent(elem);
	else return elem.id;
};
function createItem(i, ctlog){
	ctlog = ctlog || catalog;
	let div = document.createElement('div');
    div.className = 'item';
    div.id = ctlog[i].id;

    let p = ctlog[i].placeholder || '£' + ctlog[i].price;
    let span = '<span class="view">View Item</span>';
    let shadow = '<div class="hoverPhoto">';
    if (ctlog[i].hasNew) p += '<span class="bannerText_status"> New </span>';
    if (ctlog[i].placeholder) {
    	p = '<span class="bannerText_status">'+ p +'</span>';
    	span = '<div class="itemAds"><p class="bannerText_title">Levi\'s</p><p class="bannerText_status itemAds">Buyer\'s choice</p></div>';
    	shadow = '<div class="shadowPhoto hoverPhoto">';
    }
    if (ctlog[i].price != ctlog[i].discountedPrice){
    	let price = ctlog[i].discountedPrice;
    	let oldPrice = ctlog[i].price;
    	let discount = Math.round(100-price/oldPrice*100);
    	p = '<span class="oldPrice"> £'+ oldPrice + '</span><span class="bannerText_status discount"> -'+ discount +'%</span> £' + price;
    }
    div.innerHTML = '<a href="item.html?id=' + ctlog[i].id + '">'+ shadow + span +'<img src="'+ ctlog[i].preview[0] + '" alt="'+ ctlog[i].title + '"></div><p class="itemTitle">'+ ctlog[i].title +'</p><p class="price">' + p + '</p></a>';
    wrapItems.insertBefore(div, wrapItems.lastChild);
}
//IE - appears 'null' in the end of catalog -> function to fix it:
function isthereNull(){
 if(document.getElementById('wrapItems')){
	let time = setTimeout( function(){
		let divs = document.getElementById('wrapItems').childNodes;
		for(let i=0; i<divs.length; i++){
			if (divs[i].nodeType == Node.TEXT_NODE) wrapItems.removeChild(divs[i]);
		}
 	//if(document.getElementById('wrapItems').lastChild.nodeType == Node.TEXT_NODE) wrapItems.removeChild(wrapItems.lastChild);
	 }, 5);
 }
}