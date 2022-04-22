var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.UserId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.UserMaster = "";
    $scope.fn_bind_UserMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'UserMaster.aspx/get_User_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.UserMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (UserId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'UserMaster.aspx/Activate_DeActivate_User_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UserId: UserId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_UserMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_User_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_User").val() == "") {
            toastr.warning("Bitte Auswählen User fortfahren..!");
            $("#txt_User").focus();
            document.getElementById("txt_User").style.borderColor = "#FF0000";
            return true;
        }
        else {
            document.getElementById("txt_User").style.borderColor = "#ccc";
        }

        if ($("#txt_ShortId").val() == "") {
            toastr.warning("Bitte Auswählen ShortId fortfahren..!");
            $("#txt_ShortId").focus();
            document.getElementById("txt_ShortId").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_ShortId").style.borderColor = "#ccc";
        }

        if ($("#txt_Email").val() == "") {
            toastr.warning("Bitte Auswählen Email fortfahren..!");
            $("#txt_Email").focus();
            document.getElementById("txt_Email").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Email").style.borderColor = "#ccc";
        }


        if ($("#txt_Password").val() == "") {
            toastr.warning("Bitte Auswählen Password fortfahren..!");
            $("#txt_Password").focus();
            document.getElementById("txt_Password").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Password").style.borderColor = "#ccc";
        }

        if ($("#ddl_FirstTimeLogin").val() == "0") {
            toastr.warning("Bitte Auswählen FirstTimeLogin fortfahren..!");
            $("#ddl_FirstTimeLogin").focus();
            document.getElementById("ddl_FirstTimeLogin").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_FirstTimeLogin").style.borderColor = "#ccc";
        }

        if ($("#ddl_IsAdmin").val() == "0") {
            toastr.warning("Bitte Auswählen IsAdmin fortfahren..!");
            $("#ddl_IsAdmin").focus();
            document.getElementById("ddl_IsAdmin").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_IsAdmin").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UserMaster.aspx/Save_User_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                UserName: $("#txt_User").val(), UserId: sessionStorage.getItem("epl_userid"),
                UserShortId: $("#txt_ShortId").val(),
                UserEmailId: $("#txt_Email").val(),
                UserPassword: $("#txt_Password").val(),
                FirstTimeLogin: $("#ddl_FirstTimeLogin").val(),
                IsAdmin: $("#ddl_IsAdmin").val()
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_User").val("");
                $scope.fn_bind_UserMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_UserMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_User").val() == "") {
            toastr.warning("Bitte Auswählen User fortfahren..!");
            $("#txt_User").focus();
            document.getElementById("txt_User").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_User").style.borderColor = "#ccc";
        }

        if ($("#txt_ShortId").val() == "") {
            toastr.warning("Bitte Auswählen ShortId fortfahren..!");
            $("#txt_ShortId").focus();
            document.getElementById("txt_ShortId").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_ShortId").style.borderColor = "#ccc";
        }

        if ($("#txt_Email").val() == "") {
            toastr.warning("Bitte Auswählen Email fortfahren..!");
            $("#txt_Email").focus();
            document.getElementById("txt_Email").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Email").style.borderColor = "#ccc";
        }


        if ($("#txt_Password").val() == "") {
            toastr.warning("Bitte Auswählen Password fortfahren..!");
            $("#txt_Password").focus();
            document.getElementById("txt_Password").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Password").style.borderColor = "#ccc";
        }

        if ($("#ddl_FirstTimeLogin").val() == "0") {
            toastr.warning("Bitte Auswählen FirstTimeLogin fortfahren..!");
            $("#ddl_FirstTimeLogin").focus();
            document.getElementById("ddl_FirstTimeLogin").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_FirstTimeLogin").style.borderColor = "#ccc";
        }

        if ($("#ddl_IsAdmin").val() == "0") {
            toastr.warning("Bitte Auswählen IsAdmin fortfahren..!");
            $("#ddl_IsAdmin").focus();
            document.getElementById("ddl_IsAdmin").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_IsAdmin").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UserMaster.aspx/Update_User_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                UserId: $scope.UserId, UserName: $("#txt_User").val(), UserId: sessionStorage.getItem("epl_userid"),
                UserShortId: $("#txt_ShortId").val(),
                UserEmailId: $("#txt_Email").val(),
                UserPassword: $("#txt_Password").val(),
                FirstTimeLogin: $("#ddl_FirstTimeLogin").val(),
                IsAdmin: $("#ddl_IsAdmin").val()
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_UserMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Edit = function (EditValue) {
        var found_names = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].UserName;
        $("#txt_User").val(found_names);

        var found_names1 = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].UserShortId;
        $("#txt_ShortId").val(found_names1);

        var found_names2 = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].UserEmailId;
        $("#txt_Email").val(found_names2);

        var found_names3 = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].UserPassword;
        $("#txt_Password").val(found_names3);

        var found_names4 = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].FirstTimeLogin;
        $("#txt_FirstTimeLogin").val(found_names4);

        var found_names5 = $.grep($scope.UserMaster, function (v) {
            return v.UserId === EditValue;
        })[0].IsAdmin;
        $("#ddl_IsAdmin").val(found_names5);

        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.UserId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.UserId = 0;
        $("#txt_User").val("");
        $("#txt_ShortId").val("");
        $("#txt_Email").val("");
        $("#txt_Password").val("");
        $("#ddl_FirstTimeLogin").val("");
        $("#ddl_IsAdmin").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_User").style.borderColor = "#ccc";
        document.getElementById("txt_ShortId").style.borderColor = "#ccc";
        document.getElementById("txt_Email").style.borderColor = "#ccc";
        document.getElementById("txt_Password").style.borderColor = "#ccc";
        document.getElementById("ddl_FirstTimeLogin").style.borderColor = "#ccc";
        document.getElementById("ddl_IsAdmin").style.borderColor = "#ccc";
    };

    $scope.fn_bind_UserMaster();

}]);