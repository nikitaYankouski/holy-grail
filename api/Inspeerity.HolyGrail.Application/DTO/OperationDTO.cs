//-----------------------------------------------------------------------
// <copyright file="OperationDTO.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Application.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text;

    public class OperationDTO
    {
        public int Id { get; set; }

        [Required]
        public int BudgetId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsIncome { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public decimal AmountOfMoney { get; set; }
    }
}
