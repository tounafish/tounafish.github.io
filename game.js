// Parachute game - jquery code.
// Paul Kendall - 2014.12.25 -rev 0.1.
// paul.kendall@bst.biz
// 
// Parachute game - based on 80's Nintendo Game & Watch version.
//
// Open Source project - GitHub link:
// https://github.com/pkend/apps-public/tree/master/HTML5-apps/games/parachute
//

// PKend - 2015.01.18 - these variables could possibly be consolidated into a single struct
//var g_theGameEngine.CurrentScore = 0;
//var GameStatus = 'NotPlaying';
//var screenStyle = 'Retro';
//var CurrentPosition = 3;
//var parachuteCurrentDropPosition = 0;
//var SoundOn = true;
//var NumberOfLives = 3;
//var TimeoutMsDefaultParachuteDrop = 1000; //1000;
//var TimeoutMsCurrentParachuteDrop = 1000; // ms
//var TimeoutMsDropChecker = 1000;
//var TimeoutMsCaughtParachute = 50;
//var NumberOfParachutesToDrop = 2;

// parachute current drop row positions - parachutes 1-5
// rows 0-7 are part of the drop trajectory - 
// row 6 is caught, row 7 is missed, row 8 is drop complete.
//var ParachuteDropLastRow = 8; // row 8 is the last position

// placeholders for each parachute's current drop row position
//var g_parachute1CurrentDropPosition = ParachuteDropLastRow;
//var g_parachute2CurrentDropPosition = ParachuteDropLastRow;
//var g_parachute3CurrentDropPosition = ParachuteDropLastRow;
//var g_parachute4CurrentDropPosition = ParachuteDropLastRow;
//var g_parachute5CurrentDropPosition = ParachuteDropLastRow;

// timers for the drop interval check as well as each parachute timeout
//var g_TimeoutDropCheck;
//var g_TimeoutParachute1;
//var g_TimeoutParachute2;
//var g_TimeoutParachute3;
//var g_TimeoutParachute4;
//var g_TimeoutParachute5;


// structure to contain the game engine member variables
var g_theGameEngine = {
    // game difficulty setting member
    EasyFactor: 1.4,
    gameDifficultySetting: 'Easy',

    CurrentScore: 0,
    GameStatus: 'NotPlaying',
    screenStyle: 'Retro',
    CurrentPosition: 1,
    parachuteCurrentDropPosition: 0,
    SoundOn: true,
    NumberOfLives: 3,
    TimeoutMsDefaultParachuteDrop: 1000, //1000;
    TimeoutMsCurrentParachuteDrop: 1000, // ms
    TimeoutMsDropChecker: 1000,
    TimeoutMsCaughtParachute: 50,
    NumberOfParachutesToDrop: 2,

    // drop position members:
    ParachuteDropLastRow: 8, // row 8 is the last position

    // parachute current drop row positions - parachutes 1-5
    // rows 0-7 are part of the drop trajectory - 
    // row 6 is caught, row 7 is missed, row 8 is drop complete.
    //var ParachuteDropLastRow = 8; // row 8 is the last position

    // placeholders for each parachute's current drop row position
    parachute1CurrentDropPosition: this.ParachuteDropLastRow,
    parachute2CurrentDropPosition: this.ParachuteDropLastRow,
    parachute3CurrentDropPosition: this.ParachuteDropLastRow,
    parachute4CurrentDropPosition: this.ParachuteDropLastRow,
    parachute5CurrentDropPosition: this.ParachuteDropLastRow,

    // timers for the drop interval check as well as each parachute timeout
    TimeoutDropCheck: null,
    TimeoutParachute1: null,
    TimeoutParachute2: null,
    TimeoutParachute3: null,
    TimeoutParachute4: null,
    TimeoutParachute5: null
};


window.oncontextmenu = function ()
{
    // don't allow right mouse click while the game is underway
    if ( g_theGameEngine.GameStatus === 'Playing' )
    {
        return false;
    }

    return true;
}

$(document).ready( function() 
{
	// splash screen loading - wait for image/audio files to be downloaded before allowing
    // game to start.
     //showing startup image. By default it will be display:none via css.
    //$('#openModal').show();

    var soundBeep = new Howl({
        urls: ['./sound/beep-07-good.mp3'],
        autoplay: false,
        loop: false,
        volume: 1.0,

        onload: function() {
            console.log('Load beep audio finished!');
        }
    });

    var soundError = new Howl({
        urls: ['./sound/beep-05-error.mp3'],
        autoplay: false,
        loop: false,
        volume: 1.0,

        onload: function() {
            console.log('Load error audio finished!');
        }
    });

    //load img
    var imgArray = ['./images/heli-rescue1.png',
                    './images/redcross.png',
                    './images/parachute.png',
                    './images/parachute_red.png',
                    './images/retro/rowboat_retro2.png',
                    './images/retro/boat-pos1.png',
                    './images/island21.png',
                    './images/island_left.png',
                    './images/sea2.jpg',
                    './images/speaker-mute.png',
                    './images/speaker.png',
                    './images/retro/parachute-screen-shell1.jpg',
                    './images/heli33.png',
                    './images/facebook-icon.jpg',
                    './images/twitter-icon.jpg'];

    var total = imgArray.length;
    var imgLoaded = 0;
    for (var i in imgArray) {
        $("<img />").load(function() {
            imgLoaded++;
            if (imgLoaded == total) {
                //when all images loaded we hide start up image.
                //$('#openModal').hide();
            }
        }).error(function() {
            imgLoaded++;
            if (imgLoaded == total) {
                //when all images loaded even error in img loading, we hide startup image.
                //$('#openModal').hide();
            }   
        }).attr("src", imgArray[i]);
    }

    // 5 timers, 1 for each parachute
	function setParachute1Timeout( timeOutMs )
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            //console.log('setParachute1Timeout to ' + timeOutMs + 'ms' );
            g_theGameEngine.TimeoutParachute1 = setTimeout( processParachute1Timeout,
             						          timeOutMs );
        }
    }

    function setParachute2Timeout( timeOutMs )
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            //console.log('setParachute2Timeout to ' + timeOutMs + 'ms' );
            g_theGameEngine.TimeoutParachute2 = setTimeout( processParachute2Timeout,
             						          timeOutMs );
        }
    }

    function setParachute3Timeout( timeOutMs )
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
        	//console.log('setParachute3Timeout to ' + timeOutMs + 'ms' );
            g_theGameEngine.TimeoutParachute3 = setTimeout( processParachute3Timeout,
             						          timeOutMs );
        }
    }

    function setParachute4Timeout( timeOutMs )
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
        	//console.log('setParachute4Timeout to ' + timeOutMs + 'ms' );
            g_theGameEngine.TimeoutParachute4 = setTimeout( processParachute4Timeout,
             						          timeOutMs );
        }
    }

    function setParachute5Timeout( timeOutMs )
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
        	//console.log('setParachute5Timeout to ' + timeOutMs + 'ms' );
            g_theGameEngine.TimeoutParachute5 = setTimeout( processParachute5Timeout,
             						          timeOutMs );
        }
    }

    // process timeouts for each parachute once triggered
    function processParachute1Timeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            var parachuteNr = 1;

            // if already caught, clear it from the screen
            if ( $( "#parachute1" ).hasClass( "parachute1_caught" ) === false )
            {
            	// update parachute 1 location on the screen
                g_theGameEngine.parachute1CurrentDropPosition = updateParachutePositionsOntoScreen( parachuteNr, g_theGameEngine.parachute1CurrentDropPosition );

            	// check if caught or if lost
                if ( $( "#parachute1" ).hasClass( "parachute1_caught" ) === true )
                {
                    //console.log( "parachute1 caught" );
                    setParachute1Timeout( g_theGameEngine.TimeoutMsCaughtParachute );
                }
            	// reset timer until drop finished
                else if ( g_theGameEngine.parachute1CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
                {
                    //console.log( "parachute1 still dropping" );
                    setParachute1Timeout( g_theGameEngine.TimeoutMsCurrentParachuteDrop );
                }
                else
                {
                    //console.log( "Parachute 1 drop has finished." );
                    // clear parachute caught class if set
                    clearClassesParachute( parachuteNr );
                    $( "#parachute1").addClass( "parachute1_pos0" );
                    $('#parachute1').attr( "style", "none" );
                }
            }
            else
            {
                // clear parachute from screen - already caught
                //console.log( "Parachute 1 drop finished - remove caught element from screen." );
                // clear parachute caught class if set
                clearClassesParachute( parachuteNr );
                $( "#parachute1").addClass( "parachute1_pos0" );
                $('#parachute1').attr( "style", "none" );
            }
        }
    }

    function processParachute2Timeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            var parachuteNr = 2;

            // if already caught, clear it from the screen
            if ( $( "#parachute2" ).hasClass( "parachute2_caught" ) === false )
            {
                // update parachute 2 location on the screen
                g_theGameEngine.parachute2CurrentDropPosition = updateParachutePositionsOntoScreen( parachuteNr, g_theGameEngine.parachute2CurrentDropPosition );

                // check if caught or if lost
                if ( $( "#parachute2" ).hasClass( "parachute2_caught" ) === true )
                {
                    //console.log( "parachute2 caught" );
                    setParachute2Timeout( g_theGameEngine.TimeoutMsCaughtParachute );
                }
                // reset timer until drop finished
                else if ( g_theGameEngine.parachute2CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
                {
                    //console.log( "parachute2 still dropping" );
                    setParachute2Timeout( g_theGameEngine.TimeoutMsCurrentParachuteDrop );
                }
                else
                {
                    //console.log( "Parachute 2 drop has finished." );
                    // clear parachute caught class if set
                    clearClassesParachute( parachuteNr );
                    $( "#parachute2").addClass( "parachute2_pos0" );
                    $('#parachute2').attr( "style", "none" );
                }
            }
            else
            {
                // clear parachute from screen - already caught
                //console.log( "Parachute 2 drop finished - remove caught element from screen." );
                // clear parachute caught class if set
                clearClassesParachute( parachuteNr );
                $( "#parachute2").addClass( "parachute2_pos0" );
                $('#parachute2').attr( "style", "none" );
            }
        }
    }

    function processParachute3Timeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            var parachuteNr = 3;

            // if already caught, clear it from the screen
            if ( $( "#parachute3" ).hasClass( "parachute3_caught" ) === false )
            {
                // update parachute 3 location on the screen
                g_theGameEngine.parachute3CurrentDropPosition = updateParachutePositionsOntoScreen( parachuteNr, g_theGameEngine.parachute3CurrentDropPosition );

                // check if caught or if lost
                if ( $( "#parachute3" ).hasClass( "parachute3_caught" ) === true )
                {
                    //console.log( "parachute3 caught" );
                    setParachute3Timeout( g_theGameEngine.TimeoutMsCaughtParachute );
                }
                // reset timer until drop finished
                else if ( g_theGameEngine.parachute3CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
                {
                    //console.log( "parachute3 still dropping" );
                    setParachute3Timeout( g_theGameEngine.TimeoutMsCurrentParachuteDrop  );
                }
                else
                {
                    //console.log( "Parachute 3 drop has finished." );
                    // clear parachute caught class if set
                    clearClassesParachute( parachuteNr );
                    $( "#parachute3").addClass( "parachute3_pos0" );
                    $('#parachute3').attr( "style", "none" );
                }
            }
            else
            {
                // clear parachute from screen - already caught
                //console.log( "Parachute 3 drop finished - remove caught element from screen." );
                // clear parachute caught class if set
                clearClassesParachute( parachuteNr );
                $( "#parachute3").addClass( "parachute3_pos0" );
                $('#parachute3').attr( "style", "none" );
            }
        }
    }

    function processParachute4Timeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            var parachuteNr = 4;

            // if already caught, clear it from the screen
            if ( $( "#parachute4" ).hasClass( "parachute4_caught" ) === false )
            {
                // update parachute 4 location on the screen
                g_theGameEngine.parachute4CurrentDropPosition = updateParachutePositionsOntoScreen( parachuteNr, g_theGameEngine.parachute4CurrentDropPosition );

                // check if caught or if lost
                if ( $( "#parachute4" ).hasClass( "parachute4_caught" ) === true )
                {
                    //console.log( "parachute4 caught" );
                    setParachute4Timeout( g_theGameEngine.TimeoutMsCaughtParachute );
                }
                // reset timer until drop finished
                else if ( g_theGameEngine.parachute4CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
                {
                    //console.log( "parachute4 still dropping" );
                    setParachute4Timeout( g_theGameEngine.TimeoutMsCurrentParachuteDrop );
                }
                else
                {
                    //console.log( "Parachute 4 drop has finished." );
                    // clear parachute caught class if set
                    clearClassesParachute( parachuteNr );
                    $( "#parachute4").addClass( "parachute4_pos0" );
                    $('#parachute4').attr( "style", "none" );
                }
            }
            else
            {
                // clear parachute from screen - already caught
                //console.log( "Parachute 4 drop finished - remove caught element from screen." );
                // clear parachute caught class if set
                clearClassesParachute( parachuteNr );
                $( "#parachute4").addClass( "parachute4_pos0" );
                $('#parachute4').attr( "style", "none" );
            }
        }
    }

    function processParachute5Timeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            var parachuteNr = 5;

            // if already caught, clear it from the screen
            if ( $( "#parachute5" ).hasClass( "parachute5_caught" ) === false )
            {
                // update parachute 5 location on the screen
                g_theGameEngine.parachute5CurrentDropPosition = updateParachutePositionsOntoScreen( parachuteNr, g_theGameEngine.parachute5CurrentDropPosition );

                // check if caught or if lost
                if ( $( "#parachute5" ).hasClass( "parachute5_caught" ) === true )
                {
                    //console.log( "parachute5 caught" );
                    setParachute5Timeout( g_theGameEngine.TimeoutMsCaughtParachute );
                }
                // reset timer until drop finished
                else if ( g_theGameEngine.parachute5CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
                {
                    //console.log( "parachute5 still dropping" );
                    setParachute5Timeout( g_theGameEngine.TimeoutMsCurrentParachuteDrop );
                }
                else
                {
                    //console.log( "Parachute 5 drop has finished." );
                    // clear parachute caught class if set
                    clearClassesParachute( parachuteNr );
                    $( "#parachute5").addClass( "parachute5_pos0" );
                    $('#parachute5').attr( "style", "none" );
                }
            }
            else
            {
                // clear parachute from screen - already caught
                //console.log( "Parachute 5 drop finished - remove caught element from screen." );
                // clear parachute caught class if set
                clearClassesParachute( parachuteNr );
                $( "#parachute5").addClass( "parachute5_pos0" );
                $('#parachute5').attr( "style", "none" );
            }
        }
    }

    function setParachuteDroptimeout()
    {
        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            console.log('setParachuteDroptimeout..' );
            // reset the timer to keep it cyclic
            g_theGameEngine.TimeoutDropCheck = setTimeout( parachute_timeout,
             						         g_theGameEngine.TimeoutMsDropChecker );
        }
    }
    
    function calculateParachuteDropSpeed()
    {
    	// based on current score
    	if ( g_theGameEngine.CurrentScore < 4 )
    	{
    		g_theGameEngine.TimeoutMsCurrentParachuteDrop = 1000;
    	}
    	else if (( g_theGameEngine.CurrentScore >= 4 ) && ( g_theGameEngine.CurrentScore < 10 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 900;
		}
		else if (( g_theGameEngine.CurrentScore >= 10 ) && ( g_theGameEngine.CurrentScore < 20 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 800;
		}
		else if (( g_theGameEngine.CurrentScore >= 20 ) && ( g_theGameEngine.CurrentScore < 30 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 700;
		}
		else if (( g_theGameEngine.CurrentScore >= 30 ) && ( g_theGameEngine.CurrentScore < 50 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 600;
		}
		else if (( g_theGameEngine.CurrentScore >= 50 ) && ( g_theGameEngine.CurrentScore < 80 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 500;
		}
        else if (( g_theGameEngine.CurrentScore >= 80 ) && ( g_theGameEngine.CurrentScore < 100 ))
        {
            g_theGameEngine.TimeoutMsCurrentParachuteDrop = 300;
        }
		else if (( g_theGameEngine.CurrentScore >= 100 ) && ( g_theGameEngine.CurrentScore < 150 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 200;
		}
		else if (( g_theGameEngine.CurrentScore >= 150 ) && ( g_theGameEngine.CurrentScore < 200 ))
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 100;
		}
		else
		{
			g_theGameEngine.TimeoutMsCurrentParachuteDrop = 50;
		}

        // pkend - 2015.01.21 - apply game difficulty level to calculation
        if ( g_theGameEngine.gameDifficultySetting === 'Easy' )
        {
            // lengthen the timeouts to make the game easier - should be integer multiplication (drop the fraction)
            g_theGameEngine.TimeoutMsCurrentParachuteDrop *= g_theGameEngine.EasyFactor;
        }
    }

    // shuffle array to setup a random parachute drop assignment
    function shuffle(array) 
    {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) 
        {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function calculateParachuteDropOrder( numberOfParachutes)
    {
    	// rand function on which parachutes to drop
    	// do this by shuffling 5 items and returning the random order of how the parachutes
        // should be dropped.
        var parachuteArray = ["1", "2", "3", "4", "5"];

        var shuffledArray = shuffle( parachuteArray );
        // console.log( shuffledArray );

    	return shuffledArray;
    }

    function calculateNumberOfParachutesToDrop()
    {
    	// based on current score
    	if ( g_theGameEngine.CurrentScore <= 3 )
    	{
    		g_theGameEngine.NumberOfParachutesToDrop = 1;
    	}
    	else if (( g_theGameEngine.CurrentScore >= 4 ) && ( g_theGameEngine.CurrentScore < 10 ))
		{
			g_theGameEngine.NumberOfParachutesToDrop = 2;
		}
		else if (( g_theGameEngine.CurrentScore >= 10 ) && ( g_theGameEngine.CurrentScore < 40 ))
		{
			g_theGameEngine.NumberOfParachutesToDrop = 3;
		}
		else if (( g_theGameEngine.CurrentScore >= 40 ) && ( g_theGameEngine.CurrentScore < 80 ))
		{
			g_theGameEngine.NumberOfParachutesToDrop = 4;
		}
		else
		{
			g_theGameEngine.NumberOfParachutesToDrop = 5;
		}

        // pkend - 2015.01.21 - apply game difficulty level to calculation
        if ( g_theGameEngine.gameDifficultySetting === 'Easy' )
        {
            // to make the game easier - restrict easy level to 3 parachutes
            if ( g_theGameEngine.NumberOfParachutesToDrop > 3 )
            {
                g_theGameEngine.NumberOfParachutesToDrop = 3;
            }
        }

        return g_theGameEngine.NumberOfParachutesToDrop;
    }

    function calculateTimeOffsetBetweenParachutesDrops()
    {
        // based on current score
        if ( g_theGameEngine.CurrentScore <= 3 )
        {
            offSetMs = 1000;
        }
        else if (( g_theGameEngine.CurrentScore >= 4 ) && ( g_theGameEngine.CurrentScore < 10 ))
        {
            offSetMs = 800;
        }
        else if (( g_theGameEngine.CurrentScore >= 10 ) && ( g_theGameEngine.CurrentScore < 40 ))
        {
            offSetMs = 600;
        }
        else if (( g_theGameEngine.CurrentScore >= 40 ) && ( g_theGameEngine.CurrentScore < 60 ))
        {
            offSetMs = 500;
        }
        else if (( g_theGameEngine.CurrentScore >= 60 ) && ( g_theGameEngine.CurrentScore < 80 ))
        {
            offSetMs = 400;            
        }
        else if (( g_theGameEngine.CurrentScore >= 80 ) && ( g_theGameEngine.CurrentScore < 100 ))
        {
            offSetMs = 300;            
        }
        else if (( g_theGameEngine.CurrentScore >= 100 ) && ( g_theGameEngine.CurrentScore < 120 ))
        {
            offSetMs = 250;            
        }
        else if (( g_theGameEngine.CurrentScore >= 120 ) && ( g_theGameEngine.CurrentScore < 150 ))
        {
            offSetMs = 200;            
        }
        else if (( g_theGameEngine.CurrentScore >= 150 ) && ( g_theGameEngine.CurrentScore < 200 ))
        {
            offSetMs = 200;       
        }
        else
        {
            offSetMs = 100;
        }

        // pkend - 2015.01.21 - apply game difficulty level to calculation
        if ( g_theGameEngine.gameDifficultySetting === 'Easy' )
        {
            // lengthen the timeouts to make the game easier - should be integer multiplication (drop the fraction)
            offSetMs *= g_theGameEngine.EasyFactor;
        }

        return offSetMs;
    }

    function processBoatMove( direction, stepSize )
    {
    	if ( g_theGameEngine.GameStatus === 'Playing' )
    	{
    	   // console.log( "Moved: " + direction + stepSize );

    	    // get current pos
    	    var prevPosition = g_theGameEngine.CurrentPosition;

    	    if ( direction === "L" )
    	    {
                // moving left
                g_theGameEngine.CurrentPosition--;
    	    }
    	    else
    	    {
    	    	// moving right
                g_theGameEngine.CurrentPosition++;
    	    }

    	    if ( g_theGameEngine.CurrentPosition < 1 )
    	    {
    	    	g_theGameEngine.CurrentPosition = 1;
    	    }

    	    if ( g_theGameEngine.CurrentPosition > 5 )
    	    {
    	    	g_theGameEngine.CurrentPosition = 5;
    	    }

	        $( "#boat" ).removeClass( "boat_pos" + prevPosition ).addClass( "boat_pos" + g_theGameEngine.CurrentPosition );

            // see whether we have positioned the boat to catch the parachute
             // check to see whether the boat has caught the parachute
            // check against all 5 potential parachutes
            var parachuteCaught = checkParachuteCaught();

            if ( parachuteCaught > 0 )
            {
               // console.log( "Moved boat pos - check for caught parachute" );

                var parachuteRowPosition = getParachuteRowPosition( parachuteCaught );
                SetParachuteCaught( parachuteCaught, parachuteRowPosition );
                setParachuteTimeoutByNumber( parseInt(parachuteCaught), g_theGameEngine.TimeoutMsCaughtParachute, 0 );
            }  
	    }
    }

    function pauseOrResumeGame( key, UpOrDown )
    {
    	if ( key === 32 )
    	{
    		// spacebar key received - check for up/down action
    		if ( g_theGameEngine.GameStatus === 'Playing' )
    		{
    			g_theGameEngine.GameStatus = 'Paused';
                gamePaused();
    		}
    		else if ( g_theGameEngine.GameStatus === 'Paused' )
    		{
    			g_theGameEngine.GameStatus = 'Playing';
                clearGamePausedTxt();
                // continue game - reset timers
                resetParachuteHtmlToDefaults();
                resetParachuteDropPositions();
                setParachuteDroptimeout();
    		}

    		console.log( "pauseOrResumeGame: " + g_theGameEngine.GameStatus + key + UpOrDown );
    	}
    }

    // Main nav Button
    $('.hamburger_menu_icon').on('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
 
    function toggleMenu()
    {
       // pkend - to do - 2015.01.09 on clicking menu links, show a popup box
       //console.log( "Menu clicked" );

        $('.mobile-dev-menu').toggleClass('open');

        if ($('.mobile-dev-menu').hasClass('open'))
        {
            $('.mobile-dev-menu').fadeTo("slow",1.0,'linear' );
            //$('.mobile-dev-menu').show();
        }
        else
        {
            $('.mobile-dev-menu').fadeOut("fast",0.0,'linear' );
            //$('.mobile-dev-menu').hide();
        }
    }

    function setMenuClosed()
    {
        $('.mobile-dev-menu').removeClass( 'open' );
        $('.mobile-dev-menu').hide();
    }

    $('#leftButton').on('click', function(e) 
    { 
        //console.log( "Left button clicked" );
        processBoatMove( "L", 1 );
        e.preventDefault();
    });

    $('#rightButton').on('click', function(e) 
    {
        //console.log( "Right button clicked" );
        processBoatMove( "R", 1 );
        e.preventDefault();
    });

    // swipe event on the screen - probably better than using the buttons on a mobile device
    $(".game-screen").swipe( {
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            //console.log( "swipe left detected: " + direction );
            processBoatMove( "L", 1 );
        },

        swipeRight:function(event, direction, distance, duration, fingerCount) {
            //console.log( "swipe right detected: " + direction );
            processBoatMove( "R", 1 );
        },

        threshold:50 // threshold for the swipe to be detected as swipe left/right
    });

    $('.new-game-button').on('click', function(e) {
        e.preventDefault();

        var prevPosition   = g_theGameEngine.CurrentPosition;
        var prevP1Position = g_theGameEngine.parachuteCurrentDropPosition;

        g_theGameEngine.NumberOfLives     = 3;
	    g_theGameEngine.CurrentPosition   = 1;
	    g_theGameEngine.parachuteCurrentDropPosition = 0;
	    g_theGameEngine.CurrentScore      = 0;
	    g_theGameEngine.TimeoutMsCurrentParachuteDrop = g_theGameEngine.TimeoutMsDefaultParachuteDrop;

        setMenuClosed();

        clearGameOverTxt();
        resetParachuteHtmlToDefaults();
        resetLives();
        resetParachuteDropPositions();
        
        if ( g_theGameEngine.GameStatus != 'Playing' )
        {
	        clearScore();
	        // if game underway and score is > 100 then prompt to save existing game
	        g_theGameEngine.GameStatus = 'Playing';
	        // update the button text to say "Stop Game"
	        //$("#btnStartStopGame").html('Stop Game');
            // change image to stop icon
            $('#btnStartStopGame').css('background-image','url(./images/player_stop-blue.png)' );


	        // show the helicopter and start dropping parachutes

	        // start appropriate timer to initiate first drops
	        setParachuteDroptimeout();	       
	    }
	    else
	    {
	    	// stop the current game - prompt for save if score > 100

            // reset game
            resetGameParameters();
	    }

	    // game started/stopped - clear screen and set the boat to the default centre position	      
	    $( "#boat" ).removeClass( "boat_pos" + prevPosition ).addClass( "boat_pos" + g_theGameEngine.CurrentPosition );

        console.log( "New Game button clicked: " + g_theGameEngine.GameStatus );
    });

    function toggleScreenStyle()
    {
        // toggle screen style between retro and modern look
        if ( g_theGameEngine.screenStyle === 'Retro' )
        {
            $('#helicopter-animation').css( "display", "none" );
            $('#helicopter-animation').hide();
            $('#island-left').removeClass( "island_left-displayed" ).addClass( "island-left-hidden" );
            $('#island-right').removeClass( "island_right-displayed" ).addClass( "island-right-hidden" );
            $('.game-screen').css('background-image','url(./images/retro/parachute-screen-shell1.jpg)');
            $('#helicopter').css('background-image','url(./images/heli33.png)' );
            //$('#helicopter').css('height', '100px' );
            $('#helicopter').css('width', '180px' );
            $('.header-score > h2').css( "font-family", "'digital-7', arial, helvetica, sans-serif" );          
        }
        else
        {
            $('.game-screen').css('background-image','url(./images/sea2.jpg)');
            $('#island-left').removeClass( "island-left-hidden" ).addClass( "island_left-displayed" );
            $('#island-right').removeClass( "island-right-hidden" ).addClass( "island_right-displayed" );
            $('#helicopter').css('background-image','url(./images/heli-rescue1.png)' );
            //$('#helicopter').css('height', '100px' );
            $('#helicopter').css('width', '360px' );
            $('.header-score > h2').css( "font-family", "arial, helvetica, sans-serif" );
            $('#helicopter-animation').css( "display", "none" );
            $('#helicopter-animation').show();
        }

        console.log( "Toggle screen style to: " + g_theGameEngine.screenStyle );
    }

    $( '#gameDifficultyBtn' ).click( function(e) {
        e.preventDefault();

        //console.log( "gameDifficultyBtn clicked" + $(this).val() );

        if ( $(this).val() === 'Easy' )
        {
            g_theGameEngine.gameDifficultySetting = 'Hard';
            // set new value into button:
            $(this).val('Hard');
            $(this).text('Hard');
            console.log( "Game Difficulty set to Hard" );
        }
        else
        {
            g_theGameEngine.gameDifficultySetting = 'Easy';
            // set new value into button:
            $(this).val('Easy');
            $(this).text('Easy');
            console.log( "Game Difficulty set to Easy" );
        }
    });

    $( '#screenStyleBtn' ).click( function(e) {
        e.preventDefault();

        //console.log( "screenStyleBtn clicked: " + $(this).val() );

        if ( $(this).val() === 'Modern' )
        {
            g_theGameEngine.screenStyle = 'Retro';
            // set new value into button:
            $(this).val('Retro');
            $(this).text('Retro');
            console.log( "screen style toggled to Retro" );
        }
        else
        {
            g_theGameEngine.screenStyle = 'Modern';
            // set new value into button:
            $(this).val('Modern');
            $(this).text('Modern');
            console.log( "screen style toggled to Modern" );
        }
        
        toggleScreenStyle();
    });

    $( '#postFBpromptBtn' ).click( function(e) {
        e.preventDefault();

        //console.log( "postFBpromptBtn clicked" + $(this).val() );

        if ( $(this).val() === 'Yes' )
        {
            
            // set new value into button:
            $(this).val('No');
            $(this).text('No');
            console.log( "FB prompt set to No" );
        }
        else
        {
            
            // set new value into button:
            $(this).val('Yes');
            $(this).text('Yes');
            console.log( "FB prompt set to Yes" );
        }

    });

    $('#screenstyleChkbx').on('click', function(e) {
        //e.preventDefault();
        //setMenuClosed();

        if ( $("#screenstyleChkbx").is(':checked') )
        {
            g_theGameEngine.screenStyle = 'Retro';
            console.log( "screen style checked" );
        }
        else
        {
            g_theGameEngine.screenStyle = 'Modern';
            console.log( "screen style unchecked" );
        }
        
        toggleScreenStyle();
    });

    function soundControl()
    {
        console.log( "Toggle sound" );

        // toggle sound on/off
        if ( g_theGameEngine.SoundOn === true )
        {
            g_theGameEngine.SoundOn = false;
            // show sound on pic
            $("#header-sound-mute").removeClass( "header-sound-mute").addClass( "header-sound-mute-invisible");
        }
        else
        {
            g_theGameEngine.SoundOn = true;
            // show sound mute/off pic
            $("#header-sound-mute").removeClass( "header-sound-mute-invisible").addClass( "header-sound-mute" );
        }
    }

    $( '.header-sound' ).on('click', function(e) {
        e.preventDefault();
        setMenuClosed();
        soundControl();
    });

    $( '.header-sound-mute' ).on('click', function(e) {
        e.preventDefault();
        setMenuClosed();
        soundControl();
    });

    // detect whether there is an overlap between the boat and one of the falling parachutes.
    // return the parachute number 1-5 if overlap, otherwise 0 to indicate no overlap.
    function isParachuteOverlap()
    {
        if ( isOverlap("#boat","#parachute1") == true )
        {
            return 1;
        }

        if ( isOverlap("#boat","#parachute2") == true )
        {
            return 2;
        }

        if ( isOverlap("#boat","#parachute3") == true )
        {
            return 3;
        }

        if ( isOverlap("#boat","#parachute4") == true )
        {
            return 4;
        }

        if ( isOverlap("#boat","#parachute5") == true )
        {
            return 5;
        }

        //console.log( "no overlap" );
        return 0;
    }

    function checkParachuteCaught()
    {
        var ParachuteCaught = 0;

    	//if ( g_theGameEngine.parachuteCurrentDropPosition == 6 )
    	//{
    		// see whether the boat shares the same x,y position
    		// on the screen. If so, we have caught the parachute.
    		// Increment the score if we have caught it.
    		// if crossover - signal caught - skip position 7 and go
    		// back to pos 0 for that parachute.
            ParachuteCaught = isParachuteOverlap();

            if ( ParachuteCaught > 0 )
            {
        		// increment score whenever we catch a parachute
        		incrementScore();
                playSoundHowl( "audio-good" );
                bParachuteCaught = true;
            }
    	//}

        return ParachuteCaught;
    }

    // returns new row position of the parachute object
    function updateParachutePositionsOntoScreen( parachuteNumber, currDropRowPosition )
    {
        var prevP1Position = currDropRowPosition;

        //if ( g_theGameEngine.parachute5CurrentDropPosition != g_theGameEngine.ParachuteDropLastRow )
        if ( $( "#parachute" + parachuteNumber ).hasClass( "parachute" + parachuteNumber + "_caught" ) === false )
        {
        	// drop parachute - update UI
            if ( currDropRowPosition  < 7 )
            {
            	currDropRowPosition++;
            }
            else
            {
            	currDropRowPosition = g_theGameEngine.ParachuteDropLastRow; // hidden
            	$('#parachute'+parachuteNumber).attr( "style", "none" );
            }

            // console.log( "updateParachutePositionsOntoScreen( " + parachuteNumber + "," + currDropRowPosition + ") Prev: " + prevP1Position );

            // if parachutes already dropped and still falling, update the positions
            $( "#parachute" + parachuteNumber ).removeClass( "parachute"+ parachuteNumber + "_pos" + prevP1Position ).addClass( "parachute"+ parachuteNumber + "_pos" + currDropRowPosition );

            // check to see whether the boat has caught the parachute
            // check against all 5 potential parachutes
            if ( checkParachuteCaught() > 0 )
            {
                prevP1Position = currDropRowPosition;
                currDropRowPosition = g_theGameEngine.ParachuteDropLastRow;
                SetParachuteCaught( parachuteNumber, prevP1Position );
               // console.log( "updateParachutePositionsOntoScreen - checkParachuteCaught > 0" );
            }
            else
            {

                if ( currDropRowPosition == 7 )
                {
                    // if parachute position 7 has been allowed to be executed,
                    // it means we have missed it. A missed parachute means a loss
                    // of 1 life. Decrement the life count by 1.
                    // if No lives left - game over.
                    playSoundHowl( "audio-error" );
                    // delay x seconds after playing error/loss of life sound

                    // update the screen with a loss of life indicator
                    g_theGameEngine.NumberOfLives--;

                    if ( g_theGameEngine.NumberOfLives > 1 )
                    {
                        $( "#parachute_missed1" ).removeClass( "parachute_missed_pos0" ).addClass( "parachute_missed_pos1" );
                    }
                    else if ( g_theGameEngine.NumberOfLives == 1 )
                    {
                        $( "#parachute_missed2" ).removeClass( "parachute_missed_pos0" ).addClass( "parachute_missed_pos2" );
                    }
                    else
                    {
                        $( "#parachute_missed3" ).removeClass( "parachute_missed_pos0" ).addClass( "parachute_missed_pos3" );
                    }               
                }
            }
        }

        return currDropRowPosition; // return the new row position for the dropping parachute
    }

    function delay( ms ) 
    {
        var defer = $.Deferred();

        setTimeout( function() {
                    defer.resolve();
                    consol.log( "delay timeout fired"); }, ms );
        return defer;
    }

    function sleep( milliseconds ) 
    {
        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) 
        {
            if ((new Date().getTime() - start) > milliseconds)
            {
                break;
            }
        }
    }

    function parachute_timeout()
    {
        //console.log('parachute_drop_timeout triggered..' );

        if ( g_theGameEngine.GameStatus === 'Playing' )
        {
            if (( areParachuteDropsCompeted() === true ) && ( g_theGameEngine.NumberOfLives > 0 ))
            {
                // clear all classes from parachute elements
                resetParachuteHtmlToDefaults();

                // calc random parachute to drop
                var NumParachutesToDrop = calculateNumberOfParachutesToDrop();
                // console.log( "Perform new parachute drop" );

                var parachuteDropOrder = calculateParachuteDropOrder( NumParachutesToDrop );
                // console.log( "Parachute drop order: " + parachuteDropOrder );

                // console.log('parachute_drop_timeout triggered..' + prevP1Position + g_theGameEngine.parachuteCurrentDropPosition );
                // reset the timer to keep it cyclic
                calculateParachuteDropSpeed();

               // set parachute timeouts based on number of parchutes

               // set increment between each drop so that each parachute lands at a slightly
               // different time - 
               // interval + 0, interval + 0.2, interval + 0.4, interval + 0.6, interval + 0.75
                g_theGameEngine.TimeoutDropCheck = setTimeout( parachute_timeout,
                 						         g_theGameEngine.TimeoutMsDropChecker );

                // for test
                /*
                if ( NumParachutesToDrop > 1 )
                {
                    NumParachutesToDrop = 2;
                }
                */

                var timeoutMs    = 0;
                var timeOffsetMs = 0;

                timeoutMs = g_theGameEngine.TimeoutMsCurrentParachuteDrop + timeOffsetMs;

                for ( var n = 1; n <= NumParachutesToDrop; ++n )
                {
                    timeoutMs = g_theGameEngine.TimeoutMsCurrentParachuteDrop + timeOffsetMs;
                    setParachuteDropPositionByNumber( parseInt(parachuteDropOrder[n-1]), 0 );
                    setParachuteTimeoutByNumber( parseInt(parachuteDropOrder[n-1]), timeoutMs, timeOffsetMs );
                    timeOffsetMs += calculateTimeOffsetBetweenParachutesDrops();
                }                   
            }
            else
            {
                // console.log( "Parachute drops still in progress - wait for them to finish." );

                if ( g_theGameEngine.NumberOfLives > 0 )
                {
                    g_theGameEngine.TimeoutDropCheck = setTimeout( parachute_timeout,
                                                     g_theGameEngine.TimeoutMsDropChecker );
                }
                else
                {
                    // game over
                    console.log( "Game Over. 3 lives lost" );
                    // call game over function
                    gameOver();
                    // reset game parameters
                    resetGameParameters();
                }

            }
        }
    }


    $(document).keydown(function(e) {

        var key = e.which;

    	// find out which key - act specifically on left/right,spacebar keys only
	    switch (key) {
	    	case 32: // spacebar
            pauseOrResumeGame( key, "D" );
	    	break;

	        case 37: // left
	        //console.log( "Left Key arrow down received" );
	        // move left one position step if we are able to do so
	        processBoatMove( "L", 1 );
	        break;

	        case 38: // up
	        break;

	        case 39: // right
	        //console.log( "Right arrow Key down received" );
	        processBoatMove( "R", 1 );
	        break;

	        case 40: // down
	        break;

	        default: return; // exit this handler for other keys
	    }

	    e.preventDefault(); // prevent the default action (scroll / move caret)
    });

   $(document).keyup(function(e) {

        var key = e.which;

    	// find out which key - act specifically on left/right keys only
	    switch (key) {
	    	case 32: // spacebar
            //pauseOrResumeGame( key, "U" );
	    	break;

	    	default: return; // exit this handler for other keys
	    }

        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

   // play sounds
   function playSoundHowl( WhichSound )
   {
        if ( g_theGameEngine.SoundOn === true )
        {
            switch( WhichSound )
            {
                case 'audio-good':
                    var sound = new Howl({
                        urls: [ "./sound/beep-07-good.mp3" ]
                    }).play();
                break;
                case 'audio-error':
                    var sound = new Howl({
                        urls: [ "./sound/beep-05-error.mp3" ],
                        onend: function() {
                            //console.log('Error beep finished! Wait 3 secs');
                            // delay several seconds after loss of life
                            //sleep( 3000 ); // PKend - 2015.01.18 - don't do this for now.. revisit later
                          }
                    }).play();
                break;
                default:
                    console.log( "playSoundHowl - sound not available." );
                break;

            }
        }
        else
        {
            //console.log( "mute - don't play sound." );
        }
   }

   function resetLives()
   {
        g_theGameEngine.NumberOfLives = 3;
        $( "#parachute_missed1" ).removeClass( "parachute_missed_pos1" ).addClass( "parachute_missed_pos0" );
        $( "#parachute_missed2" ).removeClass( "parachute_missed_pos2" ).addClass( "parachute_missed_pos0" );
        $( "#parachute_missed3" ).removeClass( "parachute_missed_pos3" ).addClass( "parachute_missed_pos0" );
   }

   function resetGameParameters()
   {
        // update the button text to say "New Game"
        //$("#btnStartStopGame").html('New Game');
        // change image icon to play       
        $('#btnStartStopGame').css('background-image','url(./images/player_play_blue.png)' );

        // hide the helicopter and clear the screen of everything except the boat

        g_theGameEngine.GameStatus = 'NotPlaying';

        clearTimeout( g_theGameEngine.TimeoutDropCheck );
        //g_theGameEngine.TimeoutDropCheck = null;
        clearTimeout( g_theGameEngine.TimeoutParachute1 );

        clearTimeout( g_theGameEngine.TimeoutParachute2 );

        clearTimeout( g_theGameEngine.TimeoutParachute3 );

        clearTimeout( g_theGameEngine.TimeoutParachute4 );

        clearTimeout( g_theGameEngine.TimeoutParachute5 );

        resetParachuteDropPositions();
    }

    // check for screen overlap for 2 elements based on their ids - typically, boat/parachute checks
    function isOverlap( idOne, idTwo )
    {
        var objOne=$(idOne),
            objTwo=$(idTwo),
            offsetOne = objOne.offset(),
            offsetTwo = objTwo.offset(),
            topOne=offsetOne.top,
            topTwo=offsetTwo.top,
            leftOne=offsetOne.left,
            leftTwo=offsetTwo.left,
            widthOne = objOne.width(),
            widthTwo = objTwo.width(),
            heightOne = objOne.height(),
            heightTwo = objTwo.height();

        var leftTop = leftTwo > leftOne && leftTwo < leftOne+widthOne  && topTwo > topOne && topTwo < topOne+heightOne,
                      rightTop = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne  && topTwo > topOne && topTwo < topOne+heightOne,
                      leftBottom = leftTwo > leftOne && leftTwo < leftOne+widthOne && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne,
                      rightBottom = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne;
        
        return leftTop || rightTop || leftBottom || rightBottom;
    }

    function gameOver()
    {
        // show game over txt on screen
        $("#gameover_text").html( "GAME OVER" );
        $('#gameover_text').removeClass( "game-over-hidden" ).addClass( "game-over-displayed" );
    }

    function clearGameOverTxt()
    {
       // hide game over txt from screen
        $("#gameover_text").html( "" );
        $('#gameover_text').removeClass( "game-over-displayed" ).addClass( "game-over-hidden" );
    }

    function gamePaused()
    {
        // show game paused txt on screen
        $("#gameover_text").html( "Game Paused - press spacebar to continue" );
        $('#gameover_text').removeClass( "game-over-hidden" ).addClass( "game-paused" );
    }

    function clearGamePausedTxt()
    {
       // hide game paused txt from screen
        $("#gameover_text").html( "" );
        $('#gameover_text').removeClass( "game-paused" ).addClass( "game-over-hidden" );
    }

    function incrementScore()
    {
        // increment score whenever we catch a parachute
        g_theGameEngine.CurrentScore++;
        var NewScore = "Score: " + g_theGameEngine.CurrentScore;
        $("#score").html( NewScore );
    }

    function clearScore()
    {
        $("#score").html( 'Score: 0' );
        g_theGameEngine.CurrentScore = 0;
    }

    function resetParachuteDropPositions()
    {
        g_theGameEngine.parachute1CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
        g_theGameEngine.parachute2CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
        g_theGameEngine.parachute3CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
        g_theGameEngine.parachute4CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
        g_theGameEngine.parachute5CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
    }

    function areParachuteDropsCompeted()
    {
        if (( g_theGameEngine.parachute1CurrentDropPosition === g_theGameEngine.ParachuteDropLastRow ) &&
            ( g_theGameEngine.parachute2CurrentDropPosition === g_theGameEngine.ParachuteDropLastRow ) &&
            ( g_theGameEngine.parachute3CurrentDropPosition === g_theGameEngine.ParachuteDropLastRow ) &&
            ( g_theGameEngine.parachute4CurrentDropPosition === g_theGameEngine.ParachuteDropLastRow ) &&
            ( g_theGameEngine.parachute5CurrentDropPosition === g_theGameEngine.ParachuteDropLastRow ))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function getParachuteRowPosition( parachuteNum )
    {
        switch( parachuteNum )
        {
            case 1:
                return g_theGameEngine.parachute1CurrentDropPosition;

            case 2:
                return g_theGameEngine.parachute2CurrentDropPosition;

            case 3:
                return g_theGameEngine.parachute3CurrentDropPosition;

            case 4:
                return g_theGameEngine.parachute4CurrentDropPosition;

            case 5:
                return g_theGameEngine.parachute5CurrentDropPosition;
        }
    }

    function SetParachuteCaught( parachuteNum, currentPositionRow )
    {
        // set the caught class for the parachute - and set a timer that will expire to clear
        // the caught indicator
        $('#parachute'+parachuteNum).attr( "style", "none" );
        $( "#parachute" + parachuteNum ).removeClass( "parachute"+ parachuteNum + "_pos" + currentPositionRow ).addClass( "parachute"+ parachuteNum + "_caught" );
        // set timeout to clear caught image

        // now mark the parachute as having completed its drop
        switch( parachuteNum )
        {
            case 1:
                g_theGameEngine.parachute1CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
                break;

            case 2:
                g_theGameEngine.parachute2CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
                break;

            case 3:
                g_theGameEngine.parachute3CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
                break;

            case 4:
                g_theGameEngine.parachute4CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
                break;

            case 5:
                g_theGameEngine.parachute5CurrentDropPosition = g_theGameEngine.ParachuteDropLastRow;
                break;
        }
    }

    function setParachuteDropPositionByNumber( parachuteNum, positionVal )
    {
        switch( parachuteNum )
        {
            case 1:
                g_theGameEngine.parachute1CurrentDropPosition = positionVal;
                break;

            case 2:
                g_theGameEngine.parachute2CurrentDropPosition = positionVal;
                break;

            case 3:
                g_theGameEngine.parachute3CurrentDropPosition = positionVal;
                break;

            case 4:
                g_theGameEngine.parachute4CurrentDropPosition = positionVal;
                break;

            case 5:
                g_theGameEngine.parachute5CurrentDropPosition = positionVal;
                break;
        }
    }

    function setParachuteTimeoutByNumber( parachuteNum, timeOutMs )
    {
        
        switch( parachuteNum )
        {
            case 1:
                setParachute1Timeout( timeOutMs );
                break;

            case 2:
                setParachute2Timeout( timeOutMs );
                break;

            case 3:
                setParachute3Timeout( timeOutMs );
                break;

            case 4:
                setParachute4Timeout( timeOutMs );
                break;

            case 5:
                setParachute5Timeout( timeOutMs );
                break;
        }
    }

    function clearClassesParachute( parachuteNum )
    {
        $('#parachute'+parachuteNum).css('background-color','none');

        for ( var n = 0; n <= g_theGameEngine.ParachuteDropLastRow; ++n )
        {
            $( "#parachute"+parachuteNum ).removeClass( "parachute"+parachuteNum+"_pos" + n )
        }

        $( "#parachute"+parachuteNum ).removeClass( "parachute" + parachuteNum + "_caught" );
        $('#parachute'+parachuteNum).attr( "style", "none" );
    }

    function resetParachuteHtmlToDefaults()
    {
        var parachuteNum = 0;
        var NumberOfParachutes = 5;

        for ( parachuteNum = 1; parachuteNum <= NumberOfParachutes; ++parachuteNum )
        {
            clearClassesParachute( parachuteNum );
            $( "#parachute"+parachuteNum ).addClass( "parachute"+parachuteNum+"_pos" + 0 );
        }
    } 

    // To do - pkend 2015.01.21 - workout if device has a touchscreen
    function isTouchScreenDevice() 
    {
        return !!( 'ontouchstart' in window );
    }

 });


