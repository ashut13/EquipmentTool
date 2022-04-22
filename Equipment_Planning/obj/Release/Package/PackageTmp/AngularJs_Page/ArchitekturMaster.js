var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.ArchitekturId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.ArchitekturMaster = "";
    $scope.fn_bind_ArchitekturMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'ArchitekturMaster.aspx/get_Architektur_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.ArchitekturMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (ArchitekturId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'ArchitekturMaster.aspx/Activate_DeActivate_Architektur_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { ArchitekturId: ArchitekturId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_ArchitekturMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Architektur_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Architektur").val() == "") {
            toastr.warning("Bitte Auswählen Architektur fortfahren..!");
            $("#txt_Architektur").focus();
            document.getElementById("txt_Architektur").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Architektur").style.borderColor = "#ccc";
        }
 
        var httpreq = {
            method: 'POST',
            url: 'ArchitekturMaster.aspx/Save_Architektur_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {ArchitekturName: $("#txt_Architektur").val(), UserId: sessionStorage.getItem("epl_userid")}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Architektur").val("");
                $scope.fn_bind_ArchitekturMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_ArchitekturMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Architektur").val() == "") {
            toastr.warning("Bitte Auswählen Architektur fortfahren..!");
            $("#txt_Architektur").focus();
            document.getElementById("txt_Architektur").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Architektur").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'ArchitekturMaster.aspx/Update_Architektur_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { ArchitekturId: $scope.ArchitekturId, ArchitekturName: $("#txt_Architektur").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_ArchitekturMaster();
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
        var found_names = $.grep($scope.ArchitekturMaster, function (v) {
            return v.ArchitekturId === EditValue;
        })[0].ArchitekturName;
        $("#txt_Architektur").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.ArchitekturId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.ArchitekturId = 0;
        $("#txt_Architektur").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Architektur").style.borderColor = "#ccc";
    };

    $scope.fn_bind_ArchitekturMaster();

}]);