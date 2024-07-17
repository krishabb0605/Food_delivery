import React, { Fragment } from 'react';
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import food_logo from '../../assets/food_logo.png';
import invoice_bg from '../../assets/invoice_bg.png';
import background_pdf from '../../assets/background_pdf.png';
import moment from 'moment';

const Invoice = ({ order, index }) => {
  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subTotalData = [
    {
      name: 'Subtotal',
      value: total,
    },
    {
      name: 'Tax',
      value: 2,
    },
    {
      name: 'Total',
      value: total + 2,
    },
  ];

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: 'column',
      minHeight: '100%',
    },

    background: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      opacity: 0.7,
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

    titleContainer: { flexDirection: 'row', marginTop: 44 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: 'center' },

    title: { fontSize: 16, fontWeight: 'bold', color: '#816556' },

    invoice: {
      fontWeight: 'bold',
      fontSize: 14,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: '3px',
      left: '6px',
      color: 'white',
    },

    invoiceNumber: { fontSize: 12, fontWeight: 'bold' },

    address: { fontWeight: 400, fontSize: 11, color: '#AD785C' },

    theader: {
      marginTop: 20,
      fontSize: 12,
      fontStyle: 'bold',
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      backgroundColor: '#816556',
      color: 'white',
    },

    theader2: { flex: 2 },

    tbody: {
      fontSize: 12,
      paddingTop: 8,
      paddingBottom: 4,
      paddingLeft: 7,
      flex: 1,
      color: '#AD785C',
    },

    subHeader: {
      color: '#5F4F45',
      fontStyle: 'bold',
      paddingTop: 2,
      paddingBottom: 0,
    },

    subheaderData: {
      color: '#816556',
      paddingTop: 2,
      paddingBottom: 0,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: 'whitesmoke',
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2 },

    addressdiv: {
      maxWidth: '200px',
    },
    boldbody: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#816556',
    },
  });

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Image src={food_logo} style={{ width: '70px' }} />
          <View style={{ position: 'relative' }}>
            <Image
              src={invoice_bg}
              style={{ width: '150px', height: '20px' }}
            />
            <View style={styles.invoice}>
              <Text>INVOICE : #</Text>
              <Text style={styles.invoiceNumber}>{index} </Text>
            </View>
          </View>
        </View>

        <View style={styles.addressdiv}>
          <Text style={styles.title}>INVOICE TO:</Text>
          <Text style={styles.address}>{order.paymentInfo.cardholderName}</Text>
          <Text style={styles.address}>
            {order.paymentInfo.cardholderEmail}
          </Text>
          <Text style={styles.address}>
            {order.address.street},{order.address.city},{order.address.state},
            {order.address.country},{order.address.zipcode}
          </Text>
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
        <Text>ITEMS</Text>
      </View>
      <View style={styles.theader}>
        <Text>PRICE</Text>
      </View>
      <View style={styles.theader}>
        <Text>QTY</Text>
      </View>
      <View style={styles.theader}>
        <Text>TOTAL</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    order.items.map((data) => (
      <Fragment key={data._id}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '1px solid #816556',
          }}
        >
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

  const TableTotal = () =>
    subTotalData.map((data) => (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={[styles.tbody, styles.tbody2, styles.subHeader]}>
          <Text></Text>
        </View>
        <View style={[styles.tbody, styles.subHeader]}>
          <Text></Text>
        </View>
        <View style={[styles.tbody, styles.subHeader]}>
          <Text>{data.name}</Text>
        </View>
        <View style={[styles.tbody, styles.subheaderData]}>
          <Text>$ {data.value}</Text>
        </View>
      </View>
    ));

  const Footer = () => (
    <View
      style={{
        width: '75%',
        position: 'absolute',
        bottom: 90,
        left: 40,
        right: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        paddingLeft: 8,
        pageBreakBefore: 'always',
      }}
    >
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: '#5F4F45', fontStyle: 'bold', fontSize: 14 }}>
          Payment Info:
        </Text>

        <View
          style={{
            color: '#816556',
            fontSize: 12,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          }}
        >
          <Text>A/C Number:</Text>
          <Text style={{ color: '#AD785C' }}>
            ********{order.paymentInfo.last4}
          </Text>
        </View>

        <View
          style={{
            color: '#816556',
            fontSize: 12,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          }}
        >
          <Text>A/C Name:</Text>
          <Text style={{ color: '#AD785C' }}>
            {order.paymentInfo.cardholderName}
          </Text>
        </View>

        <View
          style={{
            color: '#816556',
            fontSize: 12,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          }}
        >
          <Text>Date:</Text>
          <Text style={{ color: '#AD785C' }}>
            {moment(order.date).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>

      <Text style={{ color: '#5F4F45', fontStyle: 'bold', fontSize: 14 }}>
        TERMS AND CONDITIONS:
      </Text>
      <Text style={{ color: '#AD785C', fontSize: 10 }}>
        "All sales are final upon delivery. We reserve the right to refuse or
        cancel any food order due to availability, inaccuracies, or errors. By
        placing an order, you agree to provide accurate delivery information and
        comply with our policies."
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Image src={background_pdf} style={styles.background} />
        <Address />
        <TableHead />
        <TableBody />
        <TableTotal />
        <Footer />
      </Page>
    </Document>
  );
};

export default Invoice;
