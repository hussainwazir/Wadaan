﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace WadaanSystemManager.StreamProviders
{
    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        private string _fileName;

        public CustomMultipartFormDataStreamProvider(string path) : base(path)
        { }

        public CustomMultipartFormDataStreamProvider(string path, string fileName) : base(path)
        {
            _fileName = fileName;
        }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            try
            {
                var ext = System.IO.Path.GetExtension(headers.ContentDisposition.FileName.Replace("\"", ""));
                return Guid.NewGuid().ToString() + ext;
            }
            catch (Exception)
            {
                return Guid.NewGuid().ToString();
            }

        }

    }
}