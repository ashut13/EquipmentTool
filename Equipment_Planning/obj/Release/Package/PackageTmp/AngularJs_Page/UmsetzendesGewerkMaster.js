var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.UmsetzendesGewerkId = 0;
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.UmsetzendesGewerkMaster = "";
    $scope.fn_bind_UmsetzendesGewerkMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'UmsetzendesGewerkMaster.aspx/get_UmsetzendesGewerk_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.UmsetzendesGewerkMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (UmsetzendesGewerkId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'UmsetzendesGewerkMaster.aspx/Activate_DeActivate_UmsetzendesGewerk_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmsetzendesGewerkId: UmsetzendesGewerkId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_UmsetzendesGewerkMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_UmsetzendesGewerk_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_UmsetzendesGewerk").val() == "") {
            toastr.warning("Bitte Auswählen UmsetzendesGewerk fortfahren..!");
            $("#txt_UmsetzendesGewerk").focus();
            document.getElementById("txt_UmsetzendesGewerk").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_UmsetzendesGewerk").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UmsetzendesGewerkMaster.aspx/Save_UmsetzendesGewerk_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmsetzendesGewerkName: $("#txt_UmsetzendesGewerk").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_UmsetzendesGewerk").val("");
                $scope.fn_bind_UmsetzendesGewerkMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_UmsetzendesGewerkMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        if ($("#txt_UmsetzendesGewerk").val() == "") {
            toastr.warning("Bitte Auswählen UmsetzendesGewerk fortfahren..!");
            $("#txt_UmsetzendesGewerk").focus();
            document.getElementById("txt_UmsetzendesGewerk").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_UmsetzendesGewerk").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'UmsetzendesGewerkMaster.aspx/Update_UmsetzendesGewerk_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { UmsetzendesGewerkId: $scope.UmsetzendesGewerkId, UmsetzendesGewerkName: $("#txt_UmsetzendesGewerk").val(), UserId: sessionStorage.getItem("epl_userid") }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_UmsetzendesGewerkMaster();
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
        var found_names = $.grep($scope.UmsetzendesGewerkMaster, function (v) {
            return v.UmsetzendesGewerkId === EditValue;
        })[0].UmsetzendesGewerkName;
        $("#txt_UmsetzendesGewerk").val(found_names);
        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.UmsetzendesGewerkId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.UmsetzendesGewerkId = 0;
        $("#txt_UmsetzendesGewerk").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_UmsetzendesGewerk").style.borderColor = "#ccc";
    };

    $scope.fn_bind_UmsetzendesGewerkMaster();

}]);