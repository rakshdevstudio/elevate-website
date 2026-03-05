import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Search, FileText, Download, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';

interface JobApplication {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    position: string;
    experience_years: string;
    resume_url: string;
    status: ApplicationStatus;
    created_at: string;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
    new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    reviewed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    shortlisted: "bg-gold-light/10 text-gold-light border-gold-light/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
    hired: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

const AdminCareers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["job-applications"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("job_applications")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                toast({ title: "Failed to fetch applications", variant: "destructive" });
                throw error;
            }
            return data as JobApplication[];
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: ApplicationStatus }) => {
            const { error } = await supabase
                .from("job_applications")
                .update({ status })
                .eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["job-applications"] });
            toast({ title: "Status updated successfully" });
        },
        onError: () => {
            toast({ title: "Failed to update status", variant: "destructive" });
        },
    });

    const handleStatusChange = (id: string, newStatus: string) => {
        updateStatusMutation.mutate({ id, status: newStatus as ApplicationStatus });
    };

    const handleViewResume = async (filePath: string) => {
        try {
            const { data, error } = await supabase.storage
                .from("resumes")
                .createSignedUrl(filePath, 60);

            if (error) throw error;
            if (data?.signedUrl) {
                window.open(data.signedUrl, "_blank");
            }
        } catch (error) {
            toast({ title: "Failed to open resume", variant: "destructive" });
        }
    };

    const handleDownloadResume = async (filePath: string, applicantName: string) => {
        try {
            const { data, error } = await supabase.storage
                .from("resumes")
                .download(filePath);

            if (error) throw error;

            // Extract original extension
            const fileExt = filePath.split('.').pop() || 'pdf';
            const cleanName = applicantName.replace(/\s+/g, '_');

            // Create blob link and download
            const url = URL.createObjectURL(data);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Resume_${cleanName}.${fileExt}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            toast({ title: "Failed to download resume", variant: "destructive" });
        }
    };

    const filteredApplications = applications.filter(
        (app) =>
            app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-foreground">Job Applications</h2>
                    <p className="text-muted-foreground text-sm">Manage careers form submissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search applicants..."
                            className="pl-9 w-[250px] bg-secondary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => queryClient.invalidateQueries({ queryKey: ["job-applications"] })}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground">Loading applications...</p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">No Applications Found</h3>
                        <p className="text-muted-foreground text-sm">No one has applied matching that search criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-secondary/30 border-b border-border/50 text-muted-foreground uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Applicant Info</th>
                                    <th className="px-6 py-4 font-semibold">Position</th>
                                    <th className="px-6 py-4 font-semibold">Experience</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Date Applied</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-secondary/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-foreground">{app.full_name}</div>
                                            <div className="text-muted-foreground text-xs mt-0.5">{app.email}</div>
                                            <div className="text-muted-foreground text-xs">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-foreground">{app.position}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-foreground">{app.experience_years}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Select
                                                value={app.status}
                                                onValueChange={(val) => handleStatusChange(app.id, val)}
                                            >
                                                <SelectTrigger className={`h-8 w-[130px] border rounded-full text-xs font-medium capitalize ${STATUS_COLORS[app.status]}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="reviewed">Reviewed</SelectItem>
                                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                    <SelectItem value="hired">Hired</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {format(new Date(app.created_at), "MMM d, yyyy")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 gap-1.5"
                                                    onClick={() => handleViewResume(app.resume_url)}
                                                >
                                                    <FileText className="w-3.5 h-3.5" /> View
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                    title="Download Resume"
                                                    onClick={() => handleDownloadResume(app.resume_url, app.full_name)}
                                                >
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCareers;
