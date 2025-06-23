//get /api /user

export const getUserData = async (req , res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success : true , role , recentSearchedCities})
    } catch (error) {
        console.log('get user data error' , error.message);
        res.json({success : false , message : error.message})
    }
}

export const storeRecentSearchedCities = async (req , res) => {
    try {
        const {recentSearchedCity} = req.body;
        const user = await req.user;

        if(user.recentSearchedCities.length > 3){
            user.recentSearchedCities.push(recentSearchedCity);
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity);
        }

        user.save();
        res.json({success : true , message : 'City Added'})

    } catch (error) {
        console.log(' store recent searched cities error' , error.message);
        
    }
}