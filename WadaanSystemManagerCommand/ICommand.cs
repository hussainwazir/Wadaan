using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Threading.Tasks;
using XtremeTech.Core;

namespace XtremeCommand
{
    public class CommandAttribute : Attribute
    {
        public string Name { get; set; }
    }

    public interface ICommand
    {
        Response Process(Request request);
        string GetResult(Request request);
    }

    public interface IHasUserId
    {
        Guid UserId { get; set; }
    }

    public abstract class CommandBase : ICommand
    {
        protected abstract object DoAction(object value);

        protected void WorkOnModel<TModel>(TModel model, Action<TModel> action, object v)
        {
            var m = JsonConvert.DeserializeAnonymousType(v.ToString(), model);
            action(m);
        }

        public Response Process(Request request)
        {
            var v = DoAction(request.Value);
            return new Response { Type = request.Type, Value = JsonConvert.SerializeObject(v) };
        }
        public string GetResult(Request request)
        {
            var v = DoAction(request.Value);
            return JsonConvert.SerializeObject(v);
        }
    }

    public abstract class CamelCommandBase : ICommand
    {
        JsonSerializerSettings CamelSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

        protected abstract object DoAction(object value);

        protected T MappedModel<T>(T t, object model)
        {
            return (T)JsonConvert.DeserializeAnonymousType(model.ToString(), t);
        }

        protected T MappedModel<T>(object model)
        {
            return (T)JsonConvert.DeserializeObject<T>(model.ToString());
        }

        public Response Process(Request request)
        {
            var v = DoAction(request.Value);
            return new Response { Type = request.Type, Value = JsonConvert.SerializeObject(v, Formatting.Indented, CamelSettings) };
        }
        public string GetResult(Request request)
        {
            var v = DoAction(request.Value);
            return JsonConvert.SerializeObject(v);
        }
    }
    public abstract class AsyncCommandBase : ICommand
    {
        JsonSerializerSettings CamelSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

        protected abstract Task<object> DoAction(object value);

        protected T MappedModel<T>(T t, object model)
        {
            return (T)JsonConvert.DeserializeAnonymousType(model.ToString(), t);
        }

        public Response Process(Request request)
        {
            var v = DoAction(request.Value);
            return new Response { Type = request.Type, Value = JsonConvert.SerializeObject(v, Formatting.Indented, CamelSettings) };
        }
        public string GetResult(Request request)
        {
            var v = DoAction(request.Value);
            return JsonConvert.SerializeObject(v);
        }
    }
}
