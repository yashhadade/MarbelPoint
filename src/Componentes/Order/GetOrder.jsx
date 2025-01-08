import { useState, useEffect } from "react";
import productsServise from "../../../services/product";
import { Typography } from "@mui/material";

function GetOrder() {
    const [productId, setProductId] = useState(""); // Initialize the state
    const [productInformation, setProductInformation] = useState();
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const inputProductId = event.target.productId.value; // Get the input value when the form is submitted
        setProductId(inputProductId); // Update the state with the input value
        console.log("Product ID:", inputProductId); // Log the productId when form is submitted
    };
    const getProductInformation = async (product_id) => {
        try {
            const res = await productsServise.getSingleProductInformation(product_id);
            console.log(res);
            if (res && res.data) {
                setProductInformation(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch product information:', error);
        }
    };

    useEffect(() => {
        if (productId) {
            getProductInformation(productId);
        }
    }, [productId]);
    console.log(productInformation);
    return (
        <>
            <div>
                <div className="text-3xl font-bold">Placed Order</div>

                {/* Form to add or update supplier */}
                <div
                    className="w-auto p-5 mt-2 rounded-xl shadow-2xl"
                    style={{ boxShadow: "0px 0px 8px #cccccc" }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex flex-col">
                                    <label htmlFor="productId" className="text-left">
                                        Product Id
                                    </label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="productId" // Ensure the input has this name
                                        placeholder="Product ID"
                                        className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                                    />
                                </div>
                            </div>

                            <button
                                className="border-[0.5px] mt-2 p-2 rounded-md shadow-sm hover:tracking-widest bg-sky-700 text-white"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {productInformation && <div className="w-auto p-5 mt-2 rounded-xl shadow-2xl" style={{ boxShadow: "0px 0px 8px #cccccc" }}>
                    <div className=" flex">
                        <div style={{ padding: "5px" }}>
                            <div className="flex">
                                <Typography sx={{ color: "#848484" }}>Product Id:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.id}</Typography>
                            </div>
                            <div className=" flex ">
                                <Typography sx={{ color: "#848484" }} >Product Name:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.name}</Typography>
                            </div>
                            <div className=" flex ">
                                <Typography sx={{ color: "#848484" }}>Supplier Name:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.supplier_name}</Typography>
                            </div>
                            <div className=" flex ">
                                <Typography sx={{ color: "#848484" }} >Size:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>{productInformation.size}</Typography>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black" }}></div>
                        <div style={{ padding: "5px" }}>
                            <div className=" flex ">
                                <Typography sx={{ color: "#848484" }}>Rate:</Typography><Typography sx={{ fontWeight: "600", marginLeft: "2px" }}>₹{productInformation.rate}</Typography>
                            </div>
                            <div className=" flex">
                                <Typography sx={{ color: "#848484" }} >Description:</Typography><Typography
                                    sx={{
                                        fontWeight: "600",
                                        marginLeft: "2px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {productInformation.description}
                                </Typography>
                            </div>
                            <div className=" flex">
                                <Typography sx={{ color: "#848484" }}>Photo:</Typography><img src={productInformation.photo} style={{ width: "100px", height: "100px" }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productId" className="text-left">
                            Quantity
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="quantity" // Ensure the input has this name
                            placeholder="quantity"
                            className="border-[0.5px] rounded-md h-10 pl-2 text-lg"
                        />
                    </div>
                </div>}
            </div>

        </>
    );
}

export default GetOrder;
