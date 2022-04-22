var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.BeschlussstandId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.BeschlussstandMaster = "";
    $scope.fn_bind_BeschlussstandMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'BeschlussstandMaster.aspx/get_Beschlussstand_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.BeschlussstandMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (BeschlussstandId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'BeschlussstandMaster.aspx/Activate_DeActivate_Beschlussstand_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { BeschlussstandId: BeschlussstandId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_BeschlussstandMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Beschlussstand_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Beschlussstand").val() == "") {
            toastr.warning("Bitte Auswählen Beschlussstand fortfahren..!");
            $("#txt_Beschlussstand").focus();
            document.getElementById("txt_Beschlussstand").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Beschlussstand").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'BeschlussstandMaster.aspx/Save_Beschlussstand_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { BeschlussstandName: $("#txt_Beschlussstand").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Beschlussstand").val("");
                $scope.fn_bind_BeschlussstandMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_BeschlussstandMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Beschlussstand").val() == "") {
            toastr.warning("Bitte Auswählen Beschlussstand fortfahren..!");
            $("#txt_Beschlussstand").focus();
            document.getElementById("txt_Beschlussstand").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Beschlussstand").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'BeschlussstandMaster.aspx/Update_Beschlussstand_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { BeschlussstandId: $scope.BeschlussstandId, BeschlussstandName: $("#txt_Beschlussstand").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_BeschlussstandMaster();
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
        var found_names = $.grep($scope.BeschlussstandMaster, function (v) {
            return v.BeschlussstandId === EditValue;
        })[0].BeschlussstandName;
        $("#txt_Beschlussstand").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.BeschlussstandId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.BeschlussstandId = 0;
        $("#txt_Beschlussstand").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Beschlussstand").style.borderColor = "#ccc";
    };

    $scope.fn_bind_BeschlussstandMaster();

}]);