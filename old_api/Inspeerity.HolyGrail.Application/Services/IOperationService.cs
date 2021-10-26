//-----------------------------------------------------------------------
// <copyright file="IOperationService.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Application.DTO;

    public interface IOperationService
    {
        Task<List<OperationDTO>> GetAllOperations();

        Task<List<OperationDTO>> GetOperationsByDate(DateTime fromDate, DateTime toDate);

        Task AddOperation(OperationDTO operation);

        Task UpdateOperation(OperationDTO operation);

        Task<int> DeleteOperation(int id);

        Task<bool> AnyOperationById(int id);
    }
}
