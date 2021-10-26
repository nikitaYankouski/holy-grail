//-----------------------------------------------------------------------
// <copyright file="Budget.cs" company="Inspeerity">
//     Copyright (c) Inspeerity. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Inspeerity.HolyGrail.Core.Models
{
    using System;
    using System.Collections.Generic;
    public partial class Budget
    {
        public Budget()
        {
            Operation = new HashSet<Operation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Operation> Operation { get; set; }
    }
}
