import type { analytics_v3 } from 'googleapis';

export interface View {
	id: number;
	view_id: string;
	user_id: string;
	active: boolean;
	is_bounce_rate_a_goal: boolean;
	landing_page_category: string;
	google_tokens_id: number;
}

export interface ActiveView extends Partial<View> {
	active: boolean;
	view_id: string;
}

export interface ActiveViews {
	[id: string]: ActiveView;
}

export interface AnalyticsViews {
	[id: string]: analytics_v3.Schema$Profile & {
		account: {
			id: analytics_v3.Schema$Account['id'];
			name: analytics_v3.Schema$Account['name'];
			email: string;
			google_tokens_id: number;
		};
	};
}

export interface DashboardQueryResponse {
	activeViews: ActiveViews;
	analyticsViews: AnalyticsViews;
	deauthorizedGoogleAccounts: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReportQueryResponse extends JSON {
	// fill this in when we know what the response looks like
}
