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
    public partial class BeschlussstandMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_Beschlussstand_Master_Data()
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
            dbc.RunProcedure("sp_get_added_Beschlussstand_Master_data", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }


        [System.Web.Services.WebMethod()]
        public static string Activate_DeActivate_Beschlussstand_Master(string BeschlussstandId)
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
            sqlParam[0] = dbc.MakeInParameter("@BeschlussstandId", SqlDbType.NVarChar, 250, BeschlussstandId);
            dbc.RunProcedure("sp_Activate_DeActivate_Beschlussstand_Master", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }



        [System.Web.Services.WebMethod()]
        public static string Save_Beschlussstand_Master_Data(string BeschlussstandName, string UserId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[3];
            sqlParam[0] = dbc.MakeInParameter("@BeschlussstandName", SqlDbType.NVarChar, 500, BeschlussstandName);
            sqlParam[1] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 50, UserId);
            sqlParam[2] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_save_Beschlussstand_data", sqlParam);
            Result = Convert.ToString(sqlParam[2].Value);
            return Result;

        }


        [System.Web.Services.WebMethod()]
        public static string Update_Beschlussstand_Master_Data(string BeschlussstandId, string BeschlussstandName, string UserId)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[4];
            sqlParam[0] = dbc.MakeInParameter("@BeschlussstandId", SqlDbType.Int, 8, BeschlussstandId);
            sqlParam[1] = dbc.MakeInParameter("@BeschlussstandName", SqlDbType.NVarChar, 500, BeschlussstandName);
            sqlParam[2] = dbc.MakeInParameter("@UserId", SqlDbType.Int, 8, UserId);
            sqlParam[3] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_Update_Beschlussstand_Data", sqlParam);
            Result = Convert.ToString(sqlParam[3].Value);
            return Result;
        }

    }
}