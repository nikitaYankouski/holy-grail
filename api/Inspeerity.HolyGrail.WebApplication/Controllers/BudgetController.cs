//-----------------------------------------------------------------------
// <copyright file="BudgetController.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.WebApplication.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Application.DTO;
    using Inspeerity.HolyGrail.Application.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("budget")]
    public class BudgetController : ControllerBase
    {
        private IOperationService service;

        public BudgetController(IOperationService service)
        {
            this.service = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllOperations()
        {
            var operations = await this.service.GetAllOperations();
            if (operations == null)
            {
                return this.NotFound();
            }

            return this.Ok(operations);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddOperation([FromBody] OperationDTO operationDTO)
        {
            try
            {
                await this.service.AddOperation(operationDTO);
                return this.Ok();
            }
            catch (Exception)
            {
                return this.BadRequest();
            }
        }
    }
}
