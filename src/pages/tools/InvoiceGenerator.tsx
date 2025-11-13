import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import CalculatorContentSection from "@/components/CalculatorContentSection";

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

const InvoiceGenerator = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState("");
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, rate: 0 }
  ]);
  
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const generateInvoice = () => {
    if (!businessName || !clientName || !invoiceNumber) {
      toast.error("Please fill in required fields (Business Name, Client Name, Invoice Number)");
      return;
    }

    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .invoice-title { font-size: 32px; font-weight: bold; color: #2563eb; }
    .section { margin-bottom: 30px; }
    .section-title { font-weight: bold; font-size: 14px; color: #666; margin-bottom: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #2563eb; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .totals { margin-top: 20px; text-align: right; }
    .totals div { padding: 8px 0; }
    .total-amount { font-size: 20px; font-weight: bold; color: #2563eb; padding-top: 15px; border-top: 2px solid #2563eb; }
    .notes { margin-top: 40px; padding: 15px; background: #f8f9fa; border-left: 4px solid #2563eb; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="invoice-title">INVOICE</div>
      <div style="margin-top: 10px;">
        <strong>${businessName}</strong><br>
        ${businessAddress}<br>
        ${businessEmail}<br>
        ${businessPhone}
      </div>
    </div>
    <div style="text-align: right;">
      <div><strong>Invoice #:</strong> ${invoiceNumber}</div>
      <div><strong>Date:</strong> ${invoiceDate}</div>
      ${dueDate ? `<div><strong>Due Date:</strong> ${dueDate}</div>` : ''}
    </div>
  </div>

  <div class="section">
    <div class="section-title">BILL TO:</div>
    <strong>${clientName}</strong><br>
    ${clientAddress}<br>
    ${clientEmail}
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 50%;">Description</th>
        <th style="text-align: center;">Quantity</th>
        <th style="text-align: right;">Rate</th>
        <th style="text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${items.map(item => `
        <tr>
          <td>${item.description}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">$${item.rate.toFixed(2)}</td>
          <td style="text-align: right;">$${(item.quantity * item.rate).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <div><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</div>
    ${taxRate > 0 ? `<div><strong>Tax (${taxRate}%):</strong> $${tax.toFixed(2)}</div>` : ''}
    <div class="total-amount"><strong>Total:</strong> $${total.toFixed(2)}</div>
  </div>

  ${notes ? `
  <div class="notes">
    <strong>Notes:</strong><br>
    ${notes.replace(/\n/g, '<br>')}
  </div>
  ` : ''}
</body>
</html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${invoiceNumber}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Invoice generated and downloaded!");
  };

  return (
    <CalculatorLayout
      title="Invoice Generator"
      description="Create professional invoices for your business - free invoice maker"
      keywords="invoice generator, create invoice, invoice maker, business invoice, free invoice, invoice template"
      canonicalUrl="https://calcifyy.lovable.app/tool/invoice-generator"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Business Information */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Your Business Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Company Inc."
              />
            </div>
            <div>
              <Label htmlFor="businessEmail">Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="contact@yourcompany.com"
              />
            </div>
            <div>
              <Label htmlFor="businessAddress">Address</Label>
              <Input
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                placeholder="123 Business St, City, State 12345"
              />
            </div>
            <div>
              <Label htmlFor="businessPhone">Phone</Label>
              <Input
                id="businessPhone"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </Card>

        {/* Client Information */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Client Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name or Company"
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@email.com"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Input
                id="clientAddress"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Client address"
              />
            </div>
          </div>
        </Card>

        {/* Invoice Details */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-001"
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Items / Services</h2>
            <Button onClick={addItem} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-12 md:col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Service or product description"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label>Rate ($)</Label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Label>Amount</Label>
                  <div className="font-bold text-lg">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Totals */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Totals</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.01"
                placeholder="0"
              />
            </div>
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between">
                  <span>Tax ({taxRate}%):</span>
                  <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-2xl font-bold text-primary pt-2 border-t">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Additional Notes</h2>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment terms, thank you message, or any additional information..."
            rows={4}
          />
        </Card>

        {/* Generate Button */}
        <Button onClick={generateInvoice} className="w-full h-14 text-lg" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Generate & Download Invoice
        </Button>
      </div>

      <CalculatorContentSection
        aboutContent="The Invoice Generator creates professional, customizable invoices for freelancers, small businesses, and contractors. Generate branded invoices with your business information, itemized services, tax calculations, and payment terms. The tool outputs clean HTML invoices that can be saved, printed, or converted to PDF for sending to clients."
        useCases={[
          { title: "Freelance Work", description: "Create professional invoices for design, development, writing, consulting, or any freelance services. Track project hours and bill clients with detailed line items." },
          { title: "Small Business Billing", description: "Generate invoices for products sold or services rendered. Include multiple items, apply taxes, and set payment terms for your business transactions." },
          { title: "Contract Work", description: "Bill clients for contract projects with milestone-based invoicing. Add project descriptions, deliverables, and payment schedules to your invoices." },
          { title: "Service Providers", description: "Create invoices for recurring services like maintenance, subscriptions, or retainer agreements with consistent professional formatting." }
        ]}
        tips={[
          { title: "Professional Branding", description: "Include complete business information (name, address, contact) to appear professional. Consider adding your logo by editing the downloaded HTML file." },
          { title: "Clear Line Items", description: "Be specific with descriptions. Instead of 'Web work,' use 'Homepage redesign - 10 hours.' Clear items prevent payment disputes and questions." },
          { title: "Payment Terms", description: "Use the notes section to specify payment terms (Net 30, due upon receipt), accepted payment methods, and late fees to set clear expectations." },
          { title: "Sequential Numbering", description: "Use consistent invoice numbering (INV-001, INV-002) for easy tracking. Include year for long-term organization (2024-001, 2024-002)." }
        ]}
        faqs={[
          { question: "How do I convert the invoice to PDF?", answer: "The invoice downloads as HTML. Open it in any browser and use Print > Save as PDF. This preserves formatting and creates a shareable PDF document." },
          { question: "Can I add my logo to the invoice?", answer: "Yes! Download the HTML file, open it in a text editor, and add an <img> tag with your logo URL in the header section. Save and reopen in a browser." },
          { question: "Is my invoice data saved?", answer: "No, all data stays in your browser locally. Nothing is uploaded or stored on servers. You'll need to fill in details each time or save your HTML file as a template." },
          { question: "What payment terms should I include?", answer: "Common terms: 'Net 30' (due in 30 days), 'Net 15' (15 days), 'Due upon receipt' (immediate), or '2/10 Net 30' (2% discount if paid in 10 days, otherwise 30 days). Specify late fees if applicable." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InvoiceGenerator;
