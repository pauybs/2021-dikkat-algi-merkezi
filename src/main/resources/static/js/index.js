
$(document).ready(function () {
  //  sessionStorage.removeItem("adminname");
    $("#kt_login_singin_form_submit_button").click(function () {
        var code = document.getElementById("usercode").value;
        var title = document.getElementById("username").value;
        var password = document.getElementById("userpassword").value;
        var surveyKey;
        var obj = {
                   code:code,
                   title:title,
                   password:password,
                };
        $.ajax({
            url: "/login",
            type: "POST",
            data: obj,
            xhrFields: {
                withCredentials: true
            }
        })

            .fail(function (jqXHR, textStatus, errorThrown) {
                //alert("Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
                Swal.fire(
                  'Hata!',
                  'Bayi Kodu, Kullanıcı Adı veya Şifre Yanlış. Lütfen bilgilerinizi tekrar kontrol ediniz!',
                  'error'
                )
                //alert("Bayi Kodu, Kullanıcı Adı veya Şifre Yanlış. Lütfen bilgilerinizi tekrar kontrol ediniz")
            })
            .then(function(){
                $.ajax({
                    url: "/control",
                    type: "GET",
                    xhrFields: {
                        withCredentials: true
                    }
                })
                .done(function (data, textStatus, jqXHR) {
                    var surveyKey=data;
                    localStorage.setItem("surveyKey", surveyKey);

                    location.href = "main?id="+surveyKey;

                })
            })


    })

});