
$(document).ready(function () {

    LoadCommercialProjects();

});
function LoadCommercialProjects() {

    KendoGlobalAjax({ commandName: 'Project_Select_For_Website', values: {}, CallBack: fnLoadCommercialProjects });

}


var fnLoadCommercialProjects = function (d) {
  
    $('.append-project-data').empty();
    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i]["projectCategory"] == "Commercial") {
             
                $('.append-project-data').append(' <div  class="projects-grid projects-load-ajax overlay_s1 portfolio_category pf_3_cols wow fadeInUp append-project-data" data-wow-delay=".3s" style="margin: -15px 15px"> <div class="project-item-sizer"> </div>'
                    + '<div class="project-item category-34 " style="padding:15px">'
                    + '<div class="projects-box">'
                    + '<div class="projects-thumbnail"> '
                   + '<img width="700" height="466" src="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '" data-src="../../Temp/' + JSON.parse(d.Value)[i]["imgPaths"] + '" class="lazyload attachment-thumb-portfolio size-thumb-portfolio wp-post-image" alt="' + JSON.parse(d.Value)[i]["projectName"] + '" title="' + JSON.parse(d.Value)[i]["projectName"] + '" /> '
                  //  + '<img width="700" height="466" src="../../Temp/568f1de1-992a-4baa-8527-c20ed1198df7.jpg" data-src="../../Temp/568f1de1-992a-4baa-8527-c20ed1198df7.jpg" class="lazyload attachment-thumb-portfolio size-thumb-portfolio wp-post-image" alt="' + JSON.parse(d.Value)[i]["projectName"] + '" title="' + JSON.parse(d.Value)[i]["projectName"] + '" /> '
                    + '</div> '
                    + '<a style="cursor:pointer;" href="/Home/CommercialDetails/' + JSON.parse(d.Value)[i]["projectID"] + '"> '
                    + '<span class="project-overlay"> '
                    + '<span class="project-name id-color">' + JSON.parse(d.Value)[i]["projectName"] + '</span> '
                    + '</span> '
                    + '</a></div> </div> </div>');
            }
        }
    }
}



