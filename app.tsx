import { useState } from 'react';
import { Package, Calendar, User, Hash, MapPin, Truck, Palette } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function App() {
  const [taskNumber, setTaskNumber] = useState('TASK-001');
  const [receivingDate, setReceivingDate] = useState(new Date().toISOString().split('T')[0]);
  const [createdBy, setCreatedBy] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [department, setDepartment] = useState('');
  
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

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

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <MapPin className="w-4 h-4" />
              Location / Bay
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="e.g., Bay A3"
            />
          </div>

          {/* Department */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm text-slate-700">
              <Truck className="w-4 h-4" />
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              placeholder="e.g., Shipping"
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

          {/* Download Button */}
          <button className="w-full px-4 md:px-6 py-3 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm md:text-base">
            Print Placard
          </button>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="flex-1 p-6 md:p-12 flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-3xl">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl text-slate-700">Live Preview</h2>
            <p className="text-xs md:text-sm text-slate-500">Standard Letter Size (8.5" × 11") - Print Ready</p>
          </div>
          
          {/* Paper Container - Standard Letter Size Aspect Ratio */}
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
                {/* Receiving Date */}
                <div className="border-b-2 border-current pb-3">
                  <div className="text-xs opacity-70 mb-1 tracking-wide">RECEIVING DATE</div>
                  <div className="text-2xl" style={{ fontWeight: '600' }}>
                    {receivingDate ? new Date(receivingDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : '---'}
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
                        <div className="text-xs opacity-70 mb-1 tracking-wide">LOCATION</div>
                        <div className="text-xl" style={{ fontWeight: '500' }}>
                          {location || '---'}
                        </div>
                      </div>
                    </div>

                    {/* Department and Priority */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs opacity-70 mb-1 tracking-wide">DEPARTMENT</div>
                        <div className="text-xl" style={{ fontWeight: '500' }}>
                          {department || '---'}
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

                {/* Description */}
                {description && (
                  <div className="border-t-2 border-current pt-4">
                    <div className="text-xs opacity-70 mb-1 tracking-wide">DESCRIPTION</div>
                    <div className="text-lg leading-relaxed">
                      {description}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Print Info */}
              <div className="mt-auto pt-4 border-t border-current opacity-40 text-xs text-center">
                Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}