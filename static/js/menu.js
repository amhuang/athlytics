const reader = new FileReader();
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

$("#formVideo").on("input", function(e) {
    let vidPath = document.getElementById("formVideo").files[0].name;
    $('#vid video source').attr('src', "{{ url_for('static', filename="+vidPath+")}}");
    console.log($("#vid video source"));
    document.getElementById("vid").load();
});

$("#formMeta").on("input", function(e) {
    let path = document.getElementById("formMeta").files[0].name;
});

$("#playerList").on("input", function(e) {
    
    let playerNum;
    jsondata.players.forEach(function (x) {
        if (x.name == e.target.value) {
            playerNum = jsondata.players.indexOf(x);
            return;
        }
    });
    
    let duration = document.getElementById("vid").duration; // in seconds
    let barWidth = document.getElementById("progress").offsetWidth;
    console.log("barwidth " + barWidth);
    let xPadding = (window.innerWidth - barWidth)/2;
    console.log("xpadding " + xPadding);

    $("#tags").empty();
    console.log(jsondata);
    for (let i=0; i < jsondata.players[playerNum].sec.length; i++) {
        console.log(playerNum)
        console.log("duratioin div " + duration / jsondata.players[playerNum].sec[i] );

        let xOffset = (jsondata.players[playerNum].sec[i] / duration)*barWidth + xPadding;
        console.log("xoffset " + xOffset + " window " + window.innerWidth);
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