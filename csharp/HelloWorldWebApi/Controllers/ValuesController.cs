using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace HelloWorldWebApi.Controllers
{
   public class ValueModel
   {
       public string Value { get; set; }
   }

    [Route("api/hello_world")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // POST api/values
        [HttpPost]
        [Consumes("application/json")] 
        public IActionResult Post([FromBody]  ValueModel mode)
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
                    state = new { },
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
