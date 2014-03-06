using System.Collections.Generic;
using GenerateDataGridDemo.Models.PageParam;

namespace GenerateDataGridDemo.Models
{
    /// <summary>
    /// 
    /// </summary>
    public interface IProductRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IEnumerable<Product> GetAll();

        PageList<Product> LoadProducts(ProductParam productParam);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Product Get(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        Product Add(Product item);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        void Remove(int id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        bool Update(Product item);

    }
}