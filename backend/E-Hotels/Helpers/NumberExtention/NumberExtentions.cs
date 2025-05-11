namespace Helpers.NumberExtentions
{
    public static class NumberExtentions
    {
        public static int ToInt(this object obj)
        {
            return Convert.ToInt32(obj);
        }

        public static bool IsNullOrZero(this int? num)
        {
            return !num.HasValue || num.Value == 0;
        }
        public static bool NullOrZero(this double? num)
        {
            return !num.HasValue || num.Value == 0;
        }

        public static double? NullIfZero(this double num)
        {
            return num == 0 ? null : num;
        }

        public static double ToDouble(this object obj)
        {
            return Convert.ToDouble(obj);
        }

        public static int Ceil(this double value)
        {
            return (int)Math.Ceiling(value);
        }

        public static bool IsBetweenEqual(this int number, int min, int max)
        {
            return number >= min && number <= max;
        }
    }
}
