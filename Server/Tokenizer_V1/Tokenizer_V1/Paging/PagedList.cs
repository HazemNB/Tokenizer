using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_V2._0.Paging
{
    public class PagedList<T>
    {

        public PagedList(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            this.TotalItems = source.Count();
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.List = source
                            .Skip(pageSize * (pageNumber - 1))
                            .Take(pageSize)
                            .ToList();
        }

        public PagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            this.TotalItems = query.Count();
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.List = query
                            .Skip(pageSize * (pageNumber - 1))
                            .Take(pageSize)
                            .ToList();
        }


        public PagedList(List<T> queryList, int pageNumber, int pageSize)
        {
            this.TotalItems = queryList.Count();
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.List = queryList
                            .Skip(pageSize * (pageNumber - 1))
                            .Take(pageSize)
                            .ToList();
        }
        public int TotalItems { get; }
        public int PageNumber { get; }
        public int PageSize { get; }
        public List<T> List { get; }
        public int TotalPages =>
              (int)Math.Ceiling(this.TotalItems / (double)this.PageSize);
        public bool HasPreviousPage => this.PageNumber > 1;
        public bool HasNextPage => this.PageNumber < this.TotalPages;
        public int NextPageNumber =>
               this.HasNextPage ? this.PageNumber + 1 : this.TotalPages;
        public int PreviousPageNumber =>
               this.HasPreviousPage ? this.PageNumber - 1 : 1;

        public PagingHeader GetHeader()
        {
            return new PagingHeader(
                 this.TotalItems, this.PageNumber,
                 this.PageSize, this.TotalPages);
        }
    }
}
