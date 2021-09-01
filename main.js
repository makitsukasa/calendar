// 年、月から日を表示する
render = function(year, month) {
	clearDay();

	rendarYear(year);
	rendarMonth(month);

	var numberOfDays = getNumberOfDays(year, month);
	var dayOfWeekOfFirstDay = getDayOfWeek(year, month, 1);

	for (var i = 0; i < numberOfDays; i++) {
		rendarDay(i + dayOfWeekOfFirstDay, i + 1);
	}
}

// 年、月が書き変わったときに再表示する
rerender = function() {
	var year = parseInt(document.getElementById("year").value);
	var month = parseInt(document.getElementById("month").value);

	// 1月のときに月を1減らすボタンを押したら前の年の12月を表示する
	if (month <= 0) {
		if (year <= 0) {
			year = 0;
			month = 1;
		} else {
			year -= 1;
			month = 12;
		}
	} else if (month >= 13) {
		if (year >= 9999) {
			year = 9999;
			month = 12;
		} else {
			year += 1;
			month = 1;
		}
	}

	// 年、月から日を表示
	render(year, month);
}

// 各日付の中身を消す
clearDay = function() {
	// すべての日付についてループ
	Array.from(document.getElementsByClassName("day")).map(day => {
		// 各日付の箱に子要素は1つしか存在しないはずだが一応全部消せるようにwhile
		while (day.lastChild) {
			day.removeChild(day.lastChild);
		}
	});
}

// 年を表示 ページを読み込んだ時
rendarYear = function(year) {
	var input = document.getElementById("year");
	input.value = year;
}

// 月を表示 ページを読み込んだ時
rendarMonth = function(month) {
	var input = document.getElementById("month");
	input.value = month;
}

// カレンダーのとある位置にとある数字を表示
// @param index 表示する位置 0から41
// @param day 表示される数字 1から31
rendarDay = function(index, day) {
	var parent = document.getElementById("day" + index);
	var element = document.createElement("div");
	element.innerHTML = day;
	parent.appendChild(element);
}

// 年、月、日からその日が何曜日か得る
// ツェラーの公式 日曜日が0バージョン
getDayOfWeek = function(year, month, date) {
	if (month <= 2) {
		month = month + 12;
		year -= 1;
	}
	var J = year.toString();
	J = J.substring(0, 2);
	var K = year % 100;
	var m = month;
	var q = date

	var h = (q + Math.floor(((m + 1) * 26) / 10) + K + Math.floor(K / 4) + Math.floor(J / 4) - (2 * J)) % 7;
	return (h + 6) % 7; // 日曜日が0
}

// 年、月からその月が何日まであるかを得る
getNumberOfDays = function(year, month){
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	if (isLeapYear) {
		days[1] = 29;
	}

	return days[month - 1];
};

window.onload = function(){
	document.getElementById("year").onchange = rerender;
	document.getElementById("month").onchange = rerender;

	// Dateはずるいので今日が何年何月かを取得するだけ
	today = new Date();
	render(today.getFullYear(), today.getMonth() + 1);
}
