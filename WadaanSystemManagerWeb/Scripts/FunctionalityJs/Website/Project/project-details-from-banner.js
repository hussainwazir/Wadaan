
$(document).ready(function () {

    LoadResidentialProjects();

});
function LoadResidentialProjects() {

    KendoGlobalAjax({ commandName: 'Project_Select_For_WebsiteByID', values: { ProjectID: document.URL.split('/')[5] }, CallBack: fnLoadResidentialProjectDetails });
    KendoGlobalAjax({ commandName: 'Project_Select_Attachments_For_WebsiteByID', values: { ProjectID: document.URL.split('/')[5] }, CallBack: fnLoadResidentialProjectAttachment });

}


var fnLoadResidentialProjectDetails = function (d) {

    $('.txt-project-title').text(JSON.parse(d.Value)[0]["projectName"]);
    $('.ot_custom_heading').text(JSON.parse(d.Value)[0]["projectName"]);
    $('.txt-project-title').text(JSON.parse(d.Value)[0]["projectName"]);
    $('.client-name').text(JSON.parse(d.Value)[0]["clientName"]);
    $('.contractor-name').text(JSON.parse(d.Value)[0]["contractorName"]);
    $('.txt-location').text(JSON.parse(d.Value)[0]["googleLocation"]);
    $('.txt-status').text(JSON.parse(d.Value)[0]["projectStatus"]);
    $('.txt-project-created').text(JSON.parse(d.Value)[0]["projectCreated"]);
}
var fnLoadResidentialProjectAttachment = function (d) {

    $('.wpb_image_grid_ul').empty();
    $('.vc_single_image-wrapper').empty();
    if (JSON.parse(d.Value).length > 0) {
        $('.vc_single_image-wrapper').append('<img width="1024" height="576" src="../../Temp/' + JSON.parse(d.Value)[0]["path"] + '" data-src="../../Temp/' + JSON.parse(d.Value)[0]["path"] + '" class="lazyload vc_single_image-img attachment-large"   data-srcset="../../Temp/' + JSON.parse(d.Value)[0]["path"] + '" data-sizes="(max-width: 1024px) 100vw, 1024px"  />');
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            $('.wpb_image_grid_ul').append('<li class="isotope-item"><a class= "prettyphoto" href = "../../Temp/' + JSON.parse(d.Value)[i]["path"] + '"> '
                + ' <img class="lazyload " src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '"  data-src="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '"   width="350" height="300" /></a></li>');

        }
    }
}



