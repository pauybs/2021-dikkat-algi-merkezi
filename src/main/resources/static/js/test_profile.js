
$(document).ready(function () {
    var surveyKey = localStorage.getItem('surveyKey');
    var studentname;
    var items = [];
    var std_variable, ts_variable, itemkey, itemvalue, deger, test, ts_items, teststd;
    var urlRef, urlStd, urlTest, urlTs;
    var test_visibility = document.getElementById('test_content_visible');
    var test_visible = document.getElementById('testName');
    test_visible.onchange = function () {
        test_visibility.style.visibility = 'hidden';
    }
    test_visibility.style.visibility = 'hidden';
    document.getElementById("testAddBtn").disabled = true;
    $.ajax({
        url: "/teststudent/list/"+surveyKey,
        type: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            ts_items = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })
        .then(function () {
            urlTs = getUrlParameter("ts");
            if (urlTs != null) {
                for (var i = 0; i < ts_items.length; i++) {
                    if (urlTs == ts_items[i].ref) {
                        var studentprototip = ts_items[i].start;
                        document.getElementById("kt_datepicker").value = studentprototip;
                        document.getElementById("testResult").value = ts_items[i].result;
                    }
                }
            }
        })


    if (getUrlParameter("id") != null && getUrlParameter("ref") != null) {
        urlTest = getUrlParameter("ref");
        urlStd = getUrlParameter("id");
        $.ajax({
            url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/listByResult/"+surveyKey,
            method: "GET",
        })
            .done(function (data, textStatus, jqXHR) {
                teststd = data;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            })
            .then(function () {

                for (var i = 0; i < teststd.length; i++) {
                    start = teststd[i].start;
                    end = teststd[i].end;
                    title = teststd[i].title;
                }

                var table = $('#test_datatable').DataTable({

                    "data": teststd,
                    "language": {
                        "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                    },
                    columns: [
                        { "data": null },
                        { "data": "title" },
                        {
                            "data": "start",
                            type: 'date',
                            render: function (data, type, row) {
                                return data ? moment(data).format('DD/MM/YYYY') : '';

                            },
                        },
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
                    if (table.row('.selected')) {
                        document.getElementById("testAddBtn").disabled = false;

                    }
                });

                $('#exampleModalSizeSm').on('click', '#deleteButton', function () {
                    $.ajax({

                        url: "/result/delete/"+surveyKey,
                        method: "DELETE",
                        data: ts_variable,

                    })
                        .done(function (data, textStatus, jqXHR) {

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert("Başarısız.");
                        })
                        .then(function () {
                            location.href = "test_profile?id=" + urlStd + "&ref=" + urlTest + "&ts=" + ts_variable;

                        })
                });
            })
    }

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
            //öğrenci seçimi için açılan modal da listelenen tüm öğrenci listesi
            var table = $('#kt_datatable').DataTable({

                "data": deger,
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                columns: [
                    { "data": null },
                    { "data": "std_name" },
                    { "data": "std_surname" },
                    { "data": "status" },
                    { "data": "program" },
                    { "data": "profileType" },
                ],
                responsive: true,
                scrollCollapse: true,
                scrollY: "300px",
                scrollX: true,
                "paging": false,
                lengthChange: true,
                info: true,
                select: true,
                colReorder: true,
                "autoWidth": true,
            });
            table.on('order.dt search.dt', function () {
                table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
            $('#kt_datatable tbody').on('click', 'tr', function () {
                $(this).toggleClass('selected');
            });
            $('#selectBtn').click(function () {
                for (var i = 0; i < table.rows('.selected').data().length; i++) {
                    std_variable = table.rows('.selected').data()[i].ref;
                    location.href = "test_profile?id=" + std_variable;
                }
            });

            //öğrenci bilgilerini ilgili alana set et
            setStudent();
        });


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
            urlTest = getUrlParameter("ref")
            urlRef = getUrlParameter("id")
            var testNameValue;
            for (var i = 0; i < test.length; i++) {
                items[i] = {
                    "key": test[i].ref,
                    "value": test[i].test_name
                };
            }
            //select option içine verileri set etmek
            for (var i = 0; i < items.length; i++) {
                var opt = items[i].value;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                test_visible.appendChild(el);
            }
            for (var i = 0; i < items.length; i++) {
                if (urlTest == items[i].key) {
                    testNameValue = items[i].value
                    document.getElementById("testName").value = testNameValue;
                }
            }
            //select option değiştiğinde ilgili test ref ini gönder
            $('#testName').change(function () {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == $(this).val()) {
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                        // alert('You selected: ' + $(this).val() + itemkey);
                        location.href = "test_profile?id=" + urlRef + "&ref=" + itemkey;
                    }
                }
            });
            $('#testBtn').click(function () {
                var result = "Girilmedi";
                var testdate = document.getElementById("kt_datepicker").value;
                var obj = {
                    test_date: testdate,
                    test_id: urlTest,
                    student_id: urlStd,
                    end_date: testdate,
                    title: testNameValue + "-" + studentname,
                    status: result,
                };
                urlTs = getUrlParameter("ts");
                if (urlTs == null) {
                    $.ajax({
                        url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/add/"+surveyKey,
                        type: "POST",
                        data: obj,
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                        .done(function (data, textStatus, jqXHR) {
                            location.href = "test_profile?id=" + urlRef + "&ref=" + urlTest;
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                            console.error(errorThrown);
                        })
                } else {
                    /*
                    $.ajax({
                        url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/ts/" + urlTs + "/put",

                        type: "PUT",
                        data: obj,
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                        .done(function (data, textStatus, jqXHR) {
                            location.href = "test_profile?id=" + urlRef + "&ref=" + urlTest;

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                            console.error(errorThrown);
                        })*/

                }
            })

            $("#testAddBtn").click(function () {
                urlRef = getUrlParameter("id")
                var program = document.getElementById("testName").value;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == program) {
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                    }
                }
                if (itemvalue == "MOXO Test") {
                    location.href = "moxo_result_add?id=" + urlRef + "&ref=" + urlTest + "&ts=" + ts_variable;

                } else if ((itemvalue == "Profil Oluşturma Anketi")) {
                    location.href = "profil_olusturma_add?id=" + urlRef + "&ref=" + urlTest + "&ts=" + ts_variable;

                } else {
                    location.href = "result_add?id=" + urlRef + "&ref=" + itemkey + "&ts=" + ts_variable;

                }

            })


        })


    function setStudent() {
        if (getUrlParameter("id") != null) {
            for (var i = 0; i < deger.length; i++) {
                if (getUrlParameter("id") == deger[i].ref) {

                    studentname = deger[i].std_name;
                    var studentbirth = deger[i].birthday;
                    var studentprogram = deger[i].program;
                    var studentprototip = deger[i].profileType;
                    var studenttest = deger[i].testStudents.length;


                    document.getElementById("studentAd").value = studentname;
                    document.getElementById("studentBirth").value = studentbirth;
                    document.getElementById("studentProgram").value = studentprogram;
                    document.getElementById("studentPrototip").value = studentprototip;
                    document.getElementById("testCount").value = studenttest;

                }
            }
            if (getUrlParameter("id") != null && getUrlParameter("ref") != null) {
                test_visibility.style.visibility = 'visible';
            }
        } else if (getUrlParameter("id") == null) {
            $('#testName')
                .attr('disabled', true);
        }

    }

});