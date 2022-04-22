var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.PositionId = 0;
    $scope.PlanergruppeModel = "0";
    $scope.KostenartModel = "0";
    $scope.ThemaModel = "0";
    $scope.PositionModel = "0";
    $("#btn_Update").hide();
    $("#btn_Save").show();

    $scope.PositionMaster = "";
    $scope.fn_bind_PositionMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/get_Position_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.PositionMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (PositionId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'PositionMaster.aspx/Activate_DeActivate_Position_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PositionId: PositionId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_PositionMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Position_Data = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }

        if ($("#ddl_Planergruppe").val() == "0") {
            toastr.warning("Bitte Auswählen Planergruppe fortfahren..!");
            $("#ddl_Planergruppe").focus();
            document.getElementById("ddl_Planergruppe").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Planergruppe").style.borderColor = "#ccc";
        }

        if ($("#ddl_Kostenart").val() == "") {
            toastr.warning("Bitte Auswählen Position Price fortfahren..!");
            $("#ddl_Kostenart").focus();
            document.getElementById("ddl_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
        }

        if ($("#ddl_Thema").val() == "0") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#ddl_Thema").focus();
            document.getElementById("ddl_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Thema").style.borderColor = "#ccc";
        }

        if ($("#txt_Position").val() == "") {
            toastr.warning("Bitte Auswählen Position fortfahren..!");
            $("#txt_Position").focus();
            document.getElementById("txt_Position").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Position").style.borderColor = "#ccc";
        }

        if ($("#txt_Price").val() == "") {
            toastr.warning("Bitte Auswählen Position Price fortfahren..!");
            $("#txt_Price").focus();
            document.getElementById("txt_Price").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Price").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/Save_Position_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                PositionName: $("#txt_Position").val(), UserId: sessionStorage.getItem("epl_userid"), PositionPrice: $("#txt_Price").val(),
                PlanergruppeId: $("#ddl_Planergruppe").val(),
                ThemaId: $("#ddl_Thema").val(),
                KostenartId: $("ddl_Kostenart").val()
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $("#txt_Position").val("");
                $scope.fn_Reset();
                $scope.fn_bind_PositionMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_PositionMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }

        if ($("#ddl_Planergruppe").val() == "0") {
            toastr.warning("Bitte Auswählen Planergruppe fortfahren..!");
            $("#ddl_Planergruppe").focus();
            document.getElementById("ddl_Planergruppe").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Planergruppe").style.borderColor = "#ccc";
        }

        if ($("#ddl_Kostenart").val() == "0") {
            toastr.warning("Bitte Auswählen Position Price fortfahren..!");
            $("#ddl_Kostenart").focus();
            document.getElementById("ddl_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
        }

        if ($("#ddl_Thema").val() == "") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#ddl_Thema").focus();
            document.getElementById("ddl_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Thema").style.borderColor = "#ccc";
        }

        if ($("#txt_Position").val() == "") {
            toastr.warning("Bitte Auswählen Position fortfahren..!");
            $("#txt_Position").focus();
            document.getElementById("txt_Position").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Position").style.borderColor = "#ccc";
        }

        if ($("#txt_Price").val() == "") {
            toastr.warning("Bitte Auswählen Position Price fortfahren..!");
            $("#txt_Price").focus();
            document.getElementById("txt_Price").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Price").style.borderColor = "#ccc";
        }
        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/Update_Position_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                PositionId: $scope.PositionId, PositionName: $("#txt_Position").val(), UserId: sessionStorage.getItem("epl_userid"), PositionPrice: $("#txt_Price").val(),
                PlanergruppeId: $("#ddl_Planergruppe").val(),
                ThemaId: $("#ddl_Thema").val(),
                KostenartId: $("ddl_Kostenart").val()
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_PositionMaster();
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
        var found_names = $.grep($scope.PositionMaster, function (v) {
            return v.PositionId === EditValue;
        })[0].PositionName;
        $("#txt_Position").val(found_names);

        var found_names1 = $.grep($scope.PositionMaster, function (v) {
            return v.PositionId === EditValue;
        })[0].PositionPrice;
        $("#txt_Price").val(found_names1);

        var found_names2 = $.grep($scope.PositionMaster, function (v) {
            return v.PositionId === EditValue;
        })[0].PlanergruppeId;
        $("#ddl_Planergruppe").val(found_names2);

        var found_names3 = $.grep($scope.PositionMaster, function (v) {
            return v.PositionId === EditValue;
        })[0].KostenartId;
        $("#ddl_Kostenart").val(found_names3);

        var found_names4 = $.grep($scope.PositionMaster, function (v) {
            return v.PositionId === EditValue;
        })[0].ThemaId;
        $("#ddl_Thema").val(found_names4);

        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.PositionId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.PositionId = 0;
        $("#txt_Position").val("");
        $("#ddl_Planergruppe").val("0");
        $("#ddl_Thema").val("0");
        $("#ddl_Kostenart").val("0");
        $("#txt_Price").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("txt_Position").style.borderColor = "#ccc";
        document.getElementById("txt_Price").style.borderColor = "#ccc";
        document.getElementById("ddl_Planergruppe").style.borderColor = "#ccc";
        document.getElementById("ddl_Thema").style.borderColor = "#ccc";
        document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
    };


    $scope.Planergruppe = "";
    $scope.fn_bind_Planergruppe = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/get_Planergruppe_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Planergruppe = JSON.parse(response.d);
            $scope.fn_bind_Kostenart();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Kostenart = "";
    $scope.fn_bind_Kostenart = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/get_Kostenart_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Kostenart = JSON.parse(response.d);
            $scope.fn_bind_PositionMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Thema = "";
    $scope.fn_bind_Thema = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionMaster.aspx/get_Thema_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: $("#ddl_Planergruppe").val(), KostenartId: $("#ddl_Kostenart").val() }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Thema = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_bind_Planergruppe();

}]);