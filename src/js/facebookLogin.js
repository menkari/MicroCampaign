/**
 * Created by matthew.merryfull on 06-Feb-16.
 */

var _fbAppId = '177876855621874';

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

    console.log('statusChangeCallback');
    console.log(response);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {

        AWS.config.region = 'ap-northeast-1';

        // Submit the details through to Cognito..
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "ap-northeast-1:ad9d86ee-1c84-45c8-b210-f8ead02824d7",
            Logins: {
                'graph.facebook.com': response.authResponse.accessToken
            }
        });

        // Obtain AWS credentials..
        AWS.config.credentials.get(function(){

            var dynamoDb = new AWS.DynamoDB();

            var qryParams = {
                TableName: 'MicroCampaignPublic'
            };

            var list = document.getElementById('list');

            dynamoDb.scan(qryParams, function(error, data){
                console.log(data);
                for(var i = 0; i < data.Count; i++){
                    var personItem = document.createElement("li");
                    var personObj = data.Items[i];
                    personItem.innerHTML = personObj.Name.S +  ' ' + personObj.email.S;

                    list.appendChild(personItem);
                }
            })

        });

        // Logged into your app and Facebook.
        testAPI();

    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

}

window.fbAsyncInit = function () {
    FB.init({
        appId: _fbAppId,
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=name,id,email', function (response) {
        console.log('Successful login for: ' + response.name);

        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';

        document.getElementById('email').innerHTML = response.email;
    });

    FB.api('/me/picture?type=square', function (resp) {
        console.log(resp);
        document.getElementById('profileImage').setAttribute('src', resp.data.url);
    });
}
