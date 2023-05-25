/* eslint-disable node/no-unsupported-features/es-syntax */
export const studentTypes = Object.freeze({
	STDENT_IN_SCHL: 1,
	STDENT_IN_CLG: 2,
	GRAD_IN_SCHL: 3,
	GRAD_IN_CLG: 4,
	OTHERS: 5,
});

export const partnerTypes = Object.freeze({
	IMPACT_PARTNER: 11,
	SCHL_PARTNER: 12,
	UNIVERSITY_PARTNER: 13,
});

export const adminTypes = Object.freeze({
	SUPER_ADMIN: 21,
	PARTIAL_ADMIN: 22,
});

export const genderTypes = Object.freeze({
	MALE: 1,
	FEMALE: 2,
	OTHERS: 3,
});

export const statusTypes = Object.freeze({
	ACTIVE: 1,
	INACTIVE: 2,
	DELETED: 10,
});

export const registrationType = Object.freeze({
	STUDENT: 'student',
	MENTOR: 'mentor',
	PARTNER: 'partner',
	ADMIN: 'admin',
	COUNSELLOR: 'counsellor',
	COLLABORATOR: 'collaborator',
});
export const studentGrades = Object.freeze({
	CLASS_8_OR_LESS: 1,
	CLASS_9: 2,
	CLASS_10: 3,
	CLASS_11: 4,
	CLASS_12: 5,
	HS_GRADUATE_COLLEGE: 6,
});

export const socialLoginTypes = Object.freeze({
	FACEBOOK: 1,
	GOOGLE: 2,
});
