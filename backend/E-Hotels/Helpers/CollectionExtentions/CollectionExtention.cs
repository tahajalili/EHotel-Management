using Microsoft.IdentityModel.Tokens;

namespace Helpers.Extentions.CollectionExtentions
{
    public static class CollectionExtention
    {
        public static bool Contains<T>(this IEnumerable<T> first, IEnumerable<T> second)
        {
            return first.Intersect(second).Any();
        }
        public static bool ContainsAllItems<T>(this IEnumerable<T> a, IEnumerable<T> b)
        {
            return !b.Except(a).Any();
        }

        public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> items, Func<T, TKey> property)
        {
            return items.GroupBy(property).Select(x => x.First());
        }

        public static IEnumerable<IEnumerable<T>> ChunkBy<T>(this IEnumerable<T> source, int chunkSize)
        {
            return source
                .Select((x, i) => new { Index = i, Value = x })
                .GroupBy(x => x.Index / chunkSize)
                .Select(x => x.Select(v => v.Value).ToList())
                .ToList();
        }

        public static string ToListFromString(this IEnumerable<string> strings, string join = ", ")
        {
            return string.Join(join, strings);
        }
    }
}
