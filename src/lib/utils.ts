import type { Action } from 'svelte/action';

export const clickOutside: Action = (node, { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void }) => {
	const handleOutsideClick = ({ target }: MouseEvent) => {
		if (!node.contains(target as Node)) {
			cb();
		}
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		},
	};
};

export function trimUrl(url: string) {
	return url.replace(/\/$/, '').replace(/http(s)?(:)?(\/\/)?(www\.)?|^www\./, '');
}
