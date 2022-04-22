using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Principal;
using Newtonsoft.Json;
using Equipment_Planning.App_Code;
using System.Data;


namespace Equipment_Planning
{
    public partial class PositionMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_Position_Master_Data()
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
            dbc.RunProcedure("sp_get_added_Position_Master_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }


        [System.Web.Services.WebMethod()]
        public static string Save_Position_Master_Data(string PositionName, string UserId, string PositionPrice, string PlanergruppeId, string ThemaId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[6];
            sqlParam[0] = dbc.MakeInParameter("@PositionName", SqlDbType.NVarChar, 500, PositionName);
            sqlParam[1] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 50, PlanergruppeId);
            sqlParam[2] = dbc.MakeInParameter("@ThemaId", SqlDbType.NVarChar, 50, ThemaId);
            sqlParam[3] = dbc.MakeInParameter("@PositionPrice", SqlDbType.NVarChar, 10, PositionPrice);
            sqlParam[4] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 50, UserId);
            sqlParam[5] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_save_PositionMaster_data", sqlParam);
            Result = Convert.ToString(sqlParam[5].Value);
            return Result;

        }

        [System.Web.Services.WebMethod()]
        public static string Activate_DeActivate_Position_Master(string PositionId)
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
            sqlParam[0] = dbc.MakeInParameter("@PositionId", SqlDbType.NVarChar, 250, PositionId);
            dbc.RunProcedure("sp_Activate_DeActivate_Position_Master", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }



        [System.Web.Services.WebMethod()]
        public static string Update_Position_Master_Data(string PositionId, string PositionName, string UserId, string PositionPrice, string PlanergruppeId, string ThemaId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[7];
            sqlParam[0] = dbc.MakeInParameter("@PositionId", SqlDbType.Int, 8, PositionId);
            sqlParam[1] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 50, PlanergruppeId);
            sqlParam[2] = dbc.MakeInParameter("@ThemaId", SqlDbType.NVarChar, 50, ThemaId);
            sqlParam[3] = dbc.MakeInParameter("@PositionName", SqlDbType.NVarChar, 500, PositionName);
            sqlParam[4] = dbc.MakeInParameter("@PositionPrice", SqlDbType.Int, 10, PositionPrice);
            sqlParam[5] = dbc.MakeInParameter("@UserId", SqlDbType.Int, 8, UserId);
            sqlParam[6] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_Update_Position_Data", sqlParam);
            Result = Convert.ToString(sqlParam[6].Value);
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
            sqlParam[0] = dbc.MakeInParameter("@PlanergruppeId", SqlDbType.NVarChar, 50, PlanergruppeId);
            sqlParam[1] = dbc.MakeInParameter("@KostenartId", SqlDbType.NVarChar, 50, KostenartId);
            dbc.RunProcedure("sp_get_thema_data_Master", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }

        
    }
}