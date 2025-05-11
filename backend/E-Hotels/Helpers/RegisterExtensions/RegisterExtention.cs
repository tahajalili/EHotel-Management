using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Helpers.RegisterExtensions
{
    public static class RegisterExtension
    {

        public static void RegisterSingleton<T>(this IServiceCollection services, params Assembly[] assemblies)
        {
            IEnumerable<Type> types = assemblies.SelectMany(a => a.GetExportedTypes())
                .Where(c => c.IsClass && typeof(T).IsAssignableFrom(c));

            foreach (var item in types)
            {
                var parentInterface = item.GetInterfaces().FirstOrDefault(z => z.Name == "I" + item.Name);
                if (parentInterface != null)
                    services.AddSingleton(parentInterface, item);
                else
                    services.AddSingleton(item);
            }
        }
        public static void RegisterScoped<T>(this IServiceCollection services, params Assembly[] assemblies)
        {
            IEnumerable<Type> types = assemblies.SelectMany(a => a.GetExportedTypes())
                .Where(c => c.IsClass && typeof(T).IsAssignableFrom(c)).ToList();



            foreach (var item in types)
            {
                var parentInterface = item.GetInterfaces().FirstOrDefault(z => z.Name == "I" + item.Name);
                if (parentInterface != null)
                    services.AddScoped(parentInterface, item);
                else
                    services.AddScoped(item);
            }
        }
        public static void RegisterTransient<T>(this IServiceCollection services, params Assembly[] assemblies)
        {
            IEnumerable<Type> types = assemblies.SelectMany(a => a.GetExportedTypes())
                .Where(c => c.IsClass && typeof(T).IsAssignableFrom(c));

            foreach (var item in types)
            {
                var parentInterface = item.GetInterfaces().FirstOrDefault(z => z.Name == "I" + item.Name);
                if (parentInterface != null)
                    services.AddTransient(parentInterface, item);
                else
                    services.AddTransient(item);
            }
        }
    }
}
