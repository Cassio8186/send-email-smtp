export type successResponse = {
	success: string;
	accepted: Array<string>;
	rejected: Array<string>;
};

export type errorResponse = {
	Error: Error;
	Message: string;
	displayunlockcaptcha: string;
	lesssecureapp: string;
};
