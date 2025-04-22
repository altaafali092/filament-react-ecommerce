export const ProductRoute = (item) => {
    const params = new URLSearchParams();

    Object.entries(item.option_ids).forEach(([typeId, optionId]) => {
      params.append(`options[${typeId}]`, optionId + '');
    });

    return route('product-detail', item.slug) + '?' + params.toString();
  }
