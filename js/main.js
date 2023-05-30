$(document).ready(function(){
    var $data = {};
    $('#submit-button-registration').on("click", function(e) {
        e.preventDefault()
        $('#myForm').find ('input, textearea, select').each(function() {
            $data[this.name] = $(this).val();
        });
        alert("function works")
        console.log("$data")
        console.log($data)
    })
}); 


