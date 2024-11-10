using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorldWebApi.Controllers
{
    [Route("api/hello_world")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            var response = new
            {
                success = true,
                container = new
                {
                    config = new
                    {
                        bgColor = "white",
                        title = "👋🌍 Hello World 🌍👋"
                    },
                    id = "hello-world",
                    state = null,
                    components = new[]
                    {
                        new
                        {
                            type = "link",
                            href = "https://www.example.com",
                            content = "Example Link"
                        }
                    }
                }
            };
            return Ok(response);
        }
    }
}