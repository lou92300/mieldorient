import Stripe from "stripe";


const stripe = Stripe('sk_test_51OcV7wHqDMPifetyj5Jxf5udvwIasOWVjZVU9XZHjBMPVY6Ox3iXzQ64tdpc2yKH3ScrWXzSamFrsdqocuB2tx4K00OQ8VuyWr');

const newProduct = async(req, res)=>{
    try{
            
            const product = await stripe.products.create({
            id : req.body.id,
            name: req.body.name,
            description : req.body.description,
            default_price_data: {
                currency: 'eur',
                unit_amount: req.body.price * 100,
            },
            

          });
          
    }
    catch (error){

        res.status(500).json({msg: error.message})

    }
}

const updateProduct = async(req, res)=>{

    const price = await stripe.prices.create({
        currency: 'eur',
        unit_amount: req.body.price * 100,
        product: req.params.id
      });
      
    const product = await stripe.products.update(
        {        
            description : req.body.description
        }
      );
}



export {newProduct, updateProduct}