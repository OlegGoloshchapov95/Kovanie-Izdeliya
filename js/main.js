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
            error: function(data){
                alert("error")
                alert(JSON.stringify(data))
            },
            success: function(data, status){
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                sessionStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                sessionStorage.setItem("userNameForKovka", $data.userName);
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
        $.post("http://localhost:1337/api/auth/local",
            {
                "identifier": $data.userName,
                "password": $data.password
            },
            function (data, status) {
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                sessionStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                sessionStorage.setItem("userNameForKovka", $data.userName);
                location.href = "authorizedUser.html";
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
}); 


