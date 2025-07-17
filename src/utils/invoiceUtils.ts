import { InvoiceType } from "@/components/InvoiceForm";
import jsPDF from "jspdf";

// Format currency based on the currency code
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(amount);
};

// Format date from ISO string to local date format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Calculate subtotal from line items
export const calculateSubtotal = (invoice: InvoiceType): number => {
  return invoice.lineItems.reduce((total, item) => total + item.amount, 0);
};

// Calculate tax amount
export const calculateTax = (invoice: InvoiceType): number => {
  const subtotal = calculateSubtotal(invoice);
  return subtotal * (invoice.taxRate / 100);
};

// Calculate total amount
export const calculateTotal = (invoice: InvoiceType): number => {
  const subtotal = calculateSubtotal(invoice);
  const tax = calculateTax(invoice);
  return subtotal + tax;
};

// Generate and download PDF
export const generatePDF = async (invoice: InvoiceType): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  // Add title
  pdf.setFontSize(20);
  pdf.text('INVOICE', 20, 30);
  
  // Add business info
  pdf.setFontSize(12);
  pdf.text(`From: ${invoice.businessName}`, 20, 50);
  if (invoice.businessAddress) {
    pdf.text(invoice.businessAddress, 20, 60);
  }
  if (invoice.businessEmail) {
    pdf.text(`Email: ${invoice.businessEmail}`, 20, 70);
  }
  if (invoice.businessPhone) {
    pdf.text(`Phone: ${invoice.businessPhone}`, 20, 80);
  }
  
  // Add client info
  pdf.text(`To: ${invoice.clientName}`, 20, 100);
  if (invoice.clientAddress) {
    pdf.text(invoice.clientAddress, 20, 110);
  }
  if (invoice.clientEmail) {
    pdf.text(`Email: ${invoice.clientEmail}`, 20, 120);
  }
  
  // Add invoice details
  pdf.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 140);
  pdf.text(`Invoice Date: ${formatDate(invoice.invoiceDate)}`, 20, 150);
  pdf.text(`Due Date: ${formatDate(invoice.dueDate)}`, 20, 160);
  
  // Add line items
  let yPosition = 180;
  pdf.text('Description', 20, yPosition);
  pdf.text('Qty', 100, yPosition);
  pdf.text('Rate', 130, yPosition);
  pdf.text('Amount', 160, yPosition);
  
  yPosition += 10;
  
  invoice.lineItems.forEach((item) => {
    pdf.text(item.description, 20, yPosition);
    pdf.text(item.quantity.toString(), 100, yPosition);
    pdf.text(formatCurrency(item.rate, invoice.currency), 130, yPosition);
    pdf.text(formatCurrency(item.amount, invoice.currency), 160, yPosition);
    yPosition += 10;
  });
  
  // Add totals
  yPosition += 20;
  const subtotal = calculateSubtotal(invoice);
  const tax = calculateTax(invoice);
  const total = calculateTotal(invoice);
  
  pdf.text(`Subtotal: ${formatCurrency(subtotal, invoice.currency)}`, 130, yPosition);
  yPosition += 10;
  pdf.text(`Tax (${invoice.taxRate}%): ${formatCurrency(tax, invoice.currency)}`, 130, yPosition);
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.text(`Total: ${formatCurrency(total, invoice.currency)}`, 130, yPosition);
  
  // Add notes
  if (invoice.notes) {
    yPosition += 20;
    pdf.setFontSize(12);
    pdf.text('Notes:', 20, yPosition);
    yPosition += 10;
    pdf.text(invoice.notes, 20, yPosition);
  }
  
  pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
};
