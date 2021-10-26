//-----------------------------------------------------------------------
// <copyright file="Operation.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Models
{
    using System;
    using System.Collections.Generic;

    public partial class Operation
    {
        public int Id { get; set; }

        public int? BudgetId { get; set; }

        public string Description { get; set; }

        public bool? IsIncome { get; set; }

        public DateTime? Timestamp { get; set; }

        public decimal? AmountOfMoney { get; set; }

        public virtual Budget Budget { get; set; }
    }
}
