const Item = (product) => {
    let price = product?.price || product.Prices[0].unit_price || 0;

    if (typeof price === 'string') {
        price = parseFloat(price);
    }

    let quantity = product?.quantity || 1;
    let cost = price * product.quantity || 0;
    let name = product?.name || product?.Product?.name || '';

    let itemData = {
        image_url: product?.image_url || product?.image,
        id: product.id,
        name: name,
        size: product.size,
        quantity: quantity,
        price: price,
        cost: cost,
    };

    return {
        ...itemData,
    };
}

export default Item;