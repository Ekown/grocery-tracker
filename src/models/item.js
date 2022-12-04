const Item = (product) => {
    let price = 0;

    // Set the item price based on the price property or the Prices array unit price property
    if (product.price) {
        price = product.price;
    } else if (!!product.Prices && product.Prices.length !== 0 && product.Prices[0]?.unit_price) {
        price = product.Prices[0].unit_price;
    }

    // Convert the price to a float integer if its a string
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