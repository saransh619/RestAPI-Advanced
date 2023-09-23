const Product = require("../models/product");

const getAllProducts = async (req,res) => {
    const {company,name,featured,sort,select} = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
        console.log(queryObject.company);
    }

    if(featured){
        queryObject.featured = featured;
    }

    if(name){
        queryObject.name = {$regex:name, $options:"i"};
    }

    let apiData = Product.find(queryObject);

    //For Sorting (url?sort=name,-price)
    if(sort){
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    // For showing only specific field according to the users need (url?select=name,rating)
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    // page = 2;  limit = 3;  skip = 1 * 3 = 3 for understaing the formula of pagination

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);


    // const Products = await Product.find({name:"mi20"});

    // const Products = await Product.find(req.query);

    // const Products = await Product.find(queryObject);

    const Products = await apiData;

    // res.status(200).json({Products});
    res.status(200).json({Products,nbHits: Products.length});

}

const getAllProductsTesting = async (req,res) => {
    // res.status(200).json({msg:"I am getAllProductsTesting"});
    const Products = await Product.find({});
    res.status(200).json({Products})
}

module.exports = {getAllProducts, getAllProductsTesting};