import Product from "../model/product";

export async function getProduct() {
    try {
        console.log("In getProductService.getProduct");
        const data = await Product.findAll({
            attributes: ['prod_id', 'prod_name', 'prod_description', 'prod_price']
        });
        console.log(data);
        return data;
    } catch (err: any) {
        console.error('Error in In getProductService.getProduct : ' + err.message +' '+ err.code);
    }
}