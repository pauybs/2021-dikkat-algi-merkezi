$(document).ready(function(){


    $("#control").click(function(){

        var code = document.getElementById("code").value;
        var title = document.getElementById("title").value;
        var password = document.getElementById("password").value;

        var obj = {
            code:code,
            title:title,
            password:password,
        };
        $.ajax({
            url: "/add",
            type: "POST",
            data: obj,
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function (data, textStatus, jqXHR) {
            if(data==""){
                alert("başarılı");
            }else
                alert("Veri Tabanı adı geçersiz!");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Başarılı" + errorThrown, jqXHR, textStatus);
        })
    })
})