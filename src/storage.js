const LOCAL_STORAGE_KEY = "beanow:dimmed-clock:config";

export const set = (state) => {
	try {
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
	} catch {
		// ignore
	}
};

export const get = () => {
	try {
		const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		return json ? JSON.parse(json) : {};
	} catch {
		return {};
	}
};
