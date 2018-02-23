resizeHeader();
checkBag();
updateBag();
isEmptyBag();
refillLocalStorage();

window.onresize = resizeHeader;

for(let i=0; i<bag.length; i++){
	createItem(bag[i].id, bag[i].size, bag[i].color, bag[i].quantity, bag[i].code);
}

// remove item
for (var i = 0; i < document.getElementsByClassName("removeItem").length; i++) {
  document.getElementsByClassName("removeItem")[i].onclick = function(e){
  	let elem = e.target;
    let code = findParent(elem);

 	bag.forEach( function(elem, j){
 		if (elem.code==code) {
 			localStorage.removeItem(bag[j].code);
 			bag.splice(j,1); 
 		}
 	});

 	wrapItems.removeChild( document.getElementById(code) );
 	updateBag();
 	isEmptyBag();
  };
}
// item +
for (var i = 0; i < document.getElementsByClassName("plus").length; i++) {
  document.getElementsByClassName("plus")[i].onclick = function(e){
  	let elem = e.target;
 	let code = findParent(elem);
 	e.target.parentElement.children[1].innerText++;

 	bag.forEach(function(val){
 		if (val.code==code){
 			val.quantity++;
 			localStorage.removeItem(code);
 			addToLocalStorage(val, code);
 		}
 	})
 	updateBag();
  };
}
// item -
for (var i = 0; i < document.getElementsByClassName("minus").length; i++) {
  document.getElementsByClassName("minus")[i].onclick = function(e){
  	let elem = e.target;
    let code = findParent(elem);
    // check if the quantity below 1
 	if(e.target.parentElement.children[1].innerText == 1) e.target.parentElement.children[1].innerText = 1;
 	else e.target.parentElement.children[1].innerText--;

 	bag.forEach(function(val){
 		if (val.code==code){
 			if (val.quantity > 1) {
	 			val.quantity--;
	 			localStorage.removeItem(code);
	 			addToLocalStorage(val, code);
 			}
 		}
 	})
 	updateBag();
  };
}
// click button EMPTY BAG
if( document.getElementById('emptyBag') ){ 
 	document.getElementById('emptyBag').addEventListener('click', function(){
 		clearBag();
 		isEmptyBag();
 	});
}
// click button BUY NOW
if( document.getElementById('btnBuy') ){ 
 	document.getElementById('btnBuy').addEventListener('click', function(e){
 		clearBag();
		let p = document.createElement('p');
		p.className = 'textAfter';
		p.innerText = 'Thank you for your purchase';
		wrapItems.insertBefore(p, wrapItems.lastChild);
  });
}

// -------------------------------------- functions ---------------------------------------

//clear all items from shopping bag
function clearBag(){
	document.getElementById('wrapItems').innerHTML = null;
	bag = [];
	localStorage.clear();
	updateBag();
}
// check if bag is empty
function isEmptyBag(){
	if(bag.length==0){
		let p = document.createElement('p');
		p.className = 'textAfter';
		p.innerHTML = 'Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items';
		wrapItems.insertBefore(p, wrapItems.lastChild);
 	}
}
//create and show item in Shopping bag
function createItem(id, size, color, quantity, code){
	let i = catalog.findIndex(function(e){if (e.id == id) return e;});
	let div = document.createElement('div');
    div.className = 'item';
    div.id = code;
    let p = '£' + catalog[i].price;
    if (catalog[i].price != catalog[i].discountedPrice)p = '£' + catalog[i].discountedPrice;

    div.innerHTML = '<div class="table"><a href="item.html?id=' + id + '"><div class="hoverPhoto photo"><span class="view">View Item</span><img src="'+ catalog[i].preview[0] + '" alt="'+ catalog[i].title + '"></div></a><div class="text"><p class="itemTitle">'+ catalog[i].title +'</p><p class="price">' + p + '</p><p class="color">Color: <span>' + color + '</span></p><p class="size">Size: <span>' + size + '</span></p><p class="quantity">Quantity:<span class="minus">–</span><span class="number">' + quantity +'</span><span class="plus">+</span></p><p class="removeItem">Remove item</p></div></div>';
    wrapItems.insertBefore(div, wrapItems.lastChild);
}




