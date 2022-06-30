$(document).ready(function () {
    LoadAboutUs();
    LoadTeam();
});
    function LoadAboutUs() {

        KendoGlobalAjax({ commandName: 'AboutUs_Select', values: {}, CallBack: LoadAboutUss });

    }
   

    var LoadAboutUss = function (d) {


        $('#OurVision').html(JSON.parse(d.Value)[0]["ourVision"]);
        $('#OurMission').html(JSON.parse(d.Value)[0]["ourMission"]);
        $('#OurStories').html(JSON.parse(d.Value)[0]["ourStories"]);
        $('#OurQualities').html(JSON.parse(d.Value)[0]["ourQualities"]);
        $('#shotdesciption').html(JSON.parse(d.Value)[0]["description"]);


        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

             $('#LoadAllCooments').append('<li class="media" style="list-style-type:none"> <div class="row"> <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + '</span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>');
        }


    }


function LoadTeam() {

    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: "Active" }, CallBack: LoadTeams });

}


var LoadTeams = function (d) {
     
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('#teamplayer').append('<div class="de-team-list team-box wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp;"> <div class="team-pic"> <noscript><img width="420" height="420" src="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" class="img-responsive" alt="" srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w" sizes="(max-width: 420px) 100vw, 420px" title="Ammmad" /></noscript> <img width="420" height="420" src="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" data-src="' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" class="img-responsive lazyloaded" alt="" data-srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w" data-sizes="(max-width: 420px) 100vw, 420px" title="Ammmad" sizes="(max-width: 420px) 100vw, 420px" srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w"> </div> <div class="team-desc"> <h3>' + JSON.parse(d.Value)[i]["givenName"] + '</h3> <p class="lead">' + JSON.parse(d.Value)[i]["designationName"] + '</p> <div class="small-border"></div> <div class="social"></div> </div> </div>');
      //  $('#team').append('<li class="media" style="list-style-type:none"> <div class="row"> <div class="col-sm-1" id=' + JSON.parse(d.Value)[i]["commentID"] + '> <div class=""> <a href="#"><img class="media-object img-circle comment-img" src="/../../images/avatar-1.png" style="width:50px"></a> </div> </div> <div class="col-sm-9"> <div class="media-body media-right"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + '</span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p> <hr> </div> </div> </div></li>');
    }


}
