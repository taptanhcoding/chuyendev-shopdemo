import { getProductById } from '~/service/productService';
import { addCart } from './cartSlice';

const handleAddCartFromApi = (data) => async (dispatch) => {
    let newCart = data.map((productInfo) => {
        const getDetaiProduct = async () => {
            let product = await getProductById(productInfo.product_id);
            return product;
        };
        console.log(getDetaiProduct());
        return {
            ...productInfo,
        };
    });
    console.log(newCart);
    dispatch(addCart(newCart));
};

export { handleAddCartFromApi };
