"use client";

import Image from "next/image";
import Link from "next/link";
import "./ProductCard.css";
import { Product } from "@/types";
// import { AddToCartButton } from "./AddToCartButton";
import noPhoto from "../../../assets/nophoto.webp";
// import Star from "../../../assets/Images/star.png";
// import Star2 from "../../../assets/Images/startHandMade.png";
import { useLanguage } from "@/hooks/LanguageContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  theme?: "default" | "handmade-theme";
}

export function ProductCard({
  product,
  className = "",
  theme = "default",
}: ProductCardProps) {
  const { language } = useLanguage();
  // ვამოწმებთ სურათის ვალიდურობას
  const productImage = product.images?.[0] || noPhoto.src;

  // Display name based on selected language
  const displayName =
    language === "en" && product.nameEn ? product.nameEn : product.name;

  return (
    <div>
    <div className={`product-card ${theme} ${className}`}>
      <Link href={`/products/${product._id}`}>
        <div className="heart-shape"></div>
        <div className="product-image">
          <Image
            src={productImage}
            alt={displayName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="image"
          />
        </div>
      </Link>
      {/* <AddToCartButton
        productId={product._id}
        countInStock={product.countInStock}
        className="addButtonCart"
      /> */}{" "}
     
    </div>
     <div className="product-cards-lastDiv">
      <Link className="FColumn" href={`/products/${product._id}`}>
        <div className="product-info">
          <div className="product-name-rating">
            <h3 className="product-name">{displayName}</h3>
          </div>

          <div className="product-details">
            <div className="priceAndRaiting">
              <h3 className="product-price">
                {product.price} {language === "en" ? "GEL" : "ლარი"}{" "}
              </h3>
            </div>
          </div>
        </div>
        <button className="buyBtn">
          {" "}
          {language === "en" ? "Buy" : "იყიდე"}{" "}
        </button>
      </Link>
      </div>
    </div>
  );
}
