var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.HalleId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.HalleMaster = "";
    $scope.fn_bind_HalleMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'HalleMaster.aspx/get_Halle_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.HalleMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (HalleId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'HalleMaster.aspx/Activate_DeActivate_Halle_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { HalleId: HalleId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_HalleMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Halle_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Halle").val() == "") {
            toastr.warning("Bitte Auswählen Halle fortfahren..!");
            $("#txt_Halle").focus();
            document.getElementById("txt_Halle").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Halle").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'HalleMaster.aspx/Save_Halle_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { HalleName: $("#txt_Halle").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Halle").val("");
                $scope.fn_bind_HalleMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_HalleMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_Halle").val() == "") {
            toastr.warning("Bitte Auswählen Halle fortfahren..!");
            $("#txt_Halle").focus();
            document.getElementById("txt_Halle").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Halle").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'HalleMaster.aspx/Update_Halle_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { HalleId: $scope.HalleId, HalleName: $("#txt_Halle").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_HalleMaster();
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
        var found_names = $.grep($scope.HalleMaster, function (v) {
            return v.HalleId === EditValue;
        })[0].HalleName;
        $("#txt_Halle").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.HalleId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.HalleId = 0;
        $("#txt_Halle").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Halle").style.borderColor = "#ccc";
    };

    $scope.fn_bind_HalleMaster();

}]);