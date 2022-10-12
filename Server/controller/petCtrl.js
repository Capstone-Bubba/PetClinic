const petDAO = require('../model/petDAO');

const getPetData = async (req, res) => {
    const parameters = {
        user_num: req.body.user_num
    }
    console.log(parameters);
    const result = await petDAO.getPet(parameters);

    res.send(result[0]);
}

const updatePetData = async (req, res) => {
    try {
        console.log(req.file)
        const parameters = req.body
        parameters.pet_img = req.file.originalname;
        
    
        const user_num = {
            user_num: parameters.user_num
        };
        delete parameters.user_num;
        
        const result = await petDAO.updatePet(parameters, user_num);
        const imgName = await petDAO.getPet(user_num);

        if(result.affectedRows === 1) {
            res.status(200).send(imgName[0].pet_img);
        } else {
            console.log('Something Wrong!!');
        }
    } catch(err) {
        console.log(err);
    }   
}

module.exports = {
    getPetData,
    updatePetData
}