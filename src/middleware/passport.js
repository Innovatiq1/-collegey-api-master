/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const mongoose = require('mongoose');

const BCRYPT_SALT_ROUNDS = 10;
const params = require('../config/params.js');
import User from '../models/User';
import { userGetServices } from '../services/userServices';
import { getFields } from '../utilities/helpers';
import { socialLoginTypes } from '../utilities/constant_variables';

const passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	JWTstrategy = require('passport-jwt').Strategy,
	ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
	'register',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
			session: false,
		},
		async (req, email, password, done) => {
			// ******** Tranction Code check, will use this if required.****
			// const session = await mongoose.startSession();
			// session.startTransaction();
			// const sessionOpts = { session };
			try {
				const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
				req.body.password = hashedPassword;
				const user = await User.create(req.body);
				const token = jwt.sign({ id: user._id, role: user.role }, params.secret, {
					expiresIn: '90d',
				});
				const userModel = await userGetServices.getOne(
					user._id,
					getFields(user.type, user.user_type).basic
				);
				// await session.commitTransaction();
				return done(null, { user: userModel, token: token });
			} catch (err) {
				// await session.abortTransaction();
				done(err);
			}
			// session.endSession();
		}
	)
);

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
			session: false,
		},
		async (req, email, password, done) => {
			try {
				const filters = { email: email };
				const user = await User.findOne(filters);

				if(user.attemptBlock == true)
				{
					return done(null, false, { message: 'Please reset password' });	
				}

				if(req.body.logintype != user.type && user.type != 'admin')
				{
					return done(null, false, { message: 'Please login with valid role' });		
				}
				if (typeof user.Password_Activation !== 'undefined' && user.Password_Activation == '0') {
				   return done(null, false, { message: 'Please check mail and click to reset password and change your password.',userid: 'test'});
				}
				if (typeof user.Password_Activation !== 'undefined' && user.Password_Activation == '2') {
					return done(null, false, { message: 'You are disabled please contact to collegey support' });
				 }
				if (user === null) {
					return done(null, false, { message: 'Please enter a valid email id' });
				}
				const userModel = await userGetServices.getOne(
					user._id,
					getFields(user.type, user.user_type).basic
				);
				let student_profile = null;
				if (userModel.type == 'student') {
					student_profile = await userGetServices.getProfileCompletionById(userModel._id);
				}
				bcrypt.compare(password, user.password).then(async response => {
					if (response !== true) {
						let attemptBlock = false;
						
						if(userModel.attemptCalculation + 1 >= 5)
						{
							attemptBlock = true;
						}

						let updateAttempt = await User.findOneAndUpdate(
							{_id: userModel._id},
							{attemptCalculation:userModel.attemptCalculation + 1,attemptBlock:attemptBlock},
							{new:true}
						);
						let leftAttempt = 5;
						if(updateAttempt.attemptCalculation > 0)
						{
							leftAttempt = leftAttempt - updateAttempt.attemptCalculation;
						}

						return done(null, false, {
							message: 'Incorrect Credential (Attempt-'+leftAttempt+'), the password will be locked after 5 unsuccessful attempts.',
						});
					}
					const user_data = userModel.toObject();
					if (student_profile && student_profile.profile_completion) {
						user_data.profile_completed =
							student_profile.profile_completion.profile_completed;
					} else {
						user_data.profile_completed = false;
					}
					const token = jwt.sign({ id: user._id, role: user.role }, params.secret, {
						expiresIn: '90d',
					});
					return done(null, { user: user_data, token: token });
				});
			} catch (err) {
				done(err);
			}
		}
	)
);

passport.use(
	'socialLogin',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'social_id',
			passReqToCallback: true,
			session: false,
		},
		async (req, email, password, done) => {
			try {
				let socialStatus = true;
				const user = await User.findOne({ email: email }).select('email fb_id google_id');
				if (user === null) {
					return done(null, false, { message: 'user not found!' });
				} else {
					switch (req.body.social_type) {
						case socialLoginTypes.FACEBOOK: {
							if (user.fb_id != undefined && req.body.social_id != user.fb_id) {
								socialStatus = false;
							} else {
								user.fb_id = req.body.social_id;
								user.save();
							}
							break;
						}
						case socialLoginTypes.GOOGLE: {
							if (
								user.google_id != undefined &&
								req.body.social_id != user.google_id
							) {
								socialStatus = false;
							} else {
								user.google_id = req.body.social_id;
								user.save();
							}
							break;
						}
					}
					if (socialStatus == true) {
						const userModel = await userGetServices.getOne(
							user._id,
							getFields(user.type, user.user_type).basic
						);
						let student_profile = null;
						if (userModel.type == 'student') {
							student_profile = await userGetServices.getProfileCompletionById(
								userModel._id
							);
						}
						let user_data = userModel.toObject();
						if (student_profile && student_profile.profile_completion) {
							user_data.profile_completed =
								student_profile.profile_completion.profile_completed;
						} else {
							user_data.profile_completed = false;
						}
						const token = jwt.sign({ id: user._id, role: user.role }, params.secret, {
							expiresIn: '90d',
						});
						return done(null, { user: user_data, token: token });
					} else {
						return done(null, false, { message: 'user not found!' });
					}
				}
			} catch (err) {
				done(err);
			}
		}
	)
);

const opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
	secretOrKey: params.secret,
};

passport.use(
	'jwt',
	new JWTstrategy(opts, (jwt_payload, done) => {
		try {
			User.findOne({
				_id: jwt_payload.id,
			}).then(user => {
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			});
		} catch (err) {
			done(err);
		}
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});
