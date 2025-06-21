import User from "../models/user.model.js"
import { Webhook } from "svix"


const clerkWebhook = async (req, res) => {
    try {

        // Create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_SECRET_KEY);

        //Getting Hearders
        const headers = {
            'svix_id' : req.headers['svix_id'],
            'svix_timestamp' : req.headers['svix_timestamp'],
            'svix_signature' : req.headers['svix_signature']
        };

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        //Getting Data from request body
        const {body , type} = req.body

        const userData = {
            _id : body.id,
            email : body.email_addresses[0].email_address,
            username : body.first_name + " " + body.last_name,
            image : body.image_url
        }

        //Switch Cases for deffernent Events

        switch (type) {
            case 'user_created':{  
                await User.create(userData);
                break;
            }

            case 'user_updated':{  
                await User.findByIdAndUpdate(body.id ,userData);
                break;
            }

            case 'user_deleted':{  
                await User.findByIdAndDelete(userData)
                break;
            }
            default:
                break;
        }
    res.json({success : true , message : "webhook recieved"})

    } catch (error) {
        console.log('webhook error',error.message );
        res.json({success : false , message : error.message})

    }
}

export {
    clerkWebhook
}