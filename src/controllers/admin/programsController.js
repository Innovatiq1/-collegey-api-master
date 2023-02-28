import { programPostServices, programGetServices } from "../../services/programServices";
import ProgramsModel from '../../models/Programs';

export async function index (req, res, next) {
    try{
        const programs = await programGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "program retrieved successfully",
            data: programs
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const program = await programPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "program created successfully",
            data: program
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const program = await programPostServices.updateProgram(req.body, req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program updated successfully",
                data: program
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const program = await programPostServices.deleteProgram(req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete as delete };

export async function view (req, res, next) {
    try{
        const program = await programGetServices.getOne(req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program details",
                data: program
            });
        }
    }catch(e){
        next(e);
    }
}

export async function getProgramByName(req, res, next) {

    const postData = req.body;
    const searchText = {};
    const searchLimit = postData.limit ? postData.limit : 10;
    if (postData.username != null && postData.username != '') {
        let regex = new RegExp(postData.username, "i");
        searchText['$regex'] = regex;
    }
    let where = {
        $and: [
            {
                title: searchText
            }
        ]
    }
    
    let aggregate = [
        {
            $match: where
        },
        {
            $facet: {
                data: [{ $limit: Number(searchLimit) }],
                pageInfo: [
                    {
                        $group: { _id: null, count: { $sum: 1 } },
                    },
                ],
            },
        },
        {
            $unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                item: "$data",
                pageInfo: {
                    count: '$pageInfo.count'
                }


            },
        },

    ];

    var programList = await ProgramsModel.aggregate(
        aggregate
    );

    res.status(200).json({
        status: "success",
        message: "Got Program List",
        results: programList[0].pageInfo.count,
        data: { data: programList[0].item }
    });
}
