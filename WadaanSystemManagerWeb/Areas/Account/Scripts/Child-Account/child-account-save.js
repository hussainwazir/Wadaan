
var userId = "";
var username = "";
var roleID = "";
 
$(document).ready(function () {

    $("#treeviews").kendoTreeView({
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        }
    })
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    //  LoadCustomerDataByID();
    LoadKendoDates();
    LoadAccount();
    // LoadTaxRate();
    // Save Button Function .

    $('#btnSave').on('click', function (e) {

        $("#UserID").val(userId);

        if (customvalidateForm('frmAddUpdateAccount')) {

            $("#frmAddUpdateAccount").ajaxForm();


            var options = {
                success: function (response, statusText, jqXHR) {
                    clearform();

                    Swal.fire({

                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    window.location.href = '/Account/Account/ChartOfAccounts';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateAccount").ajaxSubmit(options);

        }
        else return false;
    });

});

//KindoDatePiker For Module ExpiryDate.
function LoadKendoDates() {

    $("#registrationCardExpiry").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });

}

var clearform = function () {
    $('#frmAddUpdateAccount').trigger('reset');
}

$('.reset_btn').click(function () {
    $('#frmAddUpdateAccount').trigger('reset');
});


//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------



function LoadAccount() { KendoGlobalAjax({ commandName: 'CategoryType_SelectForChildDDL', values: '{}', CallBack: getLoadAccount }); }
var getLoadAccount = function (d) {
    $('#ddl-child-account').append('');
 
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        $('#ddl-child-account').append('<optgroup label="' + JSON.parse(d.Value)[i].accountCategoryTitle + '"><option value="' + JSON.parse(d.Value)[i].categoryTypeID + '">' + JSON.parse(d.Value)[i].accountCategoryTypeTitle + '</option></optgroup>')
    }
}

//function LoadTaxRate() { KendoGlobalAjax({ commandName: 'TaxRate_SelectDDL', values: '{}', CallBack: getLoadTaxRate }); }
//var getLoadTaxRate = function (d) {

//    BindComboForDefault(JSON.parse(d.Value), $("#TaxID"), "Select Tax");
//}

//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------


//function LoadCustomerDataByID() {

//    var full_url = document.URL;           // Get current url
//    var url_array = full_url.split('=');  //Split 
//    id = url_array[url_array.length - 1];//Get ID
//    if (id != url_array) {

//        KendoGlobalAjax({ commandName: 'Account_SelectByID', values: { ID: id }, CallBack: loadAccountDataByID });

//    }

//}

var loadAccountDataByID = function (d) {

    setTimeout(function () {

        $('input,select,textarea').removeClass('error');

        $('#Id').val(JSON.parse(d.Value).id);
        $('#Code').val(JSON.parse(d.Value).code);
        $('#Name').val(JSON.parse(d.Value).name);
        $('#Detail').val(JSON.parse(d.Value).detail);
        $('#TaxID').val(JSON.parse(d.Value).taxID).trigger('change');
        $('#ddl-account').val(JSON.parse(d.Value).accountTypeId).trigger('change');
        if (JSON.parse(d.Value).showDashboardAsWatchlist == true) {
            $('#ShowDashboardAsWatchlist').val(JSON.parse(d.Value).showDashboardAsWatchlist)
            $('#ShowDashboardAsWatchlist').prop('checked', true);
        } else {
            $('#ShowDashboardAsWatchlist').val('0')
            $('#ShowDashboardAsWatchlist').prop('checked', false);
        }
        if (JSON.parse(d.Value).showInExpenseClaim == true) {
            $('#ShowInExpenseClaim').val(JSON.parse(d.Value).showInExpenseClaim)
            $('#ShowInExpenseClaim').prop('checked', true);
        } else {
            $('#ShowInExpenseClaim').val('0')
            $('#ShowInExpenseClaim').prop('checked', false);
        }
        if (JSON.parse(d.Value).enablePaymentToThisAccount == true) {
            $('#EnablePaymentToThisAccount').val(JSON.parse(d.Value).enablePaymentToThisAccount)
            $('#EnablePaymentToThisAccount').prop('checked', true);
        } else {
            $('#EnablePaymentToThisAccount').val('0')
            $('#EnablePaymentToThisAccount').prop('checked', false);
        }



    }, 50);


}



function fnCheckBoxValue(e) {

    var chks = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < chks.length; i++) {

        //chks[i]["checked"] == e["checked"]
        if (chks[i]["checked"] == true) {
            chks[i].value = '1';
        } else {
            chks[i].value = '0';
        }
    }
}
function fnChildAccountDDL(e) {
    
    var id = e.value;
    var name = $('#ddl-child-account :selected').text();
    $('#AccountTypeName').val(name);
    $('#AccountTypeId').val(id);

     $('#basicTree').append('');


        //$('#basicTree').append(' <ul> <li class="show-main-accounts"> Admin <ul> <li data-jstree="{ "opened": true }" class="show-child-accounts"> Assets <ul class="show-child-sub-accounts"> <li data-jstree="{ "type": "file" }">Css</li> <li data-jstree="{ "opened": true }" class="show-sub-child-accounts"> Plugins <ul class="show-sub-child-sub-accounts"> <li data-jstree="{ "selected": true, "type": "file" }">Plugin one</li> <li data-jstree="{ "type": "file" }">Plugin two</li> </ul> </li> </ul>   <li data-jstree="{ "type": "file" }">Frontend</li> </ul>');
    // $('#basicTree').append('<ul> <li class="show-main-accounts"> Admin <ul> <li class="show-child-accounts"> Assets <ul class="show-child-sub-accounts">  <li>Css</li> <li class="show-sub-child-accounts"> Plugins <ul class="show-sub-child-sub-accounts"> <li>Plugin one</li> <li>Plugin two</li> </ul> </li> </ul> </li> <li>Dashboard</li> <li>Typography</li> </ul> </li> <li>Frontend</li> </ul>');

   KendoGlobalAjax({ commandName: 'Account_SelectForChildTreeByID', values: { Id: id }, CallBack: loadChildData });
}

var loadChildData = function (d) { fnLoadChildAccountData(JSON.parse(d.Value)); }

function fnLoadChildAccountData(_dataa) {
  

    var flatData= [];
    for (var j = 0; j < _dataa.length; j++) {
       
   
        flatData.push(
            {

                "id": _dataa[j].id,
                "parent": _dataa[j].parentId,
                "text": _dataa[j].text
                //  "parentName": _dataa[i].parentName
                //"id": "19FC0917-A101-4407-84A4-AA467ED96B6C",
                //"text": "1 text",
                //"parent": "19FC0917-A101-4407-84A4-AA467ED96B6d"
                //  "parentName": _dataa[i].parentName


            });
       
    }
   
    //var flatData = [
    //    { id: 1, parent: 0, text: "Item 1" },
    //    { id: 2, parent: 0, text: "Item 2" },
    //    { id: 3, parent: 0, text: "Item 3" },
    //    { id: 4, parent: 0, text: "Item 4" },
    //    { id: 5, parent: 1, text: "Item 1.1" },
    //    { id: 6, parent: 1, text: "Item 1.2" },
    //    { id: 7, parent: 1, text: "Item 1.3" },
    //    { id: 8, parent: 3, text: "Item 3.1" },
    //    { id: 9, parent: 3, text: "Item 3.2" },
    //    { id: 10, parent: 5, text: "Item 1.1.1" },
    //    { id: 11, parent: 5, text: "Item 1.1.2" },
    //    { id: 12, parent: 5, text: "Item 1.1.3" }
    //];

    // The tree for visualizing data.
    $("#tree").kendoTreeView({
        dataSource: processTable(_dataa, "id", "parent", 0),
        loadOnDemand: false
    });





     

}

function processTable(data, idField, foreignKey, rootLevel) {
    var hash = {};

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var id = item[idField];
        var parentId = item[foreignKey];

        hash[id] = hash[id] || [];
        hash[parentId] = hash[parentId] || [];

        item.items = hash[id];
        hash[parentId].push(item);
    }

    return hash[rootLevel];
}

//function fnLoadChildAccountData(_dataa) {


//    var responNew = [];
//    var parentRecord = [];
//    var dataSource = [];
//    for (var i = 0; i < _dataa.length; i++) {
       
//        var ctemplate = "#= item.text # (#= " + _dataa.length + " #)";
//        //var ParentName = _dataa[i].name;

//     //   parentRecord.push({ "length": _dataa.length, "text": _dataa[i].name });
//        parentRecord.push({
//            "text": _dataa[i].parentName, 'inStock': responNew.length
//        }),

//        responNew.push(
//            {
//                "length": _dataa.length,
//                "value": _dataa[i].id,
//                "text": _dataa[i].name,
//                "parentName": _dataa[i].parentName,
//                //          "image":"<i class='mdi mdi-bell font-24'></i>"

//            });
//    }
//    dataSource = parentRecord.concat(responNew);
//    console.log(dataSource.concat(responNew));
//   $('#treeview').html('');
//    $("#treeview").kendoTreeView({
//        template: ctemplate,// "#= item.text # (#= item.length #)",

//        dataImageUrlField: "image",
//        dataSource: [
//            {
//                // text: "Bank", inStock: 30,
//                text: " " + _dataa[0].parentName + " #", inStock: "" + responNew.length + " ",
//                items: responNew
//                //items: [
//                //    { value:'1', text: "One", inStock: 8, image: "httpss://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
//                //    { value: '2', text: "two", inStock: 10, image: "httpss://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
//                //    { value: '3',text: "three", inStock: 12, image: "httpss://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },

//                //] 
//            }

//        ]
//    });

//    //-------------------------------------------------------------------------------------------------------------
//    /*
//    
//    for (var i = 0; i < _dataa.length; i++) {
//        var dataSource = new kendo.data.HierarchicalDataSource({
//            //transport: {
//            //    read: {
//            //        //url: "httpss://demos.telerik.com/kendo-ui/service/Employees",
//            //        data: _dataa
//            //        dataType: "Json"
//            //    }
//            //},
//            schema: {
//                model: { id: _dataa[i].id, name: _dataa[i].name, hasChildren: "HasEmployees" }
//            }
//        });
//    }
// dataSource.options.data = _dataa;
   
//    $("#treeview").kendoTreeView({
//        dataSource: _dataa,
//        dataTextField: "name",
//           dataValueField: "id"
//    });
//    */

 

//}