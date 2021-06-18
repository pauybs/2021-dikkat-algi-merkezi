$(document).ready(function () {
    var surveyKey = localStorage.getItem('surveyKey');
    var deger, teststd, stlist, test, advice;
    var items = [], itemsSt = [];
    var stdref, urlTest;
    var ts_variable;


    var urlStudentRef = getUrlParameter("id");
    var urlTestRef = getUrlParameter("ref");

    var ctx = document.getElementById('chart-area').getContext('2d');
    var test_visible = document.getElementById('testName');
    var test_visibility = document.getElementById('divVisible');

    test_visibility.style.visibility = 'hidden';




    $.ajax({
        url: "/student/list/"+surveyKey,
        type: "GET",
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data, textStatus, jqXHR) {
            deger = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })
        .then(function () {
            useNextLoad();
        })
    function useNextLoad() {
        if (urlStudentRef != null) {
            for (var i = 0; i < deger.length; i++) {
                if (urlStudentRef == deger[i].ref) {
                    stdref = deger[i].ref;

                    document.getElementById("studentAd").value = deger[i].std_name + " " + deger[i].std_surname;
                    document.getElementById("studentBirth").value = deger[i].birthday;
                    document.getElementById("studentProgram").value = deger[i].program;
                    document.getElementById("studentPrototip").value = deger[i].profileType;
                    document.getElementById("stdName").value = deger[i].std_name;
                    document.getElementById("stdSurname").value = deger[i].std_surname;
                    document.getElementById("stdPhone").value = deger[i].phone1;
                    document.getElementById("stdMail").value = deger[i].mail;
                    document.getElementById("testCount").value = deger[i].testStudents.length;



                }
            }

        }

    }
    //format date
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
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

            //select option a test verilerini set et
            for (var i = 0; i < test.length; i++) {
                items[i] = {
                    "key": test[i].ref,
                    "value": test[i].test_name
                };
            }
            for (var i = 0; i < items.length; i++) {
                var opt = items[i].value;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                test_visible.appendChild(el);
            }

            $('#testShow').click(function () {
                var itemvalue;
                var program = document.getElementById("testName").value;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == program) {
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                    }
                }
                if (itemvalue == "MOXO Test") {
                    window.location.href = "moxo_test_profile?id=" + urlStudentRef + "&ref=" + itemkey;
                    test_visibility.style.visibility = 'hidden';
                } else if (itemvalue == "Profil Oluşturma Anketi") {
                    window.location.href = "profil_olusturma_anketi?id=" + urlStudentRef + "&ref=" + itemkey;
                    test_visibility.style.visibility = 'hidden';
                } else {
                    window.location.href = "student_profile?id=" + urlStudentRef + "&ref=" + itemkey;
                }

            })
        })
    if (urlTestRef != null) {
        test_visibility.style.visibility = 'visible';
        $.ajax({
            url: "/teststudent/tests/" + urlTestRef + "/student/" + urlStudentRef + "/filter/"+surveyKey,
            method: "GET",
        })
            .done(function (data, textStatus, jqXHR) {
                teststd = data;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            })
            .then(function () {
                subTestList();
                subTestResult();
            })
    }
    function subTestList() {


        var test_table = $('#teststd_datatable').DataTable({
            data: teststd,
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },

            columns: [
                { data: null },
                {
                    data: "start",
                    type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';
                    },
                },
                { data: "status" },
                { data: 'subTests.0.subTestResults.0.result' },
                {
                    sortable: false,
                    width: 10,
                    overflow: 'visible',
                    autoHide: false,
                    "data": function () {
                        return '\
                           <button id="deleteBtn" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" data-toggle="modal" data-target="#exampleModalPopovers" title="Tavsiye Al">\
                                <span class="svg-icon svg-icon-primary svg-icon-2x">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"></rect>\
                                            <path d="M14,13.381038 L14,3.47213595 L7.99460483,15.4829263 L14,13.381038 Z M4.88230018,17.2353996 L13.2844582,0.431083506 C13.4820496,0.0359007077 13.9625881,-0.12427877 14.3577709,0.0733126292 C14.5125928,0.15072359 14.6381308,0.276261584 14.7155418,0.431083506 L23.1176998,17.2353996 C23.3152912,17.6305824 23.1551117,18.1111209 22.7599289,18.3087123 C22.5664522,18.4054506 22.3420471,18.4197165 22.1378777,18.3482572 L14,15.5 L5.86212227,18.3482572 C5.44509941,18.4942152 4.98871325,18.2744737 4.84275525,17.8574509 C4.77129597,17.6532815 4.78556182,17.4288764 4.88230018,17.2353996 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.000087, 9.191034) rotate(-315.000000) translate(-14.000087, -9.191034)"></path>\
                                        </g>\
                                    </svg>\
                                </span >\
                           </button >\
                        ';
                    },
                }

            ],

            // "pageLength": 5,
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,
        });
        //Index column
        test_table.on('order.dt search.dt', function () {
            test_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#teststd_datatable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                test_table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            ts_variable = test_table.row('.selected').data().subTests[0].subTestResults[0].ref;
            var test_result = parseFloat(test_table.row('.selected').data().subTests[0].subTestResults[0].result);
            var test_result_f = test_result * 100;
            test_result_f = test_result_f.toFixed(0);
            test_result_f = Number(test_result_f);

            document.getElementById("test_date").value = convertDate(test_table.row('.selected').data().start);
            document.getElementById("test_advice").value = test_result_f + "%";
            if (test_result_f > 50 && test_result_f < 80) {
                document.getElementById("progres_advice").style.backgroundColor = "#3699FF"
                document.getElementById("result_status").value = "Normal"
                document.getElementById("result_status").style.color = "#3699FF"

            }
            else if (test_result_f > 30 && test_result_f < 50) {
                document.getElementById("progres_advice").style.backgroundColor = "#663259"
                document.getElementById("result_status").value = "Düşük"
                document.getElementById("result_status").style.color = "#663259"


            } else if (test_result_f > 80 && test_result_f < 100) {
                document.getElementById("progres_advice").style.backgroundColor = "rgba(27, 197, 189, 0.85)"
                document.getElementById("result_status").value = "Yüksek"
                document.getElementById("result_status").style.color = "rgba(27, 197, 189, 0.85)"

            } else if (test_result_f > 0 && test_result_f < 30) {
                document.getElementById("progres_advice").style.backgroundColor = "#F64E60"
                document.getElementById("result_status").value = "Çok Düşük"
                document.getElementById("result_status").style.color = "#F64E60"

            }
            document.getElementById("progres_advice").style.width = test_result_f + "%";


            $.ajax({
                url: "/advice/tests/" + urlTestRef+"/"+surveyKey,
                method: "GET",
            })
                .done(function (data, textStatus, jqXHR) {
                    advice = data;
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert("Error");
                })
                .then(function () {
                    var advice_table = $('#advice_datatable').DataTable({
                        data: advice,
                        "language": {
                            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                        },

                        columns: [
                            { data: null },

                            { data: "advice_name" },
                            { data: "advice_explain" },


                        ],


                        // "pageLength": 5,
                        "bLengthChange": false,
                        paging: false,
                        searching: false,
                        destroy: true,
                    });
                    advice_table.on('order.dt search.dt', function () {
                        advice_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                            cell.innerHTML = i + 1;
                        });
                    }).draw();
                })

        });

    }

    function subTestResult() {
        var sum = 0;
        var stdtestdate = [];
        var stdtestvalue = [];
        var stdtestresult = [];
        var stdtest = [];
        var testvalue = [];
        var testdate = [];
        var testresult = [];

        for (var i = 0; i < teststd.length; i++) {
            for (var j = 0; j < teststd[i].subTests.length; j++) {
                for (var k = 0; k < teststd[i].subTests[j].subTestResults.length; k++) {
                    if (teststd[i].subTests[j].subTestResults[k] != "") {
                        stdtestvalue.push(teststd[i].ref)
                        stdtestdate.push(teststd[i].start);
                        stdtestresult.push(parseFloat(teststd[i].subTests[j].subTestResults[k].result));
                    }
                }
            }
        }

        for (var i = 0; i < stdtestvalue.length; i++) {
            stdtest[i] = {
                test_ref: stdtestvalue[i],
                date: stdtestdate[i],
                result: stdtestresult[i]
            }
        }

        //sort date
        stdtest.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        for (var i = 0; i < stdtest.length; i++) {
            testdate.push(convertDate(stdtest[i].date));
            testresult.push(stdtest[i].result)
        }


        //ay bazında performans
        for (var i = 0; i < testresult.length - 1; i++) {
            sum = testresult[i + 1] - testresult[i];
            sum = sum.toFixed(3);
            sum = Number(sum);
            testvalue.push(sum);
        }

        //general performance
        var testsum = 0;
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        testyuzde = testsum * 100
        testyuzde = testyuzde.toFixed(0);
        testyuzde = Number(testyuzde);
        //random color
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        for (var i = 0; i < stdtest.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "-" + testdate[i + 1])
        }
        //pie chart
        var config = new Chart(ctx, {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: testvalue,
                    backgroundColor: color,
                    label: 'Dataset 1'
                }],
                labels: performance,
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,

                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                    reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }
        });
        //genel performans chart
        var element = document.getElementById("general_value_chart");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testyuzde],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };
        var chart = new ApexCharts(element, options);
        chart.render();

        //line chart
        var ctx_line = document.getElementById('chart-line').getContext('2d');
        var myChart = new Chart(ctx_line, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: '# Sonuçlar',
                    data: testresult,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,

                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        });


    }
//takvim için student'a göre verilerin listelenmesi
$.ajax({
    url: "/student/list/"+surveyKey,
    type: "GET",
    xhrFields: {
        withCredentials: true
    }
})
    .done(function (data, textStatus, jqXHR) {
        stlist = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert("Error" + errorThrown, jqXHR, textStatus);
        console.error(errorThrown);
    })
    .then(function () {
        for (var i = 0; i < stlist.length; i++) {
            if (urlStudentRef == stlist[i].ref) {
                console.log("in")
                for (var j = 0; j < stlist[i].testStudents.length; j++) {

                    itemsSt[j] = {
                        key: stlist[i]['testStudents'][j].ref,
                        testref: stlist[i]['testStudents'][j].tests_ref,
                        studentref: stlist[i]['testStudents'][j].students_ref,
                        start: stlist[i]['testStudents'][j].start,
                        end: stlist[i]['testStudents'][j].end,
                        title: stlist[i]['testStudents'][j].title,
                        result: parseFloat(stlist[i]['testStudents'][j].result),
                    };

                }

                var calendarEl = document.getElementById('calendar');
                var initialLocaleCode = 'tr';
                var d = new Date();
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    },
                    initialDate: '2020-09-12',
                    locale: initialLocaleCode,
                    editable: true,
                    navLinks: true, // can click day/week names to navigate views
                    dayMaxEvents: true, // allow "more" link when too many events
                    events: itemsSt,
                    eventClick: function (info) {
                        info.jsEvent.preventDefault();
                        test_ref = info.event.extendedProps.testref;
                        student_ref = info.event.extendedProps.studentref;
                        teststd_ref = info.event.extendedProps.key;

                        window.location = "test_profile?id=" + student_ref + "&ref=" + test_ref + "&ts=" + teststd_ref;
                        info.el.style.borderColor = 'red';
                    },
                    eventDidMount: function (info) {
                        std_result = info.event.extendedProps.result;
                        std_start = info.event.start;
                        if (std_result == "" & d < std_start) {
                            info.el.style.backgroundColor = '#FFF4DE';
                            info.el.style.color = "black";
                        } else if (std_result == "" & d > std_start) {
                            info.el.style.backgroundColor = '#FFE2E5';
                            info.el.style.color = "black";
                        }
                        else {
                            info.el.style.backgroundColor = '#C9F7F5';
                            info.el.style.color = "black";
                        }
                        // {description: "Lecture", department: "BioChemistry"}
                    }
                });

                calendar.render();
            }
        }

    })
});

