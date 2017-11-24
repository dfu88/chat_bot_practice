var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/834673c0-93ee-4109-97ba-82904517deaf/url?iterationId=ba607130-93aa-4157-add6-49c1b9d2b492',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '12b7887e7e07415f9819c8000c6de358'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}