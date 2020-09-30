//-----------------------------------------------------------------------
// <copyright file="BudgetDTO.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.DTO
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class BudgetDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<OperationDTO> OperationDTO { get; set; }
    }
}
