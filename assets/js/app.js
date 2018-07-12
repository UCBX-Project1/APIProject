$(document).ready(function () {
    const RETURN_NUM = 10;

    var birthdaySubmitButton = $(".birthday-submit-button");
    var imageSubmitButton = $(".image-submit-button");
    var urlSubmitButton = $(".url-submit-button");
    var birthday = $(".datepicker");
    var imageUrl = $(".image-url");
    var fileInput = $(".file-input");
    var bdayLabel = $(".bday-label");

    $('.datepicker').datepicker({
        // dateFormat: 'yyyy-mm-dd',
        // // minDate:'1900-01-01',
        // maxDate:'2019-12-31',
        yearRange: 99,
        maxYear: "2019",

    });

    let storedBday = window.localStorage.getItem("birthday");
    if (storedBday !== null) {
        birthday.val(storedBday);
        bdayLabel.text("");
    }

    /**
     * When button for manual birthday input is clicked
     */
    $(birthdaySubmitButton).on("click", function (event) {
        event.preventDefault();

        let bday = birthday.val();
        window.localStorage.setItem("birthday", bday);
        birthday.val("");
        bdayLabel.text("Enter Birthday");
        let now = moment();
        let age = Math.abs(moment(bday, "MMM-DD-YYYY").diff(now, "years"));
        console.log(`This person's bday is: ${bday}`);
        console.log(`This person's age is: ${age}`);
        let m = moment(bday, "MMM-DD-YYYY");
        //calling jsonGetter
        jsonGetter(m);
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
                let currYear = moment().get("year");
                let m = moment().set('year', currYear - age);
                console.log(m);
                //calling jsonGetter
                jsonGetter(m);
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



    /**
     * Takes in a Moment.js object and query the NYT api, 
     * then update the display for webpage.
     * @param {Moment} mObj
     */
    function nytGetter(mObj) {
        let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        let year = mObj.get('year');
        $.ajax({
            url: url,
            method: 'GET',
            data: {
                'api-key': "2e3f2682de7e45c8860884647901b489",
                'begin_date': `${year}0101`,
                'end_date': `${year + 1}0101`,
            }
        }).done(function (result) {
            // console.log(result);
            let docs = result.response.docs;
            console.log(`Docs received from NYT: `);
            console.log(docs);
            for (let i = 0; i < RETURN_NUM; i ++) {
                let currDoc = docs[i];
                let currHeadLine = currDoc.headline.main;
                let currUrl = currDoc.web_url;
                console.log(`${i} headline: ${currHeadLine}, url: ${currUrl}`);
                
            }


        }).fail(function (err) {
            console.log(err);
        });
    }

    /**
     * Takes in a Moment.js object and query the omdb api, 
     * then update the display for webpage.
     * @param {Moment} mObj 
     */
    function omdbGetter(mObj) {
        let year = mObj.get("year");
        $.ajax({
            url: "http://www.omdbapi.com/?i=tt3896198&apikey=eb2479f0",
            method: 'GET',
            data: {
                apikey: "eb2479f0",
                y: year,
            }
        }).done(function (result) {
            console.log(result);




        }).fail(function (err) {
            console.log(err);
        });
    }


    /**
     * Function hub that takes in a Moment.js object
     * then run functions that query designated apis. 
     * @param {Moment} mObj 
     */
    function jsonGetter(mObj) {
        // omdbGetter(mObj);
        nytGetter(mObj);
    }







});