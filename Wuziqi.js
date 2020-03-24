/* 控件事件 */
function closeFunction() {
    if (confirm("是否退出游戏")) {
        window.close();
    } else {
        history.back();
    }
}

/* 用一个立即执行函数来切换棋手*/
var cnt = (function() {
    var flag = 'black';

    return function() {
        var tmp = flag;
        flag = flag === 'black' ? 'white' : 'black';
        return tmp;
    }
})();

var tds = document.querySelectorAll('td');
var isWin = false; // 有没有分出胜负

// 进行下棋后的判定
var play = function() {
    if (isWin) {
        alert('本局游戏已结束!请重新开局');
        return;
    }
    if (this.style.background.indexOf('.png') !== -1) {
        return;
    }
    var color = cnt(); //开始调用棋子
    this.style.background = 'url(' + color + '.png)';
    judge.call(this, color); // 下完棋后判断胜负
}

// 判断胜负的函数
var judge = function(color) {
    var curr = { //获取当前点击位置的横纵坐标以及颜色属性
        x: this.cellIndex,
        y: this.parentElement.rowIndex,
        color: color
    };
    // console.log(curr.x, curr.y);
    var line = ['', '', '', '']; //分别放置横，竖，左上右下，左下右上
    // 循环225单元格
    for (var i = 0; i < 225; i++) {
        // 取当前循环到的这颗棋的坐标
        tmp = {
            x: tds[i].cellIndex,
            y: tds[i].parentElement.rowIndex,
            color: '0'
        };

        // 取当前循环到的这颗棋的颜色，分别b,w 0（空）来表示
        if (tds[i].style.background.indexOf('black') != -1) {
            tmp.color = 'b';
        } else if (tds[i].style.background.indexOf('white') != -1) {
            tmp.color = 'w';
        }

        if (curr.y === tmp.y) {
            // 在一个横线上
            line[0] += tmp.color;
        }
        if (curr.x === tmp.x) {
            // 在一个竖线上
            line[1] += tmp.color;
        }
        if ((curr.x + curr.y) === (tmp.x + tmp.y)) {
            //在左下斜线上
            line[2] += tmp.color;
        }
        if ((curr.x - tmp.x) === (curr.y - tmp.y)) {
            //在左上斜线上
            line[3] += tmp.color;
        }
    }
    for (var i = 0; i < 4; i++) {
        if (line[i].indexOf('bbbbb') != -1) {
            alert('黑方胜出，请点击开始下一局游戏');
            isWin = true;
            break;
        }
        if (line[i].indexOf('wwwww') != -1) {
            alert('白方胜出，请点击开始下一局游戏');
            isWin = true;
            break;
        }
    }
}

window.onload = function() {
    document.getElementsByTagName('table')[0].onclick = function(ev) {
        play.call(ev.srcElement);
    };
}
