//-----------------------------------------------------------------------
// <copyright file="OperationRepository.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Inspeerity.HolyGrail.Core.Models;
    using Microsoft.EntityFrameworkCore;

    public class OperationRepository : IOperationRepository
    {
        private HolyGrailContext context;

        public OperationRepository(HolyGrailContext context)
        {
            this.context = context;
        }

        public async Task AddOperationAsync(Operation operation)
        {
            await this.context.Operation.AddAsync(operation);
            await this.context.SaveChangesAsync();
        }

        public async Task<List<Operation>> GetOperationsAsync()
        {
            return await this.context.Operation.Include(it => it.Budget).ToListAsync();
        }
    }
}
