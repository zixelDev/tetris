var fieldTetris,
    CurrentFigure,
    ArrCells = [],
    Score = document.querySelector(".main_result"),
    mainblock = document.querySelector(".main_mobile"),
    leftside = document.querySelector(".main_mobile_ls"),
    rightside = document.querySelector(".main_mobile_rs"),
    buttons = document.getElementsByTagName('button'),
    CountScore = 0;
const figure1 = [
        [0, 4],
        [1, 3],
        [1, 4],
        [1, 5],
    ],
    figure2 = [
        [0, 4],
        [0, 5],
        [1, 4],
        [1, 5],
    ],
    figure3 = [
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6]
    ],
    figure4 = [
        [0, 4],
        [1, 4],
        [1, 5],
        [1, 6]
    ],
    figure5 = [
        [0, 6],
        [1, 6],
        [1, 5],
        [1, 4]
    ],
    figure6 = [
        [0, 5],
        [0, 6],
        [1, 5],
        [1, 4]
    ],
    figure7 = [
        [0, 4],
        [0, 5],
        [1, 5],
        [1, 6]
    ];


window.addEventListener("DOMContentLoaded", function () {
    fieldTetris = document.createElement("table");
    for (let y = 0; y < 20; y++) {
        let newRow = fieldTetris.insertRow(y);
        for (let x = 0; x < 10; x++) {
            let newcell = newRow.insertCell(x);

            newcell.style.height = "29px";
            newcell.style.width = "29px";
            newcell.style.backgroundColor = "black";
            // newcell.classList.add('cell');
            if (document.body.clientWidth < 576) {
                newcell.style.height = "23px";
                newcell.style.width = "23px";
            }
        }
    }
    if (document.body.clientWidth < 576) {
        leftside.style.display = "flex";
        rightside.style.display = "flex";
        Score.style.margin = "0 0 10px 65px";
    }
    mainblock.appendChild(fieldTetris);
    let cells = document.getElementsByTagName('td');
    ArrCells = Array.from(cells);
    Start();




});

addEventListener('keydown', function (event) {

    if (CheckCollision(CurrentFigure)) {
        return;
    }
    if (event.keyCode == 37) {
        // this.alert("нажата левая кнопка");
        Pushleft();
    } else if (event.keyCode == 39) {
        // this.alert('нажата правая кнопка');
        PushRight();
    } else if (event.keyCode == 40) {
        // this.alert('нажата кнопка вниз');
        PushDown();
    } else if (event.keyCode == 38) {
        Rollingfigure();
    }
});

addEventListener('click', function (event) {
    if (CheckCollision(CurrentFigure)) {
        return;
    }
    if (event.target == buttons[0].firstChild ) {
        Pushleft();   
    } else if (event.target == buttons[1].firstChild) {
        Rollingfigure();    
    } else if (event.target == buttons[2].firstChild) {
        PushRight();    
    } else if (event.target == buttons[3].firstChild) {
        PushDown();    
    }
    this.blur();
});

function Pushleft() {
    CurrentFigure.sort(function (a, b) {
        return a[1] - b[1];
    });
    for (let i = 0; i < CurrentFigure.length; i++) {
        if (CurrentFigure[i][1] == 0) {
            return;
        } else {
            if (Array.isArray(CurrentFigure[i])) {
                ArrCells[GetValueCell(CurrentFigure[i])].style.backgroundColor = "black";
            }
        }
    }

    CurrentFigure.forEach(function (i) {
        i[1]--;
        if (Array.isArray(i)) {
            ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
        }
    });
}

function PushRight() {
    CurrentFigure.sort(function (a, b) {
        return b[1] - a[1];
    });
    for (let i = 0; i < CurrentFigure.length; i++) {
        if (CurrentFigure[i][1] == 9) {
            return;
        } else {
            if (Array.isArray(CurrentFigure[i])) {
                ArrCells[GetValueCell(CurrentFigure[i])].style.backgroundColor = "black";
            }
        }
    }

    CurrentFigure.forEach(function (i) {
        i[1]++;
        if (Array.isArray(i)) {
            ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
        }
    });
}

function PushDown() {
    CurrentFigure.sort(function (a, b) {
        return b[0] - a[0];
    });
    for (let i = 0; i < CurrentFigure.length; i++) {
        if (CurrentFigure[i][0] == 19) {
            Start();
            return;
        } else {
            if (Array.isArray(CurrentFigure[i])) {
                ArrCells[GetValueCell(CurrentFigure[i])].style.backgroundColor = "black";
            }
        }
    }
    CurrentFigure.forEach(function (i) {
        i[0]++;
        if (Array.isArray(i)) {
            ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
        }
    });
}


function LaunchFigure() {
    var id = setTimeout(function go() {
        let PathClosed = CheckCollision(CurrentFigure);
        for (let i = 0; i < CurrentFigure.length; i++) {
            // if (figure[i][0] == 19 || PathClosed) {
            if (!Array.isArray(CurrentFigure[i])) {
                continue;
            }
            if (PathClosed) {
                clearTimeout(id);
                PathClosed = undefined;
                Start();
                return;
            } else {
                ArrCells[GetValueCell(CurrentFigure[i])].style.backgroundColor = "black";
            }
        }

        CurrentFigure.forEach(function (i) {
            i[0]++;
            if (Array.isArray(i)) {
                ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
            }

        });
        setTimeout(go, 1000);
    });
}

function GetValueCell(i) {
    let ValueCell,
        stringValue = i.join();
    stringValue = stringValue.replace(",", "");
    ValueCell = Number(stringValue);
    return ValueCell;
}

function Start() {


    let NumberFig = getRandomInt(1, 8);
    if (NumberFig == 1) {
        CurrentFigure = JSON.parse(JSON.stringify(figure1));
        CurrentFigure.push({
            figure: 1,
            position: 1
        });
    } else if (NumberFig == 2) {
        CurrentFigure = JSON.parse(JSON.stringify(figure2));
        CurrentFigure.push({
            figure: 2,
            position: 1
        });
    } else if (NumberFig == 3) {
        CurrentFigure = JSON.parse(JSON.stringify(figure3));
        CurrentFigure.push({
            figure: 3,
            position: 1
        });
    } else if (NumberFig == 4) {
        CurrentFigure = JSON.parse(JSON.stringify(figure4));
        CurrentFigure.push({
            figure: 4,
            position: 1
        });
    } else if (NumberFig == 5) {
        CurrentFigure = JSON.parse(JSON.stringify(figure5));
        CurrentFigure.push({
            figure: 5,
            position: 1
        });
    } else if (NumberFig == 6) {
        CurrentFigure = JSON.parse(JSON.stringify(figure6));
        CurrentFigure.push({
            figure: 6,
            position: 1
        });
    } else if (NumberFig == 7) {
        CurrentFigure = JSON.parse(JSON.stringify(figure7));
        CurrentFigure.push({
            figure: 7,
            position: 1
        });
    }




    while (CheckInStart() == false) {
        continue;
    }

    CurrentFigure.sort(function (a, b) {
        return b[0] - a[0];
    });
    CurrentFigure.forEach(function (i) {

        if (Array.isArray(i)) {
            ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
        }

    });


    setTimeout(function () {
        LaunchFigure();
    }, 1000);



}

function CheckInStart() {
    let count = 0,
        prevElem = true;

    for (let index = 0; index < 200; index++) {
        if (index % 10 == 0) {
            prevElem = false;
            count = 0;
        }
        if (ArrCells[index].style.backgroundColor == "blue") {
            if (index <= 9) {
                let result = confirm("Game over, do you want start again?)");
                if (result) {
                    window.location.reload();
                } else {
                    throw 'stop';
                }
            }
            ArrCells[index].ValueCell = "full";
            if (count == 0 || prevElem == true) {
                count++;
                prevElem = true;
            }

            if (count == 10) {
                // alert('Данный ряд содержащий индекс' + index + 'заполнен');
                DestroyRow(index);
                return false;
            }
        } else {
            ArrCells[index].ValueCell = "";
            prevElem = false;
            count = 0;
        }

    }
    return true;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function CheckCollision(figure) {
    for (let i = 0; i < figure.length; i++) {
        if (!Array.isArray(figure[i])) {
            continue;
        }
        let y = figure[i][0] + 1,
            x = figure[i][1];
        if (y > 19) {
            return true;
        } else if (x < 0 || x > 9) {
            return true;
        } else if (ArrCells[GetValueCell([y, figure[i][1]])].ValueCell == "full") {
            return true;
        }
    }
    return false;

    // figure.forEach(function (i) {
    //     let x = i[0] + 1;
    //     if (x > 19) {
    //         return true;
    //     } else if (ArrCells[GetValueCell([x,i[1]])].ValueCell == "full") {
    //         return true;
    //     }
    // });
    // return false;
}

function DestroyRow(id) {
    for (let i = 0; i < 10; i++) {
        ArrCells[id].style.backgroundColor = "black";
        id--;

    }
    CountScore += 100;
    Score.innerHTML = "Score: " + CountScore;
    SlideTetris(id);

}

function SlideTetris(restriction) {
    let arrInx = [];
    for (let index = 0; index <= restriction; index++) {
        if (ArrCells[index].style.backgroundColor == "blue") {
            arrInx.push(index);
            ArrCells[index].style.backgroundColor = "black";
        }
    }
    arrInx.forEach(function (element) {
        element += 10;
        ArrCells[element].style.backgroundColor = "blue";
    });

}

function Rollingfigure() {
    // throw 'blablabla';

    CurrentFigure.sort(sortFunction);

    CurrentFigure.forEach(function (i) {

        if (!Array.isArray(i)) {
            if (i.figure == 1) {
                if (i.position == 1) {
                    //    alert('крутим');
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[1] = CurrentFigure[0].slice();
                    CurrentFigure[0] = CurrentFigure[3].slice();
                    CurrentFigure[3] = [CurrentFigure[2][0] + 1, CurrentFigure[2][1]];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = CurrentFigure[2].slice();
                    CurrentFigure[2] = CurrentFigure[3].slice();
                    CurrentFigure[3] = [CurrentFigure[1][0], CurrentFigure[1][1] - 1];
                    i.position = 3;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 3) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = CurrentFigure[3].slice();
                    CurrentFigure[3] = CurrentFigure[0].slice();
                    CurrentFigure[0] = [CurrentFigure[1][0] - 1, CurrentFigure[1][1]];
                    i.position = 4;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 4) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[3] = CurrentFigure[1].slice();
                    CurrentFigure[1] = CurrentFigure[0].slice();
                    CurrentFigure[0] = [CurrentFigure[2][0], CurrentFigure[2][1] + 1];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            } else if (i.figure == 3) {
                if (i.position == 1) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    CurrentFigure[2] = [CurrentFigure[1][0] + 2, CurrentFigure[1][1]];
                    CurrentFigure[3] = [CurrentFigure[1][0] + 3, CurrentFigure[1][1]];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = [CurrentFigure[1][0], CurrentFigure[1][1] - 1];
                    CurrentFigure[2] = [CurrentFigure[1][0], CurrentFigure[1][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[1][0], CurrentFigure[1][1] + 2];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            } else if (i.figure == 4) {
                if (i.position == 1) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[0][0], CurrentFigure[0][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[1][0], CurrentFigure[1][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[2][0] + 1, CurrentFigure[2][1]];
                    i.position = 3;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 3) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    CurrentFigure[2] = [CurrentFigure[0][0] + 1, CurrentFigure[0][1]];
                    CurrentFigure[3] = [CurrentFigure[2][0], CurrentFigure[2][1] - 1];
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    i.position = 4;
                    PaintFigure(CurrentFigure);
                } else if (i.position == 4) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[0][0], CurrentFigure[0][1] - 1];
                    CurrentFigure[0] = [CurrentFigure[1][0], CurrentFigure[1][1] - 1];
                    CurrentFigure[3] = [CurrentFigure[1][0], CurrentFigure[1][1] + 1];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            } else if (i.figure == 5) {
                if (i.position == 1) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = [CurrentFigure[2][0] - 1, CurrentFigure[2][1]];
                    CurrentFigure[1] = [CurrentFigure[2][0] + 1, CurrentFigure[2][1]];
                    CurrentFigure[3] = [CurrentFigure[1][0], CurrentFigure[1][1] + 1];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[1] = [CurrentFigure[0][0], CurrentFigure[0][1] - 1];
                    CurrentFigure[2] = [CurrentFigure[0][0], CurrentFigure[0][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    i.position = 3;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 3) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    CurrentFigure[3] = [CurrentFigure[2][0] + 1, CurrentFigure[2][1]];
                    i.position = 4;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 4) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[1][0], CurrentFigure[1][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[2][0] - 1, CurrentFigure[2][1]];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            } else if (i.figure == 6) {
                if (i.position == 1) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[1] = [CurrentFigure[3][0], CurrentFigure[3][1] + 1];
                    CurrentFigure[2] = [CurrentFigure[1][0] + 1, CurrentFigure[1][1]];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[2] = [CurrentFigure[0][0], CurrentFigure[0][1] + 1];
                    CurrentFigure[3] = [CurrentFigure[1][0], CurrentFigure[1][1] - 1];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            } else if (i.figure == 7) {
                if (i.position == 1) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[0] = [CurrentFigure[2][0], CurrentFigure[2][1] - 1];
                    CurrentFigure[3] = [CurrentFigure[0][0] + 1, CurrentFigure[0][1]];
                    i.position = 2;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                } else if (i.position == 2) {
                    let clone = JSON.parse(JSON.stringify(CurrentFigure));
                    CurrentFigure[1] = [CurrentFigure[0][0], CurrentFigure[0][1] - 1];
                    CurrentFigure[3] = [CurrentFigure[2][0], CurrentFigure[2][1] + 1];
                    i.position = 1;
                    if (CheckCollision(CurrentFigure)) {
                        CurrentFigure = JSON.parse(JSON.stringify(clone));
                    }
                    PaintFigure(CurrentFigure);
                }
            }
        } else {
            ArrCells[GetValueCell(i)].style.backgroundColor = "black";
            // ArrCells[GetValueCell(i)].ValueCell = "";
        }
    });
}

function PaintFigure(figure) {
    figure.forEach(function (i) {

        if (Array.isArray(i)) {
            ArrCells[GetValueCell(i)].style.backgroundColor = "blue";
        } else {
            for (var key in i) {
                if (key == "position" || key == "figure") {
                    continue;
                } else {
                    delete i[key];
                }

            }
        }
    });
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        if (a[1] < b[1]) {
            return -1;
        } else {
            return 0;
        }

    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}