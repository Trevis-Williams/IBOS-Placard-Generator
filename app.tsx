import { useState, useRef, useMemo } from 'react';
import { Package, Calendar, User, Hash, MapPin, Truck, Palette, Printer } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function App() {
  const [taskNumber, setTaskNumber] = useState('TASK-001');
  const [receivingDate, setReceivingDate] = useState(new Date().toISOString().split('T')[0]);
  const [shipDate, setShipDate] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [logicalLocation, setLogicalLocation] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [palletCount, setPalletCount] = useState('');
  
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  const placardRef = useRef<HTMLDivElement>(null);

  // Split description into pages - maximize space on first page
  const descriptionPages = useMemo(() => {
    if (!description) return [];
    
    const lines = description.split('\n');
    const firstPageLines = 12; // More lines on first page to use available space
    const continuationPageLines = 28; // Lines on continuation pages (full page)
    
    const pages: string[] = [];
    
    if (lines.length <= firstPageLines) {
      pages.push(description);
    } else {
      // First page
      pages.push(lines.slice(0, firstPageLines).join('\n'));
      
      // Continuation pages
      let remainingLines = lines.slice(firstPageLines);
      while (remainingLines.length > 0) {
        pages.push(remainingLines.slice(0, continuationPageLines).join('\n'));
        remainingLines = remainingLines.slice(continuationPageLines);
      }
    }
    
    return pages;
  }, [description]);

  const handlePrint = () => {
    if (!placardRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const totalPages = descriptionPages.length || 1;
    
    // Generate continuation pages HTML
    const continuationPagesHtml = descriptionPages.slice(1).map((pageContent, index) => `
      <div class="page">
        <div class="placard">
          <div class="description-full">
            <div class="description-label">DESCRIPTION (continued)</div>
            <div class="description-value">${pageContent}</div>
          </div>
          
          <div class="footer">
            Generated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            • Page ${index + 2} of ${totalPages}
          </div>
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Placard - ${taskNumber}</title>
          <style>
            @page {
              size: letter;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
            }
            .page {
              width: 8.5in;
              height: 11in;
              page-break-after: always;
            }
            .page:last-child {
              page-break-after: avoid;
            }
            .placard {
              width: 100%;
              height: 100%;
              padding: 0.75in;
              display: flex;
              flex-direction: column;
              background-color: ${bgColor};
              color: ${textColor};
            }
            .header {
              text-align: center;
              margin-bottom: 0.4in;
              padding-bottom: 0.25in;
              border-bottom: 4px solid currentColor;
            }
            .header-small {
              margin-bottom: 0.3in;
              padding-bottom: 0.2in;
            }
            .header-label {
              font-size: 10pt;
              opacity: 0.7;
              margin-bottom: 8px;
              letter-spacing: 0.05em;
            }
            .task-number {
              font-size: 48pt;
              font-weight: bold;
              letter-spacing: 0.05em;
            }
            .task-number-small {
              font-size: 32pt;
              font-weight: bold;
              letter-spacing: 0.05em;
            }
            .section {
              margin-bottom: 0.25in;
              padding-bottom: 0.15in;
              border-bottom: 2px solid currentColor;
            }
            .section-label {
              font-size: 9pt;
              opacity: 0.7;
              margin-bottom: 4px;
              letter-spacing: 0.05em;
            }
            .section-value {
              font-size: 18pt;
              font-weight: 600;
            }
            .two-col {
              display: flex;
              gap: 0.4in;
            }
            .main-content {
              display: flex;
              gap: 0.4in;
            }
            .left-content {
              flex: 1;
            }
            .col {
              flex: 1;
            }
            .field {
              margin-bottom: 0.2in;
            }
            .field-label {
              font-size: 9pt;
              opacity: 0.7;
              margin-bottom: 4px;
              letter-spacing: 0.05em;
            }
            .field-value {
              font-size: 16pt;
              font-weight: 500;
            }
            .priority-badge {
              display: inline-block;
              padding: 6px 16px;
              border-radius: 6px;
              border: 2px solid;
              font-weight: 600;
              font-size: 16pt;
            }
            .priority-low { background: #f0fdf4; color: #166534; border-color: #86efac; }
            .priority-medium { background: #fefce8; color: #854d0e; border-color: #fde047; }
            .priority-high { background: #fff7ed; color: #9a3412; border-color: #fdba74; }
            .priority-urgent { background: #fef2f2; color: #991b1b; border-color: #fca5a5; }
            .qr-section {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .qr-box {
              background: white;
              padding: 12px;
              border-radius: 8px;
              border: 2px solid currentColor;
            }
            .qr-label {
              font-size: 9pt;
              opacity: 0.7;
              margin-top: 8px;
              text-align: center;
              letter-spacing: 0.05em;
            }
            .description {
              margin-top: 0.2in;
              padding-top: 0.2in;
              border-top: 2px solid currentColor;
              flex: 1;
            }
            .description-full {
              flex: 1;
            }
            .description-label {
              font-size: 9pt;
              opacity: 0.7;
              margin-bottom: 4px;
              letter-spacing: 0.05em;
            }
            .description-value {
              font-size: 14pt;
              line-height: 1.5;
              white-space: pre-line;
            }
            .footer {
              margin-top: auto;
              padding-top: 0.2in;
              border-top: 1px solid currentColor;
              opacity: 0.4;
              font-size: 9pt;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <!-- Page 1 -->
          <div class="page">
            <div class="placard">
              <div class="header">
                <div class="header-label">TASK NUMBER</div>
                <div class="task-number">${taskNumber || '---'}</div>
              </div>
              
              <div class="section">
                <div class="two-col">
                  <div class="col">
                    <div class="section-label">RECEIVING DATE</div>
                    <div class="section-value">${receivingDate ? new Date(receivingDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : '---'}</div>
                  </div>
                  <div class="col">
                    <div class="section-label">SHIP DATE</div>
                    <div class="section-value">${shipDate ? new Date(shipDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : '---'}</div>
                  </div>
                </div>
              </div>
              
              <div class="main-content">
                <div class="left-content">
                  <div class="two-col">
                    <div class="col">
                      <div class="field">
                        <div class="field-label">CREATED BY</div>
                        <div class="field-value">${createdBy || '---'}</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="field">
                        <div class="field-label">ATTN</div>
                        <div class="field-value">${location || '---'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="two-col">
                    <div class="col">
                      <div class="field">
                        <div class="field-label">LOGICAL LOCATION</div>
                        <div class="field-value">${logicalLocation || '---'}</div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="field">
                        <div class="field-label">SEND TO</div>
                        <div class="field-value">${sendTo || '---'}</div>
                      </div>
                    </div>
                  </div>
                  
                <div class="two-col">
                  <div class="col">
                    <div class="field">
                      <div class="field-label">PALLETS / BOXES</div>
                      <div class="field-value">${palletCount || '---'}</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="field">
                      <div class="field-label">PRIORITY</div>
                      <div class="priority-badge priority-${priority.toLowerCase()}">${priority}</div>
                    </div>
                  </div>
                </div>
              </div>
                
                <div class="qr-section">
                  <div class="qr-box">
                    ${placardRef.current?.querySelector('svg')?.outerHTML || ''}
                  </div>
                  <div class="qr-label">SCAN ME</div>
                </div>
              </div>
              
              ${descriptionPages.length > 0 ? `
                <div class="description">
                  <div class="description-label">DESCRIPTION${descriptionPages.length > 1 ? ' (continued on next page)' : ''}</div>
                  <div class="description-value">${descriptionPages[0]}</div>
                </div>
              ` : ''}
              
              <div class="footer">
                Generated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                ${totalPages > 1 ? `• Page 1 of ${totalPages}` : ''}
              </div>
            </div>
          </div>
          
          ${continuationPagesHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col lg:flex-row">
      {/* Left Panel - Controls */}
      <div className="w-full lg:w-[400px] bg-white shadow-xl p-6 md:p-8 overflow-y-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Logistics Placard</h1>
          <p className="text-slate-500 text-sm md:text-base">Generate logistics placards with ease</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Task Number */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Hash className="w-4 h-4" />
              Task Number
            </label>
            <input
              type="text"
              value={taskNumber}
              onChange={(e) => setTaskNumber(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="e.g., TASK-001"
            />
          </div>

          {/* Receiving Date */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Calendar className="w-4 h-4" />
              Receiving Date
            </label>
            <input
              type="date"
              value={receivingDate}
              onChange={(e) => setReceivingDate(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          {/* Ship Date */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Calendar className="w-4 h-4" />
              Ship Date
            </label>
            <input
              type="date"
              value={shipDate}
              onChange={(e) => setShipDate(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <User className="w-4 h-4" />
              Created By
            </label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="Enter name"
            />
          </div>

          {/* ATTN */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <MapPin className="w-4 h-4" />
              ATTN
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="e.g., John Smith"
            />
          </div>

          {/* Logical Location */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Truck className="w-4 h-4" />
              Logical Location
            </label>
            <input
              type="text"
              value={logicalLocation}
              onChange={(e) => setLogicalLocation(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="Example: CCO1/2-X-01-X"
            />
          </div>

          {/* Send To */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <MapPin className="w-4 h-4" />
              Send To
            </label>
            <input
              type="text"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="CCO1 WIP room"
            />
          </div>

          {/* Pallets / Boxes */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Package className="w-4 h-4" />
              Pallets / Boxes
            </label>
            <input
              type="text"
              value={palletCount}
              onChange={(e) => setPalletCount(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="e.g., 3 pallets, 12 boxes"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Package className="w-4 h-4" />
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm md:text-base"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Package className="w-4 h-4" />
              Description / Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
              rows={3}
              placeholder="Additional details..."
            />
          </div>

          <div className="border-t border-slate-200 pt-4 md:pt-6">
            <h3 className="text-sm text-slate-700 mb-4">Appearance</h3>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
                  <Palette className="w-4 h-4" />
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
                  <Palette className="w-4 h-4" />
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Print Button */}
          <button 
            onClick={handlePrint}
            className="w-full px-4 md:px-6 py-3 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm md:text-base flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print Placard
          </button>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-slate-50">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl text-slate-700">Live Preview</h2>
            <p className="text-xs md:text-sm text-slate-500">
              Standard Letter Size (8.5" × 11") - Print Ready
              {descriptionPages.length > 1 && ` • ${descriptionPages.length} pages`}
            </p>
          </div>
          
          <div ref={placardRef} className="space-y-8">
            {/* Page 1 - Main Placard */}
            <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-slate-300" style={{ aspectRatio: '8.5 / 11' }}>
              <div
                className="w-full h-full p-12 flex flex-col"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                }}
              >
                {/* Task Number at Top */}
                <div className="text-center mb-6 pb-4 border-b-4 border-current">
                  <div className="text-xs opacity-70 mb-2 tracking-wide">TASK NUMBER</div>
                  <div className="text-6xl tracking-wider" style={{ fontWeight: 'bold' }}>
                    {taskNumber || '---'}
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 space-y-5">
                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-6 border-b-2 border-current pb-3">
                    <div>
                      <div className="text-xs opacity-70 mb-1 tracking-wide">RECEIVING DATE</div>
                      <div className="text-xl" style={{ fontWeight: '600' }}>
                        {receivingDate ? new Date(receivingDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : '---'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70 mb-1 tracking-wide">SHIP DATE</div>
                      <div className="text-xl" style={{ fontWeight: '600' }}>
                        {shipDate ? new Date(shipDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : '---'}
                      </div>
                    </div>
                  </div>

                  {/* Two Column Layout with QR Code */}
                  <div className="grid grid-cols-[1fr_auto] gap-6">
                    <div className="space-y-5">
                      {/* Created By and Location */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs opacity-70 mb-1 tracking-wide">CREATED BY</div>
                          <div className="text-xl" style={{ fontWeight: '500' }}>
                            {createdBy || '---'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs opacity-70 mb-1 tracking-wide">ATTN</div>
                          <div className="text-xl" style={{ fontWeight: '500' }}>
                            {location || '---'}
                          </div>
                        </div>
                      </div>

                      {/* Logical Location and Send To */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs opacity-70 mb-1 tracking-wide">LOGICAL LOCATION</div>
                          <div className="text-xl" style={{ fontWeight: '500' }}>
                            {logicalLocation || '---'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs opacity-70 mb-1 tracking-wide">SEND TO</div>
                          <div className="text-xl" style={{ fontWeight: '500' }}>
                            {sendTo || '---'}
                          </div>
                        </div>
                      </div>

                    {/* Pallets/Boxes and Priority */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs opacity-70 mb-1 tracking-wide">PALLETS / BOXES</div>
                        <div className="text-xl" style={{ fontWeight: '500' }}>
                          {palletCount || '---'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-70 mb-1 tracking-wide">PRIORITY</div>
                        <div className={`text-xl inline-block px-4 py-1.5 rounded-md border-2 ${
                          priority === 'Urgent' ? 'bg-red-50 text-red-800 border-red-300' :
                          priority === 'High' ? 'bg-orange-50 text-orange-800 border-orange-300' :
                          priority === 'Medium' ? 'bg-yellow-50 text-yellow-800 border-yellow-300' :
                          'bg-green-50 text-green-800 border-green-300'
                        }`} style={{ fontWeight: '600' }}>
                          {priority}
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-white p-3 rounded-lg border-2 border-current">
                        <QRCode
                          value={`https://www.internalfb.com/tasks/my_tasks?t=${(taskNumber || 'TASK-001').replace(/\D/g, '')}&full_pane=true`}
                          size={140}
                          level="H"
                          fgColor={textColor}
                          bgColor={bgColor}
                        />
                      </div>
                      <div className="text-xs opacity-70 mt-2 text-center tracking-wide">SCAN ME</div>
                    </div>
                  </div>

                  {/* Description - First Page */}
                  {descriptionPages.length > 0 && (
                    <div className="border-t-2 border-current pt-4 flex-1">
                      <div className="text-xs opacity-70 mb-1 tracking-wide">
                        DESCRIPTION {descriptionPages.length > 1 && '(continued on next page)'}
                      </div>
                      <div className="text-lg leading-relaxed whitespace-pre-line">
                        {descriptionPages[0]}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer - Print Info */}
                <div className="mt-auto pt-4 border-t border-current opacity-40 text-xs text-center">
                  Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {descriptionPages.length > 1 && ` • Page 1 of ${descriptionPages.length}`}
                </div>
              </div>
            </div>

            {/* Continuation Pages */}
            {descriptionPages.slice(1).map((pageContent, index) => (
              <div key={index + 1} className="bg-white rounded-sm shadow-2xl overflow-hidden border border-slate-300" style={{ aspectRatio: '8.5 / 11' }}>
                <div
                  className="w-full h-full p-12 flex flex-col"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                >
                  {/* Description Continuation */}
                  <div className="flex-1">
                    <div className="text-xs opacity-70 mb-1 tracking-wide">
                      DESCRIPTION (continued)
                    </div>
                    <div className="text-lg leading-relaxed whitespace-pre-line">
                      {pageContent}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-current opacity-40 text-xs text-center">
                    Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {` • Page ${index + 2} of ${descriptionPages.length}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}