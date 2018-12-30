(function() {
    var currentPlayer = 'player1';

    var victories = [

        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]

    ];

    console.log($(".slot"));

    $('.column').on('click', function(e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.find('.slot');
        var i;
        var message = $(".message");
        var column = $(".column");

        for (i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass('player1')
                &&
                !slotsInColumn.eq(i).hasClass('player2')
            ) {
                break;
            }
        }

        slotsInColumn.eq(i).addClass(currentPlayer);

        if (checkForVictory(slotsInColumn)) {
            message.css("visibility", "visible");
            message.css("animation", "bounce 0.5s");
            message.css( "animation-direction", "alternate");
            message.css("animation-iteration-count", "infinite");
            column.off("click");
            column.css("opacity", 0.1);
            column.css("transition", "linear 0.5s");
            message.on("click", function() {
                location.reload();
            });
        }

        if (checkForVictory($('.row' + i))) {
            message.css("visibility", "visible");
            message.css("animation", "bounce 0.5s");
            message.css( "animation-direction", "alternate");
            message.css("animation-iteration-count", "infinite");
            column.off("click");
            column.css("opacity", 0.1);
            column.css("transition", "linear 0.5s");
            message.on("click", function() {
                location.reload();
            });
        }
        // CHECK DIAGONAL VICTORY:
        (function checkForDiagonal() {
            var str2 = "";
            for (var i = 0; i < victories.length; i++) {
                for (var j = 0; j < victories[i].length; j++) {
                    if ($(".slot").eq(victories[i][j]).hasClass(currentPlayer)) {
                        str2 += "v";
                    } else {
                        str2 += "x";
                    }
                    if (str2.indexOf('vvvv') > -1) {
                        message.css("visibility", "visible");
                        message.css("animation", "bounce 0.5s");
                        message.css( "animation-direction", "alternate");
                        message.css("animation-iteration-count", "infinite");
                        column.off("click");
                        column.css("opacity", 0.1);
                        column.css("transition", "linear 0.5s");
                        message.on("click", function() {
                            location.reload();
                        });
                        return true;
                    }
                }
            }
        })();

        switchPlayers();

    });

    function switchPlayers() {
        if (currentPlayer == 'player1') {
            currentPlayer = 'player2';
        } else {
            currentPlayer = 'player1';
        }
    }

    function checkForVictory(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "v";
            } else {
                str += "x";
            }
            if (str.indexOf('vvvv') > -1) {
                return true;
            }
        }
    }

})();
