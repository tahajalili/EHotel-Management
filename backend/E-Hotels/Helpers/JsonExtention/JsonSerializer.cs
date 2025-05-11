using Newtonsoft.Json;

namespace Helpers.Extentions.JsonExtention
{
    public static class JsonSerializer
    {
        public static string ToJson(this object input)
        {
            return JsonConvert.SerializeObject(input);
        }
        public static T ToObject<T>(this string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
        }
        public static List<string> ToListStringFromJson(this string json)
        {
            var type = new List<string>();
            if (string.IsNullOrEmpty(json))
                return type;
            return JsonConvert.DeserializeAnonymousType(json, type);
        }
    }
}
