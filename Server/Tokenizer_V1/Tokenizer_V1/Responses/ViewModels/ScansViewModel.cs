using System.Collections.Generic;

namespace Tokenizer_V1.Responses.ViewModels
{
    public class ScansViewModel
    {
        public int TotalScans { set; get; }

        public int TotalScansToday { set; get; }

        public int TotalScansThisMonth { set; get; }

        public int TotalScansThisYear { set; get; }

        public Dictionary<string, int> ScansThisWeek { set; get; }

        public Dictionary<string, int> TopBrowsers { set; get; }

        public Dictionary<string, int> TopDevices { set; get; }

        public Dictionary<string, int> TopOperatingSystems { set; get; }

        public Dictionary<string, int> TopCountries { set; get; }

        public Dictionary<string, int> TopOs { set; get; }

        

    }
}
