# [HTML5 Boilerplate](https://html5boilerplate.com) with a couple of extras..

## This is not the official HTML5 boilerplate, if you're looking for that head on over here: [HTML5 Boilerplate](https://html5boilerplate.com)

HTML5 Boilerplate is a professional front-end template for building
fast, robust, and adaptable web apps or sites. I've added in a few bits
and pieces to allow things like social login (FB for now), AWS Cognito
and DynamoDb.

This project is really a starting point for anyone wanting to create a microsite,
marketing campaign site or anything similar. Most small websites require some
form of data capture, but traditionally this meant some form of intermediary like
an API or third party services in order to keep data or access secure. The whole
point is to provide rich functionality and keep the **COSTS LOW**

Because services like AWS Cognito use federated logins in order to authenticate
users, you can furnish your users with a multitude of login options without having
to write any authentication code yourself (unless you want to that is). The other
awesome thing is you can push settings to Cognito and they'll be available anywhere
the user is provided that they use the same login and cognito is implemented.

Seriously, you could run a single page application using Angular or React,
store the codebase in AWS S3, Azure Blob or Google Cloud Platform Bucket and have
data persisted like a normal database and run it for less than $5 per month (YMMV).

## Setup

Getting setup is easy. First you need to have a developer account setup on Facebook
by signing up to Facebook and heading to [https://developers.facebook.com](https://developers.facebook.com).
Then create a new application and make a note of your Facebook App ID.

Then you need an account on [AWS](https://aws.amazon.com).

Once you're up and running, you'll need to setup AWS Cognito by creating a new 
**Identity Pool**. You'll need to provide a _name_ under "Create new identity pool" and 
under "Authentication providers", choose the _Facebook_ tab and enter the _Facebook App ID_ 
from earlier. This will associate the Facebook application with this identity pool. 
Take note of your _IdentityPoolId_ as you will need to update that in the _js/facebookLogin.js_
file of the project.

Next up you'll need to create a new DynamoDb table, I've chosen **DemoCampaign** as my table
name just for ease of understanding, call it whatever you want. The table requires a _Key_ 
and type in "UserIdentity" and set the type as _String_. That's it for the setup.
Simply add in the Facebook App Id and Table name into the variables at the start of 
[https://github.com/menkari/MicroCampaign/blob/master/src/js/facebookLogin.js](https://github.com/menkari/MicroCampaign/blob/master/src/js/facebookLogin.js)

then run the project! You should get a screen which prompts you to log in using Facebook.
Once logged in, the user's name and email address will be added to the DynamoDB table.

Subsequent page loads will display the new user's details in the list along with their emali 
and profile picture.

## Notes

Make sure you have relevant terms and conditions for storing things like email and ensure that private
fields are secured stored.

## License

The code is available under the [MIT license](LICENSE.txt).
