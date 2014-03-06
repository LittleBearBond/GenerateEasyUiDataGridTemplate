using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GenerateDataGridDemo.ActionResults;
using GenerateDataGridDemo.Models;
using GenerateDataGridDemo.Models.PageParam;

namespace GenerateDataGridDemo.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IProductRepository Repository = ProductRepositoryFactory.Repository;
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Test1()
        {
            return View();
        }

        public ActionResult Test2()
        {
            return View();
        }

        public JsonResult LoadTest1(ProductParam modelParam)
        {
            return new JsonDataGridResult(Repository.LoadProducts(modelParam));
        }
        /*
                //
                // GET: /Home/Details/5

                public ActionResult Details(int id)
                {
                    return View();
                }

                //
                // GET: /Home/Create

                public ActionResult Create()
                {
                    return View();
                }

                //
                // POST: /Home/Create

                [HttpPost]
                public ActionResult Create(FormCollection collection)
                {
                    try
                    {
                        // TODO: Add insert logic here

                        return RedirectToAction("Index");
                    }
                    catch
                    {
                        return View();
                    }
                }

                //
                // GET: /Home/Edit/5

                public ActionResult Edit(int id)
                {
                    return View();
                }

                //
                // POST: /Home/Edit/5

                [HttpPost]
                public ActionResult Edit(int id, FormCollection collection)
                {
                    try
                    {
                        // TODO: Add update logic here

                        return RedirectToAction("Index");
                    }
                    catch
                    {
                        return View();
                    }
                }

                //
                // GET: /Home/Delete/5

                public ActionResult Delete(int id)
                {
                    return View();
                }

                //
                // POST: /Home/Delete/5

                [HttpPost]
                public ActionResult Delete(int id, FormCollection collection)
                {
                    try
                    {
                        // TODO: Add delete logic here

                        return RedirectToAction("Index");
                    }
                    catch
                    {
                        return View();
                    }
                }*/
    }
}
