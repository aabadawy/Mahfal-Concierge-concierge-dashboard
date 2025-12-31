import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, Copy, RefreshCw, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { signRequest } from '../utils/api';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'mahfal_draft_lead';

const initialData = {
  occasionType: '',
  locationArea: '',
  date: '',
  isFlexibleDate: false,
  guests: 50,
  budgetRange: '',
  venuePreference: '',
  suppliers: [] as string[],
  vibe: [] as string[],
  notes: '',
  fullName: '',
  phone: '',
  isWhatsapp: false,
  email: '',
  consent: false
};

const OCCASIONS = ['Birthday', 'Engagement', 'Graduation', 'Corporate', 'Dinner', 'Photoshoot', 'Other'];
const BUDGETS = ['Under 5k', '5k - 10k', '10k - 25k', '25k+'];
const SUPPLIERS = ['Catering', 'Photography', 'Decoration', 'DJ/Ents', 'Lighting', 'Cake', 'None'];
const VIBES = ['Elegant', 'Modern', 'Traditional', 'Minimal', 'Luxury', 'Fun'];

export const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData({ ...initialData, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Save draft
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const update = (field: keyof typeof initialData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArray = (field: 'suppliers' | 'vibe', value: string) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(value)) return { ...prev, [field]: arr.filter(i => i !== value) };
      if (field === 'vibe' && arr.length >= 3) return prev; // Limit vibes
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const canProceed = () => {
    if (step === 1) return formData.occasionType && formData.locationArea && (formData.date || formData.isFlexibleDate);
    if (step === 2) return formData.budgetRange && formData.venuePreference;
    if (step === 3) return true; // Optional step
    if (step === 4) return formData.fullName && formData.phone && formData.consent;
    return false;
  };

  const handleNext = () => {
    if (canProceed()) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'landing_page'
    };

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://api.mahfal.com'; // Fallback or env
      // NOTE: In a real app, do not expose secrets in client code. 
      // This is for demonstration as requested. Valid for server-to-server or proxied requests.
      const secret = import.meta.env.VITE_API_SECRET || 'demo_secret';

      const headers = await signRequest(payload, secret);

      const response = await fetch(`${baseUrl}/leads`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // Success
      setIsSuccess(true);
      localStorage.removeItem(STORAGE_KEY);

    } catch (e) {
      console.error("Submission error", e);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setStep(1);
    setIsSuccess(false);
  };

  const copyDetails = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    alert("Details copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-brand-offWhite rounded-none shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex-none p-6 border-b border-brand-black/5 bg-white rounded-none">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-brand-black font-semibold text-xl">Mahfal Concierge</h2>
              {!isSuccess && (
                <div className="mt-2 space-y-1">
                  <p className="text-brand-black/80 text-sm leading-snug">
                    We'll match you with a space & suppliers <span className="font-semibold text-brand-red">within 24 hours</span>.
                  </p>
                  <p className="text-brand-black/40 text-xs uppercase tracking-wide pt-1">Step {step} of 4 • ~2 mins</p>
                </div>
              )}
            </div>
            <button onClick={onClose} className="p-2 -mr-2 -mt-2 hover:bg-black/5 rounded-full text-brand-black/50 hover:text-brand-black transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-brand-black">Request received</h3>
              <p className="text-brand-black/60 max-w-xs">
                We'll contact you shortly with a curated shortlist for your <strong>{formData.occasionType}</strong>.
              </p>

              <div className="w-full bg-white border border-black/5 rounded-none p-6 text-left mt-8 shadow-sm">
                <h4 className="text-xs uppercase tracking-widest text-brand-black/40 mb-4 font-bold">Request Summary</h4>
                <div className="space-y-3 text-sm text-brand-black/80">
                  <div className="flex justify-between"><span className="text-black/40">Occasion</span> <span>{formData.occasionType}</span></div>
                  <div className="flex justify-between"><span className="text-black/40">Date</span> <span>{formData.isFlexibleDate ? 'Flexible' : formData.date}</span></div>
                  <div className="flex justify-between"><span className="text-black/40">Guests</span> <span>{formData.guests}</span></div>
                  <div className="flex justify-between"><span className="text-black/40">Budget</span> <span>{formData.budgetRange}</span></div>
                </div>

                <div className="mt-6 pt-6 border-t border-black/5">
                  <pre className="text-[10px] text-black/50 overflow-x-auto bg-gray-50 p-2 rounded-none">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button onClick={copyDetails} className="flex-1 py-3 px-4 border border-black/10 rounded-none text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 text-brand-black">
                  <Copy size={16} /> Copy JSON
                </button>
                <button onClick={resetForm} className="flex-1 py-3 px-4 bg-brand-black text-white rounded-none text-sm font-medium hover:bg-black/90 flex items-center justify-center gap-2">
                  <RefreshCw size={16} /> New Request
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

              {/* STEP 1: Occasion */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">What's the occasion?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {OCCASIONS.map(occ => (
                        <button
                          key={occ}
                          onClick={() => update('occasionType', occ)}
                          className={`py-3 px-4 text-sm border rounded-none transition-all ${formData.occasionType === occ
                            ? 'border-brand-red bg-brand-red/5 text-brand-red font-medium'
                            : 'border-black/10 bg-white text-black/60 hover:border-black/30'
                            }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">Where?</label>
                    <select
                      value={formData.locationArea}
                      onChange={(e) => update('locationArea', e.target.value)}
                      className="w-full p-3 bg-white border border-black/10 rounded-none focus:border-brand-black outline-none text-brand-black"
                    >
                      <option value="">Select Area</option>
                      <option value="Downtown">Downtown / City Center</option>
                      <option value="North">North Side</option>
                      <option value="Coastal">Coastal / Beach</option>
                      <option value="Historic">Historic District</option>
                      <option value="Suburbs">Suburbs</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">When?</label>
                    <div className="flex gap-3">
                      <input
                        type="date"
                        disabled={formData.isFlexibleDate}
                        value={formData.date}
                        onChange={(e) => update('date', e.target.value)}
                        className={`flex-1 p-3 bg-white border border-black/10 rounded-none focus:border-brand-black outline-none text-brand-black ${formData.isFlexibleDate ? 'opacity-50' : ''}`}
                      />
                      <button
                        onClick={() => update('isFlexibleDate', !formData.isFlexibleDate)}
                        className={`px-4 text-xs border rounded-none whitespace-nowrap ${formData.isFlexibleDate ? 'bg-brand-black text-white border-brand-black' : 'bg-white border-black/10 text-black/60'}`}
                      >
                        I'm Flexible
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Guests & Budget */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-brand-black">Guests</label>
                      <span className="text-brand-red font-semibold">{formData.guests}</span>
                    </div>
                    <input
                      type="range"
                      min="10" max="500" step="10"
                      value={formData.guests}
                      onChange={(e) => update('guests', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                    />
                    <div className="flex justify-between text-xs text-black/30">
                      <span>10</span>
                      <span>500+</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">Estimated Budget</label>
                    <div className="grid grid-cols-2 gap-3">
                      {BUDGETS.map(b => (
                        <button
                          key={b}
                          onClick={() => update('budgetRange', b)}
                          className={`py-3 px-4 text-sm border rounded-none transition-all ${formData.budgetRange === b
                            ? 'border-brand-black bg-brand-black text-white'
                            : 'border-black/10 bg-white text-black/60 hover:border-black/30'
                            }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">Preference</label>
                    <div className="flex gap-3">
                      {['Indoor', 'Outdoor', 'Either'].map(p => (
                        <button
                          key={p}
                          onClick={() => update('venuePreference', p)}
                          className={`flex-1 py-3 text-sm border rounded-none transition-all ${formData.venuePreference === p
                            ? 'border-brand-black bg-white text-brand-black font-semibold'
                            : 'border-black/10 bg-white text-black/60'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Suppliers & Vibe */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">Add Suppliers (Optional)</label>
                    <div className="flex flex-wrap gap-2">
                      {SUPPLIERS.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleArray('suppliers', s)}
                          className={`py-2 px-3 text-xs border rounded-none transition-all ${formData.suppliers.includes(s)
                            ? 'border-brand-red bg-brand-red text-white'
                            : 'border-black/10 bg-white text-black/60 hover:border-black/30'
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-brand-black">Vibe (Select up to 3)</label>
                    <div className="flex flex-wrap gap-2">
                      {VIBES.map(v => (
                        <button
                          key={v}
                          onClick={() => toggleArray('vibe', v)}
                          className={`py-2 px-3 text-xs border rounded-none transition-all ${formData.vibe.includes(v)
                            ? 'border-brand-black bg-brand-black text-white'
                            : 'border-black/10 bg-white text-black/60 hover:border-black/30'
                            }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-black">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      placeholder="Specific theme, dietary needs, accessibility..."
                      className="w-full p-3 bg-white border border-black/10 rounded-none focus:border-brand-black outline-none text-brand-black text-sm min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Contact */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-brand-black mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        className="w-full p-3 bg-white border-b border-black/20 focus:border-brand-black outline-none text-brand-black placeholder:text-black/20"
                        placeholder="e.g. Sarah Jones"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-brand-black mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full p-3 bg-white border-b border-black/20 focus:border-brand-black outline-none text-brand-black placeholder:text-black/20"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="wa"
                        checked={formData.isWhatsapp}
                        onChange={(e) => update('isWhatsapp', e.target.checked)}
                        className="accent-brand-red w-4 h-4"
                      />
                      <label htmlFor="wa" className="text-xs text-brand-black/70">Contact me on WhatsApp</label>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-brand-black mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full p-3 bg-white border-b border-black/20 focus:border-brand-black outline-none text-brand-black placeholder:text-black/20"
                        placeholder="sarah@example.com"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="accent-brand-red mt-1 w-4 h-4"
                      />
                      <span className="text-xs text-brand-black/60 leading-tight">
                        I agree to be contacted about this request. We respect your privacy and never share data.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isSuccess && (
          <div className="flex-none p-6 border-t border-black/5 bg-white flex justify-between items-center rounded-none">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="text-sm text-brand-black/50 hover:text-brand-black">Back</button>
            ) : (
              <div></div>
            )}

            <button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={!canProceed() || isSubmitting}
              className={`px-8 py-3 rounded-none font-medium transition-all flex items-center gap-2 ${canProceed() && !isSubmitting
                ? 'bg-brand-red text-white hover:bg-red-600 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : step === 4 ? (
                <>Request Shortlist <Check size={16} /></>
              ) : (
                <>Next <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};