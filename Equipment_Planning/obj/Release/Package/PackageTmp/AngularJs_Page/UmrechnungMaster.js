var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.UmrechnungId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.UmrechnungMaster = "";
    $scope.fn_bind_UmrechnungMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'UmrechnungMaster.aspx/get_Umrechnung_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.UmrechnungMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (UmrechnungId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'UmrechnungMaster.aspx/Activate_DeActivate_Umrechnung_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmrechnungId: UmrechnungId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_UmrechnungMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Umrechnung_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Umrechnung").val() == "") {
            toastr.warning("Bitte Auswählen Umrechnung fortfahren..!");
            $("#txt_Umrechnung").focus();
            document.getElementById("txt_Umrechnung").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Umrechnung").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UmrechnungMaster.aspx/Save_Umrechnung_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmrechnungName: $("#txt_Umrechnung").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Umrechnung").val("");
                $scope.fn_bind_UmrechnungMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_UmrechnungMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Umrechnung").val() == "") {
            toastr.warning("Bitte Auswählen Umrechnung fortfahren..!");
            $("#txt_Umrechnung").focus();
            document.getElementById("txt_Umrechnung").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Umrechnung").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UmrechnungMaster.aspx/Update_Umrechnung_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmrechnungId: $scope.UmrechnungId, UmrechnungName: $("#txt_Umrechnung").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_UmrechnungMaster();
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
        var found_names = $.grep($scope.UmrechnungMaster, function (v) {
            return v.UmrechnungId === EditValue;
        })[0].UmrechnungName;
        $("#txt_Umrechnung").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.UmrechnungId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.UmrechnungId = 0;
        $("#txt_Umrechnung").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Umrechnung").style.borderColor = "#ccc";
    };

    $scope.fn_bind_UmrechnungMaster();

}]);