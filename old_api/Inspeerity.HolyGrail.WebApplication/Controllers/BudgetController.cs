//-----------------------------------------------------------------------
// <copyright file="BudgetController.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.WebApplication.Controllers
{
    using System;
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
        public async Task<IActionResult> GetOperations(DateTime? fromDate, DateTime? toDate)
        {
            var operations = fromDate != null && toDate != null ? 
                await this.service.GetOperationsByDate((DateTime)fromDate, (DateTime)toDate) : 
                await this.service.GetAllOperations();

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

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateOperation([FromBody] OperationDTO operationDTO)
        {
            var operationId = await this.service.AnyOperationById(operationDTO.Id);
            if (!operationId)
            {
                return this.NotFound();
            }

            try
            {
                await this.service.UpdateOperation(operationDTO);
                return this.Ok();
            }
            catch (Exception)
            {
                return this.BadRequest();
            }
            
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteOperation(int id)
        {
            var operationId = await this.service.AnyOperationById(id);
            if (!operationId)
            {
                return this.NotFound();
            }

            try
            {
                await this.service.DeleteOperation(id);
                return this.Ok();
            }
            catch (Exception)
            {
                return this.BadRequest();
            }
        }
    }
}
