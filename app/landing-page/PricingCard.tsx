"use client"
import React from 'react'
import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { PricingPlan } from './PricingSection';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}: PricingPlan) {
     const router = useRouter();

     const onClick = () => {
       router.push(url);
     };
  return (
     <div className={cn(
      "border flex flex-col justify-between rounded-lg h-full p-6 hover:shadow-xl transition-all duration-300 text-left relative",
      isPopular ? "bg-gradient-to-b from-background to-secondary/30 border-primary/50 shadow-lg" : "bg-secondary/15"
    )}>
      {isPopular && (
        <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg transform rotate-12 flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4" />
          Most Popular
        </div>
      )}
      <div>
        <div className="inline-flex items-end mb-4">
          <h1 className="font-extrabold text-4xl">
            <span className="text-3xl font-bold opacity-75">₹</span> {price}
          </h1>
        </div>
        <h2 className={cn(
          "font-bold text-2xl mb-3",
          isPopular && "text-primary font-sans underline"
        )}>{title}</h2>
        <p className="text-[16px] italic">{description}</p>
        <div className="flex-grow border-t border-primary/20 my-4"></div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3"
            >
              <div className={cn(
                "rounded-full flex items-center justify-center w-5 h-5",
                isPopular ? "bg-primary " : "bg-green-500"
              )}>
                <Check className="text-white" width={12} height={12} />
              </div>
              <p className={cn(isPopular?"italic font-bold":"font-sans font-semibold")}>{feature}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        {isPopular ? (
          <Button
            onClick={onClick}
            className="w-full italic bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg h-12 shadow-lg"
          >
            Select Plan
          </Button>
        ) : (
          <Button
            onClick={onClick}
            variant="outline"
            className="w-full hover:bg-primary/50 font-medium text-lg h-12"
          >
            Select Plan
          </Button>
        )}
      </div>
    </div>
  );
  
}
