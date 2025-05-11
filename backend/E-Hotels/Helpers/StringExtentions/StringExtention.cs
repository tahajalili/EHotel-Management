using System;
using System.Collections.Generic;

namespace Helpers.Extentions.StringExtentions
{
    public static class StringExtention
    {
        #region string=>int
        public static int ToInt(this string input)
        {
            return Convert.ToInt32(input);
        }
        public static short ToInt16(this string input)
        {
            return Convert.ToInt16(input);
        }
        public static long ToInt64(this string input)
        {
            return Convert.ToInt64(input);
        }
        #endregion

        #region Currency Format
        public static string ToCurrency(this int input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this int? input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this double input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this double? input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this float input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this float? input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this long input)
        {
            return string.Format("{0:n0}", input);
        }
        public static string ToCurrency(this long? input)
        {
            return string.Format("{0:n0}", input);
        }
        public static int FromCurrency(this string input)
        {
            var number = input.Replace(",", "");
            if (string.IsNullOrEmpty(number))
                return 0;
            return number.ToInt();
        }
        #endregion

        public static string RemoveFirstAndLast(this string str)
        {
            return str.Substring(0, str.Length - 2);
        }
        public static string Join(this IEnumerable<object> values, string separator)
        {
            return string.Join(separator, values);
        }
    }
}
