import { supabase } from "@/integrations/supabase/client";

export const MIN_BUDGET_LAKHS = 5;
export const MAX_BUDGET_LAKHS = 30;

export const clampBudgetRange = (budget: number) =>
    Math.min(MAX_BUDGET_LAKHS, Math.max(MIN_BUDGET_LAKHS, Math.trunc(budget)));

export interface LeadPayload {
    name: string;
    phone: string;
    email?: string | null;
    company_name?: string | null;
    building_type?: string | null;
    number_of_floors?: string | null;
    elevator_type?: string | null;
    message?: string | null;
    lead_source?: string;
    budget_range?: number | null;
    address?: string | null;
}

/**
 * Submit a lead to the Supabase leads table.
 * Returns { success, error }.
 * Uses 'as any' cast because the generated types predate the schema migration.
 */
export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
    try {
        const budgetRange = payload.budget_range == null ? null : Math.trunc(payload.budget_range);
        if (budgetRange !== null && (budgetRange < MIN_BUDGET_LAKHS || budgetRange > MAX_BUDGET_LAKHS)) {
            return {
                success: false,
                error:
                    budgetRange > MAX_BUDGET_LAKHS
                        ? "Budget cannot exceed ₹30 Lakhs"
                        : "Budget must be at least ₹5 Lakhs",
            };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase.from("leads") as any).insert({
            name: payload.name.trim(),
            phone: payload.phone.trim(),
            email: payload.email?.trim() || null,
            company_name: payload.company_name?.trim() || null,
            building_type: payload.building_type || null,
            number_of_floors: payload.number_of_floors || null,
            elevator_type: payload.elevator_type || null,
            message: payload.message?.trim() || null,
            lead_source: payload.lead_source ?? "website_form",
            status: "new",
            budget_range: budgetRange,
            address: payload.address?.trim() || null,
        });

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch {
        return { success: false, error: "Unexpected error. Please try again." };
    }
}

export const SUCCESS_MESSAGE = "Thank you. Our elevator engineer will contact you shortly.";
