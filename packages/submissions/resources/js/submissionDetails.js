$(document).ready(function() {
    var submissionCreated = new Date($('#submissionStartDate').data('created'));
    var submissionClosed = new Date($('#submissionCloseDate').data('closed'));   
    var submissionLength = Math.ceil((submissionClosed.getTime() - submissionCreated.getTime()));
    
    $('.task').each(function(value, index) {
        var taskCreated = new Date($(this).data('created'));
        var taskClosed = new Date($(this).data('closed'));
        var taskLength = Math.ceil((taskClosed.getTime() - taskCreated.getTime()));
        var percent = taskLength / submissionLength;
        // Format the percent
        var wholeNumberWidth = percent * 100;
        // Check if the percent is under 15 and do not use
        if(wholeNumberWidth >= 15) {
            $(this).css({'width': wholeNumberWidth+'%'})
        } else {
            wholeNumberWidth = 15;
        }
        
        // Now adjust left positioning
        var totalTimeBeforeTaskStart = taskCreated - submissionCreated;
        var percent = totalTimeBeforeTaskStart / submissionLength;
        // Format the percent
        var wholeNumberLeft = percent * 100;
        // Determine if width is less than left position and subtract width from left otherwise make left 0
        if(wholeNumberWidth < wholeNumberLeft) {
            var left = wholeNumberLeft - wholeNumberWidth;
        } else {
            var left = 0;
        }
        $(this).css({'left': left+'%'});
    });

    initializeTip('.task', '.details');
});

/**
 * @param selector string
 * @param attr string 
 */
function initializeTip(selector, childSelector) {
    $(selector).each(function() {
        $(this).qtip({
            content: $(this).children(childSelector),
            style: {
                corner: 'bottom left',
                classes: 'ui-tooltip-tipsy ui-tooltip-shadow'
            },
            position: {
                my: 'bottom left',
                at: 'top middle'
            }
        });
    });
}

/**
 * Convert milliseconds into time
 */
function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return { d: d, h: h, m: m, s: s };
};

/**
 * Convert milliseconds in regular style time
 */
function convertMilliseconds(ms, p) {

    var pattern = p || "hh:mm:ss",
    arrayPattern = pattern.split(":"),
    clock = [ ],
    hours = Math.floor ( ms / 3600000 ), // 1 Hour = 36000 Milliseconds
    minutes = Math.floor (( ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor ((( ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds


    // build the clock result
    function createClock(unit) {
        // match the pattern to the corresponding variable
        if (pattern.match(unit)) {
            if (unit.match(/h/)) {
            addUnitToClock(hours, unit);
            }
            if (unit.match(/m/)) {
            addUnitToClock(minutes, unit);
            }
            if (unit.match(/s/)) {
            addUnitToClock(seconds, unit);
            };
        }
    }

    function addUnitToClock(val, unit) {

        if(val < 10 && unit.length === 2) {
            val = "0" + val;
        }

        clock.push(val); // push the values into the clock array
    }
    
    // loop over the pattern building out the clock result
    for ( var i = 0, j = arrayPattern.length; i < j; i ++ ) {
    createClock(arrayPattern[i]);
    }

    return {
        hours : hours,
        minutes : minutes,
        seconds : seconds,
        clock : clock.join(":")
    };
}

function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
   
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
 
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
   
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}