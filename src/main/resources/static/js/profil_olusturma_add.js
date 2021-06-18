$(document).ready(function () {
    var surveyKey = localStorage.getItem('surveyKey');
    var deger, test, subtest, teststd, teststd_all, subtestresult;
    var urlStd, urlTest, urlTS, urlSub, urlSR;
    var studentname, testNameValue;
    var items = [];
    var result_item = [], result_item_name = [];

    urlTS = getUrlParameter("ts")
    urlStd = getUrlParameter("id")
    urlTest = getUrlParameter("ref")
    urlSub = getUrlParameter("sub")
    urlSR = getUrlParameter("sr")

    var test_visibility = document.getElementById('inputsDiv');

    test_visibility.style.visibility = 'hidden';

    $.ajax({
        url: "/student/list/"+surveyKey,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            deger = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {

            setStudent();
        });

    function setStudent() {
        if (getUrlParameter("id") != null) {
            for (var i = 0; i < deger.length; i++) {
                if (getUrlParameter("id") == deger[i].ref) {

                    studentname = deger[i].std_name;
                    var studentbirth = deger[i].birthday;
                    var studentprogram = deger[i].program;
                    var studentprototip = deger[i].profileType;
                    var studenttest = deger[i].testStudents.length;
                    for (var j = 0; j < studenttest; j++) {
                        if (urlTS == deger[i].testStudents[j].ref) {
                            test_date = deger[i].testStudents[j].start;

                        }
                    }
                    //test date elde etme ve yazdırma
                    testdate = convertDate(test_date)
                    document.getElementById("test_date").value = testdate;
                    function convertDate(inputFormat) {
                        function pad(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(inputFormat)
                        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
                    }

                    document.getElementById("studentAd").value = studentname;
                    document.getElementById("studentBirth").value = studentbirth;
                    document.getElementById("studentProgram").value = studentprogram;
                    document.getElementById("studentPrototip").value = studentprototip;
                    document.getElementById("testCount").value = studenttest;

                }
            }
            if (getUrlParameter("id") != null && getUrlParameter("ref") != null && urlTS != null && urlSub != null) {

                test_visibility.style.visibility = 'visible';

            }
        } else if (getUrlParameter("id") == null) {
            $('#testName')
                .attr('disabled', true);
        }
    }



    $.ajax({
        url: "/tests/list/"+surveyKey,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            test = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {
            for (var i = 0; i < test.length; i++) {
                if (urlTest == test[i].ref) {
                    testNameValue = test[i].test_name;
                    document.getElementById('test_name').value = test[i].test_name;
                    //   document.getElementById('sub_test_name').value = test[i].test_name;
                }
            }
        })

    $('#subTestAddBtn').click(function () {
        var obj = {

            name: testNameValue,
            test_student_ref: urlTS,
            tests_ref: urlTest,
            status: "Girilmedi",
        };
        $.ajax({////teststudent/{test_student_ref}/tests/{tests_ref}/add
            url: "/subtest/teststudent/" + urlTS + "/tests/" + urlTest + "/add/"+surveyKey,
            type: "POST",
            data: obj,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("ok")
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
            })
            .then(function () {
                window.location.href = "profil_olusturma_add?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;
            })
    })

    $.ajax({///teststudent/{test_student_ref}/tests/{tests_ref}
        url: "/subtest/teststudent/" + urlTS + "/tests/" + urlTest+"/"+surveyKey,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststd = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {

            if (teststd.length >= 1) {
                document.getElementById("subTestAddBtn").disabled = true;

            }
            /*     if (teststd.name =)
                     if (urlSR != null) {
                         document.getElementById("testResultAddBtn").disabled = true;
                     }
     */
            //    console.log("teststd_item" + teststd_item)
            var table = $('#test_datatable').DataTable({
                "data": teststd,
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                columns: [
                    { "data": null },
                    { "data": "name" },
                    { "data": "status" },

                ],
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    footer: false, // display/hide footer
                },
                "bLengthChange": false,
                paging: false,
                searching: false,
                destroy: true,
            });
            table.on('order.dt search.dt', function () {
                table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
            $('#test_datatable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                ts_variable = table.row('.selected').data().ref;
                if (table.row('.selected').data().status == "Girildi") {
                    //  alert("Girilen değer tekrar düzenlenemez. Öğrenci profiline gidiniz.")
                    str_variable = table.row('.selected').data().subTestResults[0].ref;
                    location.href = "profil_olusturma_add?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + ts_variable + "&sr=" + str_variable;
                } else {
                    location.href = "profil_olusturma_add?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + ts_variable;
                }
            });


        })
    if (urlSR != null) {
        $.ajax({///subtest/{sub_test}/ref/{ref}/list
            url: "/subtestresult/subtest/" + urlSub + "/ref/" + urlSR + "/list/"+ surveyKey,
            method: "GET",
        })
            .done(function (data, textStatus, jqXHR) {
                subtestresult = data;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            })
            .then(function () {
                for (var i = 0; i < subtestresult.length; i++) {
                    if (urlSR == subtestresult[i].ref) {
                        document.getElementById("result").value = subtestresult[i].result
                    }

                }
            })
    }

    $('#testResultAddBtn').click(function () {
        var rsp = document.getElementById("rsp").value;
        var ra = document.getElementById("ra").value;
        var raf = document.getElementById("raf").value;
        var rpf = document.getElementById("rpf").value;
        var rp = document.getElementById("rp").value;
        var rbp = document.getElementById("rbp").value;
        var ebp = document.getElementById("ebp").value;
        var ep = document.getElementById("ep").value;
        var epf = document.getElementById("epf").value;
        var eaf = document.getElementById("eaf").value;
        var ea = document.getElementById("ea").value;
        var esp = document.getElementById("esp").value;
        if (rsp != "" && ra != "" && raf != "" && rpf != "" && rp != "" && rbp != "" && ebp != "" && ep != ""&& epf != ""&& eaf != ""&& ea != ""&& esp != "") {
            result_item = [rsp, ra, raf, rpf, rp, rbp, ebp, ep, epf, eaf, ea, esp];
        }
        result_item_name = ["RSP", "RA", "RAF", "RPF", "RP", "RBP", "EBP", "EP", "EPF", "EAF", "EA", "ESP"]
        var genel_result = [];
        for (var i = 0; i < result_item.length; i++) {

            genel_result[i] = {
                result: result_item[i],
                name: result_item_name[i]
            }

        }

        if (urlSR != null) {
            for (var j = 0; j < genel_result.length; j++){
                var putobj = {
                    name: genel_result[j].name,
                    result: genel_result[j].result,
                    sub_test_ref: urlSub
                };
                $.ajax({///subtest/{sub_test}/ref/{ref}/put
                    url: "/subtestresult/subtest/" + urlSub + "/ref/" + genel[i].key + "/put/"+surveyKey,
                    type: "PUT",
                    data: putobj,
                    xhrFields: {
                        withCredentials: true
                    }
                })
                    .done(function (data, textStatus, jqXHR) {
                        console.log("ok")
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                        console.error(errorThrown);
                    })
                    .then(function () {
                        location.href = "moxo_result_add?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;

                    })
            }


        } else {
            if (result_item.length == 12) {
                for (var i = 0; i < result_item.length; i++){
                    var obj = {
                        name: genel_result[j].name,
                        result: result_item[i],
                        sub_test_ref: urlSub
                    };
                    $.ajax({
                        url: "/subtestresult/subtest/" + urlSub+"/"+surveyKey,
                        type: "POST",
                        data: obj,
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                        .done(function (data, textStatus, jqXHR) {
                            console.log("ok")
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                            console.error(errorThrown);
                        })
                }

                var status = "Girildi";

                var objsub = {
                    name: testNameValue,
                    test_student_ref: urlTS,
                    tests_ref: urlTest,
                    status: status,
                };
                $.ajax({///teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/put
                    url: "/subtest/teststudent/" + urlTS + "/tests/" + urlTest + "/sub/" + urlSub + "/put/"+surveyKey,
                    type: "PUT",
                    data: objsub,
                    xhrFields: {
                        withCredentials: true
                    }
                })
                    .done(function (data, textStatus, jqXHR) {
                        console.log("put ok")
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(objsub + "Error" + errorThrown, jqXHR, textStatus);
                        console.error(errorThrown);
                    })
                var objteststd = {
                    test_date: test_date,
                    test_id: urlTest,
                    student_id: urlStd,
                    end_date: test_date,
                    //  title: test_name + "-" + studentname,
                    title: testNameValue + "-" + studentname,
                    status: status,
                };
                $.ajax({
                    url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/ts/" + urlTS + "/put/"+surveyKey,

                    type: "PUT",
                    data: objteststd,
                    xhrFields: {
                        withCredentials: true
                    }
                })
                    .done(function (data, textStatus, jqXHR) {
                        console.log("put ok")
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(objteststd + "Error" + errorThrown, jqXHR, textStatus);
                        console.error(errorThrown);
                    }).then(function () { //neurosound/test_profile.html?id=1&ref=3
                        window.location.href = "test_profile?id=" + urlStd + "&ref=" + urlTest;

                    })

            }
            else {
                alert("lütfen tüm değerleri giriniz")
            }
        }



    })


})