$(document).ready(function () {
    $('#submit-button-registration').on("click", function (e) {
        e.preventDefault();
        var $data = {};
        $('#myForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data");
        console.log($data);
        $.post("http://localhost:1337/api/auth/local/register",
            {
                "username": $data.userName,
                "email": $data.email,
                "password": $data.password
            },
            function (data, status) {
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                alert("data.jwt")
                alert(data.jwt)
                localStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                alert("$data.userName")
                alert($data.userName)
                localStorage.setItem("userNameForKovka", $data.userName);
                location.href = "authorizedUser.html";
            });
        /*
           Данные: {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY4NTQ3MDU3MywiZXhwIjoxNjg4MDYyNTczfQ.BcL2hdNLVgaIOtdGt-SLnVe5xMHIyCum-w8gvYp27UM","user":{"id":31,"username":"NaN","email":"oleggol95@gmail.com","provider":"local","confirmed":true,"blocked":false,"createdAt":"2023-05-30T18:16:13.358Z","updatedAt":"2023-05-30T18:16:13.358Z"}}
           Состояние: success
         */
    })

    $('#submit-button-message').on("click", function (e) {
        e.preventDefault();
        var $data = {};
        var $token = localStorage.getItem("bearerTokenForUser")
        var $user = localStorage.getItem("userNameForKovka")
        alert("$token")
        alert($token)
        alert("$user")
        alert($user)
        $('#myMessageForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data");
        console.log($data);
        $.ajax({
            type: 'POST',
            url: "http://localhost:1337/api/messages",
            data: {
                "textOfMessage": $data.textOfMessage,
                "user": $user
            },
            headers: {
                "authorization": $token,
            }
            //OR
            //beforeSend: function(xhr) {
            //  xhr.setRequestHeader("My-First-Header", "first value");
            //  xhr.setRequestHeader("My-Second-Header", "second value");
            //}
        }).done(function (data) {
            alert(data);
        });
        /*$.post("http://localhost:1337/api/auth/local/register",
            {
                "username": $data.user-name,
                "email": $data.email,
                "password": $data.password
            },
            function (data, status) {
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                localStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                location.href = "authorizedUser.html";
            });*/
        /*
           Данные: {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY4NTQ3MDU3MywiZXhwIjoxNjg4MDYyNTczfQ.BcL2hdNLVgaIOtdGt-SLnVe5xMHIyCum-w8gvYp27UM","user":{"id":31,"username":"NaN","email":"oleggol95@gmail.com","provider":"local","confirmed":true,"blocked":false,"createdAt":"2023-05-30T18:16:13.358Z","updatedAt":"2023-05-30T18:16:13.358Z"}}
           Состояние: success
         */
    })
}); 


