import School from '../models/school.model.js'

const addSchoolController = async (req,res)=>{
    try {
        const { schoolId, name, address, longitude, latitude } = req.body;

        if ([schoolId, name, address, longitude, latitude].some((field) => {
            return field.trim() === "";
        })) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the required fields',
            });
        }

        const foundSchool = await School.findByPk(schoolId);

        if (foundSchool) {
            return res.status(409).json({
                success: false,
                message: 'School already exists',
            });
        }

        const school = await School.create({
            schoolId,
            name,
            address,
            latitude,
            longitude,
        });

        res.status(201).json({
            success: true,
            school,
            message: 'Added school successfully',
        });
    } catch (error) {
        console.log('Error while adding school:', error);
        res.status(500).json({
            success: false,
            message: 'Error while adding school',
        });
    }
}

const editSchoolController = async (req,res)=>{
    try {
        const {schoolId,name,longitude,latitude,address} = req.body

        const foundSchool = await School.findByPk(schoolId)

        if(!foundSchool){
            res.status(404).json({
                success: false,
                message: 'No such school found',
            });
        }

        foundSchool.update({
            schoolId,
            name,
            longitude,
            latitude,
            address
        })

        res.status(201).json({
            success: true,
            foundSchool,
            message: 'Updated school successfully',
        });

    } catch (error) {
        console.log('Error while updating school:', error);
        res.status(500).json({
            success: false,
            message: 'Error while updating school',
        });
    }
}

const deleteSchoolController = async (req,res)=>{
    try {
        const {schoolId} = req.body

        const foundSchool = await School.findByPk(schoolId)

        if(!foundSchool){
            res.status(404).json({
                success: false,
                message: 'No such school found',
            });
        }

        await foundSchool.destroy()

        res.status(200).json({
            success: true,
            message: 'Deleted school successfully',
        });

    } catch (error) {
        console.log('Error while deleting school:', error);
        res.status(500).json({
            success: false,
            message: 'Error while deleting school',
        });
    }
}

const calculateDistance = (longitude1, latitude1, longitude2, latitude2) => {
    const lat = latitude2 - latitude1;
    const long = longitude2 - longitude1;
    const squared = lat * lat + long * long;
    const distance = Math.sqrt(squared);
    return distance;
};

const listAllSchoolsController = async (req, res) => {
    try {
        const { longitude, latitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(401).json({
                success: false,
                message: 'Please provide correct data',
            });
        }

        const schools = await School.findAll();

        //add the schools into the variable and then sort them  
        const sortedDistanceSchools = schools.map(school => {
            const distance = calculateDistance(longitude, latitude, school.longitude, school.latitude);
            return {
                name: school.name,  
                address: school.address,  
                latitude: school.latitude,
                longitude: school.longitude,
                distance, 
            };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            schools: sortedDistanceSchools,  
            message: 'Fetched schools in sorted order',
        });

    } catch (error) {
        console.log('Error while fetching schools:', error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching school',
        });
    }
};


export {
    addSchoolController,
    editSchoolController,
    deleteSchoolController,
    listAllSchoolsController
}