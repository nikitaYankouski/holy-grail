//-----------------------------------------------------------------------
// <copyright file="OperationService.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using Inspeerity.HolyGrail.Application.Cast;
    using Inspeerity.HolyGrail.Application.DTO;
    using Inspeerity.HolyGrail.Core.Models;
    using Inspeerity.HolyGrail.Core.Repositories;

    public class OperationService : IOperationService
    {
        private IOperationRepository operationRepository;
        private IMapper mapper;

        public OperationService(IOperationRepository operationRepository, IMapper mapper)
        {
            this.operationRepository = operationRepository;
            this.mapper = mapper;
        }

        public async Task AddOperation(OperationDTO operationDTO)
        {
            var operation = OperationCast<OperationDTO, Operation>.Cast(this.mapper, operationDTO);
            await this.operationRepository.AddOperationAsync(operation);
        }

        public async Task<List<OperationDTO>> GetAllOperations()
        {
            var operations = await this.operationRepository.GetOperationsAsync();
            return OperationCast<Operation, OperationDTO>.Cast(this.mapper, operations.ToArray());
        }
    }
}
