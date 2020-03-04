const LOCAL_STORAGE_KEY = "beanow:dimmed-clock:config";

export const set = (state) => {
	if (typeof window === "undefined") return;
	if (!window.localStorage) return;
	window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const get = () => {
	if (typeof window === "undefined") return {};
	if (!window.localStorage) return {};
	const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!json) return {};
	return JSON.parse(json);
};
