
using WadaanSystemManager.Resources; 
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;

namespace WadaanSystemManager.Models
{
    public class FileAttachmentModel
    {
        public Dictionary<string, object> Fields { get; set; } = new Dictionary<string, object>();
        public List<FileUploadModel> FileUploads { get; set; } = new List<FileUploadModel>();
        public object FormFields { get; set; }
    }

    public class FileUploadModel
    {
        public string CurrentFileName { get; set; }
        public string CurrentFilePath { get; set; }
        public string OriginalFileName { get; set; }
        public byte[] File { get; set; }
        public string AttachmentType { get; set; }
    }

    public class LoginModel
    {
        [Required]
        //[Display(Name = "User name")]
        [Display(ResourceType = typeof(LangText), Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(ResourceType = typeof(LangText), Name = "Password")]
        //[Display(Name = "Password")]
        public string Password { get; set; }

        //[Display(Name = "Remember me?")]
        //public bool RememberMe { get; set; }

        [Display(ResourceType = typeof(LangText), Name = "Rememberme")]
        public string Rememberme { get; set; }
    }

  
}