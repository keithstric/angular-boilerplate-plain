// tslint:disable-next-line:no-namespace
export namespace Times {
	export type date = iso_date;
	export type iso_date = string; // yyyy-MM-dd'T'HH:mm:ss.SSSZZ
	export type basic_date = string; // yyyyMMdd
	export type basic_time_no_millis = string; // HHmmssZ
	export type timestamp = number;

	export interface TimeOfDay {
		hours: number;
		minutes: number;
		seconds: number;
		nanos: number;
	}

	export interface GrpcTimestamp {
		seconds: number;
		nanos: number;
	}

	export interface GoogleDate {
		year: number;
		month: number;
		day: number;
	}
}
