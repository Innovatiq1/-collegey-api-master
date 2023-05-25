import Country from '../models/Country';
import State from '../models/State';
import City from '../models/City';
import Timezones from '../models/Timezones';
import {invertObject} from '../utilities/helpers';
import {genderTypesEnum,statusTypesEnum,studentGradesEnum} from '../utilities/constants';

exports.masterServices = {
    async getCountries() {    
        try {
            return await Country.find().sort('name');
        } catch (error) {
            throw(error);
        }
    },

    async getTimezones() {    
        try {
            return await Timezones.find().sort('offset').select({utc: 0});
        } catch (error) {
            throw(error);
        }
    },

    async addMasterData(){                
          try {  
            const countryModel=await Country.find();
            if(countryModel.length==0){
              /*    Adding Country, State and City    */  
            const _country=require('../../data/countries.json');
            const _state=require('../../data/states.json');
            const _city=require('../../data/cities.json');

            await Country.insertMany(_country);
        //  console.log('Country Added!');
            await State.insertMany(_state);
        //  console.log('State Added!');
            await City.insertMany(_city);
        //  console.log('City Added!');  
        //  console.log('Done!');
            return 'Master Data Added!';
            }else{
        //  console.log('Already Added!');
                return 'Data Already Added!';
            }
            // process.exit();
          } catch(e) {
        //  console.log(e);
            throw(e);            
            // process.exit();
          }
       
    },

    async getStates(query) {                
        return await State.find().where(query).sort('name');
    },

    async getCities(query) {                
        return await City.find().where(query).sort('name');
    },
    
   async getStaticListData(query) {                      
        const gender=invertObject(genderTypesEnum.toJSON());
        const statusList=invertObject(statusTypesEnum.toJSON());
        const gradeList=invertObject(studentGradesEnum.toJSON());
        return {gender_list:gender,status_list:statusList,grade_list:gradeList};
    },
};

