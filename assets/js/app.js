$(document).ready(function () {

    var birthdaySubmitButton = $(".birthday-submit-button");
    var imageSubmitButton = $(".image-submit-button");
    var urlSubmitButton = $(".url-submit-button");
    var birthday = $(".birthday");
    var imageUrl = $(".image-url");
    var fileInput = $(".file-input");

    $('.datepicker').datepicker({
        // dateFormat: 'yyyy-mm-dd',
        // // minDate:'1900-01-01',
        // maxDate:'2019-12-31',
        yearRange: 99,
        maxYear: "2019",

    });

    /**
     * When button for manual birthday input is clicked
     */
    $(birthdaySubmitButton).on("click", function (event) {
        event.preventDefault();


    });

    /**
     * When button for file upload is clicked
     */
    $(imageSubmitButton).on("click", function (event) {
        event.preventDefault();

        let file = fileInput[0].files[0];
        console.log(`File uploaded:`);
        console.log(file);

        let oReq = new XMLHttpRequest();
        oReq.open("POST", file, true);
        oReq.send();
    });

    /**
     * When button for URL option is clicked
     */
    $(urlSubmitButton).on("click", function (event) {
        event.preventDefault();

        let url = imageUrl.val().trim();
        imageUrl.val("");

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
            let faces = response.faces;
            if (faces.length > 0) {
                let age = faces[0].attributes.age.value;
                console.log(`The predicted age is: ${age}`);


            }
        });

    });


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