$(document).ready(function () {

    var imageSubmitButton = $(".image-submit-button");
    var birthdaySubmitButton = $(".birthday-submit-button");
    var imageUrl = $(".image-url");
    var birthday = $(".birthday");
    
    $(imageSubmitButton).on("click", function() {

    });

    $(birthdaySubmitButton).on("click", function() {

    });

    $('.datepicker').datepicker();

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
        'begin_date': "20160101",    
        'end_date': "20170101"

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