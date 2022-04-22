<%@ Page Title="" Language="C#" MasterPageFile="~/UserSiteMaster.Master" AutoEventWireup="true" CodeBehind="PositionData.aspx.cs" Inherits="Equipment_Planning.PositionData" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .collapsible {
            background-color: #FFCCCB;
            color: #212529;
            cursor: pointer;
            /* padding: 18px;
            width: 100%;*/
            border: none;
            /*text-align: left;*/
            outline: none;
            /*font-size: 15px;*/
        }

            .active, .collapsible:hover {
                background-color: #555;
                color: #fff;
            }

        .content_collapsible {
            /*padding: 0 18px;*/
            display: none;
            overflow: hidden;
            background-color: #f1f1f1;
        }
    </style>
    <style>
        /*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
        @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {

            /* Force table to not be like tables anymore */
            table, thead, tbody, th, td, tr {
                display: block;
            }

                /* Hide table headers (but not display: none;, for accessibility) */
                thead tr {
                    position: absolute;
                    top: -9999px;
                    left: -9999px;
                }

            tr {
                margin: 0 0 1rem 0;
            }

                tr:nth-child(odd) {
                    background: #ccc;
                }

            .css_td {
                border: none;
                border-bottom: 1px solid #eee;
                position: relative;
                padding-left: 50%;
            }

                .css_td:before {
                    /* Now like a table header */
                    position: absolute;
                    /* Top/left values mimic padding */
                    top: 0;
                    left: 6px;
                    width: 45%;
                    padding-right: 10px;
                    white-space: nowrap;
                }

                /*
		Label the data
    You could also use a data-* attribute and content for this. That way "bloats" the HTML, this way means you need to keep HTML and CSS in sync. Lea Verou has a clever way to handle with text-shadow.
		*/
                .css_td:nth-of-type(1):before {
                    content: "S.No";
                }

                .css_td:nth-of-type(2):before {
                    content: "Plan Category";
                }

                .css_td:nth-of-type(3):before {
                    content: "Plan Start Date";
                }

                .css_td:nth-of-type(4):before {
                    content: "Plan Stop Date";
                }

                .css_td:nth-of-type(5):before {
                    content: "Daily Cashback";
                }

                .css_td:nth-of-type(6):before {
                    content: "Total Cashback";
                }

                .css_td:nth-of-type(7):before {
                    content: "Last Updated";
                }

                .css_td:nth-of-type(8):before {
                    content: "Plan Status";
                }

                .css_td:nth-of-type(9):before {
                    content: "Payment Status";
                }
        }
    </style>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <!-- Small boxes (Stat box) -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card" style="margin-top: 15px;">
                            <div class="card-header" style="background-color: #074e70fa;">
                                <table width="100%">
                                    <tr>
                                        <td align="left">
                                            <h5 class="card-title" style="color: #fff;"><b>POSITIONSDATEN HINZUGEFUGT</b></h5>
                                        </td>
                                        <td align="right">
                                            <div>
                                                <input type="button" value="Daten Exportieren" style="cursor: pointer;" ng-click="fn_bind_PositionDataDownload()" />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="card-header">
                                <input type="text" id="mySearchText" ng-model="search" style="width: 100%; border-radius: 18px; height: 36px; border: 1px solid #e7e8ed; background-color: #f8f8f9; text-align: center; box-shadow: none;" placeholder=" Search...">
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div id="div_id" class="zui-wrapper">
                                    <div class="zui-scroller" style="min-width: 1279.2px; width: {{screen_width}}">
                                        <table role="table" id="tbl_class" style="background-color: #fff; width: 500%; max-width: 500%" class="table-bordered">
                                            <thead role="rowgroup" style="background-color: #e7e8ed; border: 1px solid #e7e8ed; height: 40px">
                                                <tr role="row">
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">S.No</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Architektur</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Derivat</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Planergruppe</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Erfassungsdatum</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Kostenart</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Thema</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Position</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Stuckpreis</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Anzahl</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Summe</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Halle</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Kontrollsumme</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2015</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2016</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2017</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2018</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2019</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2020</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2021</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2022</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2023</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2024</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2025</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2026</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2027</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">2028</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Chance</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Risiko</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Umrechnung</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">PM Auftragsnummer</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">PM Bezeichnung</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">PM Betrag</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">PM Erfassungsdatum</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">PSP Element</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Bemerkungen</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Beschlussstand</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">UmsetzendesGewerk</th>
                                                    <%--<th role="columnheader" style="text-align: center; vertical-align: middle;" ng-repeat="a in PositionDataYearHeader">{{a.Year}}</th>--%>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Eingefügt von</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Eingefügtes Datum</th>
                                                    <th role="columnheader" style="text-align: center; vertical-align: middle;">Aktion</th>
                                                </tr>
                                            </thead>
                                            <tbody role="rowgroup" dir-paginate="t in PositionData|filter:search|itemsPerPage:8">
                                                <tr role="row" ng-click="fn_collapsible(t.DataId);" ng-if="t.IsActive==1" ng-style="{'background-color':t.UpdateStatus == 'Updated' ? '#e7e8ed' : '#fff','cursor':t.UpdateStatus == 'Updated' ? 'pointer' : 'default' }" style="height: 38px;">
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{PositionData.indexOf(t) + 1}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.ArchitekturName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.DerivatName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PlanergruppeName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Erfassungsdatum}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.KostenartName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.ThemaName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PositionName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Stuckpreis}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Anzahl}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Summe}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.HalleName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Kontrollsumme}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2015}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2016}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2017}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2018}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2019}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2020}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2021}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2022}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2023}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2024}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2025}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2026}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2027}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2028}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Chance}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Risiko}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UmrechnungName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Auftragsnummer}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Bezeichnung}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Betrag}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Erfassungsdatum}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PSP_Element}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Bemerkungen}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.BeschlussstandName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UmsetzendesGewerkName}}</td>
                                                    <%--<td role="cell" class="css_td" style="text-align: center; vertical-align: middle;" ng-repeat="a in PositionDataYearHeader">{{a.Year}}</td>--%>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UserName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UpdatedDate}}</td>
                                                    <td style="text-align: center; vertical-align: middle;">
                                                        <img ng-click="fn_Edit(t.DataId);" title="Daten Bearbeiten" style="height: 32px; width: 32px; cursor: pointer;" src="img/update_icon.ico" />
                                                    </td>
                                                </tr>
                                                <tr role="row" id="tr_{{t.Id}}" ng-if="t.IsActive==2" style="background-color: #074e70fa; color: #fff; display: none;">
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{PositionData.indexOf(t) + 1}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.ArchitekturName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.DerivatName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PlanergruppeName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Erfassungsdatum}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.KostenartName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.ThemaName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PositionName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Stuckpreis}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Anzahl}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Summe}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.HalleName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Kontrollsumme}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2015}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2016}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2017}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2018}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2019}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2020}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2021}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2022}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2023}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2024}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2025}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2026}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2027}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Year_2028}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Chance}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Risiko}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UmrechnungName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Auftragsnummer}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Bezeichnung}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Betrag}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PM_Erfassungsdatum}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.PSP_Element}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.Bemerkungen}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.BeschlussstandName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UmsetzendesGewerkName}}</td>
                                                    <%--<td role="cell" class="css_td" style="text-align: center; vertical-align: middle;" ng-repeat="a in PositionDataYearHeader">{{a.Year}}</td>--%>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UserName}}</td>
                                                    <td role="cell" class="css_td" style="text-align: center; vertical-align: middle;">{{t.UpdatedDate}}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style="margin-top: 0px">
                                    <dir-pagination-controls
                                        max-size="8"
                                        direction-links="true"
                                        boundary-links="true">
                                        </dir-pagination-controls>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div>
        </section>
    </div>
    <script src="AngularJs_Page/PositionData.js?v=1"></script>
</asp:Content>



