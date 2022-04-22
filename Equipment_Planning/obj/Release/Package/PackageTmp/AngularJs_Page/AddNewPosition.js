var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);
app.controller('myCntrl', ['$scope', '$http', function ($scope, $http) {

    if (sessionStorage.getItem("epl_userid") == null) {
        window.location.href = "Login.aspx";
        return false;
    }


    $scope.User_Name = sessionStorage.getItem("epl_username");
    $scope.PlanergruppeModel = "0";
    $scope.KostenartModel = "0";
    $scope.ThemaModel = "0";
    $scope.PositionModel = "0";
    $scope.ArchitekturModel = "0";
    $scope.DerivatModel = "0";
    $scope.HalleModel = "0";
    $scope.UmrechnungModel = "0";
    $scope.BeschlussstandModel = "0";
    $scope.UmsetzendesGewerkModel = "0";
    $scope.AnzahlModel = "";
    $scope.DataId = 0;
    var StartYear = 0;
    var EndYear = 0;

    $scope.Architektur = "";
    $scope.fn_bind_Architektur = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Architektur_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Architektur = JSON.parse(response.d);
            $scope.fn_bind_Derivat();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Derivat = "";
    $scope.fn_bind_Derivat = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Derivat_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Derivat = JSON.parse(response.d);
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
            url: 'AddNewPosition.aspx/get_Planergruppe_Data',
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
            url: 'AddNewPosition.aspx/get_Kostenart_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Kostenart = JSON.parse(response.d);
            $scope.fn_bind_Thema();
            $scope.fn_bind_Halle();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Halle = "";
    $scope.fn_bind_Halle = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Halle_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Halle = JSON.parse(response.d);
            $scope.fn_bind_Umrechnung()
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Umrechnung = "";
    $scope.fn_bind_Umrechnung = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Umrechnung_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Umrechnung = JSON.parse(response.d);
            $scope.fn_bind_Beschlussstand();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Beschlussstand = "";
    $scope.fn_bind_Beschlussstand = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Beschlussstand_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Beschlussstand = JSON.parse(response.d);
            $scope.fn_bind_Umsetzendes_Gewerk();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Umsetzendes_Gewerk = "";
    $scope.fn_bind_Umsetzendes_Gewerk = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_UmsetzendesGewerk_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Umsetzendes_Gewerk = JSON.parse(response.d);
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
            url: 'AddNewPosition.aspx/get_Thema_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: $scope.PlanergruppeModel, KostenartId: $scope.KostenartModel }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Thema = JSON.parse(response.d);
            $scope.fn_bind_Position();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.Position = "";
    $scope.fn_bind_Position = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Position_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PlanergruppeId: $scope.PlanergruppeModel, ThemaId: $scope.ThemaModel }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            $scope.Position = JSON.parse(response.d);
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_get_Price = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Position_Price',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { PositionId: $("#ddl_Position").val() }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            if (response.d != "[]") {
                $("#txt_Stuckpreis").val(JSON.parse(response.d)[0].PositionPrice);
            }
            else {
                $("#txt_Stuckpreis").val("");
            }
            $scope.fn_get_Total_Price();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_get_Total_Price = function () {
        if ($("#txt_Stuckpreis").val() != "" && $("#txt_Anzahl").val() != "") {
            $("#txt_Summe").val($("#txt_Stuckpreis").val() * $("#txt_Anzahl").val());
        }
        else {
            $("#txt_Summe").val("");
        }
    }

    $scope.fn_reset = function () {
        sessionStorage.removeItem("epl_updatepositionObject");

        $scope.DataId = 0;
        $scope.ArchitekturModel = "0";
        $scope.DerivatModel = "0";
        $scope.PlanergruppeModel = "0";
        
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        $("#txt_Erfassungsdatum").val([year, month, day].join('-'));
        $scope.KostenartModel = "0";
        $scope.ThemaModel = "0";
        $scope.PositionModel = "0";
        $("#txt_Stuckpreis").val("");
        $("#txt_Anzahl").val("");
        $("#txt_Summe").val("");
        $scope.HalleModel = "0";
        $("#txt_Kontrollsumme").val("");
        $("#txt_Chance").val("");
        $("#txt_Risiko").val("");
        $scope.UmrechnungModel = "0";
        $("#txt_PM_Auftragsnummer").val("");
        $("#txt_PM_Bezeichnung").val("");
        $("#txt_PM_Betrag").val("");
        $("#txt_PM_Erfassungsdatum").val("");
        $("#txt_PSP_Element").val("");
        $("#txt_Bemerkungen").val("");
        $scope.BeschlussstandModel = "0";
        $scope.UmsetzendesGewerkModel = "0";

        $("#btn_Update").hide();
        $("#btn_Save").show();
        $("#pagetitle").text("NEUE POSITION ERFASSEN");
        $scope.fn_dynamic_year();
    }

    $scope.fn_bind_dynamic_year_Price_Sume = function () {
        var Dif = EndYear - StartYear;
        var PriceSume = 0;
        for (var i = 0; i <= Dif; i++) {
            if ($("#txt_" + (StartYear + i) + "").val() != "") {
                if (($("#txt_Summe").val() != "") && (parseFloat($("#txt_Summe").val()) >= (PriceSume + parseFloat($("#txt_" + (StartYear + i) + "").val())))) {
                    PriceSume += parseFloat($("#txt_" + (StartYear + i) + "").val());
                }
                else {
                    $("#txt_" + (StartYear + i) + "").val("");
                    toastr.warning("Prüfsumme (€) und Sum(€) Wert sollten gleich sein.");
                    $("#txt_" + (StartYear + i) + "").focus();
                    document.getElementById("#txt_" + (StartYear + i) + "").style.borderColor = "#FF0000";
                    break;
                }
            }
        }
        if (PriceSume > 0) {
            $("#txt_Kontrollsumme").val(PriceSume);
        }
        else {
            $("#txt_Kontrollsumme").val("");
        }
    }

    $scope.fn_Save_Data = function () {
        var Dif = EndYear - StartYear;
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }

        if ($("#ddl_Architektur").val() == "0") {
            toastr.warning("Bitte Auswählen Architektur fortfahren..!");
            $("#ddl_Architektur").focus();
            document.getElementById("ddl_Architektur").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Architektur").style.borderColor = "#ccc";
        }

        if ($("#ddl_Derivat").val() == "0") {
            toastr.warning("Bitte Auswählen Derivat fortfahren..!");
            $("#ddl_Derivat").focus();
            document.getElementById("ddl_Derivat").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Derivat").style.borderColor = "#ccc";
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

        if ($("#ddl_Thema").val() == "0") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#ddl_Thema").focus();
            document.getElementById("ddl_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Thema").style.borderColor = "#ccc";
        }

        if ($("#ddl_Position").val() == "0") {
            toastr.warning("Bitte Auswählen Position fortfahren..!");
            $("#ddl_Position").focus();
            document.getElementById("ddl_Position").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Position").style.borderColor = "#ccc";
        }

        if ($("#txt_Anzahl").val() == "") {
            toastr.warning("Bitte betreten Anzahl fortfahren..!");
            $("#txt_Anzahl").focus();
            document.getElementById("txt_Anzahl").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Anzahl").style.borderColor = "#ccc";
        }

        if ($("#txt_Summe").val() != $("#txt_Kontrollsumme").val()) {
            toastr.warning("Prüfsumme (€) und Sum(€) Wert sollten gleich sein..!");
            $("#txt_Kontrollsumme").focus();
            document.getElementById("txt_Kontrollsumme").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Kontrollsumme").style.borderColor = "#ccc";
        }

        var JsonData = "[";

        for (var i = 0; i <= Dif; i++) {
            JsonData += "{\"Year\":\"" + (StartYear + i) + "\",\"Amount\":\"" + $("#txt_" + (StartYear + i)).val() + "\"},";
        }
        JsonData = JsonData.replace(/,\s*$/, "") + "]";
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/Save_Position_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                ArchitekturId: $("#ddl_Architektur").val(), DerivatId: $("#ddl_Derivat").val(), PlanergruppeId: $("#ddl_Planergruppe").val(), Erfassungsdatum: $("#txt_Erfassungsdatum").val(), KostenartId: $("#ddl_Kostenart").val(), ThemaId: $("#ddl_Thema").val(), PositionId: $("#ddl_Position").val(), Stuckpreis: $("#txt_Stuckpreis").val(), Anzahl: $("#txt_Anzahl").val(), Summe: $("#txt_Summe").val(),
                HalleId: $("#ddl_Halle").val(), Kontrollsumme: $("#txt_Kontrollsumme").val(), Chance: $("#txt_Chance").val(), Risiko: $("#txt_Risiko").val(), UmrechnungId: $("#ddl_Umrechnung").val(), PM_Auftragsnummer: $("#txt_PM_Auftragsnummer").val(), PM_Bezeichnung: $("#txt_PM_Bezeichnung").val(), PM_Betrag: $("#txt_PM_Betrag").val(), PM_Erfassungsdatum: $("#txt_PM_Erfassungsdatum").val(), PSP_Element: $("#txt_PSP_Element").val(),
                Bemerkungen: $("#txt_Bemerkungen").val(), BeschlussstandId: $("#ddl_Beschlussstand").val(), UmsetzendesGewerkId: $("#ddl_Umsetzendes_Gewerk").val(), YearWisePriceJson: JsonData, UserId: sessionStorage.getItem("epl_userid")
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.success("Daten erfolgreich gespeichert..!");
            $scope.fn_reset();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }

    $scope.fn_Update_Data = function () {
        var Dif = EndYear - StartYear;
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }

        if ($scope.DataId == 0) {
            window.location.href = "Login.aspx";
            return false;
        }

        if ($("#ddl_Architektur").val() == "0") {
            toastr.warning("Bitte Auswählen Architektur fortfahren..!");
            $("#ddl_Architektur").focus();
            document.getElementById("ddl_Architektur").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Architektur").style.borderColor = "#ccc";
        }

        if ($("#ddl_Derivat").val() == "0") {
            toastr.warning("Bitte Auswählen Derivat fortfahren..!");
            $("#ddl_Derivat").focus();
            document.getElementById("ddl_Derivat").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Derivat").style.borderColor = "#ccc";
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

        if ($("#ddl_Thema").val() == "0") {
            toastr.warning("Bitte Auswählen Thema fortfahren..!");
            $("#ddl_Thema").focus();
            document.getElementById("ddl_Thema").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Thema").style.borderColor = "#ccc";
        }

        if ($("#ddl_Position").val() == "0") {
            toastr.warning("Bitte Auswählen Position fortfahren..!");
            $("#ddl_Position").focus();
            document.getElementById("ddl_Position").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("ddl_Position").style.borderColor = "#ccc";
        }

        if ($("#txt_Anzahl").val() == "") {
            toastr.warning("Bitte betreten Anzahl fortfahren..!");
            $("#txt_Anzahl").focus();
            document.getElementById("txt_Anzahl").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Anzahl").style.borderColor = "#ccc";
        }

        if ($("#txt_Summe").val() != $("#txt_Kontrollsumme").val()) {
            toastr.warning("Prüfsumme (€) und Sum(€) Wert sollten gleich sein..!");
            $("#txt_Kontrollsumme").focus();
            document.getElementById("txt_Kontrollsumme").style.borderColor = "#FF0000";
            return false;
        }
        else {
            document.getElementById("txt_Kontrollsumme").style.borderColor = "#ccc";
        }

        var JsonData = "[";

        for (var i = 0; i <= Dif; i++) {
            JsonData += "{\"Year\":\"" + (StartYear + i) + "\",\"Amount\":\"" + $("#txt_" + (StartYear + i)).val() + "\"},";
        }
        JsonData = JsonData.replace(/,\s*$/, "") + "]";
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/Update_Position_Data',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {
                DataId: $scope.DataId, ArchitekturId: $("#ddl_Architektur").val(), DerivatId: $("#ddl_Derivat").val(), PlanergruppeId: $("#ddl_Planergruppe").val(), Erfassungsdatum: $("#txt_Erfassungsdatum").val(), KostenartId: $("#ddl_Kostenart").val(), ThemaId: $("#ddl_Thema").val(), PositionId: $("#ddl_Position").val(), Stuckpreis: $("#txt_Stuckpreis").val(), Anzahl: $("#txt_Anzahl").val(), Summe: $("#txt_Summe").val(),
                HalleId: $("#ddl_Halle").val(), Kontrollsumme: $("#txt_Kontrollsumme").val(), Chance: $("#txt_Chance").val(), Risiko: $("#txt_Risiko").val(), UmrechnungId: $("#ddl_Umrechnung").val(), PM_Auftragsnummer: $("#txt_PM_Auftragsnummer").val(), PM_Bezeichnung: $("#txt_PM_Bezeichnung").val(), PM_Betrag: $("#txt_PM_Betrag").val(), PM_Erfassungsdatum: $("#txt_PM_Erfassungsdatum").val(), PSP_Element: $("#txt_PSP_Element").val(),
                Bemerkungen: $("#txt_Bemerkungen").val(), BeschlussstandId: $("#ddl_Beschlussstand").val(), UmsetzendesGewerkId: $("#ddl_Umsetzendes_Gewerk").val(), YearWisePriceJson: JsonData, UserId: sessionStorage.getItem("epl_userid")
            }
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.success("Daten erfolgreich gespeichert..!");
            $scope.fn_reset();
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_bind_dynamic_year = function (JsonData) {

        if (JsonData == "") {
            var div_year = "<div class=\"row\">";
            var count = 0;
            var Dif = EndYear - StartYear;
            for (var i = 0; i <= Dif; i++) {
                div_year += "<div class=\"col-md-3\"><div class=\"form-group\"><label>" + (StartYear + i) + "</label><input type=\"text\" class=\"form-control\" onkeyup=\"sume_dynamic_year_price()\" tabindex=\"" + (10 + i) + "\" onkeypress=\"return onlyNumberKey(event)\" maxlength=\"5\" id=\"txt_" + (StartYear + i) + "\" placeholder=\"" + (StartYear + i) + "\"></div></div>";
                count += 1;
                if (count == 4 || (i) == Dif) {
                    if ((i) != Dif) {
                        div_year += "</div><div class=\"row\">";
                    }
                    else {
                        div_year += "</div>";
                    }
                    count = 0;
                }
            }

            $("#div_Year").empty().append(div_year);
            $scope.fn_bind_Architektur();
        }
        else {
            StartYear = parseInt(JSON.parse(JsonData)[0].Year);
            EndYear = parseInt(JSON.parse(JsonData)[JSON.parse(JsonData).length - 1].Year);

            var div_year = "<div class=\"row\">";
            var count = 0;
            var Dif = EndYear - StartYear;
            for (var i = 0; i <= Dif; i++) {
                div_year += "<div class=\"col-md-3\"><div class=\"form-group\"><label>" + (StartYear + i) + "</label><input type=\"text\" class=\"form-control\" onkeyup=\"sume_dynamic_year_price()\" tabindex=\"" + (10 + i) + "\" onkeypress=\"return onlyNumberKey(event)\" maxlength=\"5\" value=\"" + JSON.parse(JsonData)[i].Amount + "\" id=\"txt_" + (StartYear + i) + "\" placeholder=\"" + (StartYear + i) + "\"></div></div>";
                count += 1;
                if (count == 4 || (i) == Dif) {
                    if ((i) != Dif) {
                        div_year += "</div><div class=\"row\">";
                    }
                    else {
                        div_year += "</div>";
                    }
                    count = 0;
                }
            }

            $("#div_Year").empty().append(div_year);
            $scope.fn_FillValueForUpdate();
        }
    }

    $scope.fn_FillValueForUpdate = function () {

        if (sessionStorage.getItem("epl_updatepositionObject") != null) {
            $scope.DataId = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].DataId;
            $scope.ArchitekturModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].ArchitekturId.toString();
            $scope.DerivatModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].DerivatId.toString();
            $scope.PlanergruppeModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PlanergruppeId.toString();
            $("#txt_Erfassungsdatum").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Erfassungsdatum.toString());
            $scope.KostenartModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].KostenartId.toString();
            $scope.ThemaModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].ThemaId.toString();
            $scope.PositionModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PositionId.toString();
            $("#txt_Stuckpreis").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Stuckpreis.toString());
            $("#txt_Anzahl").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Anzahl.toString());
            $("#txt_Summe").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Summe.toString());
            $scope.HalleModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].HalleId.toString();
            $("#txt_Kontrollsumme").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Kontrollsumme.toString());
            $("#txt_Chance").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Chance.toString());
            $("#txt_Risiko").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Risiko.toString());
            $scope.UmrechnungModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].UmrechnungId.toString();
            $("#txt_PM_Auftragsnummer").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PM_Auftragsnummer.toString());
            $("#txt_PM_Bezeichnung").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PM_Bezeichnung.toString());
            $("#txt_PM_Betrag").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PM_Betrag.toString());
            $("#txt_PM_Erfassungsdatum").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PM_Erfassungsdatum.toString());
            $("#txt_PSP_Element").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PSP_Element.toString());
            $("#txt_Bemerkungen").val(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].Bemerkungen.toString());
            $scope.BeschlussstandModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].BeschlussstandId.toString();
            $scope.UmsetzendesGewerkModel = JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].UmsetzendesGewerkId.toString();
        }
        $scope.fn_bind_Architektur();
    }

    $scope.fn_dynamic_year = function () {
        if (sessionStorage.getItem("epl_userid") == null) {
            window.location.href = "Login.aspx";
            return false;
        }
        document.getElementById("Loader").style.display = "block";
        var httpreq = {
            method: 'POST',
            url: 'AddNewPosition.aspx/get_Dynamic_Year',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        };
        $http(httpreq).success(function (response) {
            document.getElementById("Loader").style.display = "none";
            StartYear = JSON.parse(response.d)[0].StartYear;
            EndYear = JSON.parse(response.d)[0].EndYear;
            if (sessionStorage.getItem("epl_updatepositionObject") == null) {
                $("#btn_Update").hide();
                $("#btn_Save").show();
                $("#pagetitle").text("NEUE POSITION ERFASSEN");
                $scope.fn_bind_dynamic_year("");
            }
            else {
                $("#btn_Save").hide();
                $("#btn_Update").show();
                $("#pagetitle").text("POSITIONSDATEN AKTUALISIEREN");
                $scope.fn_bind_dynamic_year(JSON.parse(sessionStorage.getItem("epl_updatepositionObject"))[0].PriceYearWise);
            }
        }).error(function (response) {
            document.getElementById("Loader").style.display = "none";
            toastr.error("Etwas ist schief gelaufen..!");
        });
    }


    $scope.fn_dynamic_year();

}]);