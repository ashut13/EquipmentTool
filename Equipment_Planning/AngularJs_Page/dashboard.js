var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }

    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.screen_width = (window.screen.availWidth - (((window.screen.availWidth) * 5) / 100)) - 100 + "px";
    $scope.DerivatModel = "0";
    $scope.KostenartModel = "0";
    $scope.ChanceRisikoModel = "0";
    $scope.PlanergruppeModel = "0";
    $scope.ThemaModel = "0";

    $scope.Derivat = "";
    $scope.fn_bind_Derivat = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'Dashboard.aspx/get_Derivat_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Derivat = JSON.parse(response.d);
            $scope.DerivatModel = JSON.parse(response.d)[0].DerivatId.toString();
            $scope.fn_bind_Planergruppe();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Planergruppe = "";
    $scope.fn_bind_Planergruppe = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'Dashboard.aspx/get_Planergruppe_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Planergruppe = JSON.parse(response.d);
            $scope.PlanergruppeModel = JSON.parse(response.d)[0].PlanergruppeId.toString();
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
            url: 'Dashboard.aspx/get_Kostenart_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Kostenart = JSON.parse(response.d);
            $scope.KostenartModel = JSON.parse(response.d)[0].KostenartId.toString();
            $scope.fn_bind_Thema();
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
            url: 'Dashboard.aspx/get_Thema_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: $scope.PlanergruppeModel, KostenartId: $scope.KostenartModel }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Thema = JSON.parse(response.d);
            $scope.ThemaModel = JSON.parse(response.d)[0].ThemaId.toString();
            $scope.fn_data_for_chart();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.LoadChart = function (ChartType, ChartId, Border_Color, Back_Color, ChartLable, ChartData, centercutout) {
        document.getElementById("Loader").style.display = "block";
        Chart.defaults.global.defaultFontStyle = '600';
        myChart = new Chart(ChartId,
            {
                type: ChartType,
                data: {
                    labels: ChartLable,
                    datasets: [
                        {
                            borderColor: Border_Color,
                            backgroundColor: Back_Color,
                            data: ChartData
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: centercutout,
                    defaultFontSize: 16,
                    legend: {
                        display: false,
                        position: 'bottom'
                    },
                    scale: {
                        reverse: false,
                        pointLabels: {
                            fontStyle: "bold"
                        }
                    },
                    animation: {
                        animateScale: true,
                        onComplete: function () {
                            window.JSREPORT_READY_TO_START = true;
                        }
                    },
                    title: {
                        display: false,
                        text: 'Doughnut Chart'
                    }
                }

            });
        document.getElementById("Loader").style.display = "none";
    };

    $scope.fn_data_for_chart = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'Dashboard.aspx/get_Position_Data_For_Chart',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { DerivatId: $scope.DerivatModel, PlanergruppeId: $scope.PlanergruppeModel, KostenartId: $scope.KostenartModel, ThemaId: $scope.ThemaModel }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            var TotalSum = 0;
            var ChartLable = [];
            var ChartData = [];
            var ChartColor = ["#660066", "#ffff66", "#ccccff", "#66ff99", "#3366cc", "#339966", "#BFF179", "#F7145E", "#64D695", "#DB3EDB"];

            //var dataRow = $.grep($scope.PositionData, function (v) {
            //    return v.DerivatId === $scope.DerivatModel && v.PlanergruppeId === $scope.PlanergruppeModel && v.KostenartId === $scope.KostenartModel && v.ThemaId === $scope.ThemaModel;
            //});

            for (var i = 0; i < JSON.parse(response.d).length; i++) {
                TotalSum += JSON.parse(response.d)[i].Amount;
                ChartData.push(JSON.parse(response.d)[i].Amount);
                ChartLable.push(JSON.parse(response.d)[i].Year);
                //var color = '#';
                //var letters = '0123456789ABCDEF';
                //for (var a = 0; a < 6; a++) {
                //    color += letters[Math.floor(Math.random() * 16)];
                //}
                //ChartColor.push(color);
            }

            $scope.LoadChart('bar', "Chart", ChartColor, ChartColor, ChartLable, ChartData, 50);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_bind_Derivat();

}]);