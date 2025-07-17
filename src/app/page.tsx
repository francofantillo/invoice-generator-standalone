import { FileText, Download, Zap, Shield, Users } from 'lucide-react';
import InvoiceForm from '@/components/InvoiceForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">
                Free Invoice Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://iinvoiceapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700"
              >
                iInvoice
              </a>
              <a
                href="https://github.com/francofantillo/invoice-generator-standalone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Create Professional Invoices in Minutes
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Generate beautiful, professional invoices instantly. No registration required, 
            completely free, and works directly in your browser.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Zap className="h-5 w-5 mr-2" />
              <span>Instant PDF Generation</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Shield className="h-5 w-5 mr-2" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
              <Download className="h-5 w-5 mr-2" />
              <span>Download PDF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Invoice Generator?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-gray-600">
                Create and download professional invoices in under 2 minutes. 
                No complex setup or learning curve.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">100% Free</h4>
              <p className="text-gray-600">
                No hidden fees, no subscriptions, no registration required. 
                Generate unlimited invoices completely free.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Professional Quality</h4>
              <p className="text-gray-600">
                Clean, professional invoice templates that make you look 
                established and trustworthy to your clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Start Creating Your Invoice</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to generate your professional invoice. 
              All data is processed locally in your browser for maximum security.
            </p>
          </div>
          <InvoiceForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 mr-2" />
                <span className="text-lg font-semibold">Free Invoice Generator</span>
              </div>
              <p className="text-gray-400">
                A simple, fast, and free tool to create professional invoices 
                for your business.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Professional invoice templates</li>
                <li>• Instant PDF generation</li>
                <li>• No registration required</li>
                <li>• Multiple currency support</li>
                <li>• Tax calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <div className="flex space-x-4">
                <a
                  href="https://iinvoiceapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  iInvoice
                </a>
                <a
                  href="https://github.com/francofantillo/invoice-generator-standalone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/franco-fantillo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 iInvoice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
