var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.screen_width = (window.screen.availWidth - (((window.screen.availWidth) * 5) / 100)) - 100 + "px";
    $scope.PositionData = "";
    $scope.fn_bind_PositionData = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionData.aspx/get_Position_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.PositionData = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Export = function () {
        $scope.PositionDataHeder = '["Architektur","Derivat","Planergruppe","Erfassungsdatum","Kostenart","Thema","Position","Stuckpreis","Anzahl","Summe","Halle","Kontrollsumme","Chance","Risiko","Umrechnung","PM Auftragsnummer","PM Bezeichnung","PM Betrag","PM Erfassungsdatum","PSP Element","Bemerkungen","Beschlussstand","UmsetzendesGewerk","Eingefügt von","Eingefügtes Datum"]';
        excel_data($scope.PositionData, "Position Daten", "F", $scope.PositionDataHeder);
    };

    $scope.fn_collapsible = function (DataId) {

        var element = document.getElementById("tr_" + DataId);
        if (element.style.display === "none") {
            $("#tr_" + DataId).show();
        }
        else {
            $("#tr_" + DataId).hide();
        }
    };

    $scope.fn_Edit = function (DataId) {
        var dataRow = $.grep($scope.PositionData, function (v) {
            return v.DataId === DataId;
        });

        sessionStorage.setItem("epl_updatepositionObject", JSON.stringify(dataRow));

        window.location.href = "addnewposition.aspx";
    };


    $scope.fn_bind_PositionData();
}]);



