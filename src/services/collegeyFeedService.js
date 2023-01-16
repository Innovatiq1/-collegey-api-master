import Projects from '../models/Projects';
import Comments from '../models/commentUniversal';
import likeDislikeCollegyFeed from '../models/likdislikeforcollegyFeed';
import shareCollegyFeed from '../models/shareCollegyFeed';
import CollegeyFeed from '../models/CollegeyUniversalFeed';
import { getQueryParams } from '../utilities/helpers';
import { statusTypes } from '../utilities/constant_variables';
import mongoose from 'mongoose';
import User from '../models/User';


exports.collegeyFeedPostService = {

    async postFeedComment(feedId,commentData){
        
        commentData['createdAt'] = Date.now();
        let comment  = await Comments.create(commentData);
        if(comment){
            let feed = await CollegeyFeed.findByIdAndUpdate(feedId,{ "$push": { "comment": comment._id } },
            { "new": true, "upsert": true });
            if(feed){
                return feed;
            }
        }
    },
    
    async postFeedLike(feedId,like){
        let likes  = await likeDislikeCollegyFeed.create(like);
        if(likes){
            let feed = await CollegeyFeed.findByIdAndUpdate(feedId,{ "$push": { "likes": likes._id } },
            { "new": true, "upsert": true });
            if(feed){
                return feed;
            }
        }
    },
    async postFeedDisLike(feedId,data){
        let likes  = await likeDislikeCollegyFeed.findOneAndRemove({_id:feedId});
        if(likes){
            let feed = await CollegeyFeed.findByIdAndUpdate(data.collegyFeed_id,{ "$pull": { "likes": likes._id } },
            { "new": true, "upsert": true });
            if(feed){
                return feed;
            }
        }
    },
    async postFeedShare(feedId,value,userId){
        let share  = await shareCollegyFeed.create(value);
        if(share){
            let feed = await CollegeyFeed.findByIdAndUpdate(feedId,{ "$push": { "share": share._id } },
            { "new": true, "upsert": true });

            // Share New Post
            const getFeedData = await CollegeyFeed.findOne({_id:feedId});

            const newFeedObj = new CollegeyFeed({
                group : getFeedData.group,
                postData : getFeedData.postData,
                postImageUrl : getFeedData.postImageUrl,
                postText : getFeedData.postText,
                postType : getFeedData.postType,
                posturl: getFeedData.posturl,
                user : userId,
            });
            const newFeed = await newFeedObj.save();
            if(feed){
                return feed;
            }
        }
    },
    async groupWiseData(value){
            let feed = await CollegeyFeed.find({group : value})

            if(feed){
                return feed;
            }
        },
        async collegeyFeedData(){
            let feed = await CollegeyFeed.findAll()

            if(feed){
                return feed;
            }
            }
}
