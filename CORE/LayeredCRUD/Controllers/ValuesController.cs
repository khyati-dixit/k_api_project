using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Student.DTO;
using StudentRepository;

namespace LayeredCRUD.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ValuesRepository _repository;

        public ValuesController(ValuesRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        // GET api/values
        [HttpGet]
        public async Task<List<Students>> Get()
        {
            return await _repository.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Students>> Get(int id)
        {
            return await _repository.GetById(id);
        }

        //// POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Students value)
        {
            return Ok(await _repository.Insert(value));
        }

        //// DELETE api/values/5
        [HttpDelete("{id}")]

        public async Task Delete(int id)
        {
            await _repository.DeleteById(id);
        }
        [HttpPost]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Students smodel)
        {
            return Ok(await _repository.UpdateDetails(smodel));
        }
    }
}
