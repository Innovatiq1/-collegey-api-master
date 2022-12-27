const mongoose = require('mongoose');

const postType = ['image', 'text', 'video'];
const postImageUrl = [
	'https://images.pexels.com/photos/5428011/pexels-photo-5428011.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5428011.jpg&fm=jpg',
	'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/5329056/pexels-photo-5329056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];
const postVideoUrl = [
	'https://www.youtube.com/watch?v=iTs-EGTJy6o',
	'https://www.youtube.com/watch?v=ecoumWfNzdk',
	'https://www.youtube.com/watch?v=NUYvbT6vTPs&ab_channel=BilalG%C3%B6regen',
	'https://www.youtube.com/watch?v=gH919am-83M&ab_channel=BongoCat',
	'https://www.youtube.com/watch?v=5XujNgsOaSg&ab_channel=BongoCat',
];
const postText = [
	`The numbers on the list are unattributed, but reporters were able to identify more than 1,000 people spanning more than 50 countries through research and interviews on four continents: several Arab royal family members, at least 65 business executives, 85 human rights activists, 189 journalists, and more than 600 politicians and government officials — including cabinet ministers, diplomats, and military and security officers. The numbers of several heads of state and prime ministers also appeared on the list.

	Among the journalists whose numbers appear on the list, which dates to 2016, are reporters working overseas for several leading news organizations, including a small number from CNN, the Associated Press, Voice of America, the New York Times, the Wall Street Journal, Bloomberg News, Le Monde in France, the Financial Times in London and Al Jazeera in Qatar.`,
	`On World Population Day on July 11, India proposed a series of fresh population control measures reminiscent of China's two-child policy.

	The slate of proposed measures was announced in two states — Uttar Pradesh, the most populous state in India that is home to more than 240 million people, and Assam, in northeastern India.
	
	While the country has not yet adopted China's now-overturned policy of fining couples for having more than two children, these statewide proposals are an attempt to control its fast-increasing population numbers. India is currently expected to overtake China as the world's most populous country by 2027, per a 2019 UN report. UNICEF estimates that around 25 million children are born every year in India, accounting for a fifth of the world's annual births.
	
	And much of this booming population growth is happening in Uttar Pradesh, which —  if it were considered a country — would be the world's fifth-largest nation, just behind the US and Indonesia. 
	
	Uttar Pradesh's proposed new approach to managing its population will span the next decade. Titled the "New Population Policy," the proposed measures would reward those who stick to having two kids, and punish those who have more than two.
	
	Most drastically, Uttar Pradesh's draft bill on population management states that couples with two children who opt for voluntary sterilization would get incentives. If one member of the couple goes under the knife for voluntary sterilization, the family could get a range of benefits including tax rebates, subsidies for home purchases, and receiving cash back on their power and utility bills.
	
	At the same time, the proposed Uttar Pradesh policy regulations would bar those who have more than two children from receiving any government subsidies, applying for jobs in the local government, and running for political office in local elections, per the Times of India.
	
	"Increasing population is the root of major problems including inequality prevailing in the society. Population control is the primary condition for the establishment of an advanced society," wrote Uttar Pradesh chief minister Yogi Adityanath on Twitter on July 11.`,
	`Let us on World Population Day take a pledge to make ourselves and the society aware of the problems arising from the increasing population," he added. 

	The draft bill on population control in Uttar Pradesh is currently open for public consultation until July 19. From there, the bill will be moved to the Uttar Pradesh legislative assembly to be read and debated before it can be written into law. 
	
	In Assam, where 36 million people live, the state's chief minister Himanta Biswa Sarma announced on Sunday that a "population stabilization" roadmap will be developed by the state government. Sarma earlier hinted on June 18 that he would introduce plans to make having two children the norm, by withholding subsidies and other benefits to those who choose to have more than two kids. Assam in 2016 recorded a fertility rate of 2.3 children per family, per statistics from the Indian government.
	
	"Population explosion in some parts of Assam has posed a real threat to the development of the state," Sarma said on Sunday to the Hindustan Times.
	
	India's population control plans come just as China relaxes its two-child limit.
	
	On May 31, China announced a landmark policy shift to allow couples to have three children in an attempt at raising its flagging birth rate. The change comes five years after the country's 2016 decision to scrap its one-child policy and raise the quota to two-kids-per-family.`,
];

const randomText = 'Li Europan lingues es membres del sam familie. Lor separat existentie.';

const CollegeyFeedSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		// To be updated when groups are added
		group: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group',
			default:null

		},
		// To be updated when groups are added
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projects',
		},

		postType: {
			type: String,
			// default: function() {
			// 	return postType[Math.floor(Math.random() * postType.length)];
			// },
		},
		isDeleted: {
			type: Boolean,
			default: false
		},
		postImageUrl: {
			type: String,
			// default: function() {
			// 	if (this.postType === 'image') {
			// 		return postImageUrl[Math.floor(Math.random() * postImageUrl.length)];
			// 	}
			// 	return '';
			// },
		},
		postText: {
			type: String,
			// default: function() {
			// 	if (this.postType === 'text') {
			// 		return postText[Math.floor(Math.random() * postText.length)];
			// 	}
			// 	return '';
			// },
		},
		postVideo: {
			type: String,
			// default: function() {
			// 	if (this.postType === 'video') {
			// 		return postVideoUrl[Math.floor(Math.random() * postVideoUrl.length)];
			// 	}
			// 	return '';
			// },
		},
		postData: {
			type: String,
			// default: function() {
			// 	if (this.postType !== 'text') {
			// 		return randomText;
			// 	}
			// 	return '';
			// },
		},
		posturl: {type: String},
		postComment: {type: String},
		likes: {
			// type: Number,
			// required: true,
			// default: function() {
			// 	return Math.floor(Math.random() * 50) + 25;
			// },
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'likeDislikeCollegeyFeed',
				},
			],
		},
		share: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'shareCollgeyFeed',
				},
			],
			// default: function() {
			// 	return Math.floor(Math.random() * 10) + 1;
			// },
		},
		comment: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Comments',
				},
			],
			// default: function() {
			// 	const loop = Math.floor(Math.random() * 10) + 1;
			// 	const commentArray = [];
			// 	// eslint-disable-next-line no-plusplus
			// 	for (let index = 0; index < loop; index++) {
			// 		if (index % 2) {
			// 			commentArray.push({
			// 				user: '5f4e813a6003021481c7ebc6',
			// 				commentData: `This is a beautiful comment for everything in life`,
			// 			});
			// 		} else {
			// 			commentArray.push({
			// 				user: '5f4e82366003021481c7ebc8',
			// 				commentData: `This is not a beautiful comment for you in life`,
			// 			});
			// 		}
			// 	}
			// 	return commentArray;
			// },
		},

		createdAt: {
			type: Date,
			default: Date.now,
		},
		updateAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

CollegeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		// select: 'name avatar',
	});
	next();
});
CollegeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'comment',
	});
	next();
});
CollegeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'likes',
	});
	next();
});
CollegeyFeedSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'group',
	});
	next();
});

const CollegeyFeed = mongoose.model('CollegeyFeed', CollegeyFeedSchema);

module.exports = CollegeyFeed;
