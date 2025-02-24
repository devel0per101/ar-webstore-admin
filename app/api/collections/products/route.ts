import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth()

        if(!userId) {
            return new NextResponse("Unauthorised",{ status: 401 });
        }

        await connectToDB()

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();

        if(!title || !description || !media || !category || !price || !expense){
            return new NextResponse("Not enough data to create a product",{ status: 400 });
        }

        const newProduct = Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        });

        await newProduct.save();

        return NextResponse.json(newProduct, { status: 200 });
    } catch (err) {
        console.log("[products_POST]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}