$(document).ready(function () {
    var $data = {};
    $('#submit-button-registration').on("click", function (e) {
        e.preventDefault();
        $('#myForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data");
        console.log($data);
        $.post("http://localhost:1337/api/auth/local/register",
            {
                "username": $data.user-name,
                "email": $data.email,
                "password": $data.password
            },
            function (data, status) {
                console.log("Данные: " + JSON.stringify(data) + "\nСостояние: " + status);
                localStorage.setItem("bearerTokenForUser", `Bearer ${data.jwt}`);
                location.href = "authorizedUser.html";
            });
        /*
           Данные: {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTY4NTQ3MDU3MywiZXhwIjoxNjg4MDYyNTczfQ.BcL2hdNLVgaIOtdGt-SLnVe5xMHIyCum-w8gvYp27UM","user":{"id":31,"username":"NaN","email":"oleggol95@gmail.com","provider":"local","confirmed":true,"blocked":false,"createdAt":"2023-05-30T18:16:13.358Z","updatedAt":"2023-05-30T18:16:13.358Z"}}
           Состояние: success
         */
    })
}); 


