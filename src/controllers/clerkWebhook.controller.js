import User from "../models/user.model.js"
import { Webhook } from "svix"


const clerkWebhook = async (req, res) => {
    try {

        // Create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET );

        //Getting Hearders
        const headers = {
            'svix-id' : req.headers['svix-id'],
            'svix-timestamp' : req.headers['svix-timestamp'],
            'svix-signature' : req.headers['svix-signature']
        };
        console.log(headers);
        
        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        //Getting Data from request body
        const {body , type} = req.body;

        const userData = {
            _id : body.id,
            email : body.email_addresses[0].email_address,
            username: `${body.first_name} ${body.last_name}`,
            image : body.image_url
        }

        //Switch Cases for deffernent Events

        switch (type) {
            case 'user.created':{  
                await User.create(userData);
                break;
            }

            case 'user.updated':{  
                await User.findByIdAndUpdate(body.id ,userData);
                break;
            }

            case 'user.deleted':{  
                await User.findByIdAndDelete(body.id)
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
