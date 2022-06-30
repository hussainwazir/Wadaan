
var userId = "";
var username = "";
var roleID = "";


$(document).ready(function () {
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    LoadEmployeeRole();
    $('#btnSave').on('click', function (e) {

        $("#MeetingDiscussion").val(tinymce.get("MeetingDiscussion").getContent({ format: "html" }));

        if (customvalidateForm('frmAddUpdateMeeting')) {

            //ButtonLoader
            var key = document.getElementById("btnSave");
            key.disabled = true;
            key.innerHTML = '<i class = "fa fa - spinner fa - spin"></i> Please wait...';

            $("#frmAddUpdateMeeting").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Record saved successfully...',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //  LoadEmployeesKendo();
                    window.location.href = '/Meeting/Meeting/Index';
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
            };
            $("#frmAddUpdateMeeting").ajaxSubmit(options);

        }
        else {

            btn.disabled = true;
            btn.innerHTML = '<i class = "fa fa-spinner fa-spin"></i> Please wait...';
            return false;
        }
    });



    //LoadPermissionAgainstSelectdRole(Name,'Employee');
});


function ShowHideModulesForms(id,ModuleName) {

  
    $('#' + id).toggle();
    var MName = ModuleName;

    var RoleID = $('#Role').val();
    if (RoleID != '00000000-0000-0000-0000-000000000000') {

        LoadPermissionAgainstSelectdRole(MName , RoleID)
    }

   
};

function checkUncheckCreateAll() {
    if ($('#checkAllcreatee0').prop('checked') == true) {
        $('.create0').prop('checked', true);
    } else {
        $('.create0').prop('checked', false);
    }
}



function LoadKendoDates() {
    $("#MeetingDate").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        parseFormats: ["MMMM yyyy"]
    });
}
$('.reset_btn').click(function () {
    $('# ').trigger('reset');
});
$('.btn_close').click(function () {

    $('# ').trigger('reset');

});


function LoadEmployeeRole() { KendoGlobalAjax({ commandName: 'Roles_SelectDDLForAdmin', values: '{}', CallBack: getLoadRole }); }
var getLoadRole = function (d) { ; BindComboForDefault(JSON.parse(d.Value), $("#Role"), "Select Role"); }

function savePersmissionsAgainstTheRole(tableID, MName) {
   

    var RoleID = $('#Role').val();
    var myarray = [];
    if (RoleID == '00000000-0000-0000-0000-000000000000') {

        Swal.fire({

            icon: 'error',
            title: 'Please select role first...',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    } else {

        $("#" + tableID).each(function (i, el) {
         
            var createHyphen = $(el).find('td.create-hypen').text().trim();
            var updateHyphen = $(el).find('td.update-hypen').text().trim();
            var readHyphen = $(el).find('td.read-hypen').text().trim();
            var deleteHyphen = $(el).find('td.delete-hypen').text().trim();
            var isCreate, isRead, isUpdate, isDelete = '';


            if (createHyphen == '-') {
                isCreate = false;
            } else {
                isCreate = $(el).find('td  .chk-create').prop('checked') == true ? true : false;
            }

            if (updateHyphen == '-') {
                isUpdate = false;
            } else {
                isUpdate = $(el).find('td .chk-update').prop('checked') == true ? true : false;
            }
            if (deleteHyphen == '-') {
                isDelete = false;
            } else {
                isDelete = $(el).find('td .chk-delete').prop('checked') == true ? true : false;
            } if (readHyphen == '-') {
                isRead = false;
            } else {
                isRead = $(el).find('td .chk-read').prop('checked') == true ? true : false;
            }


            var saveData = {
                ModuleName: MName,
                FormName: $.trim(el.children[1].textContent),
                isCreate: isCreate, //el.children[2].children[0].children[0].value == true ? el.children[2].children[0].children[0].value = '1' : el.children[2].children[0].children[0].value = '0',
                isRead: isRead,//el.children[3].children[0].children[0].value == true ? el.children[3].children[0].children[0].value = '1' : el.children[3].children[0].children[0].value = '0',
                isUpdate: isUpdate,// el.children[4].children[0].children[0].value == true ? el.children[4].children[0].children[0].value = '1' : el.children[4].children[0].children[0].value = '0',
                isDelete: isDelete,// el.children[5].children[0].children[0].value == true ? el.children[5].children[0].children[0].value = '1' : el.children[5].children[0].children[0].value = '0',
                UserId: userId,
                RoleID: RoleID,
            }
            myarray.push(saveData);

        });
        
    }



    KendoGlobalAjax({ commandName: 'AccessControlPermissionToRoleMultiple_Save_New', values: { BulkAssignPermissionsToRole: myarray }, CallBack: showSuccessMessage });

}


function fnShowHidePermissionDiv(customName) {
   
    if (customName.selectedOptions[0].text == 'Client') {
        //$('#chk-add-project-create').prop('disabled', false);
        //$('#chk-add-project-update').prop('disabled', true);
        //$('#chk-list-project-update').prop('disabled', true);
        //$('#chk-list-project-delete').prop('disabled', true);
        //$('#chk-add-task-create').prop('disabled', true);
        //$('#chk-add-task-update').prop('disabled', true);
        //$('#chk-list-task-update').prop('disabled', true);
        //$('#chk-list-task-delete').prop('disabled', true);
        $('.clientdiv').hide();
        $('.employeediv').hide();
        $('.contractordiv').hide();
        $('.meetingdiv').hide();
        $('.supplierdiv').hide();
 
       }  else {
        $('.clientdiv').show();
           $('.employeediv').show();
           $('.contractordiv').show();
           $('.meetingdiv').show();
           $('.supplierdiv').show();

       }
}
function LoadPermissionAgainstSelectdRole(Name, RoleID) {
 
     
    if (RoleID == '') {
         RoleID = $('#Role').val();
    }

    if (Name == 'Employee') {
        KendoGlobalAjax({ commandName: 'LoadEmployeeModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: LoadEmployeeModulePermissions_SelectByRoleID });
    }

    else if (Name == 'Client') {
       
        KendoGlobalAjax({ commandName: 'LoadClientModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadClientModulePermissions_SelectByRoleID });
    }

   else if (Name == 'Contractor') {
        KendoGlobalAjax({ commandName: 'LoadContractorModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadContractorModulePermissions_SelectByRoleID });
    }

    else if (Name == 'Project') {
        KendoGlobalAjax({ commandName: 'LoadProjectModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadProjectModulePermissions_SelectByRoleID });
    }

    else if (Name == 'Meeting') {
        KendoGlobalAjax({ commandName: 'LoadMeetingModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadMeetingModulePermissions_SelectByRoleID });
    }
    else if (Name == 'Task') {
        KendoGlobalAjax({ commandName: 'LoadTaskModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadTaskModulePermissions_SelectByRoleID });
    }
    else if (Name == 'Supplier') {
        KendoGlobalAjax({ commandName: 'LoadSupplierModulePermissions_SelectByRoleID', values: { RoleID: RoleID != null ? RoleID : '00000000-0000-0000-0000-000000000000' }, CallBack: fnLoadSupplierModulePermissions_SelectByRoleID });
    }  
    // KendoGlobalAjax({ commandName: 'LoadPermissions_SelectByRoleID', values: { RoleID: RoleID }, CallBack: fnPopulatePermissionGrid });
   
}

var LoadEmployeeModulePermissions_SelectByRoleID = function (d) {

    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Employee') {
                if (JSON.parse(d.Value)[i].formName == 'Add Employee') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-add-employee-create').prop('checked', true);
                    } else {
                        $('#chk-add-employee-create').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-add-employee-update').prop('checked', true);
                    } else {
                        $('#chk-add-employee-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Employee') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-lst-employee-read').prop('checked', true);
                    } else {
                        $('#chk-lst-employee-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-employee-update').prop('checked', true);
                    } else {
                        $('#chk-list-employee-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-employee-delete').prop('checked', true);
                    } else {
                        $('#chk-list-employee-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Employee Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-employee-read').prop('checked', true);
                    } else {
                        $('#chk-detail-employee-read').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-add-employee-create').prop('checked', false);
        $('#chk-add-employee-update').prop('checked', false);
        $('#chk-lst-employee-read').prop('checked', false);
        $('#chk-list-employee-update').prop('checked', false);
        $('#chk-list-employee-delete').prop('checked', false);
        $('#chk-detail-employee-read').prop('checked', false);

    }
    





    if (JSON.parse(d.Value).length > 0) {
    






        //$('#tbl-employee-permissions').empty('');
        //$("#tbl-employee-permissions").append(' <tr> <td>1</td> <td class="addemployee"> ' + JSON.parse(d.Value)[0].formName + ' </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" class="chk-create" name="" value="' + JSON.parse(d.Value)[0].isCreate + '" > </div> </td> <td class="read-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '"  id=""> <label for="update[0]0"></label> </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr> <tr> <td>2</td> <td> ' + JSON.parse(d.Value)[0].formName + ' </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value)[0].isRead + '"  class="chk-read" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value).isDelete + '"  class="chk-delete" id=""> </div> </td> </tr> <tr> <td>3</td> <td> Employee Detail </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-read" id=""> </div> </td> <td class="update-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr>');
    };
}
var fnLoadClientModulePermissions_SelectByRoleID = function (d) {
    
    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Client') {
                if (JSON.parse(d.Value)[i].formName == 'Add Client') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-client-add-employee').prop('checked', true);
                    } else {
                        $('#chk-client-add-employee').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-client-add-update').prop('checked', true);
                    } else {
                        $('#chk-client-add-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Client') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-list-client-read').prop('checked', true);
                    } else {
                        $('#chk-list-client-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-client-update').prop('checked', true);
                    } else {
                        $('#chk-list-client-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-client-delete').prop('checked', true);
                    } else {
                        $('#chk-list-client-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Client Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-client-read').prop('checked', true);
                    } else {
                        $('#chk-detail-client-read').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-client-add-employee').prop('checked', false);
        $('#chk-client-add-update').prop('checked', false);
        $('#chk-list-client-read').prop('checked', false);
        $('#chk-list-client-update').prop('checked', false);
        $('#chk-list-client-delete').prop('checked', false);
        $('#chk-detail-client-read').prop('checked', false);
    }
   





    //if (JSON.parse(d.Value).length > 0) {
    //    
    //    //$('#tbl-employee-permissions').empty('');
    //    //$("#tbl-employee-permissions").append(' <tr> <td>1</td> <td class="addemployee"> ' + JSON.parse(d.Value)[0].formName + ' </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" class="chk-create" name="" value="' + JSON.parse(d.Value)[0].isCreate + '" > </div> </td> <td class="read-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '"  id=""> <label for="update[0]0"></label> </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr> <tr> <td>2</td> <td> ' + JSON.parse(d.Value)[0].formName + ' </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value)[0].isRead + '"  class="chk-read" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value).isDelete + '"  class="chk-delete" id=""> </div> </td> </tr> <tr> <td>3</td> <td> Employee Detail </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-read" id=""> </div> </td> <td class="update-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr>');
    //};
}
var fnLoadContractorModulePermissions_SelectByRoleID = function (d) {

    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Contractor') {
                if (JSON.parse(d.Value)[i].formName == 'Add Contractor') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-add-contractor-create').prop('checked', true);
                    } else {
                        $('#chk-add-contractor-create').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-add-contractor-update').prop('checked', true);
                    } else {
                        $('#chk-add-contractor-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Contractor') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-list-contractor-read').prop('checked', true);
                    } else {
                        $('#chk-list-contractor-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-contractor-update').prop('checked', true);
                    } else {
                        $('#chk-list-contractor-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-contractor-delete').prop('checked', true);
                    } else {
                        $('#chk-list-contractor-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Contractor Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-contractor-read').prop('checked', true);
                    } else {
                        $('#chk-detail-contractor-read').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-add-contractor-create').prop('checked', false);
        $('#chk-add-contractor-update').prop('checked', false);
        $('#chk-list-contractor-read').prop('checked', false);
        $('#chk-list-contractor-update').prop('checked', false);
        $('#chk-list-contractor-delete').prop('checked', false);
        $('#chk-detail-contractor-read').prop('checked', false);

    }

   




 
}
var fnLoadProjectModulePermissions_SelectByRoleID = function (d) {

    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Project') {
                if (JSON.parse(d.Value)[i].formName == 'Add Project') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-add-project-create').prop('checked', true);
                    } else {
                        $('#chk-add-project-create').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-add-project-update').prop('checked', true);
                    } else {
                        $('#chk-add-project-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Project') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-list-project-read').prop('checked', true);
                    } else {
                        $('#chk-list-project-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-project-update').prop('checked', true);
                    } else {
                        $('#chk-list-project-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-project-delete').prop('checked', true);
                    } else {
                        $('#chk-list-project-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Project Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-project-read').prop('checked', true);
                    } else {
                        $('#chk-detail-project-read').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-add-project-create').prop('checked', false);
        $('#chk-add-project-update').prop('checked', false);
        $('#chk-list-project-read').prop('checked', false);
        $('#chk-list-project-update').prop('checked', false);
        $('#chk-list-project-delete').prop('checked', false);
        $('#chk-detail-project-read').prop('checked', false);
    }
   




     
}
var fnLoadMeetingModulePermissions_SelectByRoleID = function (d) {
    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Meeting') {
                if (JSON.parse(d.Value)[i].formName == 'Add Meeting') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-add-meeting-create').prop('checked', true);
                    } else {
                        $('#chk-add-meeting-create').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-add-meeting-update').prop('checked', true);
                    } else {
                        $('#chk-add-meeting-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Meeting') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-list-meeting-read').prop('checked', true);
                    } else {
                        $('#chk-list-meeting-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-meeting-update').prop('checked', true);
                    } else {
                        $('#chk-list-meeting-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-meeting-delete').prop('checked', true);
                    } else {
                        $('#chk-list-meeting-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Meeting Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-meeting-read').prop('checked', true);
                    } else {
                        $('#chk-detail-meeting-read').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-add-meeting-create').prop('checked', false);
        $('#chk-add-meeting-update').prop('checked', false);
        $('#chk-list-meeting-read').prop('checked', false);
        $('#chk-list-meeting-update').prop('checked', false);
        $('#chk-list-meeting-delete').prop('checked', false);
        $('#chk-detail-meeting-read').prop('checked', false);

    }
   




 
}
var fnLoadTaskModulePermissions_SelectByRoleID = function (d) {

    if (JSON.parse(d.Value).length > 0) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {
            if (JSON.parse(d.Value)[i].moduleName == 'Task') {
                if (JSON.parse(d.Value)[i].formName == 'Add Task') {

                    if (JSON.parse(d.Value)[i].isCreate == true) {
                        $('#chk-add-task-create').prop('checked', true);
                    } else {
                        $('#chk-add-task-create').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-add-task-update').prop('checked', true);
                    } else {
                        $('#chk-add-task-update').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'List Task') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-list-task-read').prop('checked', true);
                    } else {
                        $('#chk-list-task-read').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isUpdate == true) {
                        $('#chk-list-task-update').prop('checked', true);
                    } else {
                        $('#chk-list-task-update').prop('checked', false);
                    }
                    if (JSON.parse(d.Value)[i].isDelete == true) {
                        $('#chk-list-task-delete').prop('checked', true);
                    } else {
                        $('#chk-list-task-delete').prop('checked', false);
                    }
                }

                if (JSON.parse(d.Value)[i].formName == 'Task Detail') {

                    if (JSON.parse(d.Value)[i].isRead == true) {
                        $('#chk-detail-task-delete').prop('checked', true);
                    } else {
                        $('#chk-detail-task-delete').prop('checked', false);
                    }
                }
            }
        };
    } else {
        $('#chk-add-task-create').prop('checked', false);
        $('#chk-add-task-update').prop('checked', false);
        $('#chk-list-task-read').prop('checked', false);
        $('#chk-list-task-update').prop('checked', false);
        $('#chk-list-task-delete').prop('checked', false);
        $('#chk-detail-task-delete').prop('checked', false);

    }
    





    //if (JSON.parse(d.Value).length > 0) {
    //    
    //    //$('#tbl-employee-permissions').empty('');
    //    //$("#tbl-employee-permissions").append(' <tr> <td>1</td> <td class="addemployee"> ' + JSON.parse(d.Value)[0].formName + ' </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" class="chk-create" name="" value="' + JSON.parse(d.Value)[0].isCreate + '" > </div> </td> <td class="read-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '"  id=""> <label for="update[0]0"></label> </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr> <tr> <td>2</td> <td> ' + JSON.parse(d.Value)[0].formName + ' </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value)[0].isRead + '"  class="chk-read" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value).isDelete + '"  class="chk-delete" id=""> </div> </td> </tr> <tr> <td>3</td> <td> Employee Detail </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-read" id=""> </div> </td> <td class="update-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr>');
    //};
}
var fnLoadSupplierModulePermissions_SelectByRoleID = function (d) {

    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        if (JSON.parse(d.Value)[i].moduleName == 'Supplier') {
            if (JSON.parse(d.Value)[i].formName == 'Add Supplier') {

                if (JSON.parse(d.Value)[i].isCreate == true) {
                    $('#chk-add-supplier-create').prop('checked', true);
                } else {
                    $('#chk-add-supplier-create').prop('checked', false);
                }
                if (JSON.parse(d.Value)[i].isUpdate == true) {
                    $('#chk-add-supplier-update').prop('checked', true);
                } else {
                    $('#chk-add-supplier-update').prop('checked', false);
                }
            }

            if (JSON.parse(d.Value)[i].formName == 'List Supplier') {

                if (JSON.parse(d.Value)[i].isRead == true) {
                    $('#chk-list-supplier-read').prop('checked', true);
                } else {
                    $('#chk-list-supplier-read').prop('checked', false);
                }
                if (JSON.parse(d.Value)[i].isUpdate == true) {
                    $('#chk-list-supplier-update').prop('checked', true);
                } else {
                    $('#chk-list-supplier-update').prop('checked', false);
                }
                if (JSON.parse(d.Value)[i].isDelete == true) {
                    $('#chk-list-supplier-delete').prop('checked', true);
                } else {
                    $('#chk-list-supplier-delete').prop('checked', false);
                }
            }

            if (JSON.parse(d.Value)[i].formName == 'Supplier Detail') {

                if (JSON.parse(d.Value)[i].isRead == true) {
                    $('#chk-detail-supplier-read').prop('checked', true);
                } else {
                    $('#chk-detail-supplier-read').prop('checked', false);
                }
            }
        }
    };





    //if (JSON.parse(d.Value).length > 0) {
    //     
    //    //$('#tbl-employee-permissions').empty('');
    //    //$("#tbl-employee-permissions").append(' <tr> <td>1</td> <td class="addemployee"> ' + JSON.parse(d.Value)[0].formName + ' </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" class="chk-create" name="" value="' + JSON.parse(d.Value)[0].isCreate + '" > </div> </td> <td class="read-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '"  id=""> <label for="update[0]0"></label> </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr> <tr> <td>2</td> <td> ' + JSON.parse(d.Value)[0].formName + ' </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value)[0].isRead + '"  class="chk-read" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-update" value="' + JSON.parse(d.Value)[0].isUpdate + '" id=""> </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" value="' + JSON.parse(d.Value).isDelete + '"  class="chk-delete" id=""> </div> </td> </tr> <tr> <td>3</td> <td> Employee Detail </td> <td class="create-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td> <div class="checkbox checkbox-success text-center"> <input type="checkbox" name="" class="chk-read" id=""> </div> </td> <td class="update-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> <td class="delete-hypen"> <div class="text-center" style="font-size:30px"> - </div> </td> </tr>');
    //};
}



var fnPopulatePermissionGrid = function (d) {
   
 
    $('#tbl-employee-permissions').append('');

    //for (var i = 0; i < JSON.parse(d.Value).length; i++) {
    //    if (JSON.parse(d.Value)[i].moduleName == 'Employee') {
    //        if (JSON.parse(d.Value).formName == 'List Employee' || JSON.parse(d.Value).formName == 'Employee Detail' || JSON.parse(d.Value).formName == 'Add Employee' ) {
    //            $("#tbl-employee-permissions").append('<tr style="background: lightgoldenrodyellow;">   <td style="text-align: left;" class="JobTitle">' + JSON.parse(d.Value)[i].ModuleName + '</td><td style="text-align: left;" class="FromDate">' + JSON.parse(d.Value)[i].FormName + '</td><td style="text-align: left;" class="ToDate">' + JSON.parse(d.Value)[i].toDate + '</td><td style="text-align: left;" class="EmployerName">' + JSON.parse(d.Value)[i].employerName + '</td><td style="text-align: left;" class="EmployerAddress">' + JSON.parse(d.Value)[i].employerAddress + '</td><td><button type="button" class="btn btn-danger btn-sm text-white" style="float: left;"   onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>  </tr>');
    //        }
    //    }
    //};
}





var showSuccessMessage = function (d) {

    Swal.fire({
        icon: 'success',
        title: 'Record saved successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    // window.location.href = '/Acces/Employee/Index';

}







//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------

var fnLoadProjects = function (d) {
    BindComboForDefault(JSON.parse(d.Value), $("#ProjectID"), "Select Project");
}
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------




function LoadMeetingDataByID() {

    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split 
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        KendoGlobalAjax({ commandName: 'Meeting_SelectByID', values: { MeetingID: id }, CallBack: loadMeetingData });
    }

}
var loadMeetingData = function (d) {


    setTimeout(function () {
        $('input,select,textarea').removeClass('error');
     
        $('#MeetingID').val(JSON.parse(d.Value)[0].meetingID);
        $('#MeetingName').val(JSON.parse(d.Value)[0].meetingName);
        $('#ClientID').val(JSON.parse(d.Value)[0].clientID).trigger('change');
        $('#EmployeeID').val(JSON.parse(d.Value)[0].employeeID).trigger('change');
        $('#ProjectID').val(JSON.parse(d.Value)[0].projectID).trigger('change');
        $('#MeetingDate').val(JSON.parse(d.Value)[0].meetingDate);
        $('#MeetingDiscussion').val(JSON.parse(d.Value)[0].meetingDiscussion);
        // $('#GivenName').val(JSON.parse(d.Value)[0].type).trigger('change');  
    }, 50);

}


function loadClientDDl() {
    var selectedProject = $('#ProjectID').val();
    KendoGlobalAjax({ commandName: 'Client_selectByProjectID', values: { ProjectID: selectedProject }, CallBack: loadProjectDDLAgainstProject });


}

var loadProjectDDLAgainstProject = function (d) {
     
    $('#ClientID').val(JSON.parse(d.Value)[0].clientID).trigger('change');
}



