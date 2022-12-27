const appValidators =require('./appValidatiors');
//Admin Common Validations

export const validateProgram=[
  ...appValidators.commonProgramValidations,
  appValidators.validate
]

export const validateCourse=[
  ...appValidators.commonCourseValidations,
  appValidators.validate
]

export const validateBlog=[
  ...appValidators.commonBlogValidations,
  appValidators.validate
]

export const validateWebinar=[
  ...appValidators.commonWebinarValidations,
  appValidators.validate
]

export const validateProject=[
  ...appValidators.commonProjectValidations,
  appValidators.validate
]
