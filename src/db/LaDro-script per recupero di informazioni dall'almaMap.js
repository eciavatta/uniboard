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

  //piano 1 laboratori
  new Classroom({
    name: "2007 - Laboratorio Informatico VeLa 2.2",
    mapCoordinates: [593.173,608.101,593.173,601.141,575.134,601.141,575.134,604.021,531.974,604.021,531.974,608.101,520.574,608.101,520.574,679.861,603.375,679.861,603.375,608.101],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  new Classroom({
    name: "2066 - Laboratorio Disegno 2.17",
    mapCoordinates: [314.441,257.16,314.441,252.96,266.562,252.96,266.562,331.2,326.142,331.2,326.142,257.16],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  new Classroom({
    name: "2065 - Laboratorio Disegno 2.16",
    mapCoordinates: [376.8,257.16,376.8,252.96,328.92,252.96,328.92,331.2,388.5,331.2,388.5,257.16],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  new Classroom({
    name: "2056 - Laboratorio Disegno 2.15",
    mapCoordinates: [560.335,310.92,560.335,256.68,547.08,256.68,547.08,252.96,492.24,252.96,492.24,256.68,476.52,256.68,476.52,310.92],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  new Classroom({
    name: "2055 - Laboratorio Disegno 2.14",
    mapCoordinates: [631.68,256.68,631.68,252.96,577.32,252.96,577.32,256.68,563.695,256.68,563.695,310.92,645.84,310.92,645.84,256.68],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  new Classroom({
    name: "2068 - Laboratorio LaMo",
    mapCoordinates: [393.052,150.959,266.578,150.96,266.578,228.96,377.4,228.959,377.399,223.92,393.052,223.92],
    roomType: "Laboratory",
    floor: 1
  }).save(),
  /*new Classroom({
    name: "2046 - Laboratorio di Ricerca E2",
    mapCoordinates: [971.671,413.936,911.52,172.32,865.219,172.32,865.219,290.16,875.28,290.28,875.279,356.89,865,356.89,865,414,931.92,414,934.2,423.24],
    roomType: "Laboratory",
    floor: 1
  }).save(),*/
  //piano 1 aule
  new Classroom({
    name: "2001 - Aula 2.8",
    mapCoordinates: [295.912,619.441,295.912,615.361,276.592,615.361,276.592,619.441,263.88,619.441,263.88,679.861,306.352,679.861,306.352,619.441],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2002 - Aula 2.7",
    mapCoordinates: [338.396,619.441,338.396,615.361,319.075,615.361,319.075,619.441,308.155,619.441,308.155,679.861,348.836,679.861,348.836,619.441],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2003 - Aula 2.6",
    mapCoordinates: [380.887,608.101,380.887,604.021,361.567,604.021,361.567,608.101,350.647,608.101,350.647,679.861,391.327,679.861,391.327,608.101],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2004 - Aula 2.5",
    mapCoordinates: [423.369,608.101,423.369,604.021,404.048,604.021,404.048,608.101,393.128,608.101,393.128,679.861,433.809,679.861,433.809,608.101],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2005 - Aula 2.4",
    mapCoordinates: [465.85,608.101,465.85,604.021,446.529,604.021,446.529,608.101,435.609,608.101,435.609,679.861,476.29,679.861,476.29,608.101],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2006 - Aula 2.3",
    mapCoordinates: [508.33,608.101,508.33,604.021,489.01,604.021,489.01,608.101,478.09,608.101,478.09,679.861,518.771,679.861,518.771,608.101],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2008 - Aula 2.1",
    mapCoordinates: [618.613,603.883,618.613,607.861,607.094,607.861,607.094,679.861,669.734,679.861,669.734,603.883],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2015 - Aula 2.9",
    mapCoordinates: [263.88,498.719,263.88,563.16,277.68,563.16,277.68,571.68,337.32,571.68,337.32,567.121,347.76,567.121,347.76,498.719],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2014 - Aula 2.10",
    mapCoordinates: [350.52,498.719,350.52,567.42,361.08,567.42,361.08,571.68,391.245,571.68,391.245,498.719],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2025 - Aula 2.12",
    mapCoordinates: [603.96,498.719,520.98,498.719,520.98,572.88,531.84,572.88,531.84,576.48,594.48,576.48,594.48,572.88,603.96,572.88],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2026 - Aula 2.13",
    mapCoordinates: [607.561,498.719,607.561,572.64,618.12,572.64,618.12,576,647.864,576,647.864,498.719],
    roomType: "Classroom",
    floor: 1
  }).save(),
  /*new Classroom({
    name: "2010 - Spazio Studenti",
    mapCoordinates: [762.24,639.72,762.24,663.6,757.439,663.6,757.439,680.76,818.88,680.76,818.88,639.72],
    roomType: "Classroom",
    floor: 1
  }).save(),*/
  //piano 2 laboratori
  new Classroom({
    name: "3001 - Laboratorio",
    mapCoordinates: [380.64,619.44,380.64,612.96,322.08,612.96,322.08,619.44,307.92,619.44,307.92,679.621,391.08,679.621,391.08,619.44],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3003 - Laboratorio LeLe 3.2",
    mapCoordinates: [518.662,606.72,508.41,606.72,508.41,600.6,494.372,600.6,494.372,602.76,445.89,602.76,445.89,606.72,435.571,606.72,435.571,679.621,498.911,679.621,498.911,653.874,518.662,653.874],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3004 - Laboratorio Informatico 3.1",
    mapCoordinates: [593.52,606.72,593.52,600.6,576.48,600.6,576.48,603,531,603,531,606.72,520.92,606.72,520.92,680.339,603.48,680.339,603.48,606.72],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3009 - Laboratorio 1 Elettronica e Telecomunicazioni",
    mapCoordinates: [307.74023,500.75977,307.74023,560.40039,343.85156,560.40039,343.85156,560.82031,321.7207,560.82031,321.7207,575.51953,380.88086,575.51953,380.88086,560.82031,354.25586,560.82031,354.25586,560.40039,391.32031,560.40039,391.32031,500.75977,307.74023,500.75977],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3021 - Laboratorio Informatico 3.3",
    mapCoordinates: [603.84,500.64,521.4,500.64,521.4,572.76,532.02,572.76,532.02,575.64,576,575.64,576,579.36,593.52,579.36,593.52,572.76,603.84,572.76],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3056 - Laboratorio di Sintesi 3.12",
    mapCoordinates: [489.182,250.92,489.182,257.04,478.394,257.04,478.394,288.12,518.94,288.12,518.94,250.92],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3055 - Laboratorio di Sintesi 3.13",
    mapCoordinates: [550.762,250.92,550.762,257.04,561.549,257.04,561.549,288.12,521.002,288.12,521.002,250.92],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3054 - Laboratorio di Sintesi 3.14",
    mapCoordinates: [574.405,250.92,574.405,257.04,563.617,257.04,563.617,288.12,604.165,288.12,604.165,250.92],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3053 - Laboratorio di Sintesi 3.15",
    mapCoordinates: [635.992,250.92,635.992,257.04,646.781,257.04,646.781,288.12,606.227,288.12,606.227,250.92],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3052 - Laboratorio di Sintesi 3.16",
    mapCoordinates: [662.76,250.92,662.76,257.04,651.12,257.04,651.12,288.12,692.52,288.12,692.52,250.92],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3071 - Laboratorio Disegno 3.9",
    mapCoordinates: [476.029,164.88,393.349,164.88,393.349,222.36,410.749,222.36,410.749,227.4,466.069,227.4,466.069,222.36,476.029,222.36],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3070 - Laboratorio Disegno 3.8",
    mapCoordinates: [561.458,164.88,478.778,164.88,478.778,222.36,489.658,222.36,489.658,227.4,550.647,227.4,550.647,222.36,561.458,222.36],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3068 - Laboratorio Disegno 3.6",
    mapCoordinates: [733.642,164.88,650.949,164.88,650.949,222.36,661.83,222.36,661.83,227.4,722.828,227.4,722.828,222.36,733.642,222.36],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3067 - Laboratorio Disegno 3.5",
    mapCoordinates: [817.838,164.88,736.845,164.88,736.845,222.36,746.876,222.36,746.876,227.4,807.874,227.4,807.874,222.36,817.838,222.36],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3008 - Laboratorio LIB (I)",
    mapCoordinates: [693,606.72,680.76,606.72,680.76,600.6,666.72,600.6,666.72,602.76,619.08,602.76,619.08,606.72,608.76,606.72,608.76,679.621,669.56,679.621,669.56,638.28,693,638.28],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3007 - Laboratorio LIB (M)",
    mapCoordinates: [761.88,626.281,761.88,619.8,752.4,619.8,752.4,616.2,721.68,616.2,721.68,613.32,707.16,613.32,707.16,619.8,694.707,619.8,694.707,679.862,822.6,679.862,822.6,626.281],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "LAB ICM",
    mapCoordinates: [393.92773,500.45703,393.92773,525.28125,393.83984,525.28125,393.83984,539.1582,414.32227,539.1582,414.32227,539.13477,447.44922,539.13477,447.44922,539.12891,465.98828,539.12891,465.98828,535.78125,475.76953,535.78125,475.76953,517.52148,475.70508,517.52148,475.70508,500.45703,455.88086,500.45703,454.66992,500.45703,433.28906,500.45703,432.42578,500.45703,393.92773,500.45703],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  new Classroom({
    name: "3073 - Laboratorio LaMo",
    mapCoordinates: [284.88086,149.88086,284.88086,162.90039,291.83984,162.90039,291.83984,171.35938,307.61914,171.35938,307.61914,229.43945,321.35938,229.43945,321.35938,222.35938,336.59961,222.35938,336.59961,229.43945,349.43945,229.43945,369.7207,229.43945,369.7207,224.49805,389.2793,224.49805,389.2793,149.88086,369.7207,149.88086,362.64062,149.88086,350.75977,149.88086,349.43945,149.88086,284.88086,149.88086],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  //piano 2 aule
  new Classroom({
    name: "3064 - Aula 3.10",
    mapCoordinates: [337.502,256.56,337.502,254.28,318.663,254.28,318.663,256.56,308.462,256.56,308.462,331.626,347.943,331.626,347.943,256.56],
    roomType: "Classroom",
    floor: 2
  }).save(),
  new Classroom({
    name: "3069 - Aula 3.11",
    mapCoordinates: [379.8,256.56,379.8,254.28,360.96,254.28,360.96,256.56,350.76,256.56,350.76,331.626,390.24,331.626,390.24,256.56],
    roomType: "Classroom",
    floor: 2
  }).save(),
  new Classroom({
    name: "3063 - Aula 3.7",
    mapCoordinates: [646.891,164.88,564.203,164.88,564.203,222.36,575.083,222.36,575.083,227.4,636.077,227.4,636.077,222.36,646.891,222.36],
    roomType: "Classroom",
    floor: 2
  }).save(),
  //piano 1 lab rect
  //nothing here
  //piano 1 aule rect
  new Classroom({
    name: "2011 - Aula Magna 3.4 - piano terra",
    mapCoordinates: [763.92,501.24,861,501.24,861,622.921,763.92,622.921],
    roomType: "Classroom",
    floor: 1
  }).save(),
  new Classroom({
    name: "2020 - Aula 2.11",
    mapCoordinates: [412.44,498.719,456.6,498.719,456.6,539.4,412.44,539.4],
    roomType: "Classroom",
    floor: 1
  }).save(),
  //piano 2 lab rect
  new Classroom({
    name: "3065 - Laboratorio LaMoVidA",
    mapCoordinates: [266.579,269.04,305.641,269.04,305.641,331.62600000000003,266.579,331.62600000000003],
    roomType: "Laboratory",
    floor: 2
  }).save(),
  //piano 2 aule rect
  new Classroom({
    name: "3034 - Aula Magna 3.4 - primo piano",
    mapCoordinates: [764.16,520.687,861.24,520.687,861.24,619.5600000000001,764.16,619.5600000000001],
    roomType: "Classroom",
    floor: 2
  }).save()