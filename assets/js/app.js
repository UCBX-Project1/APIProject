$(document).ready(function () {

    var imageSubmitButton = $(".image-submit-button");
    var birthdaySubmitButton = $(".birthday-submit-button");
    var urlSubmitButton = $(".url-submit-button");
    var imageUrl = $(".image-url");
    var birthday = $(".birthday");

    $(birthdaySubmitButton).on("click", function(event) {
        event.preventDefault();

        
    });

    $(imageSubmitButton).on("click", function(event) {
        event.preventDefault();


    });

    $(urlSubmitButton).on("click", function(event) {
        event.preventDefault();

        let url = $(".image-url").val().trim();
        if (url.length < 1) {
            return;
        }
        $.ajax({
            url: "https://api-us.faceplusplus.com/facepp/v3/detect",
            method: "POST",
            data: {
                api_key: "LIaHwfw7KLomS1KKtUiyXVsnrQih_Y4i",
                api_secret: "c_qU60OC3uuVOhbZrNukuSmlTSohv1Ji",
                return_attributes: "age",
                image_url: `${url}`,
    
            }
        }).then(function (response) {
            console.log(response);

        });

    });

    $('.datepicker').datepicker();

    /**
     * Face ++
    
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
     */

    /**
     * NYTimes 
     
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
    */

    /**
     * omdbapi
    
    $.ajax({
        url: "http://www.omdbapi.com/?i=tt3896198&apikey=eb2479f0",
        method: 'GET',
    }).done(function (result) {
        console.log(result);
    }).fail(function (err) {
        throw err;
    });
     */















});