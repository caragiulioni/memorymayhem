	
 	const cards = ["images/bomb.png", "images/bomb.png", "images/bulletbill.png", "images/bulletbill.png","images/fish.png", "images/fish.png","images/ghost.png", "images/ghost.png","images/goomba.png", "images/goomba.png", "images/penguin.png", "images/penguin.png","images/shyguy.png", "images/shyguy.png","images/squid.png", "images/squid.png", "images/star.png", "images/star.png", "images/yoshi.png", "images/yoshi.png"];

	//shuffle the cards
	//fisher-yates Shuffle
    	
	const shuffle = (cards)=>{
	  let m = cards.length, t, i;

	  // while there remain elements to shuffle
	  while (m) {

	    // pick a remaining element randomly
	    i = Math.floor(Math.random() * m--);

	    // and swap it with the current element.
	    t = cards[m];
	    cards[m] = cards[i];
	    cards[i] = t;
	  }
	  return cards;
	}


	//generate gameboard
	const generate=(cards)=>{
    cards.forEach(function(card, i) {
        $(".gameBoard") // on .gameboard
            .append($("<div>").addClass("box")// <div class="box"></div>
            .append($("<div>").addClass("gamePiece").append($("<img>").attr("src", cards[i]))));
	    }); //<div class="gamePiece"><img src="cards"></div>
	};




	//LETS PLAY!

	const gamePlay=()=>{

	    let gameCount = 0;  //gameplay count function
	    let firstDraw = "";
	    let secondDraw= "";
	    let cardFlip  = 0;
	    let firstPick = 0;
	    let secondPick = 0;
	    let confirmedMatch = 0;  //count for entire game 1-10
	    let totalMoves=0; //move counter return
	    const $box = $(".box");
	    const $button = $(".playAgain");
	    const $moveCounter = $(".moveCounter");
	    const $won = $(".won");
	    const $moves = $(".moves");

	////////////////////////////////////////////////////////


	   	$box.on("click", function() {  // when div with class of .box is clicked, 


			const piece = $(this).find(".gamePiece");

			 cardFlip++;
			 console.log(cardFlip);

			

			if (piece.hasClass('active')) {
				return;  //early return stops subsequent code from taking place to avoid additional functions continuing on first pick gamepiece
			}

			totalMoves++

	        piece.addClass("active"); //on THIS, find class of gamePiece and adds ACTIVE
	        gameCount++; 

	        $moveCounter.html(totalMoves);

	     if (gameCount == 3) {
	            gameCount = 1;
	       	$box.find(".gamePiece").removeClass("active");
	            $(this).find(".gamePiece").addClass("active"); 
           	$box.find(".gamePiece").removeClass("first");
	        $box.find(".gamePiece").removeClass("second"); 

	           
	        } 

        if (gameCount == 1) {
            firstDraw = $(this).find(".gamePiece").addClass("first");
            firstPick = $(".first img").attr("src");
            // if gameCount is === 1, add class of first (for first pick) and populate the text (or in my case, image)
        }

        if (gameCount == 2) {
            var secondDraw = $(this).find(".gamePiece").addClass("second");
            var secondPick = $(".second img").attr("src");

            // if gameCount is === 2, add class of second (for first pick) and populate the text (or in my case, image)
        }   

        if (firstPick == secondPick && cardFlip == 2 ) {


            if ($(this).find(".gamePiece").hasClass("active")) {
                firstDraw.css({
                    "display": "block",
                });
                secondDraw.css({
                    "display": "block",
                });
                confirmedMatch++;
               // if the picks match, find .gamePiece and add a class of active to display the picks as block elements and change the color of the background

                	// match also adds 1 to the total game confirmedMatch count 

	            if (confirmedMatch == 10) {
	                $won.addClass("activeWon");
	                $moves.css("visibility", "hidden");
	            }

                // if total game confirmedMatch = 8 , the element with class of .won (which is hidden) gets added class of ACTIVE WON, which unhides it and displays winner banner

	            } else {
	                firstDraw.css("display", "none");
	                secondDraw.css("display", "none");
	            }

        	}       //if total game confirmedMatch do not match, the elements are not displayed.

        		if (cardFlip == 2){
        			$box.css("pointerEvents", "none");
        				setTimeout( () => {
        					$(".active").removeClass("active");
        					$(".first").removeClass("first");
        					$(".second").removeClass("second");
        					$box.css("pointerEvents", "all");	
        				}, 800);
        				cardFlip = 0;

        		}

		    });
		};

$(function(run) {
	  shuffle(cards);
	  generate(cards);
	  gamePlay();
});




