var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.DerivatId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.DerivatMaster = "";
    $scope.fn_bind_DerivatMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'DerivatMaster.aspx/get_Derivat_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.DerivatMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (DerivatId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'DerivatMaster.aspx/Activate_DeActivate_Derivat_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { DerivatId: DerivatId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_DerivatMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Derivat_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Derivat").val() == "") {
            toastr.warning("Bitte Auswählen Derivat fortfahren..!");
            $("#txt_Derivat").focus();
            document.getElementById("txt_Derivat").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Derivat").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'DerivatMaster.aspx/Save_Derivat_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { DerivatName: $("#txt_Derivat").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Derivat").val("");
                $scope.fn_bind_DerivatMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_DerivatMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Derivat").val() == "") {
            toastr.warning("Bitte Auswählen Derivat fortfahren..!");
            $("#txt_Derivat").focus();
            document.getElementById("txt_Derivat").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Derivat").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'DerivatMaster.aspx/Update_Derivat_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { DerivatId: $scope.DerivatId, DerivatName: $("#txt_Derivat").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_DerivatMaster();
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
        var found_names = $.grep($scope.DerivatMaster, function (v) {
            return v.DerivatId === EditValue;
        })[0].DerivatName;
        $("#txt_Derivat").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.DerivatId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.DerivatId = 0;
        $("#txt_Derivat").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Derivat").style.borderColor = "#ccc";
    };

    $scope.fn_bind_DerivatMaster();

}]);