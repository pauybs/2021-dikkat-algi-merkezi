
$(document).ready(function () {

    var studentname;
    var items = [];
    var variable, itemkey, itemvalue, deger, test, ts_items;
    var urlRef, urlStd, urlTest, urlTs;
    var test_visibility = document.getElementById('test_content_visible');
    var test_visible = document.getElementById('testName');
    test_visible.onchange = function () {
        test_visibility.style.visibility = 'hidden';
    }
    test_visibility.style.visibility = 'hidden';

    $.ajax({
        url: "/teststudent/list",
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
    $.ajax({
        url: "/student/list",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            deger = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {
            var table = $('#kt_datatable').DataTable({

                "data": deger,
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                columns: [
                    { "data": "std_name" },
                    { "data": "std_surname" },
                    { "data": "status" },
                    { "data": "program" },
                    { "data": "profileType" },
                    { "data": "note" },
                ],
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    footer: false, // display/hide footer
                },
                // column sorting
                sortable: true,
                // enable pagination
                pagination: true,
                responsive: true,
                deferRender: true,
                scrollY: '500px',
                scrollCollapse: true,
                scrollCollapse: true,
                // "scrollY": "220px",
                "paging": false,
                lengthChange: true,
                info: true,
                select: true,
                fixedHeader: false,
                colReorder: true,
                "scrollX": true,
                "autoWidth": true,
                "columnDefs": [{ "targets": 0, "orderable": false }],
                "order": [],
            });
            $('#kt_datatable tbody').on('click', 'tr', function () {
                $(this).toggleClass('selected');
            });
            $('#selectBtn').click(function () {
                for (var i = 0; i < table.rows('.selected').data().length; i++) {
                    variable = table.rows('.selected').data()[i].ref;
                    location.href = "test_profile?id=" + variable;
                }
            });
            setStudent();
        });


    $.ajax({
        url: "/tests/list",
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

            console.log("testNameValue" + testNameValue)
            console.log("studentname" + studentname)
            $('#testBtn').click(function () {
                urlRef = getUrlParameter("id")
                var program = document.getElementById("testName").value;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == program) {
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                    }
                }
                if (itemvalue == "MOXO Test") {
                    console.log(" moxoooo " + itemvalue)
                    window.location.href = "moxo_test?id=" + urlRef + "&ref=" + itemkey;

                } else if ((itemvalue == "Profil Oluşturma Anketi")) {
                    window.location.href = "profil_olusturma_anketi?id=" + urlRef + "&ref=" + itemkey;

                } else {
                    window.location.href = "test_profile?id=" + urlRef + "&ref=" + itemkey;

                }
                //alert(itemkey)
                //    

            })

            $("#testAddBtn").click(function () {
                urlStd = getUrlParameter("id")
                urlTest = getUrlParameter("ref")
                var testdate = document.getElementById("kt_datepicker").value;

                var testresult = document.getElementById("testResult").value;
                console.log(testresult)
                var obj = {
                    test_date: testdate,
                    result: testresult,
                    test_id: urlTest,
                    student_id: urlStd,
                    end_date: testdate,
                    title: studentname + "-" + testNameValue,
                };

                urlTs = getUrlParameter("ts");
                if (urlTs == null) {
                    $.ajax({
                        url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/add",
                        type: "POST",
                        data: obj,
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                        .done(function (data, textStatus, jqXHR) {

                           // alert("testresult" + testresult)
                            /*  location.reload;*/
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                            console.error(errorThrown);
                        })
                } else {
                    $.ajax({
                        url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/ts/" + urlTs + "/put",

                        type: "PUT",
                        data: obj,
                        xhrFields: {
                            withCredentials: true
                        }
                    })
                        .done(function (data, textStatus, jqXHR) {

                            //  location.reload();

                           // alert("testresult put  ")
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                            console.error(errorThrown);
                        })
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