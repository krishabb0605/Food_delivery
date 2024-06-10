import React, { Fragment } from 'react';
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { assets } from '../../assets/assets';

const Invoice = ({ order, url }) => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: 'column',
    },

    spaceBetween: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#3E3E3E',
    },
    image: {
      height: '70px',
      width: '70px',
    },

    titleContainer: { flexDirection: 'row', marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: 'center' },

    addressTitle: { fontSize: 11, fontStyle: 'bold' },

    invoice: { fontWeight: 'bold', fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: 'bold',
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: '#DEDEDE',
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: 'whitesmoke',
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
    addressdiv: {
      maxWidth: '250px',
    },
    boldbody: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image src={assets.logo} style={{ width: '80px' }} />
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Invoice </Text>
          <Text style={styles.invoiceNumber}>Invoice number: {order._id} </Text>
        </View>
        <View style={styles.addressdiv}>
          <Text style={styles.addressTitle}>
            Address : {order.address.street},{order.address.city},
            {order.address.state}{' '}
          </Text>
          <Text style={styles.addressTitle}>{order.address.country}</Text>
          <Text style={styles.addressTitle}>{order.address.zipcode}</Text>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
      }}
    >
      <View style={[styles.theader, styles.theader2]}>
        <Text>Image</Text>
      </View>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Items</Text>
      </View>
      <View style={styles.theader}>
        <Text>Price</Text>
      </View>
      <View style={styles.theader}>
        <Text>Qty</Text>
      </View>
      <View style={styles.theader}>
        <Text>Amount</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    order.items.map((data) => (
      <Fragment key={data._id}>
        <View
          style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}
        >
          <View style={[styles.tbody, styles.tbody2]}>
            <Image
              src={`${url}/images/${data.image}`}
              alt='image'
              style={styles.image}
            />
          </View>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{data.name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>$ {data.price} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{data.quantity}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>$ {(data.price * data.quantity).toFixed(2)}</Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text> </Text>
      </View>
      <View style={[styles.tbody, styles.boldbody]}>
        <Text>Total</Text>
      </View>
      <View style={[styles.tbody, styles.boldbody]}>
        <Text>
          ${' '}
          {order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) + 2}
        </Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <InvoiceTitle />
        <Address />
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );
};

export default Invoice;
