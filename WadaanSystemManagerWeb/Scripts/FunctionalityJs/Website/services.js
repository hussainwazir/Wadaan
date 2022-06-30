$(document).ready(function () {
    LoadService();
    ;
});
function LoadService() {

    KendoGlobalAjax({ commandName: 'Service_Select', values: { Name: serviceTitle}, CallBack: LoadServices });

    }
   

var LoadServices = function (d) {


    $('#serviceName').html(JSON.parse(d.Value)[0]["name"]);
    $('#shotdesc').html(JSON.parse(d.Value)[0]["shortDescription"]);
    $('#longDescription').html(JSON.parse(d.Value)[0]["longDescription"]);
    $('#img').attr('src', '../../Temp/' + JSON.parse(d.Value)[0]["imgPath"]);
    
    }


 
