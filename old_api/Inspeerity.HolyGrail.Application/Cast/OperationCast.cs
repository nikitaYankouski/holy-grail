//-----------------------------------------------------------------------
// <copyright file="OperationCast.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.Cast
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    using AutoMapper;

    public class OperationCast<TSource, TDestination>
    {
        public static TDestination Cast(IMapper config, TSource source)
        {
            return config.Map<TSource, TDestination>(source);
        }

        public static List<TDestination> Cast(IMapper config, TSource[] source)
        {
            return config.Map<TSource[], List<TDestination>>(source);
        }
    }
}
