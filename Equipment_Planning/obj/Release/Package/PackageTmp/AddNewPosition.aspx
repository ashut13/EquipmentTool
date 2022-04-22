<%@ Page Title="" Language="C#" MasterPageFile="~/UserSiteMaster.Master" AutoEventWireup="true" CodeBehind="AddNewPosition.aspx.cs" Inherits="Equipment_Planning.AddNewPosition" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12">
                        <!-- general form elements -->
                        <div class="card card-primary" style="margin-top: 15px;">
                            <div class="card-header" style="background-color: #074e70fa;">
                                <h5 class="card-title"><b id="pagetitle">NEUE POSITION ERFASSEN</b></h5>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Allgemeine Daten</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Architektur<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="1" ng-model="ArchitekturModel" id="ddl_Architektur" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Architektur</option>
                                                                <option ng-repeat="t in Architektur" value="{{t.ArchitekturId}}">{{t.ArchitekturName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Derivat<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="2" ng-model="DerivatModel" id="ddl_Derivat" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Derivat</option>
                                                                <option ng-repeat="t in Derivat" value="{{t.DerivatId}}">{{t.DerivatName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Planergruppe<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="3" id="ddl_Planergruppe" ng-model="PlanergruppeModel" ng-change="fn_bind_Thema()" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Planergruppe</option>
                                                                <option ng-repeat="t in Planergruppe" value="{{t.PlanergruppeId}}">{{t.PlanergruppeName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Erfassungsdatum<span style="color: red;">*</span></label>
                                                            <span>
                                                                <asp:TextBox ID="txt_Erfassungsdatum" TabIndex="4" runat="server" ClientIDMode="Static" ReadOnly="true" Style="background-color: #fff;" class="form-control"></asp:TextBox>
                                                                <ajaxToolkit:CalendarExtender TargetControlID="txt_Erfassungsdatum" BehaviorID="txt_Erfassungsdatum" Format="yyyy-MM-dd" ID="CalendarExtender1" runat="server" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Beschreibung der Position</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Kostenart<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="5" ng-change="fn_bind_Thema()" ng-model="KostenartModel" id="ddl_Kostenart" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Kostenart</option>
                                                                <option ng-repeat="t in Kostenart" value="{{t.KostenartId}}">{{t.KostenartName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Thema<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="6" ng-change="fn_bind_Position()" ng-model="ThemaModel" id="ddl_Thema" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Thema</option>
                                                                <option ng-repeat="t in Thema" value="{{t.ThemaId}}">{{t.ThemaName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Position<span style="color: red;">*</span></label>
                                                            <select class="form-control select2" tabindex="7" id="ddl_Position" ng-model="PositionModel" ng-change="fn_get_Price()" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Position</option>
                                                                <option ng-repeat="t in Position" value="{{t.PositionId}}">{{t.PositionName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Stückpreis(€)</label>
                                                            <input type="text" disabled="disabled" onkeypress="return onlyNumberKey(event)" class="form-control" id="txt_Stuckpreis" placeholder="Stückpreis">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Anzahl<span style="color: red;">*</span></label>
                                                            <input type="text" onkeypress="return onlyNumberKey(event)" tabindex="8" ng-change="fn_get_Total_Price()" ng-model="AnzahlModel" maxlength="5" class="form-control" id="txt_Anzahl" placeholder="Anzahl">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Summe(€)</label>
                                                            <input type="text" disabled="disabled" onkeypress="return onlyNumberKey(event)" maxlength="5" class="form-control" id="txt_Summe" placeholder="Summe">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Halle</label>
                                                            <select class="form-control select2" id="ddl_Halle" ng-model="HalleModel" tabindex="9" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Halle</option>
                                                                <option ng-repeat="t in Halle" value="{{t.HalleId}}">{{t.HalleName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Gesamtsumme & Periodisierung</strong></h3>
                                                <div id="div_Year"></div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Kontrollsumme(€)</label>
                                                            <input type="text" disabled="disabled" onkeypress="return onlyNumberKey(event)" maxlength="5" class="form-control" id="txt_Kontrollsumme" placeholder="Kontrollsumme">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Chance(€)</label>
                                                            <input type="text" onkeypress="return onlyNumberKey(event)" tabindex="31" maxlength="5" class="form-control" id="txt_Chance" placeholder="Chance">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Risiko(€)</label>
                                                            <input type="text" onkeypress="return onlyNumberKey(event)" maxlength="5" tabindex="32" class="form-control" id="txt_Risiko" placeholder="Risiko">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Umrechnung</label>
                                                            <select class="form-control select2" id="ddl_Umrechnung" ng-model="UmrechnungModel" tabindex="33" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Umrechnung</option>
                                                                <option ng-repeat="t in Umrechnung" value="{{t.UmrechnungId}}">{{t.UmrechnungName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">NACOS</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>PM Auftragsnummer</label>
                                                            <input type="text" class="form-control" tabindex="34" id="txt_PM_Auftragsnummer" placeholder=" PM Auftragsnummer">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>PM Bezeichnung</label>
                                                            <input type="text" tabindex="35" class="form-control" id="txt_PM_Bezeichnung" placeholder="PM Bezeichnung">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>PM-Betrag(€)</label>
                                                            <input type="text" onkeypress="return onlyNumberKey(event)" tabindex="36" class="form-control" id="txt_PM_Betrag" placeholder="PM-Betrag(€)">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>PM Erfassungsdatum</label>
                                                            <asp:TextBox ID="txt_PM_Erfassungsdatum" runat="server" TabIndex="37" ClientIDMode="Static" ReadOnly="true" Style="background-color: #fff;" class="form-control"></asp:TextBox>
                                                            <ajaxToolkit:CalendarExtender TargetControlID="txt_PM_Erfassungsdatum" BehaviorID="txt_PM_Erfassungsdatum" Format="yyyy-MM-dd" ID="CalendarExtender2" runat="server" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>PSP-Element</label>
                                                            <input type="text" class="form-control" id="txt_PSP_Element" tabindex="38" placeholder="PSP-Element">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="panel panel-primary">
                                            <div class="panel-body">
                                                <h3 class="text-on-pannel text-primary"><strong class="text-uppercase" style="color: #074e70fa; font-size: 16px;">Bermerkung, Beschlussstand & Report</strong></h3>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Bemerkungen</label>
                                                            <input type="text" class="form-control" tabindex="39" id="txt_Bemerkungen" placeholder=" Bemerkungen">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Beschlussstand</label>
                                                            <select class="form-control select2" tabindex="40" id="ddl_Beschlussstand" ng-model="BeschlussstandModel" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Beschlussstand</option>
                                                                <option ng-repeat="t in Beschlussstand" value="{{t.BeschlussstandId}}">{{t.BeschlussstandName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Umsetzendes Gewerk</label>
                                                            <select class="form-control select2" tabindex="41" id="ddl_Umsetzendes_Gewerk" ng-model="UmsetzendesGewerkModel" style="width: 100%;">
                                                                <option selected="selected" value="0">Auswählen Umsetzendes Gewerk</option>
                                                                <option ng-repeat="t in Umsetzendes_Gewerk" value="{{t.UmsetzendesGewerkId}}">{{t.UmsetzendesGewerkName}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer" style="text-align: right;">
                                <input type="button" class="btn btn-primary" tabindex="42" id="btn_Save" ng-click="fn_Save_Data()" style="background-color: #074e70fa;" value="Daten Übernehmen" />
                                <input type="button" class="btn btn-primary" id="btn_Update" ng-click="fn_Update_Data()" style="background-color: #074e70fa;" value="Daten Aktualisieren" />
                                <input type="button" class="btn btn-primary" tabindex="43" ng-click="fn_reset()" style="background-color: #074e70fa;" value="Beenden" />
                                <input type="button" id="hbtn_Dynamic_Year_Price_Sume" class="btn btn-primary" tabindex="43" ng-click="fn_bind_dynamic_year_Price_Sume();" style="background-color: #074e70fa; display: none;" value="Dynamic Year Sume" />
                            </div>
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script src="AngularJs_Page/AddNewPosition.js?v=1"></script>
    <script type="text/javascript">
        function sume_dynamic_year_price() {
            $("#hbtn_Dynamic_Year_Price_Sume").click();
        }
    </script>
</asp:Content>
