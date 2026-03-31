"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { getAccessToken } from "@/lib/auth";
import { getCountries } from "@/lib/countries";
import { apiClient } from "@/lib/api-client";
import { TAX_RATE } from "@/config/constants";
import { useCart } from "@/modules/cart/context/cart-context";
import { formatPrice } from "@/lib/utils";
import "./unified-checkout.css";

interface CheckoutFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobileNumber: string;
}

export function UnifiedCheckout() {
  const { items, clearCart, loading } = useCart();
  const { language } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
      mobileNumber: "",
    },
  });

  const summary = useMemo(() => {
    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 0;
    const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  }, [items]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items before checking out.",
        variant: "destructive",
      });
      router.push("/cart");
      return;
    }

    try {
      const shippingResponse = await apiClient.post("/cart/shipping", data);
      const shippingDetails = shippingResponse.data;

      await apiClient.post("/cart/payment", {
        paymentMethod: "BOG",
      });

      const orderItems = items.map((item) => ({
        name: item.name,
        nameEn: item.nameEn,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.productId,
        size: item.size,
        color: item.color,
        ageGroup: item.ageGroup,
      }));

      const orderResponse = await apiClient.post("/orders", {
        orderItems,
        shippingDetails,
        paymentMethod: "BOG",
        itemsPrice: summary.itemsPrice,
        taxPrice: summary.taxPrice,
        shippingPrice: summary.shippingPrice,
        totalPrice: summary.totalPrice,
      });

      const order = orderResponse.data;
      const token = getAccessToken();

      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/bog/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customer: {
              firstName: "Customer",
              lastName: "Customer",
              personalId: "",
              address: shippingDetails.address,
              phoneNumber: shippingDetails.mobileNumber,
              email: order.user?.email || "",
            },
            product: {
              productName: `Order #${order._id}`,
              productId: order._id,
              unitPrice: summary.totalPrice,
              quantity: 1,
              totalPrice: summary.totalPrice,
            },
            successUrl: `${window.location.origin}/checkout/success?orderId=${order._id}`,
            failUrl: `${window.location.origin}/checkout/fail?orderId=${order._id}`,
          }),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Payment initiation failed");
      }

      const paymentResult = await paymentResponse.json();

      if (!paymentResult.redirect_url) {
        throw new Error("Payment redirect URL was not returned");
      }

      await clearCart();
      window.location.href = paymentResult.redirect_url;
    } catch (error) {
      console.error(error);
      toast({
        title: "Checkout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="unified-checkout-loading">Loading checkout...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="unified-checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add products to continue to checkout.</p>
        <button
          type="button"
          className="unified-checkout-back"
          onClick={() => router.push("/cart")}
        >
          Back to cart
        </button>
      </div>
    );
  }

  return (
    <div className="unified-checkout">
      <div className="unified-checkout__intro">
        <h1>Checkout</h1>
        <p>Enter your shipping details and complete payment on this page.</p>
      </div>

      <form className="unified-checkout__grid" onSubmit={handleSubmit(onSubmit)}>
        <section className="unified-checkout__card">
          <div className="unified-checkout__section-header">
            <h2>Shipping address</h2>
            <span>Payment method: BOG</span>
          </div>

          <div className="unified-checkout__fields">
            <label className="unified-checkout__field">
              <span>Street Address</span>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="123 Main St"
              />
              {errors.address && <p className="error-text">{errors.address.message}</p>}
            </label>

            <label className="unified-checkout__field">
              <span>City</span>
              <input
                {...register("city", { required: "City is required" })}
                placeholder="Tbilisi"
              />
              {errors.city && <p className="error-text">{errors.city.message}</p>}
            </label>

            <label className="unified-checkout__field">
              <span>Postal Code</span>
              <input
                {...register("postalCode", { required: "Postal code is required" })}
                placeholder="0105"
              />
              {errors.postalCode && (
                <p className="error-text">{errors.postalCode.message}</p>
              )}
            </label>

            <label className="unified-checkout__field">
              <span>Mobile Number</span>
              <input
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                })}
                placeholder="+995..."
              />
              {errors.mobileNumber && (
                <p className="error-text">{errors.mobileNumber.message}</p>
              )}
            </label>

            <label className="unified-checkout__field unified-checkout__field--full">
              <span>Country</span>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Select a country</option>
                    {getCountries().map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.country && <p className="error-text">{errors.country.message}</p>}
            </label>
          </div>
        </section>

        <aside className="unified-checkout__sidebar">
          <section className="unified-checkout__card">
            <div className="unified-checkout__section-header">
              <h2>Order summary</h2>
              <button
                type="button"
                className="unified-checkout__link"
                onClick={() => router.push("/cart")}
              >
                Edit cart
              </button>
            </div>

            <div className="unified-checkout__items">
              {items.map((item) => {
                const displayName =
                  language === "en" && item.nameEn ? item.nameEn : item.name;

                return (
                  <div
                    key={`${item.productId}-${item.color ?? "c"}-${item.size ?? "s"}-${item.ageGroup ?? "a"}`}
                    className="unified-checkout__item"
                  >
                    <div className="unified-checkout__item-image">
                      <Image src={item.image} alt={displayName} fill className="object-cover" />
                    </div>
                    <div className="unified-checkout__item-content">
                      <Link href={`/products/${item.productId}`}>{displayName}</Link>
                      <p>
                        {item.qty} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <strong>{formatPrice(item.price * item.qty)}</strong>
                  </div>
                );
              })}
            </div>

            <div className="unified-checkout__totals">
              <div>
                <span>Items</span>
                <strong>{formatPrice(summary.itemsPrice)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>
                  {summary.shippingPrice === 0
                    ? "Free"
                    : formatPrice(summary.shippingPrice)}
                </strong>
              </div>
              <div>
                <span>Tax</span>
                <strong>{formatPrice(summary.taxPrice)}</strong>
              </div>
              <div className="unified-checkout__total">
                <span>Total</span>
                <strong>{formatPrice(summary.totalPrice)}</strong>
              </div>
            </div>

            <button type="submit" className="unified-checkout__submit" disabled={isSubmitting}>
              {isSubmitting ? "Redirecting to payment..." : "Continue to payment"}
            </button>
          </section>
        </aside>
      </form>
    </div>
  );
}
