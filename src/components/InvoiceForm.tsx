"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, FileText } from "lucide-react";
import { generatePDF } from "@/utils/invoiceUtils";

export type LineItemType = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export type InvoiceType = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  taxRate: number;
  lineItems: LineItemType[];
  notes: string;
};

const defaultInvoice: InvoiceType = {
  businessName: "",
  businessAddress: "",
  businessEmail: "",
  businessPhone: "",
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  invoiceNumber: `INV-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}${String(
    new Date().getDate()
  ).padStart(2, "0")}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0],
  currency: "USD",
  taxRate: 0,
  lineItems: [
    {
      id: "item-1",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],
  notes: "",
};

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState<InvoiceType>(defaultInvoice);
  const [activeTab, setActiveTab] = useState("create");

  const updateInvoiceField = (field: keyof InvoiceType, value: string | number | LineItemType[]) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const addLineItem = () => {
    const newItem: LineItemType = {
      id: `item-${invoice.lineItems.length + 1}`,
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    updateInvoiceField("lineItems", [...invoice.lineItems, newItem]);
  };

  const updateLineItem = (id: string, field: keyof LineItemType, value: string | number) => {
    const updatedItems = invoice.lineItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Update amount if quantity or rate changed
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    updateInvoiceField("lineItems", updatedItems);
  };

  const removeLineItem = (id: string) => {
    if (invoice.lineItems.length === 1) {
      alert("Cannot remove all items. An invoice must have at least one item.");
      return;
    }
    
    const updatedItems = invoice.lineItems.filter((item) => item.id !== id);
    updateInvoiceField("lineItems", updatedItems);
  };

  const handleDownloadInvoice = () => {
    if (!invoice.businessName || !invoice.clientName) {
      alert("Please fill in business name and client name before downloading.");
      return;
    }
    
    generatePDF(invoice);
    alert("Invoice downloaded successfully!");
  };

  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name *</label>
              <input
                type="text"
                value={invoice.businessName}
                onChange={(e) => updateInvoiceField("businessName", e.target.value)}
                placeholder="Your Company Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={invoice.businessEmail}
                onChange={(e) => updateInvoiceField("businessEmail", e.target.value)}
                placeholder="your@email.com"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={invoice.businessPhone}
                onChange={(e) => updateInvoiceField("businessPhone", e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                value={invoice.businessAddress}
                onChange={(e) => updateInvoiceField("businessAddress", e.target.value)}
                rows={3}
                placeholder="123 Main St, City, State 12345"
                className="w-full p-2 border rounded-md resize-none"
              />
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Client Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client Name *</label>
              <input
                type="text"
                value={invoice.clientName}
                onChange={(e) => updateInvoiceField("clientName", e.target.value)}
                placeholder="Client Company Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={invoice.clientEmail}
                onChange={(e) => updateInvoiceField("clientEmail", e.target.value)}
                placeholder="client@email.com"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                value={invoice.clientAddress}
                onChange={(e) => updateInvoiceField("clientAddress", e.target.value)}
                rows={3}
                placeholder="456 Client St, City, State 12345"
                className="w-full p-2 border rounded-md resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Invoice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoiceField("invoiceNumber", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Date</label>
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateInvoiceField("invoiceDate", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateInvoiceField("dueDate", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Line Items</h3>
        
        <div className="space-y-4">
          {invoice.lineItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  placeholder="Service or product description"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rate</label>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="text"
                  value={`$${item.amount.toFixed(2)}`}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <button
                onClick={() => removeLineItem(item.id)}
                className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          
          <button
            onClick={addLineItem}
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({invoice.taxRate}%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Notes</h3>
        <textarea
          value={invoice.notes}
          onChange={(e) => updateInvoiceField("notes", e.target.value)}
          rows={3}
          placeholder="Additional notes or payment terms..."
          className="w-full p-2 border rounded-md resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleDownloadInvoice}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FileText className="mr-2 h-4 w-4" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
