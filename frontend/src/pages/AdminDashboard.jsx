import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Filter,
  Loader2,
  RefreshCcw,
  Search,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import API from "../api/axios.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import LeadStatusBadge from "../components/admin/LeadStatusBadge.jsx";
import AdminStatCard from "../components/admin/AdminStatCard.jsx";

const leadStatuses = [
  {
    label: "All Leads",
    value: "",
  },
  {
    label: "New",
    value: "new",
  },
  {
    label: "Contacted",
    value: "contacted",
  },
  {
    label: "Trial Booked",
    value: "trial_booked",
  },
  {
    label: "Converted",
    value: "converted",
  },
  {
    label: "Lost",
    value: "lost",
  },
];

const updateStatusOptions = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Contacted",
    value: "contacted",
  },
  {
    label: "Trial Booked",
    value: "trial_booked",
  },
  {
    label: "Converted",
    value: "converted",
  },
  {
    label: "Lost",
    value: "lost",
  },
];

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingLeadId, setUpdatingLeadId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("gym_token");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const query = selectedStatus ? `?status=${selectedStatus}` : "";
      const response = await API.get(`/leads${query}`);

      setLeads(response.data.leads || []);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Could not fetch leads. Please login as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setLoading(false);
      setErrorMessage("Admin token not found. Please login as admin first.");
    }
  }, [selectedStatus]);

  const filteredLeads = useMemo(() => {
    if (!searchText.trim()) {
      return leads;
    }

    const search = searchText.toLowerCase();

    return leads.filter((lead) => {
      return (
        lead.name?.toLowerCase().includes(search) ||
        lead.phone?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.fitnessGoal?.toLowerCase().includes(search)
      );
    });
  }, [leads, searchText]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      trialBooked: leads.filter((lead) => lead.status === "trial_booked")
        .length,
      converted: leads.filter((lead) => lead.status === "converted").length,
      lost: leads.filter((lead) => lead.status === "lost").length,
    };
  }, [leads]);

  const updateLeadStatus = async (leadId, status) => {
    try {
      setUpdatingLeadId(leadId);
      setErrorMessage("");

      await API.patch(`/leads/${leadId}/status`, {
        status,
      });

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === leadId
            ? {
                ...lead,
                status,
              }
            : lead
        )
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Could not update lead status."
      );
    } finally {
      setUpdatingLeadId("");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    return new Date(dateValue).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    return new Date(dateValue).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <Card className="max-w-lg border-zinc-800 bg-zinc-950 p-8 text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-300" />

          <h1 className="mt-5 text-3xl font-black">Admin Access Required</h1>

          <p className="mt-3 text-zinc-400">
            Admin token was not found. Login as admin first, then open this
            dashboard.
          </p>

          <a
            href="/login"
            className="mt-6 inline-block rounded-2xl bg-lime-400 px-6 py-3 font-bold text-black hover:bg-lime-300"
          >
            Go to Login
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900 bg-zinc-950/80 px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-lime-300">
              Gym Admin
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              Lead & Trial Dashboard
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage enquiries, free trial bookings, follow-ups and conversion.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/"
              className="rounded-2xl border border-zinc-800 px-5 py-3 font-bold text-zinc-300 hover:bg-zinc-900"
            >
              Website
            </a>

            <Button
              onClick={fetchLeads}
              className="flex items-center gap-2 bg-lime-400 text-black hover:bg-lime-300"
            >
              <RefreshCcw className="h-5 w-5" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            <XCircle className="mt-0.5 h-5 w-5" />
            <p className="text-sm font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-4">
          <AdminStatCard title="Total Leads" value={stats.total} icon={Users} />
          <AdminStatCard
            title="Trial Booked"
            value={stats.trialBooked}
            icon={CalendarCheck}
          />
          <AdminStatCard
            title="Converted"
            value={stats.converted}
            icon={CheckCircle2}
          />
          <AdminStatCard title="Lost" value={stats.lost} icon={XCircle} />
        </div>

        <Card className="mt-8 border-zinc-800 bg-zinc-950 p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name, phone, email, or goal..."
                className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-12 pr-4 outline-none transition focus:border-lime-400"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-2xl border border-zinc-800 bg-black py-3 pl-12 pr-4 outline-none transition focus:border-lime-400"
              >
                {leadStatuses.map((status) => (
                  <option key={status.label} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card className="mt-8 overflow-hidden border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 p-5">
            <h2 className="text-2xl font-black">Lead List</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Showing {filteredLeads.length} lead(s)
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-lime-300" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center">
              <UserCheck className="mx-auto h-12 w-12 text-zinc-700" />
              <h3 className="mt-4 text-2xl font-black">No leads found</h3>
              <p className="mt-2 text-zinc-500">
                When users book free trials, they will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead className="bg-black text-sm text-zinc-400">
                  <tr>
                    <th className="px-5 py-4">Lead</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Goal</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Trial Date</th>
                    <th className="px-5 py-4">Follow-up</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4">Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-t border-zinc-800 text-sm"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-white">{lead.name}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {lead.email || "No email"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {lead.phone}
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {lead.fitnessGoal || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <LeadStatusBadge status={lead.status} />
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {formatDate(lead.trialDate)}
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {formatDate(lead.followUpDate)}
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {formatDateTime(lead.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          disabled={updatingLeadId === lead._id}
                          onChange={(e) =>
                            updateLeadStatus(lead._id, e.target.value)
                          }
                          className="rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm outline-none focus:border-lime-400 disabled:opacity-60"
                        >
                          {updateStatusOptions.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>

                        {updatingLeadId === lead._id && (
                          <Loader2 className="ml-3 inline h-4 w-4 animate-spin text-lime-300" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}