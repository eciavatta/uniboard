var lab1 = [];
var aule1 = [];

$("#lev1 polygon").each(function(i, poly) {
	if ($(poly).attr("id") == "#f72c25") {
		aule1.push(poly)
    } else if ($(poly).attr("id") == "#17bebb") {
		lab1.push(poly);
	}
});

var lab2 = [];
var aule2 = [];

$("#lev2 polygon").each(function(i, poly) {
	if ($(poly).attr("id") == "#f72c25") {
		aule2.push(poly)
    } else if ($(poly).attr("id") == "#17bebb") {
		lab2.push(poly);
	}
});
var labRect1 = [];
var auleRect1 = [];
$("#lev1 rect").each(function(i, poly) {
	if ($(poly).attr("id") == "#f72c25") {
		auleRect1.push(poly)
    } else if ($(poly).attr("id") == "#17bebb") {
		labRect1.push(poly);
	}
});
var labRect2 = [];
var auleRect2 = [];
$("#lev2 rect").each(function(i, poly) {
	if ($(poly).attr("id") == "#f72c25") {
		auleRect2.push(poly)
    } else if ($(poly).attr("id") == "#17bebb") {
		labRect2.push(poly);
	}
});


function delay(duration) {
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve();
		}, duration)
	});
};
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
async function doStuff(what, roomType, floor) {
	var res = "";
	for (var i = 0; i < what.length; i++) {
		var theWhat = what[i];
		await delay(1000);
		eventFire(theWhat, 'click')
		await delay(1000);
		var name = $(".content__item--current h3").get(0).innerText;
		var pointRes = []
		var points = $(theWhat).attr("points").split(/\s+/);
		for (var j = 0; j < points.length; j++) {
			if (points[j]) {
				var splitPoint = points[j].split(",");
				pointRes.push(splitPoint[0]);
				pointRes.push(splitPoint[1]);
			}
		}
		res += 'new Classroom({\n';
		res += '  name: "' + name + '",\n';
		res += '  mapCoordinates: [' + pointRes + '],\n';
		res += '  roomType: "' + roomType + '",\n';
		res += '  floor: ' + floor + '\n';
		res += '}).save(),\n';
	}
	console.log(res);
}

async function doStuff4Rect(what, roomType, floor) {
	var res = "";
	for (var i = 0; i < what.length; i++) {
		var theWhat = what[i];
		await delay(1000);
		eventFire(theWhat, 'click')
		await delay(1000);
		var name = $(".content__item--current h3").get(0).innerText;
		var x = parseFloat($(theWhat).attr('x'));
		var y = parseFloat($(theWhat).attr('y'));
		var w = parseFloat($(theWhat).attr('width'));
		var h = parseFloat($(theWhat).attr('height'));
		var pointRes = [x,y,x+w,y,x+w,y+h,x,y+h]
		res += 'new Classroom({\n';
		res += '  name: "' + name + '",\n';
		res += '  mapCoordinates: [' + pointRes + '],\n';
		res += '  roomType: "' + roomType + '",\n';
		res += '  floor: ' + floor + '\n';
		res += '}).save(),\n';
	}
	console.log(res);
}

doStuff(lab1, "Laboratory", 1);
doStuff(aule1, "Classroom", 1);
doStuff(lab2, "Laboratory", 2);
doStuff(aule2, "Classroom", 2);
doStuff4Rect(labRect1, "Laboratory", 1);
doStuff4Rect(auleRect1, "Classroom", 1);
doStuff4Rect(labRect2, "Laboratory", 2);
doStuff4Rect(auleRect2, "Classroom", 2);