import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

function PaymentPDF({ address, totalAmount,totalAmt, list, details }) {
  const generatePDF = () => {
     const doc = new jsPDF();

     doc.setProperties({
      title: 'Payment Details',
      author: 'Your Company Name',
    });
    const generateInvoiceId = () => {
      return 'INV' + Math.floor(Math.random() * 10000); 
    };

    const invoiceId = generateInvoiceId();
    const paymentDate = new Date().toLocaleDateString(); 
    
    doc.setFontSize(12); 
    doc.text(`Invoice ID: ${invoiceId}`, doc.internal.pageSize.width - 15, 15, 'right');
    doc.text(`Payment Date: ${paymentDate}`, doc.internal.pageSize.width - 15, 25, 'right');
    const spaceAboveTable = 20;    const startY = spaceAboveTable;
    const gst=((totalAmt / 100 * 8)+(totalAmt / 100 * 9)+(totalAmt / 100 * 7)).toFixed(2)

    doc.setFontSize(25); 
    doc.setFont('helvetica', 'bold');
    doc.text('Product Details', 10, startY);
    doc.autoTable({
      startY: startY + 10, 
      head: [['Name', 'Price', 'Quantity', 'Cost']],
      body: list.map((product) => [product.name, product.price, product.quantity, product.quantity * product.price]),
    });
    doc.setFontSize(14); 
    const paymentInfoStartY = doc.lastAutoTable.finalY + 10;
    doc.text(`Name: ${address.name}`, 10, paymentInfoStartY);
    doc.text(`Amount: Rs${totalAmount}`, 10, paymentInfoStartY + 10);
    doc.text(`GST : ${gst}`, 10, paymentInfoStartY + 20);
    doc.text(`Mode Of Delivery: ${details.deliveryType}`, 10, paymentInfoStartY + 30);
    doc.text(`Shipping Charges: Rs 50`, 10, paymentInfoStartY + 40);
    doc.text(`Payment Type: ${details.paymentType}`, 10, paymentInfoStartY + 50);
    doc.text(`Address: ${address.addressLine1} ${address.addressLine2} ${address.addressLine3}`, 10, paymentInfoStartY + 60);
    doc.text(`Pincode: ${address.pincode}`, 10, paymentInfoStartY + 70);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25); 
    doc.text(`Total Amount of Payment: ${totalAmount}`, 9, paymentInfoStartY + 90);
    doc.save('Invoice.pdf');
    
  const csvContent = `Name,Price,Quantity,Cost\n` +
  list.map((product) => `${product.name},${product.price},${product.quantity},${product.quantity * product.price}`).join('\n');
const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
saveAs(csvBlob, 'Invoice.csv');
  };
  
  return (
    <div>
      <button onClick={generatePDF}>Export Invoice Here </button>
    </div>
  );
}

export default PaymentPDF;
