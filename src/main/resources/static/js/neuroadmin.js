$(document).ready(function(){
    $("#kt_login_singin_form_submit_button").click(function(){
            var title = document.getElementById("title").value;
            var password = document.getElementById("password").value;

            var obj = {
               title:title,
               password:password,
            };
            $.ajax({
                url: "/admin/login/",
                type: "POST",
                data: obj,
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function (data, textStatus, jqXHR) {
                location.href = "admin_page";
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
            })
    })

})