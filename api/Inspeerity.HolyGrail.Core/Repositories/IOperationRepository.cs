//-----------------------------------------------------------------------
// <copyright file="IOperationRepository.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Core.Models;

    public interface IOperationRepository
    {
        Task<List<Operation>> GetOperationsAsync();

        Task<List<Operation>> GetOperationsByDate(DateTime fromDate, DateTime toDate);

        Task AddOperationAsync(Operation operation);

        Task UpdateOperation(Operation operation);

        Task<int> DeleteOperation(int id);

        Task<bool> AnyOperationById(int id);
    }
}
