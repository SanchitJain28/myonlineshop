import React, { useContext, useEffect } from "react";
import { productAPI } from "../../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { Badge, Star } from "lucide-react";
export default function ProductCard({ data }) {
  const { productName, images, _id } = data;
  const navigate = useNavigate();
  const productContext = useContext(productAPI);
  const { wishList} = productContext;
  useEffect(() => {}, [wishList]);

  return (
    <>
      <div
        key={_id}
        className="min-w-full snap-start px-4 md:min-w-[50%] lg:min-w-[33.333%] xl:min-w-[25%]"
        onClick={()=>{
          navigate(`/product?productid=${_id}`)
        }}
      >
        <div className="overflow-hidden border rounded-lg ">
          <div className="relative aspect-square">
            
              <Badge className="absolute z-10 right-2 top-2">Sale</Badge>
            <img
              src={images[0] || "/placeholder.svg"}
              alt={productName}
              fill
              className="object-cover w-full hover:scale-105 h-60"
            />
          </div>
          <div className="px-4 pb-2">
            <h3 className="font-semibold">{productName}</h3>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="ml-1 text-sm">{4}</span>
              </div>
              <div className="flex items-center">
                {true ? (
                  <>
                    <span className="text-sm font-medium line-through text-muted-foreground">
                      ${499}
                    </span>
                    <span className="ml-1 text-sm font-medium text-primary">
                      ${399}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium">{499}</span>
                )}
              </div>
            </div>
          </div>
          <div className="p-3 text-white">
            <button className="w-full px-4 py-2 rounded-xl bg-[#18181B]">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
