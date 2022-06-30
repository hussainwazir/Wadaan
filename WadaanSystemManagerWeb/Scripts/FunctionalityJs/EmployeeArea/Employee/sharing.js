 
 //var facebookBtn = document.getElementById("facebook-btn");


var whatsappBtn = document.getElementById("whatsapp-btn");
 
$("#facebook-btn").click(function () {
    
    
   // var currentUrll = 'httpss://xtremesproperty.com/Home/Propertydetail?-plot-in-asc-colony-nowshera?4bd74c5e-4b66-4e86-8cd4-ec9db5514f14';
    var currentUrl = document.URL;
    
   // console.log(encodeURIComponent(currentUrl)); 
    window.open('http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');


});
//--------------------New fb ----------------------------------------------------
  
    //var leftPosition, topPosition='';
    //var  width, height = 0;
    //    //Allow for borders.
    //    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //    //Allow for title and status bars.
    //    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //u = 'httpss://xtremesproperty.com/Home/Propertydetail?-plot-in-asc-colony-nowshera?4bd74c5e-4b66-4e86-8cd4-ec9db5514f14';
    //  //  t = document.title;
    //t = document.URL.split('?')[1];
    //    window.open('httpp://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', windowFeatures);
         


//$("#twitter-btn").click(function () {
//    var currentUrl = encodeURI("httpss://xtremesproperty.com/" + $('.owl-stage a :first img').attr('src').replace('../../', ''));

//    window.open('httpss://twitter.com/share?url=${currentUrl}&text=${currentTitle}', '_blank');

//}); 

//$("#linkedin-btn").click(function () {
//    //var currentUrl = encodeURI("httpss://xtremesproperty.com/" + $('.owl-stage a :first img').attr('src').replace('../../', ''));
//    //var currentUrl = encodeURI(window.location.href);
//    //window.open('httpss://www.linkedin.com/shareArticle?url=${currentUrl}&title=[currentTitle]', '_blank');

     
//    var currentUrl = 'httpss://xtremesproperty.com/Home/Propertydetail?2.25-marla-ijazabad-nimra-street-fresh-house-for-sale?5371b27f-1553-4246-bb3a-9c6dbc3d318f' ;0 // document.URL;
//    var currentTitle = currentUrl.split('?')[1];



//   // var creatingMsg = currentTitle + "\r\n\r\n" + "|PLEASE CLICK ON BELOW LINK TO CHECK COMPLETE DETAILS|\r\n\r\n"
//    //var LinkedinMessage = window.encodeURI(creatingMsg)

//   // window.open('httpss://www.linkedin.com/shareArticle?url=' + currentUrl, '_blank');
//    window.open('httpss://www.linkedin.com/sharing/share-offsite/?url=' + currentUrl, '_blank');
    


//});

//--------------------Start---------------------
 
//$("#whatsapp-btn").click(function () {

function whatsapp_btn()
{

        // var currentUrl = encodeURI("httpss://xtremesproperty.com/" + $('.owl-stage a :first img').attr('src').replace('../../', ''));
        //var currentUrl = 'httpss://xtremesproperty.com/Home/Propertydetail?2.25-marla-ijazabad-nimra-street-fresh-house-for-sale?5371b27f-1553-4246-bb3a-9c6dbc3d318f';
        var currentUrl = document.URL;
        var currentTitle = currentUrl.split('?')[1];


        var creatingMsg = currentTitle + "\r\n\r\n" + "|PLEASE CLICK ON BELOW LINK TO CHECK COMPLETE DETAILS|\r\n\r\n"
        var whatsappMessage = window.encodeURIComponent(creatingMsg)

        window.open('https://wa.me/?text=' + whatsappMessage + currentUrl, '_blank');
}
   
//}); 

//----------------------------END------------------------------

//$("#pinterest-btn").click(function () {
//    //var currentUrl = encodeURI("httpss://xtremesproperty.com/" + $('.owl-stage a :first img').attr('src').replace('../../', ''));
//    var currentUrl = encodeURI(window.location.href);
//    window.open('httpss://pinterest.com/pin/create/bookmarklet/?media=${postImg}&url=${currentUrl}&description=${currentTitle}', '_blank');

//});

function init() {
   
    $(".pinterest-img").attr("src", $('.dbImg').attr("src"));
    const pinterestImg = document.querySelector(".pinterest-img");
    var currentUrl = encodeURI(document.location.href);
    var currentTitle = encodeURI("please check this: ");

    var postImg = encodeURI("https://xtremesproperty.com/" + $('.owl-stage a :first img').attr('src').replace('../../', ''));
    postUrl = postImg;

     
    facebookBtn.setAttribute(
        "href",
        'https://www.facebook.com/sharer.php?u=${currentUrll}'

    );
    whatsappBtn.setAttribute(
       "href",
         'https://wa.me/?text=${currentTitle}=${currentUrl}'
    );


}
//--------------------------------------------------------- NEW CODE ---------------------------------------------------------------------

//$(document).ready(function () {
    
//        createHtml();
//    });

//    //create html //
//            function createHtml() {               
//                var title = "How to Authenticate and Get Data Using Instagram API";
//    //var summary = encodeURIComponent("This article explains how to authenticate an Instagram API and how to get user photos, user details and popular photos using the Instagram API.");
//   // var url = location.href;
//                var url = 'httpss://xtremesproperty.com/Home/Propertydetail?2.25-marla-ijazabad-nimra-street-fresh-house-for-sale?5371b27f-1553-4246-bb3a-9c6dbc3d318f';
//    var image = 'httpp://www.c-sharpcorner.com/UploadFile/AuthorImage/raj1979.jpg';
//                var appid = '<%=ConfigurationManager.AppSettings["FacebookConsumerKey"].ToString() %>';
//   // alert(appid);

//    //login pop height, width
//    var w = 600;
//    var h = 400;
//    var left = Number((screen.width / 2) - (w / 2));
//    var top = Number((screen.height / 2) - (h / 2));
//    //****//

//    //facebook login window and pass paramemters like title, summary, url, image
//                var fb = '<a rel="nofollow" title=\"Share this post on Facebook\" onclick="FbApp_Login(\'' + title + '\',\'' + url + '\',\'' + image + '\');"><i class="fab fa-facebook" style="font-size: 32px;color: #3b5998;margin:12px"></i></a>';
////****//

////twitter login window and pass paramemters like title, url
//var twitter = "<a  href=httpss://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(url) + "&amp;related=ModelQ-Job&amp;text=" + encodeURIComponent(title) + "&amp;tw_p=tweetbutton&amp;url=" + encodeURIComponent(url) + "&amp;via=_ModelQ title=\"Share this post on Twitter\" onclick=\"javascript:window.open(this.href,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + w + ", height=" + h + ", top=" + top + ", left=" + left + "');return false;\"><img height='100px' src='Images/twitter.png' /></a>";
////****//

//var socialMediaButtons = fb + "&nbsp;&nbsp;" + twitter;

////bind social variables into div
//$("#DetailDiv").append(' <div><table width="100%"><tr><td valign="top" style=" width:100px; height:100px;"><div>' + socialMediaButtons + '</div></td></tr></table> </div>');
//                //****//
//            }

//// Facebook login
//function FbApp_Login(title, url, image) {
// 
//    FB.login(function (response) {
//        if (response.authResponse) {
//            statusChangeCallback(response, title, url, image);
//        }
//    }, { scope: 'email,user_photos,publish_actions' });
//}
//window.fbAsyncInit = function () {
//    FB.init({
//       // appId: '<%=ConfigurationManager.AppSettings["FacebookConsumerKey"].ToString() %>',
//        appId: '312931630408835',
//        cookie: true,  // enable cookies to allow the server to access 
//        xfbml: true,  // parse social plugins on this page
//        version: 'v2.0' // use version 2.0
//    });

//};

//// This is called with the results from from FB.getLoginStatus().
//function statusChangeCallback(response, title, url, image) {
//    
//    if (response.status === 'connected') {
//        // Logged into your app and Facebook.           
//        FB.ui(
//            {
//                method: 'feed',
//                name: title,
//                link: url,
//                picture: image,
//                caption: title,
//                description: "This is test summary",
//                // source: url,
//                redirect_uri: url,
//            }
//        )

//    }
//}

//// Load the SDK asynchronously
//(function (d, s, id) {
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) return;
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//}(document, 'script', 'facebook-jssdk'));

