const reader = new FileReader();

// Sample data in lieu of being able to obtain metadata from running
// the crossroads sample application
const exampleData = `{
    "players": [ {
        "name": "player1",
        "REID": 1,
        "sec": [3,8,20,21]
    }, {
        "name": "player2",
        "REID": 2,
        "sec": [5,12,21]
    }, {
        "name": "player3",
        "REID": 3,
        "sec": [8,10,25,27]
    }, {
        "name": "player4",
        "REID": 4,
        "sec": [20,25,28]
    }
    ]
}`;

const jsondata = JSON.parse(exampleData);

// 
$("#formVideo").on("input", function(e) {
    let vidPath = document.getElementById("formVideo").files[0].name;
    let srcpath = "<source src={{url_for(&quotstatic&quot, filename=&quot"+vidPath+"&quot)}} type=&quotvideo/mp4&quot></source>";
    console.log(srcpath);
    $("#vid").empty();
    $("#vid").append(srcpath);
    document.getElementById("vid").load(); 
    console.log(document.getElementById("vid"));
    
});

$("#formMeta").on("input", function(e) {
    let path = document.getElementById("formMeta").files[0].name;
});

$("#playerList").on("input", function(e) {
    
    // get index of player name selected from options
    // BUG: LIST ENTRIES CHANGE ONCE OPTION SELECTED
    
    let playerNum;
    jsondata.players.forEach(function (x) {
        if (x.name == e.target.value) {
            playerNum = jsondata.players.indexOf(x);
            console.log(playerNum);
            return;
        }
    });
    
    let duration = document.getElementById("vid").duration; // in seconds
    // width of progress bar
    let barWidth = document.getElementById("progress").offsetWidth;
    // padding on either side of prog bar
    let xPadding = (window.innerWidth - barWidth)/2;

    // clear previous tags
    $("#tags").empty();

    // Draw time tags on UI for each data point in the metadata
    for (let i=0; i < jsondata.players[playerNum].sec.length; i++) {
        
        // Offset of point from the left edge of the window
        let xOffset = (jsondata.players[playerNum].sec[i] / duration)*barWidth + xPadding;
        // Percentage of the screen left of the tag
        let percentOff = Math.round((xOffset / window.innerWidth) * 100);
        console.log("percentOff " + percentOff);

        $("#tags").append( `<div style="position: relative; float:left; left: `+percentOff+`%; ">
        <svg>
            <use href="#tag"></use>
        </svg></div>`)
    }
});

// Submit button. send request to register API
$("#submit").click(function (e) {
    /* 
    let location = $("#targetLoc").val();
    let publicity = $("#publicity").val();
    if (text == null || text.trim().length == 0 || location.trim().length == 0) {
        show_prompt("Please Filled All Input Fields", title = 'Alert');
        return;
    }

    // get form data, and check whether it's a valid json
    let td_json = null;
    try {
        td_json = { "td": JSON.parse(text.trim()), "location": location, "publicity": publicity };
    } catch (error) {
        show_prompt("Input is not in JSON format. Please try again");
        return;
    }
    // send out the register request
    lock_btn($registerBtn);
    added_msg = true;   // hide redundant thing added notification
    $.ajax({
        url: REGISTER_URL,
        type: "POST",
        data: JSON.stringify(td_json),
        contentType: "application/json",
        error: function (jqXHR, textStatus, errorThrown) {
            unlock_btn($registerBtn);
            show_prompt(jqXHR.responseText);
        },
        success: function (data, textStatus, jqXHR) {
            unlock_btn($registerBtn);
            show_prompt("Register succeed!<br>");
        }
    }); */
});