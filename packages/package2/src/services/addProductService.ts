import Product from 'package1/src/model/product';

export async function checkProduct(prodName: string) {
    try {
        console.log('In addProductService.checkProduct');
        const data = await Product.findOne({ where: { prod_name: prodName } });
        return data;
    } catch (err: any) {
        console.error('Error in addProductService.checkProduct : ' + err.message);
    }
}

export async function create(req: any) {
    try {
        console.log('In addProductService.create');
        const data = req;
        const result = await Product.create({
            prod_name: data.prod_name,
            prod_description: data.prod_description,
            prod_price: data.prod_price
        });
        return result;
    } catch (err: any) {
        console.error('Error in addProductService.create : ' + err.message);
    }
}