$(document).ready(function () {
    $('#submit-button-registration').on("click", function (e) {
        e.preventDefault();
        var $data = {};
        $('#myForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data");
        console.log($data);
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:1337/api/auth/local/register",
            data: {
                "username": $data.userName,
                "email": $data.email,
                "password": $data.password
            },
            error: function(xhr, status, message){
                var errorMessage = JSON.parse(xhr.responseText).error.message? JSON.parse(xhr.responseText).error.message : message
                $("#authentication-page-error-block").html("<p>" + errorMessage + "</p>")
            },
            success: function(data, status){
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                sessionStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                sessionStorage.setItem("userNameForKovka", $data.userName);
                $("#authentication-page-error-block").html("<p></p>");
                location.href = "authorizedUser.html";
            }
        });
    });

    $('#submit-button-signIn').on("click", function (e) {
        e.preventDefault();
        var $data = {};
        $('#myFormSignIn').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data");
        console.log($data);
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:1337/api/auth/local",
            data: {
                "identifier": $data.userName,
                "password": $data.password
            },
            error: function(xhr, status, message){
                var errorMessage = JSON.parse(xhr.responseText).error.message? JSON.parse(xhr.responseText).error.message : message
                $("#authentication-page-error-block").html("<p>" + errorMessage + "</p>")
            },
            success: function(data, status){
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                sessionStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                sessionStorage.setItem("userNameForKovka", $data.userName);
                $("#authentication-page-error-block").html("<p></p>");
                location.href = "authorizedUser.html";
            }
        });
    })

    $('#submit-button-message').on("click", function (e) {
        e.preventDefault();
        var $data = {};
        var $token = sessionStorage.getItem("bearerTokenForUser")
        var $user = sessionStorage.getItem("userNameForKovka")
        $('#myMessageForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        $.ajax({
            type: 'POST',
            url: "http://localhost:1337/api/messages",
            headers: {
                "authorization": $token,
            },
            data: {
                data: {
                    "textOfMessage": $data.textOfMessage,
                    "user": $user
                }
            }
        }).done(function (data) {
            var $messagesBlock = $("#messagesBlockWrapper");
            if($messagesBlock.is("#messagesBlockWrapper")) {
                var $myDiv = $('<div>').attr({'class': 'messageItem'});
                $myDiv.html(`<span class="user">${$user}</span><p class="messageText">${$data.textOfMessage}</p>`)
                $messagesBlock.append($myDiv)
            }
        });
    })

    var $logoutBtn = $("#logOut-button");
    if($logoutBtn.is("#logOut-button")) {
        $logoutBtn.on("click", function (e) {
            e.preventDefault();
            sessionStorage.removeItem("bearerTokenForUser");
            sessionStorage.removeItem("userNameForKovka");
            location.href = "index.html";
        })
    }

    var $messagesBlock = $("#messagesBlockWrapper");
    if($messagesBlock.is("#messagesBlockWrapper")){
        var $token = sessionStorage.getItem("bearerTokenForUser")
        $.ajax({
            type: 'GET',
            url: "http://localhost:1337/api/messages",
            headers: {
                "authorization": $token,
            }
            //OR
            //beforeSend: function(xhr) {
            //  xhr.setRequestHeader("My-First-Header", "first value");
            //  xhr.setRequestHeader("My-Second-Header", "second value");
            //}
        }).done(function (data) {
            data.data.forEach(function (item, index) {
                var $myDiv = $('<div>').attr({'class':'messageItem'});
                $myDiv.html(`<span class="user">${item.attributes.user}</span><p class="messageText">${item.attributes.textOfMessage}</p>`)
                $messagesBlock.append($myDiv)
            })
        });
    }

    var $countdownBlock = $("#countdown");
    if ($countdownBlock.is("#countdown")) {
        var end = new Date('06/19/2023 10:1 AM');

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {

                clearInterval(timer);
                document.getElementById('countdown').innerHTML = 'EXPIRED!';

                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            document.getElementById('countdown').innerHTML = days + 'days ';
            document.getElementById('countdown').innerHTML += hours + 'hrs ';
            document.getElementById('countdown').innerHTML += minutes + 'mins ';
            document.getElementById('countdown').innerHTML += seconds + 'secs';
        }

        timer = setInterval(showRemaining, 1000);
    }
}); 


