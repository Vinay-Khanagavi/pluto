// src/lib/types/gateway.ts
export type Service = {
	name: string;
	type: 'Global' | 'Local';
	hits: string;
	latency: string;
	status: 'Healthy' | 'Unhealthy' | 'Down';
};

export type Domain = {
	host: string;
	hits: string;
	expiresOn: string;
	certificate: string;
};

export type StatusIconType = {
	[key in 'Healthy' | 'Unhealthy' | 'Down']: string;
};
