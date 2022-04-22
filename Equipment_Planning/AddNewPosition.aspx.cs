using Newtonsoft.Json;
using Equipment_Planning.App_Code;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Principal;

namespace Equipment_Planning
{
    public partial class AddNewPosition : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txt_Erfassungsdatum.Text = System.DateTime.Now.ToString("yyyy-MM-dd");
            //txt_PM_Erfassungsdatum.Text = System.DateTime.Now.ToString("yyyy-MM-dd");
        }

        [System.Web.Services.WebMethod()]
        public static string get_Architektur_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_architektur_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Derivat_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_derivat_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }
        [System.Web.Services.WebMethod()]
        public static string get_Planergruppe_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_planergruppe_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }
        [System.Web.Services.WebMethod()]
        public static string get_Kostenart_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_kostenart_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Halle_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_halle_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Umrechnung_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_umrechnung_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Beschlussstand_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_beschlussstand_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_UmsetzendesGewerk_Data()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_umsetzendes_gewerk_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }


        [System.Web.Services.WebMethod()]
        public static string get_Dynamic_Year()
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[0];
            dbc.RunProcedure("sp_get_dynamic_year", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Thema_Data(string PlanergruppeId, string KostenartId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[2];
            sqlParam[0] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.Int, 8, PlanergruppeId);
            sqlParam[1] = dbc.MakeInParameter("@KostenartId", SqlDbType.Int, 8, KostenartId);
            dbc.RunProcedure("sp_get_thema_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string Save_Position_Data(string ArchitekturId, string DerivatId, string PlanergruppeId, string Erfassungsdatum, string KostenartId, string ThemaId, 
            string PositionId, string Stuckpreis, string Anzahl, string Summe, string HalleId, string Kontrollsumme, string Chance, 
            string Risiko, string UmrechnungId, /*string PM_Auftragsnummer, string PM_Bezeichnung, string PM_Betrag, string PM_Erfassungsdatum, string PSP_Element,*/ string Bemerkungen, 
            string BeschlussstandId, string UmsetzendesGewerkId, string YearWisePriceJson, string UserId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[21];
            sqlParam[0] = dbc.MakeInParameter("@ArchitekturId", SqlDbType.NVarChar, 500, ArchitekturId);
            sqlParam[1] = dbc.MakeInParameter("@DerivatId", SqlDbType.NVarChar, 500, DerivatId);
            sqlParam[2] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 500, PlanergruppeId);
            sqlParam[3] = dbc.MakeInParameter("@Erfassungsdatum", SqlDbType.NVarChar, 500, Erfassungsdatum);
            sqlParam[4] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 500, KostenartId);
            sqlParam[5] = dbc.MakeInParameter("@ThemaId", SqlDbType.NVarChar, 500, ThemaId);
            sqlParam[6] = dbc.MakeInParameter("@PositionId", SqlDbType.NVarChar, 500, PositionId);
            sqlParam[7] = dbc.MakeInParameter("@Stuckpreis", SqlDbType.NVarChar, 500, Stuckpreis);
            sqlParam[8] = dbc.MakeInParameter("@Anzahl", SqlDbType.NVarChar, 500, Anzahl);
            sqlParam[9] = dbc.MakeInParameter("@Summe", SqlDbType.NVarChar, 500, Summe);
            sqlParam[10] = dbc.MakeInParameter("@HalleId", SqlDbType.NVarChar, 500, HalleId);
            sqlParam[11] = dbc.MakeInParameter("@Kontrollsumme", SqlDbType.NVarChar, 500, Kontrollsumme);
            sqlParam[12] = dbc.MakeInParameter("@Chance", SqlDbType.NVarChar, 500, Chance);
            sqlParam[13] = dbc.MakeInParameter("@Risiko", SqlDbType.NVarChar, 500, Risiko);
            sqlParam[14] = dbc.MakeInParameter("@UmrechnungId", SqlDbType.NVarChar, 500, UmrechnungId);
            //sqlParam[15] = dbc.MakeInParameter("@PM_Auftragsnummer", SqlDbType.NVarChar, 500, PM_Auftragsnummer);
            //sqlParam[16] = dbc.MakeInParameter("@PM_Bezeichnung", SqlDbType.NVarChar, 500, PM_Bezeichnung);
            //sqlParam[17] = dbc.MakeInParameter("@PM_Betrag", SqlDbType.NVarChar, 500, PM_Betrag);
            //sqlParam[18] = dbc.MakeInParameter("@PM_Erfassungsdatum", SqlDbType.NVarChar, 500, PM_Erfassungsdatum);
            //sqlParam[19] = dbc.MakeInParameter("@PSP_Element", SqlDbType.NVarChar, 500, PSP_Element);
            sqlParam[15] = dbc.MakeInParameter("@Bemerkungen", SqlDbType.NVarChar, 4000, Bemerkungen);
            sqlParam[16] = dbc.MakeInParameter("@BeschlussstandId", SqlDbType.NVarChar, 500, BeschlussstandId);
            sqlParam[17] = dbc.MakeInParameter("@UmsetzendesGewerkId", SqlDbType.NVarChar, 500, UmsetzendesGewerkId);
            sqlParam[18] = dbc.MakeInParameter("@YearWisePriceJson", SqlDbType.NVarChar, 4000, YearWisePriceJson);
            sqlParam[19] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 500, UserId);
            sqlParam[20] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_save_position_data", sqlParam);
            Result = Convert.ToString(sqlParam[20].Value);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string Update_Position_Data(string DataId, string ArchitekturId, string DerivatId, string PlanergruppeId, string Erfassungsdatum, string KostenartId, string ThemaId,
            string PositionId, string Stuckpreis, string Anzahl, string Summe, string HalleId, string Kontrollsumme, string Chance,
            string Risiko, string UmrechnungId, /*string PM_Auftragsnummer, string PM_Bezeichnung, string PM_Betrag, string PM_Erfassungsdatum, string PSP_Element,*/ string Bemerkungen,
            string BeschlussstandId, string UmsetzendesGewerkId, string YearWisePriceJson, string UserId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[22];
            sqlParam[0] = dbc.MakeInParameter("@DataId", SqlDbType.NVarChar, 500, DataId);
            sqlParam[1] = dbc.MakeInParameter("@ArchitekturId", SqlDbType.NVarChar, 500, ArchitekturId);
            sqlParam[2] = dbc.MakeInParameter("@DerivatId", SqlDbType.NVarChar, 500, DerivatId);
            sqlParam[3] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 500, PlanergruppeId);
            sqlParam[4] = dbc.MakeInParameter("@Erfassungsdatum", SqlDbType.NVarChar, 500, Erfassungsdatum);
            sqlParam[5] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 500, KostenartId);
            sqlParam[6] = dbc.MakeInParameter("@ThemaId", SqlDbType.NVarChar, 500, ThemaId);
            sqlParam[7] = dbc.MakeInParameter("@PositionId", SqlDbType.NVarChar, 500, PositionId);
            sqlParam[8] = dbc.MakeInParameter("@Stuckpreis", SqlDbType.NVarChar, 500, Stuckpreis);
            sqlParam[9] = dbc.MakeInParameter("@Anzahl", SqlDbType.NVarChar, 500, Anzahl);
            sqlParam[10] = dbc.MakeInParameter("@Summe", SqlDbType.NVarChar, 500, Summe);
            sqlParam[11] = dbc.MakeInParameter("@HalleId", SqlDbType.NVarChar, 500, HalleId);
            sqlParam[12] = dbc.MakeInParameter("@Kontrollsumme", SqlDbType.NVarChar, 500, Kontrollsumme);
            sqlParam[13] = dbc.MakeInParameter("@Chance", SqlDbType.NVarChar, 500, Chance);
            sqlParam[14] = dbc.MakeInParameter("@Risiko", SqlDbType.NVarChar, 500, Risiko);
            sqlParam[15] = dbc.MakeInParameter("@UmrechnungId", SqlDbType.NVarChar, 500, UmrechnungId);
            //sqlParam[16] = dbc.MakeInParameter("@PM_Auftragsnummer", SqlDbType.NVarChar, 500, PM_Auftragsnummer);
            //sqlParam[17] = dbc.MakeInParameter("@PM_Bezeichnung", SqlDbType.NVarChar, 500, PM_Bezeichnung);
            //sqlParam[18] = dbc.MakeInParameter("@PM_Betrag", SqlDbType.NVarChar, 500, PM_Betrag);
            //sqlParam[19] = dbc.MakeInParameter("@PM_Erfassungsdatum", SqlDbType.NVarChar, 500, PM_Erfassungsdatum);
            //sqlParam[20] = dbc.MakeInParameter("@PSP_Element", SqlDbType.NVarChar, 500, PSP_Element);
            sqlParam[16] = dbc.MakeInParameter("@Bemerkungen", SqlDbType.NVarChar, 4000, Bemerkungen);
            sqlParam[17] = dbc.MakeInParameter("@BeschlussstandId", SqlDbType.NVarChar, 500, BeschlussstandId);
            sqlParam[18] = dbc.MakeInParameter("@UmsetzendesGewerkId", SqlDbType.NVarChar, 500, UmsetzendesGewerkId);
            sqlParam[19] = dbc.MakeInParameter("@YearWisePriceJson", SqlDbType.NVarChar, 4000, YearWisePriceJson);
            sqlParam[20] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 500, UserId);
            sqlParam[21] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_update_position_added_data", sqlParam);
            Result = Convert.ToString(sqlParam[21].Value);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Position_Data(string PlanergruppeId, string ThemaId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[2];
            sqlParam[0] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.Int, 8, PlanergruppeId);
            sqlParam[1] = dbc.MakeInParameter("@ThemaId", SqlDbType.Int, 8, ThemaId);
            dbc.RunProcedure("sp_get_position_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        [System.Web.Services.WebMethod()]
        public static string get_Position_Price(string PositionId)
        {
            Utils ut = new Utils();
            string Result = "";
            DataTable dt = new DataTable();
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[1];
            sqlParam[0] = dbc.MakeInParameter("@PositionId", SqlDbType.Int, 8, PositionId);
            dbc.RunProcedure("sp_get_position_price", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }
    }
}