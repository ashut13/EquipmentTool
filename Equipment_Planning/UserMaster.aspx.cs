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
    public partial class UserMaster : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [System.Web.Services.WebMethod()]
        public static string get_User_Master_Data()
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
            dbc.RunProcedure("sp_get_added_User_Master_data", sqlParam, out dt);

            for(int i=0;i< dt.Rows.Count;i++)
            {
                dt.Rows[i]["UserPassword"] = ut.DecryptTripleDES(dt.Rows[i]["UserPassword"].ToString());
                dt.AcceptChanges();
            }

            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }


        [System.Web.Services.WebMethod()]
        public static string Save_User_Master_Data(string UserName, string UserId, string UserShortId, string UserEmailId, string UserPassword, string FirstTimeLogin, string IsAdmin)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[8];
            sqlParam[0] = dbc.MakeInParameter("@UserName", SqlDbType.NVarChar, 500, UserName);
            sqlParam[1] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 50, UserId);
            sqlParam[2] = dbc.MakeInParameter("@UserShortId", SqlDbType.NVarChar, 50, UserShortId);
            sqlParam[3] = dbc.MakeInParameter("@UserEmailId", SqlDbType.NVarChar, 350, UserEmailId);
            sqlParam[4] = dbc.MakeInParameter("@UserPassword", SqlDbType.NVarChar, 4000, ut.EncryptTripleDES(UserPassword));
            sqlParam[5] = dbc.MakeInParameter("@FirstTimeLogin", SqlDbType.NVarChar, 10, FirstTimeLogin);
            sqlParam[6] = dbc.MakeInParameter("@IsAdmin", SqlDbType.NVarChar, 10, IsAdmin);
            sqlParam[7] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_save_User_data", sqlParam);
            Result = Convert.ToString(sqlParam[7].Value);
            return Result;

        }


        [System.Web.Services.WebMethod()]
        public static string Activate_DeActivate_User_Master(string UserId)
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
            sqlParam[0] = dbc.MakeInParameter("@UserId", SqlDbType.NVarChar, 250, UserId);
            dbc.RunProcedure("sp_Activate_DeActivate_User_Master", sqlParam, out dt);
            Result = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Result;
        }



        [System.Web.Services.WebMethod()]
        public static string Update_User_Master_Data(string UserId, string UserName, string UserShortId, string UserEmailId, string UserPassword, string FirstTimeLogin, string IsAdmin)
        {
            Utils ut = new Utils();
            string Result = "";
            DBController dbc = new DBController();
            if (object.Equals(dbc, null))
            {
                dbc = new DBController();
            }
            SqlParameter[] sqlParam = new SqlParameter[8];
            sqlParam[0] = dbc.MakeInParameter("@UserId", SqlDbType.Int, 8, UserId);
            sqlParam[1] = dbc.MakeInParameter("@UserName", SqlDbType.NVarChar, 500, UserName);
            sqlParam[2] = dbc.MakeInParameter("@UserShortId", SqlDbType.NVarChar, 50, UserShortId);
            sqlParam[3] = dbc.MakeInParameter("@UserEmailId", SqlDbType.NVarChar, 350, UserEmailId);
            sqlParam[4] = dbc.MakeInParameter("@UserPassword", SqlDbType.NVarChar, 4000, ut.EncryptTripleDES(UserPassword));
            sqlParam[5] = dbc.MakeInParameter("@FirstTimeLogin", SqlDbType.NVarChar, 5, FirstTimeLogin);
            sqlParam[6] = dbc.MakeInParameter("@IsAdmin", SqlDbType.NVarChar, 5, IsAdmin);
            sqlParam[7] = dbc.MakeOutParameter("@Ans", SqlDbType.Int, 4);
            dbc.RunProcedure("sp_Update_User_Data", sqlParam);
            Result = Convert.ToString(sqlParam[7].Value);
            return Result;
        }
    }
}