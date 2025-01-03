"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { getStripe } from "@/lib/stripeClient";

type Props = {
  price: string;
};

const SubscribeBtn = ({ price }: Props) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, ] = useState<string | null>(null);

  const handleCheckout = async (price: string) => {
    setLoading(true);
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Button
      onClick={() => handleCheckout(price)}
      className="bg-indigo-700 hover:bg-indigo-900 font-bold text-lg"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeBtn;