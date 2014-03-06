using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using GenerateDataGridDemo.Models.PageParam;
using GenerateDataGridDemo.Extends;
namespace GenerateDataGridDemo.Models
{
    public class ProductRepository : IProductRepository
    {
        private readonly List<Product> _products = new List<Product>();
        private readonly object _lockObj = new object();
        private int _nextId = 1;

        public ProductRepository()
        {
            Add(new Product { Id = 1, Name = "Tomato soup", Category = "Groceries", Price = 1.39M, CreateTime = DateTime.Now.AddMonths(-1) });
            Add(new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M, CreateTime = DateTime.Now.AddDays(-1) });
            Add(new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M, CreateTime = DateTime.Now.AddDays(-2) });
            Add(new Product { Id = 4, Name = "dfds", Category = "Hardware", Price = 16.99M, CreateTime = DateTime.Now.AddDays(-3) });
            Add(new Product { Id = 5, Name = "sdf", Category = "sdf", Price = 16.99M, CreateTime = DateTime.Now.AddDays(-4) });
            Add(new Product { Id = 6, Name = "fds", Category = "sdfds", Price = 16.99M, CreateTime = DateTime.Now.AddDays(-5) });
            Add(new Product { Id = 7, Name = "Hamsdfdsgsdmer", Category = "Hardware", Price = 18.99M, CreateTime = DateTime.Now.AddDays(-6) });
            Add(new Product { Id = 8, Name = "sadfads", Category = "sadfdsaf", Price = 19.99M, CreateTime = DateTime.Now.AddDays(-7) });
            var p = new Product { Name = "LittleBear", Category = "Hardware", Price = 13.99M, CreateTime = DateTime.Now.AddDays(-10) };

            for (var i = 0; i < 50; i++)
            {
                _products.Add(new Product
                {
                    Id = i + 10,
                    Name = p.Name,
                    Category = p.Category,
                    Price = i + 10,
                    CreateTime = DateTime.Now.AddDays(-i)
                });
            }
        }

        public IEnumerable<Product> GetAll()
        {
            return _products;
        }

        /// <summary>
        /// 以下方法只是演示，如果具体使用的话需要各种提取和拆分，以便复用，和以后扩展维护
        /// </summary>
        /// <param name="productParam"></param>
        /// <returns></returns>
        public PageList<Product> LoadProducts(ProductParam productParam)
        {
            //Func<Product,bool> conditionFunc=new Func<Product, bool>(n=>n.)
            //如果用EF 且使用过ISpecification 的朋友对以下方法肯定很熟悉---ISpecification 可以把条件全部提出，方便重用和以后维护。不过在这里有点多此一举
            var conditionFunc = new Func<IEnumerable<Product>, IEnumerable<Product>>(
                products =>
                {
                    products = string.IsNullOrWhiteSpace(productParam.KeyWord)
                        ? products
                        : products.Where(n => n.Name.Contains(productParam.KeyWord));

                    #region 针对时间的搜索也可以做统一处理， 这里仅是演示
                    //对结束时间做处理
                    if (null != productParam.EndTime)
                    {
                        productParam.EndTime = productParam.EndTime.Value.AddDays(1).AddMilliseconds(-1);
                        products = products.Where(n => n.CreateTime <= productParam.EndTime);
                    }
                    products = null != productParam.StartTime
                        ? products.Where(n => n.CreateTime >= productParam.StartTime)
                        : products;
                    #endregion

                    #region 以下排序和分页应该做统一处理

                    if (!string.IsNullOrWhiteSpace(productParam.sort))
                    {
                        //我这里只是实现了功能，EF在具体使用的时候要多字段动态指定排序这里需要操作Expression表达式树
                        products = products.OrderBy(productParam.sort, productParam.order != "asc");
                    }
                    return products.Skip((productParam.page - 1) * productParam.rows).Take(productParam.rows);
                    #endregion
                });

            return new PageList<Product>()
            {
                Items = conditionFunc(_products).ToList(),
                PageIndex = productParam.page,
                PageSize = productParam.rows,
                TotalCount = _products.Count
            };

        }

        public Product Get(int id)
        {
            return _products.Find(p => p.Id == id);
        }

        public Product Add(Product item)
        {
            lock (_lockObj)
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }
                item.Id = _nextId++;
                _products.Add(item);
            }
            return item;
        }

        public void Remove(int id)
        {
            _products.RemoveAll(p => p.Id == id);
        }

        public bool Update(Product item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            var index = _products.FindIndex(p => p.Id == item.Id);
            if (index == -1)
            {
                return false;
            }
            _products.RemoveAt(index);
            _products.Add(item);
            return true;
        }
    }
}