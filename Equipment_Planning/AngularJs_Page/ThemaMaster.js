var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.ThemaId = 0;
    $scope.PlanergruppeModel = "0";
    $scope.KostenartModel = "0";
    $("#btn_Update").hide();
    $("#btn_Save").show();


    $scope.ThemaMaster = "";
    $scope.fn_bind_ThemaMaster = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'ThemaMaster.aspx/get_Thema_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.ThemaMaster = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Active_De_Active = function (ThemaId) {
        document.getElementById("Loader").style.display = "block";
        var httpreq =
        {
            method: 'POST',
            url: 'ThemaMaster.aspx/Activate_DeActivate_Thema_Master',
            headers:
            {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { ThemaId: ThemaId }
        }
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.fn_bind_ThemaMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Save_Thema_Data = function () {
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
            toastr.warning("Bitte Auswählen Kostenart fortfahren..!");
            $("#ddl_Kostenart").focus();
            document.getElementById("ddl_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
        }

        if ($("#txt_Thema").val() == "") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#txt_Thema").focus();
            document.getElementById("txt_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Thema").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'ThemaMaster.aspx/Save_Thema_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                ThemaName: $("#txt_Thema").val(), UserId: sessionStorage.getItem("epl_userid"),
                PlanergruppeId: $("#ddl_Planergruppe").val(),
                KostenartId: $("#ddl_Kostenart").val()
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_ThemaMaster();
            }
            else {
                toastr.info("Datensatz existiert bereits..!");
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_Update_ThemaMaster = function () {
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
            toastr.warning("Bitte Auswählen Kostenart fortfahren..!");
            $("#ddl_Kostenart").focus();
            document.getElementById("ddl_Kostenart").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
        }

        if ($("#txt_Thema").val() == "") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#txt_Thema").focus();
            document.getElementById("txt_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Thema").style.borderColor = "#ccc";
        }

        var httpreq = {
            method: 'POST',
            url: 'ThemaMaster.aspx/Update_Thema_Master_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                ThemaId: $scope.ThemaId, ThemaName: $("#txt_Thema").val(), UserId: sessionStorage.getItem("epl_userid"),
                PlanergruppeId: $("#ddl_Planergruppe").val(),
                KostenartId: $("#ddl_Kostenart").val()
                }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d == "1") {
                toastr.success("Daten erfolgreich gespeichert..!");
                $scope.fn_Reset();
                $scope.fn_bind_ThemaMaster();
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
        var found_names = $.grep($scope.ThemaMaster, function (v) {
            return v.ThemaId === EditValue;
        })[0].ThemaName;
        $("#txt_Thema").val(found_names);

        var found_names1 = $.grep($scope.ThemaMaster, function (v) {
            return v.ThemaId === EditValue;
        })[0].PlanergruppeId;
        $("#ddl_Planergruppe").val(found_names1);

        var found_names2 = $.grep($scope.ThemaMaster, function (v) {
            return v.ThemaId === EditValue;
        })[0].KostenartId;
        $("#ddl_Kostenart").val(found_names2);

        $("#btn_Save").hide();
        $("#btn_Update").show();
        $scope.ThemaId = EditValue;
    };

    $scope.fn_Reset = function () {
        $scope.ThemaId = 0;
        $("#ddl_Planergruppe").val("0");
        $("#ddl_Kostenart").val("0");
        $("#txt_Thema").val("");
        $("#btn_Update").hide();
        $("#btn_Save").show();
        document.getElementById("ddl_Planergruppe").style.borderColor = "#ccc";
        document.getElementById("ddl_Kostenart").style.borderColor = "#ccc";
        document.getElementById("txt_Thema").style.borderColor = "#ccc";
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
            url: 'ThemaMaster.aspx/get_Planergruppe_Data',
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
            url: 'ThemaMaster.aspx/get_Kostenart_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Kostenart = JSON.parse(response.d);
            $scope.fn_bind_ThemaMaster();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_bind_Planergruppe();

}]);