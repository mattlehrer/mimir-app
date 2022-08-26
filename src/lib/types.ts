export interface View {
	id: number;
	view_id: string;
	user_id: string;
	active: boolean;
	is_bounce_rate_a_goal: boolean;
	landing_page_category: string;
}

export interface ActiveView extends Partial<View> {
	active: boolean;
	view_id: string;
}

export interface ActiveViews {
	[id: string]: ActiveView;
}
