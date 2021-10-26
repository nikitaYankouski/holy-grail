//-----------------------------------------------------------------------
// <copyright file="ServiceCollectionExtensions.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.Configuration
{
    using AutoMapper;
    using Inspeerity.HolyGrail.Application.DTO;
    using Inspeerity.HolyGrail.Core.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationLayer(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddMapper()
                .AddDbContext<HolyGrailContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("ConnectionHolyGrail")));

            return services;
        }

        private static IServiceCollection AddMapper(this IServiceCollection services)
        {
            var mapper = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<Operation, OperationDTO>();
                    cfg.CreateMap<OperationDTO, Operation>();
                })
                .CreateMapper();

            services.AddSingleton(mapper);

            return services;
        }
    }
}
