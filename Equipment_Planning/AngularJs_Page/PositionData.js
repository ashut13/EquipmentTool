var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.screen_width = (window.screen.availWidth - (((window.screen.availWidth) * 5) / 100)) - 100 + "px";
    $scope.PositionData = "";
    $scope.PositionDataFull = "";
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
            $scope.PositionDataFull = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.PositionDataYearHeader = "";
    $scope.fn_bind_PositionDataYearHeader = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionData.aspx/get_Position_Data_Header',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.PositionDataYearHeader = JSON.parse(response.d);
            $scope.fn_bind_PositionData();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.PositionDataDownload = "";
    $scope.fn_bind_PositionDataDownload = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'PositionData.aspx/get_Position_Data_Download',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.PositionDataDownload = JSON.parse(response.d);
            $scope.Export();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Export = function () {
        $scope.PositionDataHeder = '["S.No","Architektur","Derivat","Planergruppe","Erfassungsdatum","Kostenart","Thema","Position","Stuckpreis","Anzahl","Summe","Halle","Kontrollsumme","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","Chance","Risiko","Umrechnung","PM Auftragsnummer","PM Bezeichnung","PM Betrag","PM Erfassungsdatum","PSP Element","Bemerkungen","Beschlussstand","UmsetzendesGewerk","Eingefügt von","Eingefügtes Datum"]';
        excel_data($scope.PositionDataDownload, "Position Daten", "F", $scope.PositionDataHeder);
    };

    $scope.fn_collapsible = function (DataId) {

        var dataRow = $.grep($scope.PositionData, function (v) {
            return v.DataId === DataId & v.IsActive==2;
        });

        for (var i = 0; i < dataRow.length; i++) {
            var Id = dataRow[i].Id;

            var element = document.getElementById("tr_" + Id);
            if (element.style.display === "none") {
                $("#tr_" + Id).show();
            }
            else {
                $("#tr_" + Id).hide();
            }
        }
    };

    $scope.fn_Edit = function (DataId) {
        var dataRow = $.grep($scope.PositionData, function (v) {
            return v.DataId === DataId;
        });

        sessionStorage.setItem("epl_updatepositionObject", JSON.stringify(dataRow));

        window.location.href = "addnewposition.aspx";
    };

    //$scope.fn_bind_PositionDataYearHeader();
    $scope.fn_bind_PositionData();
}]);



