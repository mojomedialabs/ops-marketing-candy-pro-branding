$(function() {
	$("#user, #password").on("keyup", function(event) {
		if (event.keyCode === 13) {
			$("#login-button").click();
		}
	});

	$("#login-button").on("click", function(event) {
		var user = $("#user").val();
		var password = $("#password").val();

		event.preventDefault();

		if ((user !== "") && (password !== "")) {
			$("#loading").html("<img src='images/process.gif' alt='Loading...' style='width: 20px;' />");

			$.get("loginajax.asp?u=" + user + "&p=" + password + "&ran=" + Math.random(), function(data, textStatus, jqXHR) {
				if (jqXHR.readyState === 4) {
					if (jqXHR.responseText === "0") {
						window.location = "cIndex.asp";
					} else {
						$("#loading").empty();

						showAlertMessage("Error!", "Username/Password entered was incorrect.", "error");
					}
				}
			});
		}
	});

	$("#UserName").on("keyup", function(event) {
		var userName = $(this).val();

		if (userName !== "") {
			$.get("Registration.asp?CheckUser=" + userName + "&ran=" + Math.random(), function(data, textStatus, jqXHR) {
				if (jqXHR.readyState === 4) {
					if (jqXHR.responseText !== "") {
						if (jqXHR.responseText === "No") {
							console.log("That user name is already taken.");

							$("#btnSubmit").attr("disabled", true);

							showAlertMessage("Error!", "That user name is already taken.", "error");

							$("#UserName").css("background-color", "#f5b5a9");
						} else {
							console.log("That user name is available.");

							$("#btnSubmit").attr("disabled", false);

							showAlertMessage("", "That user name is available.", "success");

							$("#UserName").css("background-color", "#ffffff");
						}
					}
				}
			});
		}
	});
});