$(document).ready(function () {
    //==================================
    // Our variables and Event Listeners
    //==================================
    const RETURN_NUM = 10;

    var userDateSubmitButton = $(".user-date-submit-button");
    var imageSubmitButton = $(".image-submit-button");
    var urlSubmitButton = $(".url-submit-button");
    var inputDate = $(".datepicker");
    var imageUrl = $(".image-url");
    var fileInput = $(".file-input");
    var userDateLabel = $(".user-date-label");

    var result1Sec = $(".result1");
    var result2Sec = $(".result2");

    //=====================================
    // Setting up the datepicker for b-days
    //=====================================
    $('.datepicker').datepicker({
        // dateFormat: 'yyyy-mm-dd',
        // // minDate:'1900-01-01',
        // maxDate:'2019-12-31',
        yearRange: 99,
        maxYear: "2019",

    });

    //==============================================
    // Checking local storage to pre-write b-day for
    // the same user.
    //==============================================
    let storedUserDate = window.localStorage.getItem("birthday");
    if (storedUserDate !== null) {
        inputDate.val(storedUserDate);
        userDateLabel.text("");
    }

    /**
     * When button for manual birthday input is clicked
     */
    $(userDateSubmitButton).on("click", function (event) {
        event.preventDefault();
        emptyResults();


        let date = inputDate.val();
        window.localStorage.setItem("birthday", date);
        inputDate.val("");
        userDateLabel.text("Enter Date");
        let now = moment();
        let age = Math.abs(moment(date, "MMM-DD-YYYY").diff(now, "years"));
        console.log(`This person's bday is: ${inputDate}`);
        console.log(`This person's age is: ${age}`);
        let m = moment(date, "MMM-DD-YYYY");
        //calling jsonGetter
        jsonGetter(m);
    });

    /**
     * When button for file upload is clicked
     */
    $(imageSubmitButton).on("click", function (event) {
        event.preventDefault();
        emptyResults();

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
            // console.log(`Docs received from NYT: `);
            // console.log(docs);
            for (let i = 0; i < RETURN_NUM && i < docs.length; i ++) {
                let currDoc = docs[i];
                let currHeadLine = currDoc.headline.main;
                let currUrl = currDoc.web_url;
                // console.log((`${i} headline: ${currHeadLine}, url: ${currUrl}`));
                // console.log(currDoc)
                
                //To add information to the display...

                //Create unordered list to help with spacing...
                let ntyView = $("<ul>")
                //Rather than having all information jammed into the cards, let's make the headlines links with the anchor tags...
                let ntyURL = $('<a>',{
                    text: `${currHeadLine}`,
                    href: `${currUrl}`,
                }).appendTo(ntyView);

                //Push links to the new list, then to the empty div...
                result1Sec.append(ntyView)

                //A little css to help with text going outside the container -- I know we shouldn't use css in jquery, can move later

                ntyView.css("font-weight", "bold", "font-size", "12px");
                $('#results1').css({'width':'auto','height':'auto','display':'table'})
                // $('#results2').css({'width':'auto','height':'auto','display':'table'})
                // $('#results3').css({'width':'auto','height':'auto','display':'table'})

                    
                

                
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
            url: "https://api.themoviedb.org/3/search/movie?",
            method: "GET",
            data: {
                api_key : "b9e5748e9383118720dd1c55b3461828",
                language : "en-US",
                query : "movie",
                page: "1",
                include_adult : "false",
                year : year,
            }
        }).done(function(response) {
            console.log(`Movie db response:`);
            console.log(response);
            let moviesList = response.results;
            for (let i = 0; i < RETURN_NUM && i < moviesList.length - 1; i ++) {
                let currMovie = moviesList[i];
                let currName = currMovie.title;
                

                $.ajax({
                    url: "http://www.omdbapi.com/?",
                    method: 'GET',
                    data: {
                        apikey: "eb2479f0",
                        s : currName,
                        y : year
                    }
                }).done(function (result) {
                    console.log(`Movie: ${currName}| data:`);
                    console.log(result);
                    if (result.Response === "False") {
                        console.log(`Movie does not exist`);
                        return;
                    }
                    console.log(result)
                    
                    let currOmdbData = result.Search
                    
                    console.log(currOmdbData)
                
                    for (let i = 0; i < RETURN_NUM && i < currOmdbData.length; i ++) {
                                            
                        let omdbTitle = result.Search[i].Title;
                        let omdbID = result.Search[i].imdbID;

                        console.log (omdbTitle);
                        console.log(omdbID);
                    
                        let omdbView = $("<ul>")
                        //Rather than having all information jammed into the cards, let's make the headlines links with the anchor tags...
                        let omdbURL = $('<a>',{
                            text: `${omdbTitle}`,
                            href: `https://www.imdb.com/title/${omdbID}/?ref_=nv_sr_1`,
                        }).appendTo(omdbView);
                        console.log(omdbURL)
                        //Push links to the new list, then to the empty div...
                        result2Sec.append(omdbView);
        
                        //A little css to help with text going outside the container -- I know we shouldn't use css in jquery, can move later
        
                        omdbView.css("font-weight", "bold", "font-size", "12px");
                        $('#results2').css({'width':'auto','height':'auto','display':'table'})

                    };
        
                }).fail(function (err) {
                    console.log(`Error in finding movie`);
                    console.log(err);
                });
            }
        
        })
    }

    function wikiGetter(mObj) {
        let year = mObj.get("year");
        
        // https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&exintro&exsentences=1&exlimit=max&gsrlimit=20&gsrsearch=hastemplate:Birth_date_and_age+Melanie_laurent&pithumbsize=100&pilimit=max&prop=pageimages%7Cextracts
//https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&exintro&exsentences=1&exlimit=max&gsrlimit=20&gsrsearch=hastemplate:Birth_date+Melanie_laurent&pithumbsize=100&pilimit=max&prop=pageimages%7Cextracts
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: { 
                action: 'query', 
                list: 'search', 
                srsearch: year, 
                format: 'json'
            },
            dataType: 'jsonp',
        }).done(function(response) {
            console.log(`From wiki`);
            console.log(response);
            
        })
    }


    /**
     * Function hub that takes in a Moment.js object
     * then run functions that query designated apis. 
     * @param {Moment} mObj 
     */
    function jsonGetter(mObj) {
        omdbGetter(mObj);
        nytGetter(mObj);
        wikiGetter(mObj);
    }

    //Clears out previous results -- tied to our click handlers.
    function emptyResults(){
        result1Sec.empty();
        result2Sec.empty();
        $("#result3").empty();
    }






});