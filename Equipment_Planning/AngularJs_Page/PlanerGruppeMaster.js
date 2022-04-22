var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.PlanergruppeId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.PlanergruppeMaster = "";
    $scope.fn_bind_PlanergruppeMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PlanergruppeMaster.aspx/get_Planergruppe_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.PlanergruppeMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (PlanergruppeId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'PlanergruppeMaster.aspx/Activate_DeActivate_Planergruppe_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: PlanergruppeId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_PlanergruppeMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Planergruppe_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Planergruppe").val() == "") {
            toastr.warning("Bitte Auswählen Planergruppe fortfahren..!");
            $("#txt_Planergruppe").focus();
            document.getElementById("txt_Planergruppe").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Planergruppe").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'PlanergruppeMaster.aspx/Save_Planergruppe_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeName: $("#txt_Planergruppe").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Planergruppe").val("");
                $scope.fn_bind_PlanergruppeMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_PlanergruppeMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Planergruppe").val() == "") {
            toastr.warning("Bitte Auswählen Planergruppe fortfahren..!");
            $("#txt_Planergruppe").focus();
            document.getElementById("txt_Planergruppe").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Planergruppe").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'PlanergruppeMaster.aspx/Update_Planergruppe_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: $scope.PlanergruppeId, PlanergruppeName: $("#txt_Planergruppe").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_PlanergruppeMaster();
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
        var found_names = $.grep($scope.PlanergruppeMaster, function (v) {
            return v.PlanergruppeId === EditValue;
        })[0].PlanergruppeName;
        $("#txt_Planergruppe").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.PlanergruppeId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.PlanergruppeId = 0;
        $("#txt_Planergruppe").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Planergruppe").style.borderColor = "#ccc";
    };

    $scope.fn_bind_PlanergruppeMaster();

}]);