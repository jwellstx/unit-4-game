var hans = {
    name: "hans",
}


var sith = {
    name: "sith",
    hisname: function() {
        alert(hans.name);
    }
}


$(document).ready(function() {
    // sith.hisname();


    $(".selectChar").on("click", function() {
        console.log($(this).val());
        $(".selectChar").remove();
        $(".myChar").append("<button>" + sith.name + "<br><img src='assets/images/kenobi.jpg' width='100px' height='100px'/><br>120</button>");
    });
});