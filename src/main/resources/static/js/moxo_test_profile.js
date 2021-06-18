$(document).ready(function () {
    var surveyKey = localStorage.getItem('surveyKey');
    var stlist, teststdlist;

    var dikkat = [], zamanlama = [], durtusellik = [], hiperaktivite = [], genel = [];

    var urlStd = getUrlParameter("id");
    var urlTest = getUrlParameter("ref");


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
                if (urlStd == stlist[i].ref) {
                    var lenghtyyy = stlist[i].testStudents.length;
                    document.getElementById("studentAd").value = stlist[i].std_name + " " + stlist[i].std_surname;
                    document.getElementById("studentBirth").value = "Yaş: " + stlist[i].birthday;
                    document.getElementById("studentProgram").value = stlist[i].program;
                    document.getElementById("studentPrototip").value = stlist[i].profileType;
                    document.getElementById("stdPhone").value = "Tel: " + stlist[i].phone1;
                    document.getElementById("testCount").value = lenghtyyy;
                }
            }

        })
    $.ajax({
        url: "/teststudent/tests/" + urlTest + "/student/" + urlStd + "/filter/"+surveyKey,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststdlist = data;
            teststdlistDatatable(teststdlist);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })

    var generalDate = [], dikkatResult = [], zamanlamaResult = [], iResult = [], hResult = [];
    function teststdlistDatatable(teststdlist) {
        var dikkatTemel_1 = [], dikkatTemel_2 = [], dikkatGorsel_1 = [], dikkatGorsel_2 = [], dikkatIsıtsel_1 = [], dikkatIsıtsel_2 = [], dikkatBirlesik_1 = [], dikkatBirlesik_2 = [];
        var zamTemel_1 = [], zamTemel_2 = [], zamGorsel_1 = [], zamGorsel_2 = [], zamIsıtsel_1 = [], zamIsıtsel_2 = [], zamBirlesik_1 = [], zamBirlesik_2 = [];
        var durTemel_1 = [], durTemel_2 = [], durGorsel_1 = [], durGorsel_2 = [], durIsıtsel_1 = [], durIsıtsel_2 = [], durBirlesik_1 = [], durBirlesik_2 = [];
        var hipTemel_1 = [], hipTemel_2 = [], hipGorsel_1 = [], hipGorsel_2 = [], hipIsıtsel_1 = [], hipIsıtsel_2 = [], hipBirlesik_1 = [], hipBirlesik_2 = [];

        for (var i = 0; i < teststdlist.length; i++) {
            generalDate.push(teststdlist[i].start);
            for (var j = 0; j < teststdlist[i].subTests.length; j++) {
                for (var k = 0; k < teststdlist[i].subTests[j].subTestResults.length; k++) {


                    if (teststdlist[i].subTests[j].name == "Dikkat") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            dikkatTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            dikkatTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            dikkatGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            dikkatGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            dikkatIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            dikkatIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            dikkatBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            dikkatBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                    if (teststdlist[i].subTests[j].name == "Zamanlama") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            zamTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            zamTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            zamGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            zamGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            zamIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            zamIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            zamBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            zamBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                    if (teststdlist[i].subTests[j].name == "Dürtüsellik") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            durTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            durTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            durGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            durGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            durIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            durIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            durBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            durBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                    if (teststdlist[i].subTests[j].name == "Hiperaktivite") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            hipTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            hipTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            hipGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            hipGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            hipIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            hipIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            hipBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            hipBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                }
            }
        }

        for (var i = 0; i < dikkatTemel_1.length; i++) {
            dikkat[i] =
            {
                date: generalDate[i],
                temel_1: dikkatTemel_1[i],
                temel_2: dikkatTemel_2[i],
                gorsel_1: dikkatGorsel_1[i],
                gorsel_2: dikkatGorsel_2[i],
                isitsel_1: dikkatIsıtsel_1[i],
                isitsel_2: dikkatIsıtsel_2[i],
                birlesik_1: dikkatBirlesik_1[i],
                birlesik_2: dikkatBirlesik_2[i],
            }
            }
         for (var i = 0; i < zamTemel_1.length; i++){
            zamanlama[i] =
            {
                date: generalDate[i],
                temel_1: zamTemel_1[i],
                temel_2: zamTemel_2[i],
                gorsel_1: zamGorsel_1[i],
                gorsel_2: zamGorsel_2[i],
                isitsel_1: zamIsıtsel_1[i],
                isitsel_2: zamIsıtsel_2[i],
                birlesik_1: zamBirlesik_1[i],
                birlesik_2: zamBirlesik_2[i],
            }
        }
        for (var i = 0; i < durTemel_1.length; i++){
            durtusellik[i] =
            {
                date: generalDate[i],
                temel_1: durTemel_1[i],
                temel_2: durTemel_2[i],
                gorsel_1: durGorsel_1[i],
                gorsel_2: durGorsel_2[i],
                isitsel_1: durIsıtsel_1[i],
                isitsel_2: durIsıtsel_2[i],
                birlesik_1: durBirlesik_1[i],
                birlesik_2: durBirlesik_2[i],
            }
        }
        for (var i = 0; i < hipTemel_1.length; i++){
            hiperaktivite[i] =
            {
                date: generalDate[i],
                temel_1: hipTemel_1[i],
                temel_2: hipTemel_2[i],
                gorsel_1: hipGorsel_1[i],
                gorsel_2: hipGorsel_2[i],
                isitsel_1: hipIsıtsel_1[i],
                isitsel_2: hipIsıtsel_2[i],
                birlesik_1: hipBirlesik_1[i],
                birlesik_2: hipBirlesik_2[i],
            }
        }
        var test_table = $('#teststd_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: dikkat,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test TarİHİ", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "temel_1", title: "Temel-1" },
                { data: "temel_2", title: "Temel-2" },
                { data: "gorsel_1", title: "Görsel-1" },
                { data: "gorsel_2", title: "Görsel-2" },
                { data: "isitsel_1", title: "İşİtsel-1" },
                { data: "isitsel_2", title: "İşİtsel-2" },
                { data: "birlesik_1", title: "Bİrleşİk-1" },
                { data: "birlesik_2", title: "Bİrleşİk-2" },

            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false

        });
        test_table.on('order.dt search.dt', function () {
            test_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceAnalize(dikkat);





        var test_t_table = $('#zamanlama_teststd_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: zamanlama,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test TarİHİ", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "temel_1", title: "Temel-1" },
                { data: "temel_2", title: "Temel-2" },
                { data: "gorsel_1", title: "Görsel-1" },
                { data: "gorsel_2", title: "Görsel-2" },
                { data: "isitsel_1", title: "İşİtsel-1" },
                { data: "isitsel_2", title: "İşİtsel-2" },
                { data: "birlesik_1", title: "Bİrleşİk-1" },
                { data: "birlesik_2", title: "Bİrleşİk-2" },

            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false

        });
        test_t_table.on('order.dt search.dt', function () {
            test_t_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceTAnalize(zamanlama);


        var test_i_table = $('#durtusellik_teststd_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: durtusellik,


            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test TarİHİ", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "temel_1", title: "Temel-1" },
                { data: "temel_2", title: "Temel-2" },
                { data: "gorsel_1", title: "Görsel-1" },
                { data: "gorsel_2", title: "Görsel-2" },
                { data: "isitsel_1", title: "İşİtsel-1" },
                { data: "isitsel_2", title: "İşİtsel-2" },
                { data: "birlesik_1", title: "Bİrleşİk-1" },
                { data: "birlesik_2", title: "Bİrleşİk-2" },

            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false

        });
        test_i_table.on('order.dt search.dt', function () {
            test_i_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceIAnalize(durtusellik);

        var test_h_table = $('#hiperaktivite_teststd_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: hiperaktivite,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test TarİHİ", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "temel_1", title: "Temel-1" },
                { data: "temel_2", title: "Temel-2" },
                { data: "gorsel_1", title: "Görsel-1" },
                { data: "gorsel_2", title: "Görsel-2" },
                { data: "isitsel_1", title: "İşİtsel-1" },
                { data: "isitsel_2", title: "İşİtsel-2" },
                { data: "birlesik_1", title: "Bİrleşİk-1" },
                { data: "birlesik_2", title: "Bİrleşİk-2" },

            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false

        });
        test_h_table.on('order.dt search.dt', function () {
            test_h_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceHAnalize(hiperaktivite);
    }
    function performanceAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [], temel2_value = [], gorsel1_value = [], gorsel2_value = [], isitsel1_value = [], isitsel2_value = [], birlesik1_value = [], birlesik2_value = [];
        var temel1result = [], temel2result = [], gorsel1result = [], gorsel2result = [], isitsel1result = [], isitsel2result = [], birlesik1result = [], birlesik2result = [];
        var sum = 0, testsum = 0;
        var genel = [];

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            temel1result.push(testResults[i].temel_1)
            temel2result.push(testResults[i].temel_2)
            gorsel1result.push(testResults[i].gorsel_1)
            gorsel2result.push(testResults[i].gorsel_2)
            isitsel1result.push(testResults[i].isitsel_1)
            isitsel2result.push(testResults[i].isitsel_2)
            birlesik1result.push(testResults[i].birlesik_1)
            birlesik2result.push(testResults[i].birlesik_2)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
        }
        //ay bazında performans ve random renk seçimi
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        var performance = [];
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "- " + testdate[i + 1])
        }

        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
            temel2_sum = temel2result[i + 1] - temel2result[i];
            gorsel1_sum = gorsel1result[i + 1] - gorsel1result[i];
            gorsel2_sum = gorsel2result[i + 1] - gorsel2result[i];
            isitsel1_sum = isitsel1result[i + 1] - isitsel1result[i];
            isitsel2_sum = isitsel2result[i + 1] - isitsel2result[i];
            birlesik1_sum = birlesik1result[i + 1] - birlesik1result[i];
            birlesik2_sum = birlesik2result[i + 1] - birlesik2result[i];
            sum = sum.toFixed(3);
            sum = Number(sum);

            temel2_sum = temel2_sum.toFixed(3);
            temel2_sum = Number(temel2_sum);

            gorsel1_sum = gorsel1_sum.toFixed(3);
            gorsel1_sum = Number(gorsel1_sum);

            gorsel2_sum = gorsel2_sum.toFixed(3);
            gorsel2_sum = Number(gorsel2_sum);

            isitsel1_sum = isitsel1_sum.toFixed(3);
            isitsel1_sum = Number(isitsel1_sum);

            isitsel2_sum = isitsel2_sum.toFixed(3);
            isitsel2_sum = Number(isitsel2_sum);

            birlesik1_sum = birlesik1_sum.toFixed(3);
            birlesik1_sum = Number(birlesik1_sum);

            birlesik2_sum = birlesik2_sum.toFixed(3);
            birlesik2_sum = Number(birlesik2_sum);

            testvalue.push(sum);
            temel2_value.push(temel2_sum);
            gorsel1_value.push(gorsel1_sum);
            gorsel2_value.push(gorsel2_sum);
            isitsel1_value.push(isitsel1_sum);
            isitsel2_value.push(isitsel2_sum);
            birlesik1_value.push(birlesik1_sum);
            birlesik2_value.push(birlesik2_sum);
        }

        for (var i = 0; i < testvalue.length; i++) {
            genel[i] = {
                performance: performance[i],
                testvalue: testvalue[i],
                temel2_value: temel2_value[i],
                gorsel1_value: gorsel1_value[i],
                gorsel2_value: gorsel2_value[i],
                isitsel1_value: isitsel1_value[i],
                isitsel2_value: isitsel2_value[i],
                birlesik1_value: birlesik1_value[i],
                birlesik2_value: birlesik2_value[i]
            }
        }
        var result_table = $('#result_datatable').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: genel,
            columns: [
                { "data": null, title: "#" },
                { data: "performance", title: "TEST TARİHİ" },
                { data: "testvalue", title: "Temel-1" },
                { data: "temel2_value", title: "Temel-2" },
                { data: "gorsel1_value", title: "Görsel-1" },
                { data: "gorsel2_value", title: "Görsel-2" },
                { data: "isitsel1_value", title: "İşitsel-1" },
                { data: "isitsel2_value", title: "İşitsel-2" },
                { data: "birlesik1_value", title: "Birleşik-1" },
                { data: "birlesik2_value", title: "Birleşik-2" },
            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false
        });
        result_table.on('order.dt search.dt', function () {
            result_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();


        var genel_result = document.getElementById('genel_result').getContext('2d');
        var myChart = new Chart(genel_result, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: 'Temel-1',
                    data: temel1result,
                    backgroundColor: [
                        '#F64E60'
                    ],
                    borderColor: [
                        '#F64E60'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },
                {
                    label: 'Temel-2',
                    data: temel2result,
                    backgroundColor: [
                        '#21618c'
                    ],
                    borderColor: [
                        '#21618c'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Görsel-1',
                    data: gorsel1result,
                    backgroundColor: [
                        '#FFA800'
                    ],
                    borderColor: [
                        '#FFA800'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                }, {
                    label: 'Görsel-2',
                    data: gorsel2result,
                    borderColor: [
                        '#181C32'
                    ],
                    backgroundColor: [
                        '#181C32'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                },
                {
                    label: 'İşitsel-1',
                    data: isitsel1result,
                    backgroundColor: [
                        '#3699FF'
                    ],
                    borderColor: [
                        '#3699FF'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'İşitsel-2',
                    data: isitsel2result,
                    backgroundColor: [
                        '#8950FC'
                    ],
                    borderColor: [
                        '#8950FC'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-1',
                    data: birlesik1result,
                    backgroundColor: [
                        '#1BC5BD'
                    ],
                    borderColor: [
                        '#1BC5BD'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-2',
                    data: birlesik2result,
                    backgroundColor: [
                        '#663259'
                    ],
                    borderColor: [
                        '#663259'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart - Different point sizes'
                    }
                },
                hover: {
                    mode: 'index'
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
        })



        var testsum = 0, gorselsum = 0, gorsel2sum = 0, isitselsum = 0, isitsel2sum = 0, birlesiksum = 0, birlesik2sum = 0, temel2sum = 0;
        //temel1 general performance
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
            gorselsum += gorsel1_value[i];
            gorsel2sum += gorsel2_value[i];
            isitselsum += isitsel1_value[i];
            isitsel2sum += isitsel2_value[i];
            birlesiksum += birlesik1_value[i];
            birlesik2sum += birlesik2_value[i];
            temel2sum += temel2_value[i]
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        gorselsum = gorselsum.toFixed(3);
        gorselsum = Number(gorselsum)
        gorsel2sum = gorsel2sum.toFixed(3);
        gorsel2sum = Number(gorsel2sum)
        isitselsum = isitselsum.toFixed(3);
        isitselsum = Number(isitselsum)
        isitsel2sum = isitsel2sum.toFixed(3);
        isitsel2sum = Number(isitsel2sum)

        birlesiksum = birlesiksum.toFixed(3);
        birlesiksum = Number(birlesiksum)
        birlesik2sum = birlesik2sum.toFixed(3);
        birlesik2sum = Number(birlesik2sum)
        temel2sum = temel2sum.toFixed(3);
        temel2sum = Number(temel2sum)

        //temel1 genel performans chart
        var element = document.getElementById("general_value_chart_t1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['danger'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['danger'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel1 genel performans chart
        var element = document.getElementById("general_value_chart_g1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorselsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['warning'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['warning'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['warning']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel2 genel performans chart
        var element = document.getElementById("general_value_chart_g2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorsel2sum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['dark'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['dark'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['dark']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("general_value_chart_i1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitselsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['primary'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['primary'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['primary']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel2 genel performans chart
        var element = document.getElementById("general_value_chart_i2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitsel2sum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['info'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['info'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['info']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //birleşik1 genel performans chart
        var element = document.getElementById("general_value_chart_b1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [birlesiksum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['success'],
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
        //birleşik 2 genel performans chart
        var element = document.getElementById("general_value_chart_b2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [birlesik2sum],
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
                            color: '#663259',
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
                        background: KTApp.getSettings()['colors']['theme']['light']['info'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: ['#663259'],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("general_value_chart_t2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [temel2sum],
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
                            color: '#21618c',
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
            colors: ['#21618c'],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

    }
    function performanceTAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [], temel2_value = [], gorsel1_value = [], gorsel2_value = [], isitsel1_value = [], isitsel2_value = [], birlesik1_value = [], birlesik2_value = [];
        var temel1result = [], temel2result = [], gorsel1result = [], gorsel2result = [], isitsel1result = [], isitsel2result = [], birlesik1result = [], birlesik2result = [];
        var sum = 0, testsum = 0;
        var genel = [];

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            temel1result.push(testResults[i].temel_1)
            temel2result.push(testResults[i].temel_2)
            gorsel1result.push(testResults[i].gorsel_1)
            gorsel2result.push(testResults[i].gorsel_2)
            isitsel1result.push(testResults[i].isitsel_1)
            isitsel2result.push(testResults[i].isitsel_2)
            birlesik1result.push(testResults[i].birlesik_1)
            birlesik2result.push(testResults[i].birlesik_2)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
        }
        //ay bazında performans ve random renk seçimi
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        var performance = [];
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "- " + testdate[i + 1])
        }

        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
            temel2_sum = temel2result[i + 1] - temel2result[i];
            gorsel1_sum = gorsel1result[i + 1] - gorsel1result[i];
            gorsel2_sum = gorsel2result[i + 1] - gorsel2result[i];
            isitsel1_sum = isitsel1result[i + 1] - isitsel1result[i];
            isitsel2_sum = isitsel2result[i + 1] - isitsel2result[i];
            birlesik1_sum = birlesik1result[i + 1] - birlesik1result[i];
            birlesik2_sum = birlesik2result[i + 1] - birlesik2result[i];
            sum = sum.toFixed(3);
            sum = Number(sum);

            temel2_sum = temel2_sum.toFixed(3);
            temel2_sum = Number(temel2_sum);

            gorsel1_sum = gorsel1_sum.toFixed(3);
            gorsel1_sum = Number(gorsel1_sum);

            gorsel2_sum = gorsel2_sum.toFixed(3);
            gorsel2_sum = Number(gorsel2_sum);

            isitsel1_sum = isitsel1_sum.toFixed(3);
            isitsel1_sum = Number(isitsel1_sum);

            isitsel2_sum = isitsel2_sum.toFixed(3);
            isitsel2_sum = Number(isitsel2_sum);

            birlesik1_sum = birlesik1_sum.toFixed(3);
            birlesik1_sum = Number(birlesik1_sum);

            birlesik2_sum = birlesik2_sum.toFixed(3);
            birlesik2_sum = Number(birlesik2_sum);

            testvalue.push(sum);
            temel2_value.push(temel2_sum);
            gorsel1_value.push(gorsel1_sum);
            gorsel2_value.push(gorsel2_sum);
            isitsel1_value.push(isitsel1_sum);
            isitsel2_value.push(isitsel2_sum);
            birlesik1_value.push(birlesik1_sum);
            birlesik2_value.push(birlesik2_sum);
        }

        for (var i = 0; i < testvalue.length; i++) {
            genel[i] = {
                performance: performance[i],
                testvalue: testvalue[i],
                temel2_value: temel2_value[i],
                gorsel1_value: gorsel1_value[i],
                gorsel2_value: gorsel2_value[i],
                isitsel1_value: isitsel1_value[i],
                isitsel2_value: isitsel2_value[i],
                birlesik1_value: birlesik1_value[i],
                birlesik2_value: birlesik2_value[i]
            }
        }
        var result_table = $('#zamanlama_result_datatable').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: genel,
            columns: [
                { "data": null, title: "#" },
                { data: "performance", title: "TEST TARİHİ" },
                { data: "testvalue", title: "Temel-1" },
                { data: "temel2_value", title: "Temel-2" },
                { data: "gorsel1_value", title: "Görsel-1" },
                { data: "gorsel2_value", title: "Görsel-2" },
                { data: "isitsel1_value", title: "İşitsel-1" },
                { data: "isitsel2_value", title: "İşitsel-2" },
                { data: "birlesik1_value", title: "Birleşik-1" },
                { data: "birlesik2_value", title: "Birleşik-2" },
            ],
            searching: false,
            scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,

            "info": false
        });
        result_table.on('order.dt search.dt', function () {
            result_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();


        var genel_result = document.getElementById('zamanlama_genel_result').getContext('2d');
        var myChart = new Chart(genel_result, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: 'Temel-1',
                    data: temel1result,
                    backgroundColor: [
                        '#F64E60'
                    ],
                    borderColor: [
                        '#F64E60'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },
                {
                    label: 'Temel-2',
                    data: temel2result,
                    backgroundColor: [
                        '#21618c'
                    ],
                    borderColor: [
                        '#21618c'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Görsel-1',
                    data: gorsel1result,
                    backgroundColor: [
                        '#FFA800'
                    ],
                    borderColor: [
                        '#FFA800'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                }, {
                    label: 'Görsel-2',
                    data: gorsel2result,
                    borderColor: [
                        '#181C32'
                    ],
                    backgroundColor: [
                        '#181C32'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                },
                {
                    label: 'İşitsel-1',
                    data: isitsel1result,
                    backgroundColor: [
                        '#3699FF'
                    ],
                    borderColor: [
                        '#3699FF'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'İşitsel-2',
                    data: isitsel2result,
                    backgroundColor: [
                        '#8950FC'
                    ],
                    borderColor: [
                        '#8950FC'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-1',
                    data: birlesik1result,
                    backgroundColor: [
                        '#1BC5BD'
                    ],
                    borderColor: [
                        '#1BC5BD'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-2',
                    data: birlesik2result,
                    backgroundColor: [
                        '#663259'
                    ],
                    borderColor: [
                        '#663259'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart - Different point sizes'
                    }
                },
                hover: {
                    mode: 'index'
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
        })



        var testsum = 0, gorselsum = 0, gorsel2sum = 0, isitselsum = 0, isitsel2sum = 0, birlesiksum = 0, birlesik2sum = 0, temel2sum = 0;
        //temel1 general performance
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
            gorselsum += gorsel1_value[i];
            gorsel2sum += gorsel2_value[i];
            isitselsum += isitsel1_value[i];
            isitsel2sum += isitsel2_value[i];
            birlesiksum += birlesik1_value[i];
            birlesik2sum += birlesik2_value[i];
            temel2sum += temel2_value[i]
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        gorselsum = gorselsum.toFixed(3);
        gorselsum = Number(gorselsum)
        gorsel2sum = gorsel2sum.toFixed(3);
        gorsel2sum = Number(gorsel2sum)
        isitselsum = isitselsum.toFixed(3);
        isitselsum = Number(isitselsum)
        isitsel2sum = isitsel2sum.toFixed(3);
        isitsel2sum = Number(isitsel2sum)

        birlesiksum = birlesiksum.toFixed(3);
        birlesiksum = Number(birlesiksum)
        birlesik2sum = birlesik2sum.toFixed(3);
        birlesik2sum = Number(birlesik2sum)
        temel2sum = temel2sum.toFixed(3);
        temel2sum = Number(temel2sum)

        //temel1 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_t1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['danger'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['danger'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel1 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_g1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorselsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['warning'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['warning'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['warning']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel2 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_g2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorsel2sum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['dark'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['dark'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['dark']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_i1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitselsum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['primary'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['primary'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['primary']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel2 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_i2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitsel2sum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['info'],
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
                        background: KTApp.getSettings()['colors']['theme']['light']['info'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['info']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //birleşik1 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_b1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [birlesiksum],
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
                            color: KTApp.getSettings()['colors']['theme']['base']['success'],
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
        //birleşik 2 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_b2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [birlesik2sum],
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
                            color: '#663259',
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
                        background: KTApp.getSettings()['colors']['theme']['light']['info'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: ['#663259'],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("zamanlama_general_value_chart_t2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [temel2sum],
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
                            color: '#21618c',
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
            colors: ['#21618c'],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

    }
    function performanceIAnalize(testResults) {
    var testdate = [], testresult = [], testvalue = [], temel2_value = [], gorsel1_value = [], gorsel2_value = [], isitsel1_value = [], isitsel2_value = [], birlesik1_value = [], birlesik2_value = [];
            var temel1result = [], temel2result = [], gorsel1result = [], gorsel2result = [], isitsel1result = [], isitsel2result = [], birlesik1result = [], birlesik2result = [];
            var sum = 0, testsum = 0;
            var genel = [];

            testResults.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            console.log(testResults)
            for (var i = 0; i < testResults.length; i++) {
                testdate.push(convertDate(testResults[i].date));
                temel1result.push(testResults[i].temel_1)
                temel2result.push(testResults[i].temel_2)
                gorsel1result.push(testResults[i].gorsel_1)
                gorsel2result.push(testResults[i].gorsel_2)
                isitsel1result.push(testResults[i].isitsel_1)
                isitsel2result.push(testResults[i].isitsel_2)
                birlesik1result.push(testResults[i].birlesik_1)
                birlesik2result.push(testResults[i].birlesik_2)
            }
            //format date
            function convertDate(inputFormat) {
                function pad(s) { return (s < 10) ? '0' + s : s; }
                var d = new Date(inputFormat)
                return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
            }
            console.log(testdate)
            for (var i = 0; i < temel1result.length - 1; i++) {
                sum = temel1result[i + 1] - temel1result[i];
            }
            //ay bazında performans ve random renk seçimi
            var color = [];
            var performance = [];
            function randomColorFactor() {
                var r = function () { return Math.floor(Math.random() * 256) };
                return "rgb(" + r() + "," + r() + "," + r() + ")";
            }
            var performance = [];
            for (var i = 0; i < testdate.length - 1; i++) {
                color.push(randomColorFactor());
                performance.push(testdate[i] + "- " + testdate[i + 1])
            }

            for (var i = 0; i < temel1result.length - 1; i++) {
                sum = temel1result[i + 1] - temel1result[i];
                temel2_sum = temel2result[i + 1] - temel2result[i];
                gorsel1_sum = gorsel1result[i + 1] - gorsel1result[i];
                gorsel2_sum = gorsel2result[i + 1] - gorsel2result[i];
                isitsel1_sum = isitsel1result[i + 1] - isitsel1result[i];
                isitsel2_sum = isitsel2result[i + 1] - isitsel2result[i];
                birlesik1_sum = birlesik1result[i + 1] - birlesik1result[i];
                birlesik2_sum = birlesik2result[i + 1] - birlesik2result[i];
                sum = sum.toFixed(3);
                sum = Number(sum);

                temel2_sum = temel2_sum.toFixed(3);
                temel2_sum = Number(temel2_sum);

                gorsel1_sum = gorsel1_sum.toFixed(3);
                gorsel1_sum = Number(gorsel1_sum);

                gorsel2_sum = gorsel2_sum.toFixed(3);
                gorsel2_sum = Number(gorsel2_sum);

                isitsel1_sum = isitsel1_sum.toFixed(3);
                isitsel1_sum = Number(isitsel1_sum);

                isitsel2_sum = isitsel2_sum.toFixed(3);
                isitsel2_sum = Number(isitsel2_sum);

                birlesik1_sum = birlesik1_sum.toFixed(3);
                birlesik1_sum = Number(birlesik1_sum);

                birlesik2_sum = birlesik2_sum.toFixed(3);
                birlesik2_sum = Number(birlesik2_sum);

                testvalue.push(sum);
                temel2_value.push(temel2_sum);
                gorsel1_value.push(gorsel1_sum);
                gorsel2_value.push(gorsel2_sum);
                isitsel1_value.push(isitsel1_sum);
                isitsel2_value.push(isitsel2_sum);
                birlesik1_value.push(birlesik1_sum);
                birlesik2_value.push(birlesik2_sum);
            }

            for (var i = 0; i < testvalue.length; i++) {
                genel[i] = {
                    performance: performance[i],
                    testvalue: testvalue[i],
                    temel2_value: temel2_value[i],
                    gorsel1_value: gorsel1_value[i],
                    gorsel2_value: gorsel2_value[i],
                    isitsel1_value: isitsel1_value[i],
                    isitsel2_value: isitsel2_value[i],
                    birlesik1_value: birlesik1_value[i],
                    birlesik2_value: birlesik2_value[i]
                }
            }
            var result_table = $('#durtusellik_result_datatable').DataTable({
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                data: genel,
                columns: [
                    { "data": null, title: "#" },
                    { data: "performance", title: "TEST TARİHİ" },
                    { data: "testvalue", title: "Temel-1" },
                    { data: "temel2_value", title: "Temel-2" },
                    { data: "gorsel1_value", title: "Görsel-1" },
                    { data: "gorsel2_value", title: "Görsel-2" },
                    { data: "isitsel1_value", title: "İşitsel-1" },
                    { data: "isitsel2_value", title: "İşitsel-2" },
                    { data: "birlesik1_value", title: "Birleşik-1" },
                    { data: "birlesik2_value", title: "Birleşik-2" },
                ],
                searching: false,
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                paging: false,

                "info": false
            });
            result_table.on('order.dt search.dt', function () {
                result_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();


            var genel_result = document.getElementById('durtusellik_genel_result').getContext('2d');
            var myChart = new Chart(genel_result, {
                type: 'line',
                data: {
                    labels: testdate,
                    datasets: [{
                        label: 'Temel-1',
                        data: temel1result,
                        backgroundColor: [
                            '#F64E60'
                        ],
                        borderColor: [
                            '#F64E60'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    },
                    {
                        label: 'Temel-2',
                        data: temel2result,
                        backgroundColor: [
                            '#21618c'
                        ],
                        borderColor: [
                            '#21618c'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    }, {
                        label: 'Görsel-1',
                        data: gorsel1result,
                        backgroundColor: [
                            '#FFA800'
                        ],
                        borderColor: [
                            '#FFA800'
                        ],
                        fill: false,
                        pointHitRadius: 20,

                    }, {
                        label: 'Görsel-2',
                        data: gorsel2result,
                        borderColor: [
                            '#181C32'
                        ],
                        backgroundColor: [
                            '#181C32'
                        ],
                        fill: false,
                        pointHitRadius: 20,

                    },
                    {
                        label: 'İşitsel-1',
                        data: isitsel1result,
                        backgroundColor: [
                            '#3699FF'
                        ],
                        borderColor: [
                            '#3699FF'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    }, {
                        label: 'İşitsel-2',
                        data: isitsel2result,
                        backgroundColor: [
                            '#8950FC'
                        ],
                        borderColor: [
                            '#8950FC'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    }, {
                        label: 'Birleşik-1',
                        data: birlesik1result,
                        backgroundColor: [
                            '#1BC5BD'
                        ],
                        borderColor: [
                            '#1BC5BD'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    }, {
                        label: 'Birleşik-2',
                        data: birlesik2result,
                        backgroundColor: [
                            '#663259'
                        ],
                        borderColor: [
                            '#663259'
                        ],
                        fill: false,
                        pointHitRadius: 20,
                    },]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Different point sizes'
                        }
                    },
                    hover: {
                        mode: 'index'
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
            })



            var testsum = 0, gorselsum = 0, gorsel2sum = 0, isitselsum = 0, isitsel2sum = 0, birlesiksum = 0, birlesik2sum = 0, temel2sum = 0;
            //temel1 general performance
            for (var i = 0; i < testvalue.length; i++) {
                testsum += testvalue[i];
                gorselsum += gorsel1_value[i];
                gorsel2sum += gorsel2_value[i];
                isitselsum += isitsel1_value[i];
                isitsel2sum += isitsel2_value[i];
                birlesiksum += birlesik1_value[i];
                birlesik2sum += birlesik2_value[i];
                temel2sum += temel2_value[i]
            }
            testsum = testsum.toFixed(3);
            testsum = Number(testsum);
            gorselsum = gorselsum.toFixed(3);
            gorselsum = Number(gorselsum)
            gorsel2sum = gorsel2sum.toFixed(3);
            gorsel2sum = Number(gorsel2sum)
            isitselsum = isitselsum.toFixed(3);
            isitselsum = Number(isitselsum)
            isitsel2sum = isitsel2sum.toFixed(3);
            isitsel2sum = Number(isitsel2sum)

            birlesiksum = birlesiksum.toFixed(3);
            birlesiksum = Number(birlesiksum)
            birlesik2sum = birlesik2sum.toFixed(3);
            birlesik2sum = Number(birlesik2sum)
            temel2sum = temel2sum.toFixed(3);
            temel2sum = Number(temel2sum)

            //temel1 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_t1");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [testsum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['danger'],
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
                            background: KTApp.getSettings()['colors']['theme']['light']['danger'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //gorsel1 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_g1");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [gorselsum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['warning'],
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
                            background: KTApp.getSettings()['colors']['theme']['light']['warning'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: [KTApp.getSettings()['colors']['theme']['base']['warning']],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //gorsel2 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_g2");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [gorsel2sum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['dark'],
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
                            background: KTApp.getSettings()['colors']['theme']['light']['dark'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: [KTApp.getSettings()['colors']['theme']['base']['dark']],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //işitsel1 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_i1");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [isitselsum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['primary'],
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
                            background: KTApp.getSettings()['colors']['theme']['light']['primary'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: [KTApp.getSettings()['colors']['theme']['base']['primary']],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //işitsel2 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_i2");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [isitsel2sum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['info'],
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
                            background: KTApp.getSettings()['colors']['theme']['light']['info'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: [KTApp.getSettings()['colors']['theme']['base']['info']],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //birleşik1 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_b1");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [birlesiksum],
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
                                color: KTApp.getSettings()['colors']['theme']['base']['success'],
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
            //birleşik 2 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_b2");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [birlesik2sum],
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
                                color: '#663259',
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
                            background: KTApp.getSettings()['colors']['theme']['light']['info'],
                            strokeWidth: '100%'
                        }
                    }
                },
                colors: ['#663259'],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

            //işitsel1 genel performans chart
            var element = document.getElementById("durtusellik_general_value_chart_t2");
            var height = parseInt(KTUtil.css(element, 'height'));
            if (!element) {
                return;
            }
            var options = {
                series: [temel2sum],
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
                                color: '#21618c',
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
                colors: ['#21618c'],
                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]
            };

            var chart = new ApexCharts(element, options);
            chart.render();

    }
    function performanceHAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [], temel2_value = [], gorsel1_value = [], gorsel2_value = [], isitsel1_value = [], isitsel2_value = [], birlesik1_value = [], birlesik2_value = [];
                var temel1result = [], temel2result = [], gorsel1result = [], gorsel2result = [], isitsel1result = [], isitsel2result = [], birlesik1result = [], birlesik2result = [];
                var sum = 0, testsum = 0;
                var genel = [];

                testResults.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
                console.log(testResults)
                for (var i = 0; i < testResults.length; i++) {
                    testdate.push(convertDate(testResults[i].date));
                    temel1result.push(testResults[i].temel_1)
                    temel2result.push(testResults[i].temel_2)
                    gorsel1result.push(testResults[i].gorsel_1)
                    gorsel2result.push(testResults[i].gorsel_2)
                    isitsel1result.push(testResults[i].isitsel_1)
                    isitsel2result.push(testResults[i].isitsel_2)
                    birlesik1result.push(testResults[i].birlesik_1)
                    birlesik2result.push(testResults[i].birlesik_2)
                }
                //format date
                function convertDate(inputFormat) {
                    function pad(s) { return (s < 10) ? '0' + s : s; }
                    var d = new Date(inputFormat)
                    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
                }
                console.log(testdate)
                for (var i = 0; i < temel1result.length - 1; i++) {
                    sum = temel1result[i + 1] - temel1result[i];
                }
                //ay bazında performans ve random renk seçimi
                var color = [];
                var performance = [];
                function randomColorFactor() {
                    var r = function () { return Math.floor(Math.random() * 256) };
                    return "rgb(" + r() + "," + r() + "," + r() + ")";
                }
                var performance = [];
                for (var i = 0; i < testdate.length - 1; i++) {
                    color.push(randomColorFactor());
                    performance.push(testdate[i] + "- " + testdate[i + 1])
                }

                for (var i = 0; i < temel1result.length - 1; i++) {
                    sum = temel1result[i + 1] - temel1result[i];
                    temel2_sum = temel2result[i + 1] - temel2result[i];
                    gorsel1_sum = gorsel1result[i + 1] - gorsel1result[i];
                    gorsel2_sum = gorsel2result[i + 1] - gorsel2result[i];
                    isitsel1_sum = isitsel1result[i + 1] - isitsel1result[i];
                    isitsel2_sum = isitsel2result[i + 1] - isitsel2result[i];
                    birlesik1_sum = birlesik1result[i + 1] - birlesik1result[i];
                    birlesik2_sum = birlesik2result[i + 1] - birlesik2result[i];
                    sum = sum.toFixed(3);
                    sum = Number(sum);

                    temel2_sum = temel2_sum.toFixed(3);
                    temel2_sum = Number(temel2_sum);

                    gorsel1_sum = gorsel1_sum.toFixed(3);
                    gorsel1_sum = Number(gorsel1_sum);

                    gorsel2_sum = gorsel2_sum.toFixed(3);
                    gorsel2_sum = Number(gorsel2_sum);

                    isitsel1_sum = isitsel1_sum.toFixed(3);
                    isitsel1_sum = Number(isitsel1_sum);

                    isitsel2_sum = isitsel2_sum.toFixed(3);
                    isitsel2_sum = Number(isitsel2_sum);

                    birlesik1_sum = birlesik1_sum.toFixed(3);
                    birlesik1_sum = Number(birlesik1_sum);

                    birlesik2_sum = birlesik2_sum.toFixed(3);
                    birlesik2_sum = Number(birlesik2_sum);

                    testvalue.push(sum);
                    temel2_value.push(temel2_sum);
                    gorsel1_value.push(gorsel1_sum);
                    gorsel2_value.push(gorsel2_sum);
                    isitsel1_value.push(isitsel1_sum);
                    isitsel2_value.push(isitsel2_sum);
                    birlesik1_value.push(birlesik1_sum);
                    birlesik2_value.push(birlesik2_sum);
                }

                for (var i = 0; i < testvalue.length; i++) {
                    genel[i] = {
                        performance: performance[i],
                        testvalue: testvalue[i],
                        temel2_value: temel2_value[i],
                        gorsel1_value: gorsel1_value[i],
                        gorsel2_value: gorsel2_value[i],
                        isitsel1_value: isitsel1_value[i],
                        isitsel2_value: isitsel2_value[i],
                        birlesik1_value: birlesik1_value[i],
                        birlesik2_value: birlesik2_value[i]
                    }
                }
                var result_table = $('#hiperaktivite_result_datatable').DataTable({
                    "language": {
                        "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                    },
                    data: genel,
                    columns: [
                        { "data": null, title: "#" },
                        { data: "performance", title: "TEST TARİHİ" },
                        { data: "testvalue", title: "Temel-1" },
                        { data: "temel2_value", title: "Temel-2" },
                        { data: "gorsel1_value", title: "Görsel-1" },
                        { data: "gorsel2_value", title: "Görsel-2" },
                        { data: "isitsel1_value", title: "İşitsel-1" },
                        { data: "isitsel2_value", title: "İşitsel-2" },
                        { data: "birlesik1_value", title: "Birleşik-1" },
                        { data: "birlesik2_value", title: "Birleşik-2" },
                    ],
                    searching: false,
                    scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    paging: false,

                    "info": false
                });
                result_table.on('order.dt search.dt', function () {
                    result_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                }).draw();


                var genel_result = document.getElementById('hiperaktivite_genel_result').getContext('2d');
                var myChart = new Chart(genel_result, {
                    type: 'line',
                    data: {
                        labels: testdate,
                        datasets: [{
                            label: 'Temel-1',
                            data: temel1result,
                            backgroundColor: [
                                '#F64E60'
                            ],
                            borderColor: [
                                '#F64E60'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        },
                        {
                            label: 'Temel-2',
                            data: temel2result,
                            backgroundColor: [
                                '#21618c'
                            ],
                            borderColor: [
                                '#21618c'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        }, {
                            label: 'Görsel-1',
                            data: gorsel1result,
                            backgroundColor: [
                                '#FFA800'
                            ],
                            borderColor: [
                                '#FFA800'
                            ],
                            fill: false,
                            pointHitRadius: 20,

                        }, {
                            label: 'Görsel-2',
                            data: gorsel2result,
                            borderColor: [
                                '#181C32'
                            ],
                            backgroundColor: [
                                '#181C32'
                            ],
                            fill: false,
                            pointHitRadius: 20,

                        },
                        {
                            label: 'İşitsel-1',
                            data: isitsel1result,
                            backgroundColor: [
                                '#3699FF'
                            ],
                            borderColor: [
                                '#3699FF'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        }, {
                            label: 'İşitsel-2',
                            data: isitsel2result,
                            backgroundColor: [
                                '#8950FC'
                            ],
                            borderColor: [
                                '#8950FC'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        }, {
                            label: 'Birleşik-1',
                            data: birlesik1result,
                            backgroundColor: [
                                '#1BC5BD'
                            ],
                            borderColor: [
                                '#1BC5BD'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        }, {
                            label: 'Birleşik-2',
                            data: birlesik2result,
                            backgroundColor: [
                                '#663259'
                            ],
                            borderColor: [
                                '#663259'
                            ],
                            fill: false,
                            pointHitRadius: 20,
                        },]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: true,
                                text: 'Chart.js Line Chart - Different point sizes'
                            }
                        },
                        hover: {
                            mode: 'index'
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
                })



                var testsum = 0, gorselsum = 0, gorsel2sum = 0, isitselsum = 0, isitsel2sum = 0, birlesiksum = 0, birlesik2sum = 0, temel2sum = 0;
                //temel1 general performance
                for (var i = 0; i < testvalue.length; i++) {
                    testsum += testvalue[i];
                    gorselsum += gorsel1_value[i];
                    gorsel2sum += gorsel2_value[i];
                    isitselsum += isitsel1_value[i];
                    isitsel2sum += isitsel2_value[i];
                    birlesiksum += birlesik1_value[i];
                    birlesik2sum += birlesik2_value[i];
                    temel2sum += temel2_value[i]
                }
                testsum = testsum.toFixed(3);
                testsum = Number(testsum);
                gorselsum = gorselsum.toFixed(3);
                gorselsum = Number(gorselsum)
                gorsel2sum = gorsel2sum.toFixed(3);
                gorsel2sum = Number(gorsel2sum)
                isitselsum = isitselsum.toFixed(3);
                isitselsum = Number(isitselsum)
                isitsel2sum = isitsel2sum.toFixed(3);
                isitsel2sum = Number(isitsel2sum)

                birlesiksum = birlesiksum.toFixed(3);
                birlesiksum = Number(birlesiksum)
                birlesik2sum = birlesik2sum.toFixed(3);
                birlesik2sum = Number(birlesik2sum)
                temel2sum = temel2sum.toFixed(3);
                temel2sum = Number(temel2sum)

                //temel1 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_t1");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [testsum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['danger'],
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
                                background: KTApp.getSettings()['colors']['theme']['light']['danger'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //gorsel1 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_g1");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [gorselsum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['warning'],
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
                                background: KTApp.getSettings()['colors']['theme']['light']['warning'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: [KTApp.getSettings()['colors']['theme']['base']['warning']],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //gorsel2 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_g2");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [gorsel2sum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['dark'],
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
                                background: KTApp.getSettings()['colors']['theme']['light']['dark'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: [KTApp.getSettings()['colors']['theme']['base']['dark']],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //işitsel1 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_i1");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [isitselsum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['primary'],
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
                                background: KTApp.getSettings()['colors']['theme']['light']['primary'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: [KTApp.getSettings()['colors']['theme']['base']['primary']],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //işitsel2 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_i2");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [isitsel2sum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['info'],
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
                                background: KTApp.getSettings()['colors']['theme']['light']['info'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: [KTApp.getSettings()['colors']['theme']['base']['info']],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //birleşik1 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_b1");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [birlesiksum],
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
                                    color: KTApp.getSettings()['colors']['theme']['base']['success'],
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
                //birleşik 2 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_b2");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [birlesik2sum],
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
                                    color: '#663259',
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
                                background: KTApp.getSettings()['colors']['theme']['light']['info'],
                                strokeWidth: '100%'
                            }
                        }
                    },
                    colors: ['#663259'],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();

                //işitsel1 genel performans chart
                var element = document.getElementById("hiperaktivite_general_value_chart_t2");
                var height = parseInt(KTUtil.css(element, 'height'));
                if (!element) {
                    return;
                }
                var options = {
                    series: [temel2sum],
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
                                    color: '#21618c',
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
                    colors: ['#21618c'],
                    stroke: {
                        lineCap: "round",
                    },
                    labels: ["Progress"]
                };

                var chart = new ApexCharts(element, options);
                chart.render();
    }

})