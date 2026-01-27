import { useState, useEffect } from 'react';
import { Download, Users, FileText, Phone } from 'lucide-react';

type IntentType = 'contact' | 'quote' | 'callback';

interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  service?: string;
  timeline?: string;
  budget_range?: string;
  details?: string;
  source: string;
  intent: string;
  created_at: string;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<IntentType>('contact');
  const [data, setData] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [activeTab, page]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-data?intent=${activeTab}&page=${page}&limit=50`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result.data || []);
      setTotalCount(result.count || 0);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row =>
      Object.values(row).map(val =>
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const totalPages = Math.ceil(totalCount / 50);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage inquiries and submissions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex flex-wrap items-center justify-between p-6">
              <div className="flex gap-4 mb-4 sm:mb-0">
                <button
                  onClick={() => { setActiveTab('contact'); setPage(1); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'contact'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Contact
                </button>
                <button
                  onClick={() => { setActiveTab('quote'); setPage(1); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'quote'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Quotes
                </button>
                <button
                  onClick={() => { setActiveTab('callback'); setPage(1); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'callback'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Callbacks
                </button>
              </div>
              <button
                onClick={exportToCSV}
                disabled={data.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600">Loading data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchData}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Retry
                </button>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No {activeTab} inquiries found.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Phone</th>
                        {activeTab === 'quote' && (
                          <>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Location</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Timeline</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Budget</th>
                          </>
                        )}
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Source</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Details</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">{row.full_name}</td>
                          <td className="py-3 px-4">{row.email || '-'}</td>
                          <td className="py-3 px-4">{row.phone || '-'}</td>
                          {activeTab === 'quote' && (
                            <>
                              <td className="py-3 px-4">{row.location || '-'}</td>
                              <td className="py-3 px-4">{row.timeline || '-'}</td>
                              <td className="py-3 px-4">{row.budget_range || '-'}</td>
                            </>
                          )}
                          <td className="py-3 px-4">{row.service || '-'}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {row.source}
                            </span>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate" title={row.details || ''}>
                            {row.details || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">
                            {formatDate(row.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-slate-600">
                      Showing {((page - 1) * 50) + 1} to {Math.min(page * 50, totalCount)} of {totalCount} entries
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-slate-700">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
