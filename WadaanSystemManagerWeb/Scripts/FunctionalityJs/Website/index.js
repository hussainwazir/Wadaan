$(document).ready(function () {

    //LoadTeam();
    LoadProject();
});


function LoadTeam() {

    KendoGlobalAjax({ commandName: 'Employee_Select', values: { Status: "Active" }, CallBack: LoadTeams });

}


var LoadTeams = function (d) {

    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('#teamplayer').append('<div class="de-team-list team-box wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp;"> <div class="team-pic"> <noscript><img width="420" height="420" src="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" class="img-responsive" alt="" srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w" sizes="(max-width: 420px) 100vw, 420px" title="Ammmad" /></noscript> <img width="420" height="420" src="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" data-src="' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + '" class="img-responsive lazyloaded" alt="" data-srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w" data-sizes="(max-width: 420px) 100vw, 420px" title="Ammmad" sizes="(max-width: 420px) 100vw, 420px" srcset="../../Temp/' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 420w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 300w, ' + JSON.parse(d.Value)[i]["employeeProfilePicture"] + ' 150w"> </div> <div class="team-desc"> <h3>' + JSON.parse(d.Value)[i]["givenName"] + '</h3> <p class="lead">' + JSON.parse(d.Value)[i]["designationName"] + '</p> <div class="small-border"></div> <div class="social"></div> </div> </div>');
    }


}


function LoadProject() {

    KendoGlobalAjax({ commandName: 'Project_Select_For_Website', values: { Status: "Active" }, CallBack: LoadProjects });

}


var LoadProjects = function (d) {
    if (JSON.parse(d.Value).length > 0) {
     //$('#append-data-to-banner').empty();
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        

            $('#projecttypes').append('<div class="project-item col-md-3 ' + JSON.parse(d.Value)[i]["projectCategoryclass"] + ' "><a href="portfolio/miss-asma-zafar-residential/index.html"> <div class="folio-image"><img width="750" height="499" src="../../Temp/' + JSON.parse(d.Value)[i]["imgPath"] + '" class="lazyload attachment-thumb-portfolio size-thumb-portfolio wp-post-image" alt="" title="4" /> </div> <div class="folio-info"> <h3>' + JSON.parse(d.Value)[i]["projectName"] + '</h3> <p> ' + JSON.parse(d.Value)[i]["projectCategory"] + ' <span>/</span> </p> </div> </a> </div>');


            /*
            $('#append-data-to-banner').append('' + '<rs-slide data-key="rs-23" data-title="Slide" '
                + ' data-thumb="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '" data-duration="8980" data-anim="ei:d;eo:d;s:1800;r:0;t:fade;sl:d;">'
            //    + '<img src="~/Content/wp-content/uploads/2021/02/01-1.jpg" title="05" width="1320" height="800" data-panzoom="d:11000;ss:105;se:100;" class="rev-slidebg" data-no-retina> <rs-layer id="slider-3-slide-23-layer-5" class="rev-btn rev-withicon" data-type="button" data-color="rgba(255,255,255,1)" data-xy="xo:536px,415px,331px,214px;yo:581px,450px,420px,201px;"data-text="s:14,10,7,4;l:14,10,7,6;fw:500;a:inherit;" data-dim="w:177px,137px,81px,45px;h:40px,31px,23px,14px;" '
                + '<img src="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '"  title="05" width="1320" height="800" data-panzoom="d:11000;ss:105;se:100;" class="rev-slidebg" data-no-retina> '
             //   + '<rs-layer id="slider-3-slide-23-layer-5" class="rev-btn rev-withicon" data-type="button" data-color="rgba(255,255,255,1)" data-xy="xo:536px,415px,331px,214px;yo:581px,450px,420px,201px;"data-text="s:14,10,7,4;l:14,10,7,6;fw:500;a:inherit;" data-dim="w:177px,137px,81px,45px;h:40px,31px,23px,14px;" '
                + '<rs-layer id="slider-3-slide-23-layer-5" class="rev-btn rev-withicon" data-type="button" data-color="rgba(255,255,255,1)" data-xy="xo:536px,415px,331px,214px;yo:581px,450px,420px,201px;"data-text="s:14,10,7,4;l:14,10,7,6;fw:500;a:inherit;" data-dim="w:177px,137px,81px,45px;h:40px,31px,23px,14px;" '
                + 'data-actions="o: click; a:simplelink;'
                + 'target:_blank; url:/Home/ProjectDetail/"'
                + 'data-padding="t:10,8,6,4;r:30,23,17,10;b:10,8,6,4;l:30,23,17,10;"data-border="bor:30px,30px,30px,30px;"data-frame_0="o:1;"data-frame_0_chars="z:-1000px;o:0;rX:90deg;"data-frame_1="e:power4.out;st:5029.8828125;sp:500;sR:5029.8828125;" data-frame_1_chars="d:10;" data-frame_999="x:-50px,-38px,-28px,-17px;o:0;st:8979.8828125;sp:1180;sR:2450;"data-frame_hover="c:#000;bgc:#fff;boc:#000;bor:30px,30px,30px,30px;bos:solid;oX:50;oY:50;sp:0;" style="z-index:5;background-color:rgba(0,0,0,0.75);font-family:Roboto;cursor:pointer;outline:none;box-shadow:none;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;">View Project<i class="fa-chevron-right"></i></rs-layer></rs-slide>');
                */

            
            $('#append-data-to-banner').append('' + '<a href="/Home/ProjectDetail/' + JSON.parse(d.Value)[i]["projectID"] + '"  target="_blank"><rs-slide data-key="rs-23" data-title="Slide" style="    text-align: center;" '
                //+ ' data-thumb="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '" data-duration="8980" data-anim="ei:d;eo:d;s:1800;r:0;t:fade;sl:d;">'
                + ' data-thumb="" data-duration="8980" data-anim="ei:d;eo:d;s:1800;r:0;t:fade;sl:d;">'
                + '<img src="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '"  title="05" width="1320" height="800" data-panzoom="d:11000;ss:105;se:100;" class="rev-slidebg" data-no-retina> '
                + '<rs-layer id="slider-3-slide-23-layer-5" class="rev-btn rev-withicon" data-type="button" data-color="rgba(255,255,255,1)" data-xy="xo:536px,415px,331px,214px;yo:581px,450px,420px,201px;"data-text="s:14,10,7,4;l:14,10,7,6;fw:500;a:inherit;" data-dim="w:177px,137px,81px,45px;h:40px,31px,23px,14px;" '
                + 'data-actions="o: click;a:simplelink;target:_blank; url:/Home/ProjectDetail/' + JSON.parse(d.Value)[i]["projectID"] + '"'
                + 'data-padding="t:10,8,6,4;r:30,23,17,10;b:10,8,6,4;l:30,23,17,10;" '
                + 'data-border="bor:30px,30px,30px,30px;"data-frame_0="o:1;"'
                + 'data-frame_0_chars="z:-1000px;o:0;rX:90deg;"'
                + 'data-frame_1="e:power4.out;st:5029.8828125;sp:500;sR:5029.8828125;" '
                + 'data-frame_1_chars="d:10;" data-frame_999="x:-50px,-38px,-28px,-17px;o:0;st:8979.8828125;sp:1180;sR:2450;"'
                + 'data-frame_hover="c:#000;bgc:#fff;boc:#000;bor:30px,30px,30px,30px;bos:solid;oX:50;oY:50;sp:0;" '
                + 'style="z-index:5;background-color:rgba(0,0,0,0.75);font-family:Roboto;cursor:pointer;outline:none;box-shadow:none;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;">View Project<i class="fa-chevron-right"></i>'
                + '</rs-layer>'
                //+ '<button type="button" class="btn btn-primary btn-sm" id="btn-show-project-detail" data-id=' + JSON.parse(d.Value)[i]["projectID"] + ' onClick="fnLoadProjectDetail(this)" style="margin-left:20px; color:white">  View More</button>'
                + '</rs-slide></a>');
           


        }
    }


}
function fnLoadProjectDetail(e) {
  
    window.open('/Home/ProjectDetail/' + e.getAttribute('data-id')+'', '_blank');
}