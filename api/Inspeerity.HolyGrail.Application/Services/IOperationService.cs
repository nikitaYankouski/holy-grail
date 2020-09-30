//-----------------------------------------------------------------------
// <copyright file="IOperationService.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Application.DTO;

    public interface IOperationService
    {
        Task<List<OperationDTO>> GetAllOperations();

        Task AddOperation(OperationDTO operation);
    }
}
