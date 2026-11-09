import type { Reroute } from '@sveltejs/kit';
import { eventReroute } from '$lib/events/hosts';

// nc.stovnerfrisbee.no/ viser Norges Cup-siden
export const reroute: Reroute = ({ url }) => eventReroute(url);
