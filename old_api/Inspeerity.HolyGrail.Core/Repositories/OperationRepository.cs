//-----------------------------------------------------------------------
// <copyright file="OperationRepository.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
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

        public async Task UpdateOperation(Operation operation)
        {
            context.Entry(operation).State = EntityState.Modified;
            await this.context.SaveChangesAsync();
        }

        public async Task<int> DeleteOperation(int id)
        {
            var operation = await context.Operation.FindAsync(id);
            this.context.Operation.Remove(operation);
            return await this.context.SaveChangesAsync();
        }

        public async Task<bool> AnyOperationById(int id)
        {
            return await this.context.Operation.AnyAsync(operation => operation.Id == id);
        }

        public async Task<List<Operation>> GetOperationsAsync()
        {
            return await this.context.Operation.Include(it => it.Budget).ToListAsync();
        }

        public async Task<List<Operation>> GetOperationsByDate(DateTime fromDate, DateTime toDate)
        {
            return await this.context.Operation.Where(
                operation => (operation.Timestamp >= fromDate) && (operation.Timestamp <= toDate)
            ).ToListAsync();
        }
    }
}
