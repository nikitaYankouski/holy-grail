//-----------------------------------------------------------------------
// <copyright file="IOperationRepository.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Core.Models;

    public interface IOperationRepository
    {
        Task<List<Operation>> GetOperationsAsync();

        Task AddOperationAsync(Operation operation);
    }
}
