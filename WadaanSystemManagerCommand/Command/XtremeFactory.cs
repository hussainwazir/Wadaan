using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WadaanSystemManagerCommand.Command
{
    public class XtremeFactory
    {
        public static string _factory = "xtreme";
        public static string connectionString = ConfigurationManager.ConnectionStrings["WADAANconnection"].ConnectionString;
    }

}
