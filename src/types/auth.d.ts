declare namespace Express {
	export interface Request {
		auth: Auth;
	}
	interface Auth {
		user: string;
		password: string;
	}
}
