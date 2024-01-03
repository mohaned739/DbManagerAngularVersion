using DbManager.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace DbManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Database : ControllerBase
    {

        [HttpGet("[Action]")]
        public List<string> GetDatabases()
        {
            string projectName = "DbManager.Models";
            string targetNamespace = "DbManager.Models";

            // Get the directory where the assembly is located.
            string assemblyPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"{projectName}.dll");

            // Step 1: Load Assemblies
            var assembly = Assembly.LoadFrom(assemblyPath);

            // Step 2: Get Types
            var classNames = assembly.GetTypes()
                .Where(t => t.Namespace == targetNamespace && t.IsClass)
                .Select(t => t.Name)
                .ToList();
            return classNames;
        }

        [HttpGet("[Action]")]
        public List<string> GetColumns(string tableName)
        {
            string projectName = "DbManager.Models";
            string targetNamespace = "DbManager.Models";

            // Get the directory where the assembly is located.
            string assemblyPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, $"{projectName}.dll");

            // Step 1: Load Assemblies
            var assembly = Assembly.LoadFrom(assemblyPath);

            // Step 2: Get Types
            var classAssembly = assembly.GetTypes()
                .FirstOrDefault(t => t.Namespace == targetNamespace && t.IsClass && t.Name == tableName);

            var properties = classAssembly.GetProperties()
                .Select(p=> p.Name)
                .ToList();
            return properties;
        }
    }
}
