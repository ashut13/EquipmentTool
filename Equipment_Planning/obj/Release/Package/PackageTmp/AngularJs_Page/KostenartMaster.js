var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.KostenartId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.KostenartMaster = "";
    $scope.fn_bind_KostenartMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'KostenartMaster.aspx/get_Kostenart_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.KostenartMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (KostenartId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'KostenartMaster.aspx/Activate_DeActivate_Kostenart_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { KostenartId: KostenartId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_KostenartMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Kostenart_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Kostenart").val() == "") {
            toastr.warning("Bitte Auswählen Kostenart fortfahren..!");
            $("#txt_Kostenart").focus();
            document.getElementById("txt_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Kostenart").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'KostenartMaster.aspx/Save_Kostenart_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { KostenartName: $("#txt_Kostenart").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Kostenart").val("");
                $scope.fn_bind_KostenartMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_KostenartMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Kostenart").val() == "") {
            toastr.warning("Bitte Auswählen Kostenart fortfahren..!");
            $("#txt_Kostenart").focus();
            document.getElementById("txt_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Kostenart").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'KostenartMaster.aspx/Update_Kostenart_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { KostenartId: $scope.KostenartId, KostenartName: $("#txt_Kostenart").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_KostenartMaster();
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
        var found_names = $.grep($scope.KostenartMaster, function (v) {
            return v.KostenartId === EditValue;
        })[0].KostenartName;
        $("#txt_Kostenart").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.KostenartId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.KostenartId = 0;
        $("#txt_Kostenart").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Kostenart").style.borderColor = "#ccc";
    };

    $scope.fn_bind_KostenartMaster();

}]);