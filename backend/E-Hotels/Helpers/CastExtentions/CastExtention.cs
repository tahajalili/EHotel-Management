using System;

namespace Helpers.CastExtentions
{
    public static class CastExtention
    {
        public static bool ToBoolean(this object obj)
        {
            return Convert.ToBoolean(obj);
        }
    }
}
