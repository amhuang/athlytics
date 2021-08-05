// Submit button. send request to register API
$("#submit").click(function (e) {
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
    });
});