$(document).ready(function () {

    $.ajax({
        url: "https://api-us.faceplusplus.com/facepp/v3/detect",
        method: "POST",
        data: {
            api_key: "LIaHwfw7KLomS1KKtUiyXVsnrQih_Y4i",
            api_secret: "c_qU60OC3uuVOhbZrNukuSmlTSohv1Ji",
            return_attributes: "age",
            image_url: "http://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bb.jpg",

        }
    }).then(function (response) {
        console.log(response);


    });













});