// --------------------------------SLIDER-------------------------------------

// function for the same amount of circles as photos in slider
window.onload = function(){
	resizeHeader();

	if(document.getElementById('sliderPhotos')){
		document.getElementById('sliderPhotos').children[0].style.zIndex = 5;
		let length = document.getElementById('sliderPhotos').children.length;

		for(let i=0; i<length; i++){
			let div = document.createElement('div');
			div.id = 'circle' + (i+1);
			if (i==0) div.className = 'circle active';
			else div.className = 'circle';
			carouselDotsBlock.appendChild(div);
		}
	}
	resizeSlider();
	filterByDate(); //show 2-4 new items
	resizeCatalog(); // if mobile - 2 items, tablet - 3, desktop - 4
}
window.onresize = function(){
	resizeHeader();
	resizeSlider();
	resizeCatalog();
};

//set a timer for changing photos every 10 sec
let timer = setInterval( function(){slide(getActivePhoto(), 'right')}, 10000);

// click right pointer
if( document.getElementById('p-right') ){ 
 	document.getElementById('p-right').addEventListener('click', function(){
 		slide(getActivePhoto(), 'right');
 	});
}
// click left pointer
if( document.getElementById('p-left') ){ 
 	document.getElementById('p-left').addEventListener('click', function(){
		slide(getActivePhoto(), 'left');
 	});
}
function slide(img, direction) {
	let num = img.id.match(/\d/);
	clearZIndex();

	img.style.zIndex = 2;
 	let circle = document.getElementById('carouselDotsBlock').children;
 	circle[num-1].className = 'circle';
 	fadeOut(img);

 	if (direction == 'right'){
 		if (img.nextElementSibling) {
			img.nextElementSibling.style.zIndex = 5;
			circle[num].className = 'circle active';
			fadeIn(img.nextElementSibling);
		}
		else {
			document.getElementById('sliderPhotos').children[0].style.zIndex = 5;
			circle[0].className = 'circle active';
			fadeIn(document.getElementById('sliderPhotos').children[0]);
		}
 	}
 	else {
 		if (img.parentElement.children[num-2]) {
			img.parentElement.children[num-2].style.zIndex = 5;
			circle[num-2].className = 'circle active';
			fadeIn(img.parentElement.children[num-2]);
		}
		else {
			let length = document.getElementById('sliderPhotos').children.length;
			document.getElementById('sliderPhotos').children[length-1].style.zIndex = 5;
			circle[length-1].className = 'circle active';
			fadeIn(document.getElementById('sliderPhotos').children[length-1]);
		}
 	}
	resetTimer();
}
//if user switch photos of slider by his own -> reset timer
function resetTimer(){
	clearTimeout(timer);
	timer = setInterval( function(){slide(getActivePhoto(), 'right')}, 10000);
}
function getActivePhoto(){
	let imgs = document.getElementById('sliderPhotos').children;
 	let img;
	for (let i=0; i<imgs.length; i++)if (imgs[i].style.zIndex == 5) img = imgs[i];
	return img;
}
function clearZIndex(){
	let pics = document.getElementsByClassName("carouselPic");
	for (var i = 0; i < pics.length; i++) {
	 pics[i].style.zIndex = 1;
	  }
}
function goToLinks(e){
 		let num = +e.target.id.match(/\d/);
 		switch(num){
 			case 1: document.location.href = "catalog.html";
 			break;
 			case 2: document.location.href = "item.html";
			break;
 			case 3: document.location.href = "shopping_bag.html";
			break;
 			case 4: document.location.href = "catalog.html";
 			break;
 		}
 	}
// each photo of slider is link to some page
if( document.getElementById('sliderPhotos') ){ 
 	document.getElementById('sliderPhotos').addEventListener('click', 
 		function(e){ goToLinks(e) }
	)
 }
// slide by clicking on dots
if( document.getElementById('carouselDotsBlock') ){ 
 	document.getElementById('carouselDotsBlock').addEventListener('click', function(e){
 		if (e.target.id!='carouselDotsBlock'){ 
	 		let num = e.target.id.match(/\d/); 
	 		let img = getActivePhoto(); 

			clearZIndex();
			img.style.zIndex = 2; //for others must be 1 --- DO IT!!!!
			fadeOut(img);
			let = numImg = img.id.match(/\d/);
		 	let circle = document.getElementById('carouselDotsBlock').children; 
		 	circle[numImg-1].className = 'circle'; // исчез кружок

			img.parentElement.children[num-1].style.zIndex = 5;
			fadeIn(img.parentElement.children[num-1]);
			circle[num-1].className = 'circle active';
			resetTimer();
		} else e.stopPropagation();
 	});
}
//fade in
function fadeOut(el){
  el.style.opacity = 1;
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val -= 0.05) < 0)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
// fade in
function fadeIn(el){
  el.style.opacity = 0;
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}


function resizeSlider(){
	let img = getActivePhoto();
	//document.getElementById('sliderPhotos').style.width = img.clientWidth + 'px';
	document.getElementById('sliderPhotos').style.height = img.clientHeight + 'px';
}

// // if click the photo / replace this with Switch function
// if( document.getElementById('sliderPhotos') ){ 
//  	document.getElementById('sliderPhotos').addEventListener('click', function(e){slide(e.target, 'right') });
// }

// ------------------------------button --------------------------

// click the button ALL ARRIVALS
if( document.getElementById('allarrivBtn') ){ 
 	document.getElementById('allarrivBtn').addEventListener('click', function(e){
 		document.location.href = "catalog.html";
  });
}
// ---------------------------------- new arrivals --------------------- 
// if click the item -> go to item.html
if( document.getElementById('wrapItems') ){ 
 	document.getElementById('wrapItems').addEventListener('click', function(e){
 		if(e.target.tagName == 'IMG' || e.target.tagName == 'P' || e.target.tagName == 'SPAN'){ 
 			let id = findParent(e.target);
 			document.location.href = "item.html?id=" + id;
	 	} else e.stopPropagation();
 	});
 }
function filterByDate(){
	let catalogByDate = catalog.sort(function(a, b){ 
			let dateA = new Date(a.dateAdded); 
			let dateB = new Date(b.dateAdded); 
			return dateB - dateA ;
		});
	document.getElementById('wrapItems').innerHTML = null;
	for(let i=0; i<4; i++) createItem(i);
}
// if mobile - 2 items, tablet - 3, desktop - 4
function resizeCatalog(){
	let items = document.getElementById('wrapItems').children;
	if(mqMax767.matches){ 
		for (let i=0; i<items.length;i++) if(i > 1) items[i].style.display = 'none';
	}
	if(mqMin768.matches && mqMax1023.matches){ 
		for (let i=0; i<items.length;i++) {
			if(i > 2) items[i].style.display = 'none';
			else items[i].style.display = 'inline-block';
		}
	}
	if(mqMin1024.matches){ 
		for (let i=0; i<items.length;i++) items[i].style.display = 'inline-block';
	}
}
// -------------------------------------------- swipe

let startPoint = {};
let nowPoint;
// catch start of a touch
document.getElementById('sliderPhotos').addEventListener('touchstart', function(event) {
	event.preventDefault();
	startPoint.x = event.changedTouches[0].pageX;
	startPoint.y = event.changedTouches[0].pageY;
	ldelay = new Date();
}, false);

//catch movement of finger
document.getElementById('sliderPhotos').addEventListener('touchmove', function(event) {
	event.preventDefault();
	let distance = {};
	nowPoint = event.changedTouches[0]; //catch current coordinates / use last one
	distance.x = nowPoint.pageX - startPoint.x;

	if(Math.abs(distance.x) > 200){ //it will not work with too short swipes
		if(distance.x<0){ slide(getActivePhoto(), 'left') }
		if(distance.x>0){ slide(getActivePhoto(), 'right') }
		startPoint = { x:nowPoint.pageX, y:nowPoint.pageY };
	}
}, false);

// catch the end of touching
document.addEventListener('touchend', function(event) {
	let distance = {};
	nowPoint = event.changedTouches[0];
	distance.x = nowPoint.pageX - startPoint.x;
	if (Math.abs(distance.x) < 10) goToLinks(event);
}, false);

// ---------------------------------------------------------------------

//IE - appears 'null' in the end of catalog -> function to fix it:
isthereNull();
