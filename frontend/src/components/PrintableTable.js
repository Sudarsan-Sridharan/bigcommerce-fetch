import React, {PropTypes} from 'react';
import numeral from 'numeral';

const PrintableTable = ({items, totalPrice}) => {

  function collapseDuplicates(items) {
    const skuMap = new Map();
    items.map(item => { // eslint-disable-line
      if (skuMap.get(item.value)) {
        let uniqueItem = skuMap.get(item.value);
        uniqueItem.quantity = parseInt(uniqueItem.quantity, 10) + parseInt(item.quantity, 10);
        skuMap.set(uniqueItem.value, uniqueItem);
      } else {
        skuMap.set(item.value, Object.assign({}, item));
      }
    });

    skuMap.delete("");
    return skuMap;
  }

  const skuMap = collapseDuplicates(items);

  return (
    <div id="print-me">
      <img id="header" alt="header" src="http://cdn5.bigcommerce.com/s-2e83t/templates/__custom/images/QuickHeader1.png"/>
      <table id="print-table">
        <thead>
        <tr>
          <th/>
          <th>Item # (SKU)</th>
          <th>Product name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        {[...skuMap.values()].map(item => {
          const calculatedPrice = numeral((item.price * item.quantity).toString()).format('$0,0.00');
          return (<PrintRow key={item.itemId.toString()}
                            item={item}
                            totalPrice={calculatedPrice}
          />);
        })
        }
        </tbody>
        <caption id="total-caption">Total: {totalPrice}</caption>
      </table>
      <footer>
        <img id="footer" alt="footer" src="http://cdn5.bigcommerce.com/s-2e83t/templates/__custom/images/QuickFooter.png"/>
      </footer>

    </div>
  );
};

PrintableTable.propTypes = {
  items: PropTypes.array.isRequired,
  totalPrice: PropTypes.string.isRequired
};

export default PrintableTable;


const PrintRow = ({item, totalPrice}) => { //eslint-disable-line
  return (
    <tr>
      <td>
        {item.tinyImg ?
          <div id="showthumb">
            <img src={item.tinyImg} alt="thumb-img" className="skuimg"/>
          </div>
          : <div/>
        }
      </td>
      <td> {item.sku}</td>
      <td className="text-cell">{item.productName}</td>
      <td className="text-cell">{item.optionValue}</td>
      <td>{totalPrice}</td>
      <td>{item.quantity}</td>
    </tr>
  );
};

PrintRow.propTypes = {
  item: PropTypes.object.isRequired,
  totalPrice: PropTypes.string.isRequired
};
