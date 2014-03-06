namespace GenerateDataGridDemo.Models
{
    public class ProductRepositoryFactory
    {
        private ProductRepositoryFactory()
        {
        }

        static ProductRepositoryFactory()
        {
            Repository = new ProductRepository();
        }

        internal static IProductRepository Repository { get; private set; }
    }
}
