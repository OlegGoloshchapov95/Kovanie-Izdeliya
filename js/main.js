$(document).ready(function () {
    var $data = {};
    $('#submit-button-registration').on("click", function (e) {
        e.preventDefault()
        $('#myForm').find('input, textearea, select').each(function () {
            $data[this.name] = $(this).val();
        });
        console.log("$data")
        console.log($data)
        $.post("http://localhost:1337/api/auth/local/register",
            {
                "username": $data.user-name,
                "email": $data.email,
                "password": $data.password
            },
            function (data, status) {
                alert("Данные: " + data + "\nСостояние: " + status);
            });
    })
}); 


