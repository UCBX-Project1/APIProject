$(document).ready(function () {


    $('.datepicker').datepicker();

    $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 50, 
    min: new Date(1945,1,1),
    max: true  // `true` sets it to today. `false` removes any limits.
    });


    $.ajax({
        url: "https://api-us.faceplusplus.com/facepp/v3/detect",
        method: "POST",
        data: {
            api_key: "LIaHwfw7KLomS1KKtUiyXVsnrQih_Y4i",
            api_secret: "c_qU60OC3uuVOhbZrNukuSmlTSohv1Ji",
            return_attributes: "age",
            image_url: "",

        }
    }).then(function (response) {
        console.log(response);


    });

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "2e3f2682de7e45c8860884647901b489",
        'begin_date': "",    
        'end_date': ""

    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
    }).fail(function (err) {
        throw err;
    });

    
    // var url = "http://www.omdbapi.com/?i=tt3896198";
    // url += '?' + $.param({
    //     'apikey': "eb2479f0",

    // });
    $.ajax({
        url: "http://www.omdbapi.com/?i=tt3896198&apikey=eb2479f0",
        method: 'GET',
    }).done(function (result) {
        console.log(result);
    }).fail(function (err) {
        throw err;
    });
















});